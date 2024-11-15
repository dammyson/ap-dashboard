import { baseURL } from '@/constants/constants';
import { useUser } from '@/context/AppContext';
import { MutationErrorPayload, ViewResult } from '@/types/types';
import { useState } from 'react';
import { toast } from 'sonner';

export const useViewSurveyResult = () => {
  const { token } = useUser();
  const [Loading, setLoading] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [results, setResults] = useState<ViewResult[]>([]);
  const [isloading, setIsLoading] = useState(false);
  const getSurveyParticipants = async (id: number) => {
    setLoading(true);
    try {
      const data = await fetch(`${baseURL}admin/surveys/${id}/participants`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const res = await data.json();
      setLoading(false);
      if (res?.error) {
        toast.error(res.message);
      } else {
        setParticipants(res.users);
      }
    } catch (error) {
      toast.error((error as MutationErrorPayload)?.data?.message);
    }
  };

  const getSurveyResults = async (id: number) => {
    try {
      setIsLoading(true);
      const data = await fetch(`${baseURL}admin/surveys/${id}/survey-result`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const res = await data.json();
      setIsLoading(false);
      if (res?.error) {
        toast.error(res.message);
      } else {
        setResults(res.results);
      }
    } catch (error) {
      toast.error((error as MutationErrorPayload)?.data?.message);
    }
  };

  return {
    getSurveyParticipants,
    participants,
    Loading,
    getSurveyResults,
    isloading,
    results,
  };
};
