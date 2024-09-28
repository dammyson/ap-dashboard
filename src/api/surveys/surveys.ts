import { useUser } from '@/context/AppContext';
import { MutationErrorPayload } from '@/types/types';
import { useState } from 'react';
import { toast } from 'sonner';

export const useSurvey = () => {
  const { token } = useUser();
  const [surveys, setSurveys] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const getSurvey = async () => {
    try {
      setIsLoading(true);
      const data = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}admin/surveys/survey-table`,
        {
          method: 'GET',
          headers: {
            Accept: 'aplication/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const res = await data.json();
      setIsLoading(false);
      if (res?.error) {
        toast.error(res.message);
      } else {
        setSurveys(res.survey_data);
      }
    } catch (error) {
      toast.error((error as MutationErrorPayload)?.data?.message);
    }
  };

  return { getSurvey, surveys, isLoading };
};