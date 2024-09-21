import { useUser } from '@/context/AppContext';
import { Login, MutationErrorPayload } from '@/types/types';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { useGetProfile } from './settings/getProfile';

export const useLogin = () => {
  const navigate = useNavigate();
  const { setUser, setToken } = useUser();
  const { getProfile } = useGetProfile();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: Login) => {
    try {
      setLoading(true);
      const data = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}admin/admin-login`,
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        },
      );
      const res = await data.json();
      setLoading(false);
      if (res.error) {
        toast.error(
          `${res.message}, kindly try again with the right credentials`,
        );
      } else {
        setUser(res.data.admin);
        setToken(res.data.token);
        getProfile(res.data.token);
        toast.success(`${res?.data?.admin?.role} Login Successful!`);
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('err', err);
      toast.error((err as MutationErrorPayload)?.data?.message);
    }
  };

  return { handleLogin, loading, setLoading };
};
