import { initailAreaChart, initialOverview } from '@/constants/constants';
import { useUser } from '@/context/AppContext';
import {
  GraphValues,
  MutationErrorPayload,
  OverViewType,
  RevenueGraph,
  TicketsPurchasedViaApp,
  TotalUsersRegistered,
} from '@/types/types';
import { useState } from 'react';
import { toast } from 'sonner';

export const useManageDashboard = () => {
  const { token } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [overView, setOverView] = useState<OverViewType>(initialOverview);
  const [registeredUsersData, setRegisteredUsersData] = useState<
    TotalUsersRegistered[]
  >([]);
  const [ticketsPurchasedData, setTicketsPurchasedData] = useState<
    TicketsPurchasedViaApp[]
  >([]);
  const [isChartLoading, setIsChartLoading] = useState(false);
  const [revenueGraph, setRevenueGraph] =
    useState<RevenueGraph>(initailAreaChart);

  const [chartData, setChartData] = useState<GraphValues[]>([]);

  const getOverViewData = async () => {
    try {
      setIsLoading(true);
      const data = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}admin/dashboard/weekly-analysis`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const res = await data.json();
      setIsLoading(false);
      if (res?.error) {
        toast.error(res.message);
      } else {
        setOverView(res);
      }
    } catch (error) {
      toast.error((error as MutationErrorPayload)?.data?.message);
    }
  };
  const getRegisteredUsersTable = async () => {
    try {
      setIsLoading(true);
      const data = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}admin/dashboard/total-registered-users-table`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const res = await data.json();
      setIsLoading(false);
      if (res?.error) {
        toast.error(res.message);
      } else {
        setRegisteredUsersData(res.data);
      }
    } catch (error) {
      toast.error((error as MutationErrorPayload)?.data?.message);
    }
  };
  const getPurchasedTicketTable = async () => {
    try {
      setIsLoading(true);
      const data = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}admin/dashboard/total-purchased-tickets-table`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const res = await data.json();
      setIsLoading(false);
      if (res?.error) {
        toast.error(res.message);
      } else {
        setTicketsPurchasedData(res.tickets_info);
      }
    } catch (error) {
      toast.error((error as MutationErrorPayload)?.data?.message);
    }
  };
  const getAreaChart = async (period: string) => {
    try {
      setIsChartLoading(true);
      const data = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}admin/dashboard/revenue-graph/${period}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const res = await data.json();
      setIsChartLoading(false);
      if (res?.error) {
        toast.error(res.message);
      } else {
        setRevenueGraph(res);

        setChartData(res.ticket.ticket_data);
      }
    } catch (error) {
      toast.error((error as MutationErrorPayload)?.data?.message);
    }
  };

  const getDashboardAnalytics = async () => {
    getOverViewData();
    getRegisteredUsersTable();
    getPurchasedTicketTable();
    getAreaChart('weekly');
  };

  return {
    revenueGraph,
    setChartData,
    chartData,
    overView,
    loaders: {
      isLoading,
      isChartLoading,
    },
    actions: {
      getOverViewData,
      getRegisteredUsersTable,
      getPurchasedTicketTable,
      getDashboardAnalytics,
    },
    table: {
      registeredUsersData,
      ticketsPurchasedData,
    },
  };
};
