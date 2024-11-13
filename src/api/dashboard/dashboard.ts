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
  const [ticketSales, setTicketSales] = useState({
    amount: 0,
    data: [],
  });
  const [ancillary, setAncillary] = useState({
    amount: 0,
    data: [],
  });
  const [revenue, setRevenue] = useState({
    amount: 0,
    data: [],
  });
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
        setTicketSales({
          amount: res.ticket.ticket_amount,
          data: res.ticket.ticket_data,
        });
        setAncillary({
          amount: res.ancillary.ancillary_amount,
          data: res.ancillary.ancillary_data,
        });
        setRevenue({
          amount: res.revenue.revenue_amount,
          data: res.revenue.revenue_data,
        });
        setChartData(res.ticket.ticket_data);
      }
    } catch (error) {
      toast.error((error as MutationErrorPayload)?.data?.message);
    }
  };

  const getDashboardAnalytics = async () => {
    getWeeklyAnalysisData();
    getRegisteredUsersTable();
    getPurchasedTicketTable();
    getAreaChart('weekly');
  };

  return {
    loaders: {
      isLoading,
      isChartLoading,
    },
    actions: {
      getWeeklyAnalysisData,
      getRegisteredUsersTable,
      getPurchasedTicketTable,
      getDashboardAnalytics,
    },
    revenueChart: {
      ticketSales,
      ancillary,
      revenue,
      setChartData,
      chartData,
    },
    analysis: {
      registeredUsers,
      registeredPercentChange,
      ticketsPurchased,
      ticketsPercentChange,
      totalRevenue,
      revenuePrecentChange,
    },
    table: {
      registeredUsersData,
      ticketsPurchasedData,
    },
  };
};
