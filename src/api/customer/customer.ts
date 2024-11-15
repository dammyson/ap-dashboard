import { useUser } from '@/context/AppContext';
import { CustomerInfomation, MutationErrorPayload } from '@/types/types';
import { useState } from 'react';
import { toast } from 'sonner';

export const useManageCustomer = () => {
  const { token } = useUser();
  const [customersData, setCustomersData] = useState<CustomerInfomation[]>([]);
  const [loading, setIsLoading] = useState(false);
  const getCustomerTable = async () => {
    try {
      setIsLoading(true);
      const data = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}admin/customer/customer-information`,
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

  return {
    loading,
    customersData,
    getCustomerTable,
  };
};
