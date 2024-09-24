import { useUser } from '@/context/AppContext';
import { useState } from 'react';

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
        console.log(res);
      } else {
        setActivityData(res.activityLog);
        console.log(res);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return { getActivityLog, loading, setLoading, activityData };
};
