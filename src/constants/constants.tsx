import {
  CustomerGraphValues,
  NotificationsType,
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

export const notificationOptions: NotificationsType[] = [
  {
    id: 1,
    key: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore, temporibus cum ea tempora illo harum aliquid dolor reprehenderit obcaecati iusto, nemo ipsa et? Vero beatae fuga harum asperiores?',
    time: '10 mins ago',
    isRead: false,
    value:
      '  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore, temporibus cum ea tempora illo harum aliquid dolor reprehenderit nemo ipsa et? Vero beatae fuga harum asperiores?',
  },
  {
    id: 2,
    key: 'temporibus sum dolor sit, amet consectetur adipisicing elit. Tempore,  cum ea tempora illo harum aliquid dolor reprehenderit nemo ipsa et? Vero beatae fuga harum velit similique asperiores?',
    time: '10 mins ago',
    isRead: false,
    value:
      'temporibus sum dolor sit, amet consectetur adipisicing elit. Tempore,  cum ea tempora illo harum aliquid dolor reprehenderit obcaecati iusto, nemo ipsa et? Vero beatae fuga harum velit similique asperiores?',
  },
  {
    id: 3,
    key: 'fuga harum Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo ipsa et? Vero beatae velit similique asperiores?',
    time: '10 mins ago',
    isRead: false,
    value:
      'fuga harum Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo ipsa et? Vero beatae velit similique asperiores?',
  },
  {
    id: 4,
    key: 'Tempore, temporibus cum ea tempora illo harum aliquid dolor reprehenderit obcaecati iusto, nemo ipsa et? Vero beatae fuga harum velit similique asperiores?',
    time: '10 mins ago',
    isRead: false,
    value:
      '  Tempore, temporibus cum ea tempora illo harum aliquid dolor reprehenderit obcaecati iusto, nemo ipsa et? Vero beatae fuga harum velit similique asperiores?',
  },
  {
    id: 5,
    key: 'Lorem ipsum dolor sit, obcaecati iusto consectetur adipisicing elit. Tempore, temporibus cum ea tempora illo harum aliquid dolor reprehenderit  nemo ipsa et? ',
    time: '10 mins ago',
    isRead: false,
    value:
      '  Lorem ipsum dolor sit, obcaecati iusto consectetur adipisicing elit. Tempore, temporibus cum ea tempora illo harum aliquid dolor reprehenderit , nemo ipsa et?',
  },
  {
    id: 6,
    key: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore, temporibus cum ea tempora illo harum aliquid dolor reprehenderit obcaecati iusto, nemo ipsa et? ',
    time: '10 mins ago',
    isRead: false,
    value:
      '  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore, temporibus cum ea tempora illo harum aliquid dolor reprehenderit obcaecati iusto, nemo ipsa et?',
  },
  {
    id: 7,
    key: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore, temporibus cum ea tempora illo harum aliquid dolor reprehenderit obcaecati iusto, nemo ipsa et? ',
    time: '10 mins ago',
    isRead: false,
    value:
      '  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore, temporibus cum ea tempora illo harum aliquid dolor reprehenderit obcaecati iusto, nemo ipsa et?',
  },
  {
    id: 8,
    key: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore, temporibus cum ea tempora illo harum aliquid dolor reprehenderit obcaecati iusto, nemo ipsa et? ',
    time: '10 mins ago',
    isRead: false,
    value:
      '  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore, temporibus cum ea tempora illo harum aliquid dolor reprehenderit obcaecati iusto, nemo ipsa et?',
  },
  {
    id: 9,
    key: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore, temporibus cum ea tempora illo harum aliquid dolor reprehenderit obcaecati iusto, nemo ipsa et? ',
    time: '10 mins ago',
    isRead: false,
    value:
      '  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore, temporibus cum ea tempora illo harum aliquid dolor reprehenderit obcaecati iusto, nemo ipsa et?',
  },
  {
    id: 10,
    key: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore, temporibus cum ea tempora illo harum aliquid dolor reprehenderit obcaecati iusto, nemo ipsa et? ',
    time: '10 mins ago',
    isRead: false,
    value:
      '  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore, temporibus cum ea tempora illo harum aliquid dolor reprehenderit obcaecati iusto, nemo ipsa et?',
  },
  {
    id: 11,
    key: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore, temporibus cum ea tempora illo harum aliquid dolor reprehenderit obcaecati iusto, nemo ipsa et? Vero beatae fuga harum velit similique asperiores?',
    time: '10 mins ago',
    isRead: false,
    value:
      '  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore, temporibus cum ea tempora illo harum aliquid dolor reprehenderit obcaecati iusto, nemo ipsa et? Vero beatae fuga harum velit similique asperiores?',
  },
];
