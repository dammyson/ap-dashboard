import { baseURL, initialCustomerRevenue } from '@/constants/constants';
import { useUser } from '@/context/AppContext';
import {
  AllocatePonit,
  CustomerGraphValues,
  CustomerInfomation,
  GraphValues,
  MutationErrorPayload,
} from '@/types/types';
import { useState } from 'react';
import { toast } from 'sonner';

export const useManageCustomer = () => {
  const { token } = useUser();
  const [customersData, setCustomersData] = useState<CustomerInfomation[]>([]);
  const [loading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState<GraphValues[]>([]);
  const [customerRevenue, setCustomerRevenue] = useState<CustomerGraphValues>(
    initialCustomerRevenue,
  );
  const [isChartLoading, setIsChartLoading] = useState(false);
  const [isPointLoading, setIsPontLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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
        setCustomersData(res.users_table_data);
      }
    } catch (error) {
      toast.error((error as MutationErrorPayload)?.data?.message);
    }
  };

  const getCustomerRevenue = async (id: string) => {
    try {
      setIsChartLoading(true);
      const data = await fetch(
        `${baseURL}admin/customer/revenue-sources/charts/${id}`,
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
      } else {
        setCustomerRevenue(res);
        setChartData(res.flight_booking);
      }
    } catch (error) {
      toast.error((error as MutationErrorPayload)?.data?.message);
    }
  };

  const allocatePonit = async (id: number, value: AllocatePonit) => {
    try {
      setIsPontLoading(true);
      const data = await fetch(
        `${baseURL}admin/customer/award-point-manually/${id}`,
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
    customerRevenue,
    isModalOpen,
    setIsModalOpen,
    getCustomerTable,
    getCustomerRevenue,
  };
};
