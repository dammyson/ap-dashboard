import { useUser } from '@/context/AppContext';
import { MutationErrorPayload } from '@/types/types';
import { useState } from 'react';
import { toast } from 'sonner';

export const useViewSurveyResult = () => {
  const { token } = useUser();
  const [Loading, setLoading] = useState(false);
  const [participants, setParticipants] = useState([]);
  const getSurveyParticipants = async (id: number) => {
    setLoading(true);
    try {
      const data = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}admin/surveys/${id}/participants`,
        {
          method: 'GET',
          headers: {
            Accept: 'aplication/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const res = await data.json();
      setLoading(false);
      if (res?.error) {
        toast.error(res.message);
      } else {
        setParticipants(res.users);
        console.log(res.users);
      }
    } catch (error) {
      toast.error((error as MutationErrorPayload)?.data?.message);
    }
  };

  return { getSurveyParticipants, participants, Loading };
};
