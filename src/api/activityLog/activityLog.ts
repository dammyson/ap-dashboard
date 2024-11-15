import { baseURL } from '@/constants/constants';
import { useUser } from '@/context/AppContext';
import {
  FilterActivityLog,
  MutationErrorPayload,
  typeActivityLog,
} from '@/types/types';
import { useState } from 'react';
import { toast } from 'sonner';

export const useActivityLog = () => {
  const { token } = useUser();
  const [loading, setLoading] = useState(false);
  const [activityData, setActivityData] = useState<typeActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [isFiltered, setIsFiltered] = useState(false);
  const getActivityLog = async () => {
    try {
      setLoading(true);
      const data = await fetch(
        `${baseURL}admin/activity-log/activity-log-table-data`,
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
        toast.error(res.message);
      } else {
        setActivityData(res.activityLog);
        setIsFiltered(false);
      }
    } catch (err) {
      toast.error((err as MutationErrorPayload)?.data?.message);
    }
  };

  const filterActivity = async (value: FilterActivityLog) => {
    try {
      setIsLoading(true);
      const data = await fetch(
        `${baseURL}admin/activity-log/filter-activity-log`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            start_date: value.startDate,
            end_date: value.endDate,
          }),
        },
      );
      const res = await data.json();
      setIsLoading(false);
      if (res?.errors) {
        toast.error(res.message);
        setIsFiltered(false);
      } else {
        setActivityData(res.filtered_activity_log);
        setIsFiltered(true);
        setStartDate(undefined);
        setEndDate(undefined);
      }
    } catch (err) {
      toast.error((err as MutationErrorPayload)?.data?.message);
    }
  };
  return {
    getActivityLog,
    loading,
    setLoading,
    activityData,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    isLoading,
    filterActivity,
    isFiltered,
  };
};
