import { ChangePassword, MutationErrorPayload } from '@/types/types';
import { useState } from 'react';
import { toast } from 'sonner';

export const useChangePassword = () => {
  const token = sessionStorage.getItem('admin_token');
  const [loading, setLoading] = useState(false);
  const [updatePasswordModal, setUpdatePasswordModal] =
    useState<boolean>(false);
  const [passwordField, setPasswordField] = useState<ChangePassword>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const resetField = () => {
    setPasswordField(() => ({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }));
  };
  const [validatePassword, setValidatePassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const handleChangePassword = async (values: ChangePassword) => {
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
        setUpdatePasswordModal(true);
        resetField();
      }
    } catch (error) {
      toast.error((error as MutationErrorPayload)?.data?.message);
    }
  };

  return {
    handleChangePassword,
    loading,
    updatePasswordModal,
    setUpdatePasswordModal,
    passwordField,
    setPasswordField,
    validatePassword,
    setValidatePassword,
  };
};
