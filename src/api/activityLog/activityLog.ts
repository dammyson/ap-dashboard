import { useUser } from '@/context/AppContext';
import { MutationErrorPayload } from '@/types/types';
import { useState } from 'react';
import { toast } from 'sonner';

export const useActivityLog = () => {
  const { token } = useUser();
  const [loading, setLoading] = useState(false);
  const [activityData, setActivityData] = useState();

  const getActivityLog = async () => {
    try {
      setLoading(true);
      const data = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}admin/activity-log/activity-log-table-data`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const res = await data.json();
      setLoading(false);
      if (res?.error) {
      } else {
        setActivityData(res.activityLog);
      }
    } catch (err) {
      toast.error((err as MutationErrorPayload)?.data?.message);
    }
  };
  return { getActivityLog, loading, setLoading, activityData };
};
