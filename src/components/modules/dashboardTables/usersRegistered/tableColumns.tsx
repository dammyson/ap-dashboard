import { TotalUsersRegistered } from '@/types/types';
import { ColumnType } from 'antd/es/table';
import { useMemo } from 'react';

export const UseUserRegistered = () => {
  const tableColumns = useMemo(() => {
    return [
      { title: 'USER ID', dataIndex: 'userID', key: 'userID' },
      { title: ' NAME', dataIndex: 'name', key: 'name' },
      { title: 'EMAIL', dataIndex: 'email', key: 'email' },
      {
        title: 'DATE REGISTERED',
        dataIndex: 'date registered',
        key: 'date registered',
      },
      { title: 'TIER', dataIndex: 'tier', key: 'tier' },
      { title: 'STATUS', dataIndex: 'status', key: 'status' },
      { title: 'LAST LOGIN', dataIndex: 'last login', key: 'last login' },
      {
        title: 'TOTAL BOOKED FLIGHTS',
        dataIndex: 'total booked flights',
        key: 'total booked flights',
      },
      {
        title: 'MILES ACCUMULATED',
        dataIndex: 'miles accumulated',
        key: 'miles accumulated',
      },
    ] as ColumnType<TotalUsersRegistered>[];
  }, []);
  return { tableColumns };
};
