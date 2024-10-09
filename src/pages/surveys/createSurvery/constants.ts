import { PanelNavigationItem } from '@/components/Panel';
import { RoleOption } from '../../settings/profile';

export const OtherList: PanelNavigationItem[] = [
  { title: 'Duration of survey', id: 'duration of survey ' },
  { title: 'Points awarded (optional)', id: 'points awarded (optional)' },
];

export const surveyDuration: RoleOption[] = [
  { label: '1 day', value: '1 day' },
  { label: '5 days', value: '5 days' },
  { label: '1 week', value: '1 week' },
  { label: '14 days', value: '14 days' },
  { label: '1 month', value: '1 month' },
];

export const awardPoints: RoleOption[] = [
  { label: '10 Points', value: 10 },
  { label: '20 Points', value: 20 },
  { label: '30 Points', value: 30 },
  { label: '40 Points', value: 40 },
];
