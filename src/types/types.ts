export interface TeamMembers {
  image_url_link: string;
  user_name: string;
  role: string;
  email: string;
}

export interface SurveyType {
  id: number;
  title: string;
  created_at: string;
  is_published: boolean;
  is_active: boolean;
  is_completed: boolean;
}

export interface ViewParticipants {
  title: string;
  name: string;
  email: string;
  airpeaceID: number;
  gender: string;
  nationality: string;
}

export interface TotalUsersRegistered {
  id: string;
  user_first_name: string;
  user_last_name: string;
  email: string;
  date_registered: string;
  tier: string;
  status: string;
  last_login: string;
  total_booked_flight: number;
  miles_accumulated: string;
}

export interface TicketsPurchasedViaApp {
  id: string;
  user_id: string;
  created_at: string;
  ticket_type: string;
  amount: number;
  paymentMethod: string;
  status: string;
  user: {
    email: string;
    first_name: string;
    last_name: string;
  };
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
  total_amount: number;
}

export interface CustomerInfomation {
  id: number;
  title: string;
  image_url_link: string;
  user_first_name: string;
  user_last_name: string;
  email: string;
  nationality: string;
  peace_id: number;
}

export interface CustomerActivityLog {
  date: string;
  activityType: string;
  description: string;
}

export interface typeActivityLog {
  created_at: string;
  activity_type: string;
  description: string;
  ip_address: string;
  admin: {
    user_name: string;
    role: string;
  };
}

export interface MutationErrorPayload {
  data: {
    message: string;
    data?: string;
  };
}

export interface Login {
  email: string;
  password: string;
}

export interface User {
  id: number;
  user_name: string;
  created_at: string;
  email: string;
  email_verified_at: string | null;
  image_url_link: string | null;
  otp: string;
  otp_expires_at: string;
  role: string;
  updated_at: string;
  phone_number: string | null;
}

export interface ChangePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
export interface AddAdmins {
  userName: string;
  email: string;
  selectedRole: string;
}
export interface changeAdminRole {
  email: string;
  new_role: string;
}

export interface ViewResult {
  question_text: string;
  options: [
    {
      option_id: number;
      option_text: string;
      votes: number;
      percentage: number;
    },
  ];
}
export interface EditProfile {
  image_url: string | null;
  phone_number: string | null;
}

export interface SurveyOption {
  id: number;
  option_text: string;
  value: string;
}

export interface SurveyQuestion {
  id: number;
  question_text: string;
  is_multiple_choice: number;
  options: SurveyOption[];
}
export interface CreateSurvey {
  title: string;
  image_url: string;
  duration_of_survey: number;
  points_awarded: number;
  is_active: boolean;
  is_published: boolean;
  questions: SurveyQuestion[];
}

export interface FilterSurveyTable {
  title?: string;
  startDate?: string;
  endDate?: string;
}

export interface FilterActivityLog {
  startDate?: string;
  endDate?: string;
}

export interface ResetPassword {
  email: string;
  newPassword: string;
  confirmNewPassword: string;
  otp: string;
}

export interface OverViewCardsType {
  title: string;
  value: number;
  variance: number;
  state: string;
}

export interface OverViewType {
  total_registered_users: {
    total_registered_users_last_seven_days: number;
    percentage: number;
  };
  total_purchased_ticket: {
    ticket7DaysAgo: number;
    percentageChange: number;
  };
  total_revenue: {
    total7daysRevenue: number;
    percentageChange: number;
  };
}

export interface RevenueGraph {
  ticket: {
    ticket_amount: number;
    ticket_data: GraphValues[];
  };
  ancillary: {
    ancillary_amount: number;
    ancillary_data: GraphValues[];
  };
  revenue: {
    revenue_amount: number;
    revenue_data: GraphValues[];
  };
}

export interface CustomerGraphValues {
  total_flight_amount: number;
  flight_booking: GraphValues[];
  app_purchase_amount: number;
  app_purchase: GraphValues[];
  total_revenue_amount: number;
  total_revenue: GraphValues[];
}

export interface AllocatePonit {
  points: number;
  reason: string;
}
