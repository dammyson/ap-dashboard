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
  is_published: number;
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
  option_text: string;
  value: string;
}

export interface SurveyQuestion {
  id: string;
  question_text: string;
  is_multiple_choice: number;
  options: SurveyOption[];
}
export interface CreateSurvey {
  title: string;
  duration_of_survey: number;
  points_awarded: number;
  questions: SurveyQuestion[];
}

export interface FilterSurveyTable {
  title?: string;
  startDate?: string;
  endDate?: string;
}
