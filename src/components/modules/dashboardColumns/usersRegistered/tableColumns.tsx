import { TotalUsersRegistered } from '@/types/types';
import { ColumnType } from 'antd/es/table';
import clsx from 'clsx';
import { useMemo } from 'react';

export const UseUserRegistered = () => {
  const tableColumns = useMemo(() => {
    return [
      {
        title: 'USER ID',
        dataIndex: 'userID',
        key: 'userID',
        render: (_, { userID }) => {
          return <div className='font-semibold'>{userID}</div>;
        },
      },
      { title: ' NAME', dataIndex: 'name', key: 'name' },
      { title: 'EMAIL', dataIndex: 'email', key: 'email' },
      {
        title: 'DATE REGISTERED',
        dataIndex: 'dateRegistered',
        key: 'dateRegistered',
      },
      {
        title: 'TIER',
        dataIndex: 'tier',
        key: 'tier',
        render: (_, { tier }) => {
          return (
            <div
              className={clsx(
                tier === 'Nomad' ? 'text-light-secondary-mint_green' : '',
                'font-semibold',
              )}
            >
              {tier}
            </div>
          );
        },
      },
      {
        title: 'STATUS',
        dataIndex: 'status',
        key: 'status',
        render: (_, { status }) => {
          return (
            <div
              className={clsx(
                status === 'Active'
                  ? 'text-light-blue-main'
                  : status === 'Inactive'
                    ? 'text-light-secondary-red'
                    : '',
                'font-semibold',
              )}
            >
              {status}
            </div>
          );
        },
      },
      { title: 'LAST LOGIN', dataIndex: 'lastLogin', key: 'lastLogin' },
      {
        title: 'TOTAL BOOKED FLIGHTS',
        dataIndex: 'totalBookedFlights',
        key: 'totalBookedFlights',
      },
      {
        title: 'MILES ACCUMULATED',
        dataIndex: 'milesAccumulated',
        key: 'milesAccumulated',
      },
    ] as ColumnType<TotalUsersRegistered>[];
  }, []);
  return { tableColumns };
};
