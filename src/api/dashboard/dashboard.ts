import {
  baseURL,
  initailAreaChart,
  initialOverview,
  initialUsersByDevice,
} from '@/constants/constants';
import { useUser } from '@/context/AppContext';
import {
  ByScreenResolution,
  GraphValues,
  MutationErrorPayload,
  OverViewType,
  RecentActivity,
  RevenueGraph,
  TicketsPurchasedViaApp,
  TotalRevenueType,
  TotalUsersRegistered,
  UsersByDevice,
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
  const [totalRevenue, setTotalRevenue] = useState<TotalRevenueType[]>([]);
  const [isChartLoading, setIsChartLoading] = useState(false);
  const [revenueGraph, setRevenueGraph] =
    useState<RevenueGraph>(initailAreaChart);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersByDevice, setUsersByDevice] =
    useState<UsersByDevice>(initialUsersByDevice);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSucess, setIsSucess] = useState(false);
  const [chartData, setChartData] = useState<GraphValues[]>([]);
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [screenData, setScreenData] = useState<ByScreenResolution[]>([]);
  const [loadingRecent, setLoadingRecent] = useState(false);
  const [RecentActivities, setRecentActivities] = useState<RecentActivity[]>(
    [],
  );

  const getOverViewData = async () => {
    try {
      setIsLoading(true);
      const data = await fetch(`${baseURL}admin/dashboard/weekly-analysis`, {
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
        `${baseURL}admin/dashboard/total-registered-users-table`,
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
        `${baseURL}admin/dashboard/total-purchased-tickets-table`,
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

  const getTotalRevenueTable = async () => {
    try {
      setIsLoading(true);
      const data = await fetch(
        `${baseURL}admin/dashboard/total-revenue-tickets-table`,
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
        setTotalRevenue(res.revenue_purchased);
      }
    } catch (error) {
      toast.error((error as MutationErrorPayload)?.data?.message);
    }
  };
  const getAreaChart = async (period: string) => {
    try {
      setIsChartLoading(true);
      const data = await fetch(
        `${baseURL}admin/dashboard/revenue-graph/${period}`,
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
        setIsSucess(false);
      } else {
        setShowDropdown(false);
        setIsSucess(true);
        setRevenueGraph(res);

        setChartData(res.ticket.ticket_data);
      }
    } catch (error) {
      toast.error((error as MutationErrorPayload)?.data?.message);
    }
  };

  const getUsersByDevice = async () => {
    try {
      setUsersLoading(true);
      const data = await fetch(`${baseURL}admin/dashboard/user-by-device`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const res = await data.json();
      setUsersLoading(false);
      if (res?.error) {
        toast.error(res.message);
      } else {
        setUsersByDevice(res);
      }
    } catch (error) {
      toast.error((error as MutationErrorPayload)?.data?.message);
    }
  };

  const getUsersByScreenResolution = async () => {
    try {
      setIsScreenLoading(true);
      const data = await fetch(`${baseURL}admin/dashboard/screen-resolution`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const res = await data.json();
      setIsScreenLoading(false);
      if (res?.error) {
        toast.error(res.message);
      } else {
        setScreenData(res.users_and_screenResolution);
      }
    } catch (error) {
      toast.error((error as MutationErrorPayload)?.data?.message);
    }
  };

  const getRecentActivities = async () => {
    try {
      setLoadingRecent(true);
      const data = await fetch(`${baseURL}admin/dashboard/recent-table`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const res = await data.json();
      setLoadingRecent(false);
      if (res?.error) {
        toast.error(res.message);
      } else {
        setRecentActivities(res.recent_activities);
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
    getUsersByDevice();
    getUsersByScreenResolution();
    getRecentActivities();
    getTotalRevenueTable();
  };

  return {
    revenueGraph,
    setChartData,
    chartData,
    overView,
    usersByDevice,
    isSucess,
    showDropdown,
    setShowDropdown,
    screenData,
    RecentActivities,
    loaders: {
      isLoading,
      isChartLoading,
      usersLoading,
      isScreenLoading,
      loadingRecent,
    },
    actions: {
      getOverViewData,
      getRegisteredUsersTable,
      getPurchasedTicketTable,
      getDashboardAnalytics,
      getUsersByDevice,
      getAreaChart,
    },
    table: {
      registeredUsersData,
      ticketsPurchasedData,
      totalRevenue,
    },
  };
};
