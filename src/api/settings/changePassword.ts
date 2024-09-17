import { ChangePwd, MutationErrorPayload } from '@/types/types';
import { useState } from 'react';
import { toast } from 'sonner';

export const useChangePwd = () => {
  const token = sessionStorage.getItem('admin_token');
  const [loading, setLoading] = useState(false);
  const [updatePwdModal, setUpdatePwdModal] = useState<boolean>(false);

  const handleChangePassword = async (values: ChangePwd) => {
    try {
      setLoading(true);
      const patchData = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}admin/settings/profile/change-password`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'content-type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            current_password: values.currentPassword,
            new_password: values.newPassword,
            current_password_confirmation: values.confirmPassword,
          }),
        },
      );

      const res = await patchData.json();
      setLoading(false);
      if (res?.errors) {
        toast.error(res.message);
      } else {
        // setUpdatePwdModal(true);
      }
    } catch (error) {
      console.error('err', error);
      toast.error((error as MutationErrorPayload)?.data?.message);
    }
  };

  return { handleChangePassword, loading, updatePwdModal, setUpdatePwdModal };
};
