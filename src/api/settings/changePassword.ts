import { ChangePwd, MutationErrorPayload } from '@/types/types';
import { useState } from 'react';
import { toast } from 'sonner';

export const useChangePwd = () => {
  const token = sessionStorage.getItem('admin_token');
  const [loading, setLoading] = useState(false);
  const [updatePwdModal, setUpdatePwdModal] = useState<boolean>(false);
  const [pwdField, setPwdField] = useState<ChangePwd>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const resetField = () => {
    setPwdField(() => ({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }));
  };
  const [validatePwd, setValidatePwd] = useState({
    newPassword: false,
    confirmPassword: false,
  });

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
            new_password_confirmation: values.confirmPassword,
          }),
        },
      );

      const res = await patchData.json();
      setLoading(false);
      if (res?.error) {
        toast.error(res.message);
      } else if (res?.errors) {
        toast.error(res.message);
      } else {
        setUpdatePwdModal(true);
        resetField();
      }
    } catch (error) {
      toast.error((error as MutationErrorPayload)?.data?.message);
    }
  };

  return {
    handleChangePassword,
    loading,
    updatePwdModal,
    setUpdatePwdModal,
    pwdField,
    setPwdField,
    validatePwd,
    setValidatePwd,
  };
};
