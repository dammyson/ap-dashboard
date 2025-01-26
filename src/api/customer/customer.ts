import { baseURL } from '@/constants/constants';
import { useUser } from '@/context/AppContext';
import { usePermission, UserRole } from '@/context/permissionContext';
import {
  AllocatePonit,
  CustomerChart,
  CustomerInfomation,
  ICustomer,
  MutationErrorPayload,
} from '@/types/types';
import { useState } from 'react';
import { toast } from 'sonner';

export const useManageCustomer = () => {
  const { token } = useUser();
  const [customersData, setCustomersData] = useState<CustomerInfomation[]>([]);
  const [loading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState<CustomerChart | null>(null);
  const [isChartLoading, setIsChartLoading] = useState(false);
  const [isPointLoading, setIsPontLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [fetching, setFetching] = useState(false);
  const [customer, setCustomer] = useState<ICustomer | null>(null);
  const [selectedPoint, setSelectedPoint] = useState<number | string>('');
  const [selectedReason, setSelectedReason] = useState<number | string>('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSucess, setIsSucess] = useState(false);
  const { role, setAccessDenied } = usePermission();

  const getCustomerTable = async () => {
    try {
      setIsLoading(true);
      const data = await fetch(
        `${baseURL}admin/customer/customer-information`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const res = await data.json();
      setIsLoading(false);
      if (res?.error) {
        toast.error(res.message);
      } else {
        setCustomersData(res.users_table_data.reverse());
      }
    } catch (error) {
      toast.error((error as MutationErrorPayload)?.data?.message);
    }
  };

  const getCustomerRevenue = async (id: string, period: string) => {
    try {
      setIsChartLoading(true);
      const data = await fetch(
        `${baseURL}admin/customer/${id}/user-revenue/charts/${period}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const res = await data.json();
      setIsChartLoading(false);
      if (res?.error) {
        toast.error(res.message);
        setIsSucess(false);
      } else {
        setShowDropdown(false);
        setIsSucess(true);
        setChartData(res);
      }
    } catch (error) {
      toast.error((error as MutationErrorPayload)?.data?.message);
    }
  };

  const getCustomerById = async (id: string) => {
    try {
      setFetching(true);
      const data = await fetch(
        `${baseURL}admin/customer/${id}/users-information`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const res = await data.json();
      setFetching(false);
      if (res?.error) {
        toast.error(res.message);
      } else {
        setCustomer(res);
      }
    } catch (error) {
      setFetching(false);
      toast.error((error as MutationErrorPayload)?.data?.message);
    }
  };

  const allocatePonit = async (id: number, value: AllocatePonit) => {
    if (role === UserRole.SUB_ADMIN) {
      setAccessDenied(true);
      return;
    }
    try {
      setIsPontLoading(true);
      const data = await fetch(
        `${baseURL}admin/customer/${id}/award-point-manually`,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            points: value.points,
            reason: value.reason,
          }),
        },
      );
      const res = await data.json();
      setIsPontLoading(false);
      if (res?.error) {
        toast.error(res.message);
      } else {
        setIsModalOpen(false);
        setSelectedPoint('');
        setSelectedReason('');
        toast.success(res.message);
      }
    } catch (error) {
      toast.error((error as MutationErrorPayload)?.data?.message);
    }
  };

  return {
    loading,
    customersData,
    chartData,
    setChartData,
    isChartLoading,
    isPointLoading,
    allocatePonit,
    isModalOpen,
    setIsModalOpen,
    getCustomerTable,
    getCustomerRevenue,
    getCustomerById,
    customer,
    fetching,
    selectedPoint,
    setSelectedPoint,
    selectedReason,
    setSelectedReason,
    showDropdown,
    isSucess,
    setShowDropdown,
  };
};
