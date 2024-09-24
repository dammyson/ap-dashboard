import { useUser } from '@/context/AppContext';
import { changeAdminRole, MutationErrorPayload } from '@/types/types';
import { useState } from 'react';
import { toast } from 'sonner';
import { useTeamMembers } from './teamMembers';

export const useChangeRole = () => {
  const { token } = useUser();
  const { getTeamMembers } = useTeamMembers();
  const [updateMemberModal, setUpdateMemberModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newRole, setNewRole] = useState('');
  const [email, setEmail] = useState('');

  const changeAdminRole = async (values: changeAdminRole) => {
    try {
      setLoading(true);
      const data = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}admin/settings/change-admin-role`,
        {
          method: 'PATCH',
          headers: {
            'content-type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            email: values.email,
            new_role: values.new_role,
          }),
        },
      );
      const res = await data.json();
      setLoading(false);
      if (res?.error) {
        setUpdateMemberModal(false);
        toast.error(res?.message);
      } else {
        setUpdateMemberModal(false);
        toast.success(res?.message);
      }
    } catch (err) {
      toast.error((err as MutationErrorPayload)?.data?.message);
    }
  };

  return {
    changeAdminRole,
    loading,
    updateMemberModal,
    setUpdateMemberModal,
    newRole,
    setNewRole,
    email,
    setEmail,
  };
};
