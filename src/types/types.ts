export interface ITeamMembers {
  avatar: string;
  name: string;
  role: string;
  email: string;
}

export interface Surveys {
  title: string;
  dateCreated: string;
  status: string[];
  value: string;
}

export interface CustomerFeedback {
  title: string;
  name: string;
  email: string;
  airpeaceID: number;
  gender: string;
  nationality: string;
}

export interface TotalUsersRegistered {
  userID: string;
  name: string;
  email: string;
  dateRegistered: string;
  tier: string;
  status: string;
  lastLogin: string;
  totalBookedFlights: number;
  milesAccumulated: string;
}

export interface TicketsPurchasedViaApp {
  transactionID: string;
  userID: string;
  name: string;
  email: string;
  dateOfPurchase: string;
  itemPurchased: string;
  amount: number;
  paymentMethod: string;
  status: string;
}

export interface TotalRevenue {
  revenueID: string;
  date: string;
  source: string;
  amount: number;
  paymentMethod: string;
  channel: string;
  country: string;
  currency: string;
  transactionCount: number;
}

interface CountryPopulation {
  country: string;
  population: number;
}
interface DeviceType {
  deviceType: string;
  count: number;
}
export interface ActiveUsers {
  monthYear: string;
  totalActiveUsers: number;
  newRegistration: number;
  returningUsers: number;
  churnRate: number;
  totalSessions: number;
  averageSessionDuration: string;
  geographicalDistribution: CountryPopulation[];
  deviceDistribution: DeviceType[];
}
export interface Args<T> {
  data?: T[];
  sortBy?: keyof T;
  direction?: 'asc' | 'desc';
  disabled?: boolean;
}

export interface GraphValues {
  name: string;
  value: number;
}

export interface CustomerInfomation {
  avatar: string;
  title: string;
  name: string;
  email: string;
  nationality: string;
  airpeaceID: number;
}
