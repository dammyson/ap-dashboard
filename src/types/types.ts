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
}

export interface CustomerFeedback {
  title: string;
  name: string;
  email: string;
  airpeaceID: number;
  gender: string;
  nationality: string;
}
