import { useUser } from '@/context/AppContext';
import {
  MutationErrorPayload,
  TicketsPurchasedViaApp,
  TotalUsersRegistered,
} from '@/types/types';
import { useState } from 'react';
import { toast } from 'sonner';

export const useManageDashboard = () => {
  const { token } = useUser();
  const [isRegisteredUsersLoading, setIsRgisteredUsersLoading] =
    useState(false);
  const [registeredUsers, setRegisteredUsers] = useState<number>(0);
  const [registeredPercentChange, setRegisteredPercentChange] =
    useState<number>(0);
  const [isTicketsLoading, setIsTicketsLoading] = useState(false);
  const [ticketsPurchased, setTicketPurchased] = useState(0);
  const [ticketsPercentChange, setTicketsPercentChange] = useState(0);
  const [isRevenueLoading, setIsRevenueLoading] = useState(false);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [revenuePrecentChange, setRevenuePercentChange] = useState(0);
  const [registeredUsersData, setRegisteredUsersData] = useState<
    TotalUsersRegistered[]
  >([]);
  const [ticketsPurchasedData, setTicketsPurchasedData] = useState<
    TicketsPurchasedViaApp[]
  >([]);

  const getRegisteredUsers = async () => {
    try {
      setIsRgisteredUsersLoading(true);
      const data = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}admin/dashboard/total-registered-users`,
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
      setIsRgisteredUsersLoading(false);
      if (res?.error) {
        toast.error(res.message);
      } else {
        setRegisteredUsers(res.total_users_registered_last_7_days);
        setRegisteredPercentChange(res.percentage_change_vs_last_7_days);
      }
    } catch (error) {
      toast.error((error as MutationErrorPayload)?.data?.message);
    }
  };

  const getTicketsPurchased = async () => {
    try {
      setIsTicketsLoading(true);
      const data = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}admin/dashboard/ticket-purchased`,
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
      setIsTicketsLoading(false);
      if (res?.error) {
        toast.error(res.message);
      } else {
        setTicketPurchased(res.ticket7DaysAgo);
        setTicketsPercentChange(res.percentageChange);
      }
    } catch (error) {
      toast.error((error as MutationErrorPayload)?.data?.message);
    }
  };
  const getRevenue = async () => {
    try {
      setIsRevenueLoading(true);
      const data = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}admin/dashboard/total-revenue`,
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
      setIsRevenueLoading(false);
      if (res?.error) {
        toast.error(res.message);
      } else {
        setTotalRevenue(res.total7daysRevenue);
        setRevenuePercentChange(res.percentageChange);
      }
    } catch (error) {
      toast.error((error as MutationErrorPayload)?.data?.message);
    }
  };
  const getRegisteredUsersTable = async () => {
    try {
      setIsRgisteredUsersLoading(true);
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
      setIsRgisteredUsersLoading(false);
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
      setIsTicketsLoading(true);
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
      setIsTicketsLoading(false);
      if (res?.error) {
        toast.error(res.message);
      } else {
        setTicketsPurchasedData(res.tickets_info);
      }
    } catch (error) {
      toast.error((error as MutationErrorPayload)?.data?.message);
    }
  };

  return {
    isRegisteredUsersLoading,
    registeredUsers,
    registeredPercentChange,
    isTicketsLoading,
    ticketsPurchased,
    ticketsPercentChange,
    isRevenueLoading,
    totalRevenue,
    revenuePrecentChange,
    registeredUsersData,
    ticketsPurchasedData,
    getRegisteredUsers,
    getTicketsPurchased,
    getRevenue,
    getRegisteredUsersTable,
    getPurchasedTicketTable,
  };
};
