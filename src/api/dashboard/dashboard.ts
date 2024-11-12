import { useUser } from '@/context/AppContext';
import {
  GraphValues,
  MutationErrorPayload,
  TicketsPurchasedViaApp,
  TotalUsersRegistered,
} from '@/types/types';
import { useState } from 'react';
import { toast } from 'sonner';

export const useManageDashboard = () => {
  const { token } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState(0);
  const [registeredPercentChange, setRegisteredPercentChange] = useState(0);
  const [ticketsPurchased, setTicketPurchased] = useState(0);
  const [ticketsPercentChange, setTicketsPercentChange] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [revenuePrecentChange, setRevenuePercentChange] = useState(0);
  const [registeredUsersData, setRegisteredUsersData] = useState<
    TotalUsersRegistered[]
  >([]);
  const [ticketsPurchasedData, setTicketsPurchasedData] = useState<
    TicketsPurchasedViaApp[]
  >([]);
  const [isChartLoading, setIsChartLoading] = useState(false);
  const [chartData, setChartData] = useState<GraphValues[]>([]);

  const getWeeklyAnalysisData = async () => {
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
        const users = res.total_registered_users;
        const tickets = res.total_purchased_ticket;
        const revenue = res.total_revenue;
        setRegisteredUsers(users.total_registered_users_last_seven_days);
        setRegisteredPercentChange(users.percentage);
        setTicketPurchased(tickets.ticket7DaysAgo);
        setTicketsPercentChange(tickets.percentageChange);
        setTotalRevenue(revenue.total7daysRevenue);
        setRevenuePercentChange(revenue.percentageChange);
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
  const getTicketSalesRevenue = async () => {
    try {
      setIsChartLoading(true);
      const data = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}admin/dashboard/ticket-via-app`,
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
        setChartData(res.tickets);
      }
    } catch (error) {
      toast.error((error as MutationErrorPayload)?.data?.message);
    }
  };
  const getAncilaryRevenue = async () => {
    try {
      setIsChartLoading(true);
      const data = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}admin/dashboard/ancillary-via-app`,
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
        setChartData(res.ancillary_tickets);
      }
    } catch (error) {
      toast.error((error as MutationErrorPayload)?.data?.message);
    }
  };
  const getTotalRevenue = async () => {
    try {
      setIsChartLoading(true);
      const data = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}admin/dashboard/total-revenue-via-app`,
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
        setChartData(res.total_revenue);
      }
    } catch (error) {
      toast.error((error as MutationErrorPayload)?.data?.message);
    }
  };

  const getDashboardAnalytics = async () => {
    getWeeklyAnalysisData();
    getRegisteredUsersTable();
    getPurchasedTicketTable();
  };

  return {
    isLoading,
    registeredUsers,
    registeredPercentChange,
    ticketsPurchased,
    ticketsPercentChange,
    totalRevenue,
    revenuePrecentChange,
    registeredUsersData,
    ticketsPurchasedData,
    isChartLoading,
    chartData,
    getWeeklyAnalysisData,
    getRegisteredUsersTable,
    getPurchasedTicketTable,
    getDashboardAnalytics,
    getTicketSalesRevenue,
    getAncilaryRevenue,
    getTotalRevenue,
  };
};
