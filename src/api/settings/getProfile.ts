import { useUser } from '@/context/AppContext';
import { MutationErrorPayload } from '@/types/types';
import { toast } from 'sonner';

export const useGetProfile = () => {
  const { setUser } = useUser();
  const getProfile = async (token: string) => {
    try {
      const data = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}admin/settings/profile`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        },
      );
      const res = await data.json();
      if (res?.error) {
        toast.error(res?.message);
      } else setUser(res?.admin_data);
    } catch (err) {
      console.error('err', err);
      toast.error((err as MutationErrorPayload)?.data?.message);
    }
  };

  return { getProfile };
};
