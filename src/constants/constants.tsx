import { OverViewType, RevenueGraph } from '@/types/types';

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
