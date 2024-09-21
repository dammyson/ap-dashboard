import { useUser } from '@/context/AppContext';
import { MutationErrorPayload } from '@/types/types';
import { useState } from 'react';
import { toast } from 'sonner';

export const useTeamMembers = () => {
  const { token } = useUser();
  const [teamMembers, setTeamMembers] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const getTeamMembers = async () => {
    try {
      setIsLoading(true);
      const data = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}admin/settings/team-members`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        },
      );
      const res = await data.json();
      setIsLoading(false);
      if (res?.error) {
        toast.error(res?.message);
      } else setTeamMembers(res.admin_data);
    } catch (err) {
      toast.error((err as MutationErrorPayload)?.data?.message);
    }
  };

  return { getTeamMembers, teamMembers, isLoading };
};
