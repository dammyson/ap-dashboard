import {
  CustomerGraphValues,
  OverViewType,
  RevenueGraph,
  UsersByDevice,
} from '@/types/types';

export const baseURL = import.meta.env.VITE_API_BASE_URL;

export const initialOverview: OverViewType = {
  total_registered_users: {
    total_registered_users_last_seven_days: 0,
    percentage: 0,
  },
  total_purchased_ticket: {
    ticket7DaysAgo: 0,
    percentageChange: 0,
  },
  total_revenue: {
    total7daysRevenue: 0,
    percentageChange: 0,
  },
};

export const initailAreaChart: RevenueGraph = {
  ticket: {
    ticket_amount: 0,
    ticket_data: [],
  },
  ancillary: {
    ancillary_amount: 0,
    ancillary_data: [],
  },
  revenue: {
    revenue_amount: 0,
    revenue_data: [],
  },
};

export const initialCustomerRevenue: CustomerGraphValues = {
  total_flight_amount: 0,
  flight_booking: [],
  app_purchase_amount: 0,
  app_purchase: [],
  total_revenue_amount: 0,
  total_revenue: [],
};

export const initialUsersByDevice: UsersByDevice = {
  android_percent: 0,
  ios_percent: 0,
  android_revenue: 0,
  ios_revenue: 0,
};

export const graphOptions = [
  { key: 'Weekly', value: 'weekly' },
  { key: 'Yearly', value: 'yearly' },
];
