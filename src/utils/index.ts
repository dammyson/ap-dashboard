import { Args } from '@/types/types';

export function convertToUrlString(val: string) {
  return val?.replace(' ', '-').toLowerCase().replace("'", '');
}

export function formatNumber(value: number) {
  return value?.toLocaleString(undefined);
}

export function formatToDollar(value: number) {
  return value?.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export const numberShortener = (value: number) => {
  if (value >= 1000000) {
    const shortenedValue = (value / 1000000).toFixed(1);
    return shortenedValue.endsWith('.0')
      ? `${Math.floor(value / 1000000)}M`
      : `${shortenedValue}M`;
  } else if (value >= 1000) {
    const shortenedValue = (value / 1000).toFixed(1);
    return shortenedValue.endsWith('.0')
      ? `${Math.floor(value / 1000)}K`
      : `${shortenedValue}K`;
  } else {
    return value.toString();
  }
};

export function handleSort<T>({
  direction = 'asc',
  disabled,
  data: _data,
  sortBy,
}: Args<T>) {
  const data = [...(_data ?? [])];

  if (disabled) return data ?? [];

  if (!sortBy)
    return (
      data?.sort((a, b) => {
        if (a < b) return direction === 'desc' ? -1 : 1;
        if (a > b) return direction === 'desc' ? 1 : -1;
        return 0;
      }) ?? []
    );

  return (
    data?.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return direction === 'desc' ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return direction === 'desc' ? 1 : -1;
      return 0;
    }) ?? []
  );
}

export function getInitials(fullName: string) {
  const nameParts = fullName.split(' ');

  return nameParts.map((word) => word.charAt(0)).join('');
}

export const convertToMinutes = (val: string) => {
  const splitedVal = val.split(' ');
  const numberVal = Number(splitedVal[0]);
  const period = splitedVal[1];
  const minutesPerDay = 24 * 60;
  const minutesPerWeek = 7 * minutesPerDay;
  if (period === 'day' || period === 'days') {
    return numberVal * minutesPerDay;
  } else if (period === 'week' || period === 'weeks') {
    return numberVal * minutesPerWeek;
  } else if (period === 'month') {
    const currentDate = new Date();
    const currentMonthDays = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    ).getDate();
    return numberVal * currentMonthDays * minutesPerDay;
  }
  return numberVal;
};
