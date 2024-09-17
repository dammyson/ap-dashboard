import { AddAdmins, MutationErrorPayload } from '@/types/types';
import { useState } from 'react';
import { toast } from 'sonner';

export const useAddMembers = () => {
  const [loading, setisLoading] = useState(false);
  const token = sessionStorage.getItem('admin_token');

  const handleAddMembers = async (values: AddAdmins) => {
    try {
      setisLoading(true);
      const data = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}admin/admin-register`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'content-type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            user_name: values.userName,
            email: values.email,
            role: values.selectedRole,
          }),
        },
      );

      const response = await data.json();
      setisLoading(false);
      if (response?.errors) {
        toast.error(response.message);
      } else if (response?.message.includes('SQLSTATE[23000]')) {
        toast.warning('User with email already exist');
      } else toast.success(response?.message);
    } catch (error) {
      toast.error((error as MutationErrorPayload)?.data?.message);
    }
  };

  return { handleAddMembers, loading };
};
