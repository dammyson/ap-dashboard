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

export const formatCurrency = (val: number) => {
  return val.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' });
};

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
  const nameParts = fullName.split(' ').slice(0, 2);

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

export const convertFromMinutes = (val: number) => {
  const hoursFromVal = val / 60;
  const daysFromVal = hoursFromVal / 24;

  if (daysFromVal === 1) {
    return `1 day`;
  } else if (daysFromVal === 14) {
    return `14 days`;
  } else if (daysFromVal < 7) {
    return `${Math.floor(daysFromVal)} days`;
  } else if (daysFromVal >= 7 && daysFromVal < 14) {
    return `1 week`;
  } else if (daysFromVal > 14 && daysFromVal < 30) {
    return `${Math.floor(daysFromVal / 7)} weeks`;
  } else if (daysFromVal >= 30 && daysFromVal < 60) {
    return `1 month`;
  } else {
    return `${Math.floor(daysFromVal / 30)} months`;
  }
};

export const maskedEmail = (val: string) => {
  const [name, domain] = val.split('@');
  const slicedName = name.slice(0, name.length / 2);
  const maskedMail = name.length > 3 ? slicedName + '***' + domain : val;
  return maskedMail;
};

export const capitalizeFirstLetter = (val: string) => {
  return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
};

export const renderValue = (val: any) => {
  if (val === 0) {
    return 0;
  }
  return !val || val === 'null' ? '---' : val;
};
