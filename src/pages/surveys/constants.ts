import { PanelNavigationItem } from '@/components/Panel';
import { RoleOption } from '../settings/profile';

export const SurveyHeaders: PanelNavigationItem[] = [
  { title: 'Question', id: 'question ' },
  { title: 'Option format', id: 'option format' },
];

export const OtherList: PanelNavigationItem[] = [
  { title: 'Duration of survey', id: 'duration of survey ' },
  { title: 'Points awarded (optional)', id: 'points awarded (optional)' },
];

export const Options: RoleOption[] = [
  { label: '5 Minutes', value: '5 Minutes' },
  { label: '10 Minutes', value: '10 Minutes' },
  { label: '15 Minutes', value: '15 Minutes' },
];

export const AwardOptions: RoleOption[] = [
  { label: '20 Points', value: '20 points' },
  { label: '30 Points', value: '30 points' },
  { label: '40 Points', value: '40 points' },
];

export const questionOption: RoleOption[] = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
];
