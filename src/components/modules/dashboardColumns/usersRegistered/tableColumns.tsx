import { TotalUsersRegistered } from '@/types/types';
import { ColumnType } from 'antd/es/table';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useMemo } from 'react';

export const UseUserRegistered = () => {
  const tableColumns = useMemo(() => {
    return [
      {
        title: 'USER ID',
        dataIndex: 'id',
        key: 'id',
        className: 'user-id',
        render: (_, { id }) => {
          return <div className='font-semibold'>{id}</div>;
        },
      },
      {
        title: ' NAME',
        dataIndex: '',
        key: '',
        className: 'name',
        render: (_, record) => {
          return (
            <div>{`${record.user_first_name} ${record.user_last_name}`}</div>
          );
        },
      },
      {
        title: 'EMAIL',
        dataIndex: 'email',
        key: 'email',
        className: 'email',
      },
      {
        title: 'DATE REGISTERED',
        dataIndex: 'date_registered',
        key: 'date_registered',
        className: 'date-registered',
        render: (_, { date_registered }) => {
          return <div>{dayjs(date_registered).format('DD-MM-YYYY')}</div>;
        },
      },
      {
        title: 'TIER',
        dataIndex: 'tier',
        key: 'tier',
        className: 'tier',
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
        className: 'status',
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
      {
        title: 'LAST LOGIN',
        dataIndex: 'last_login',
        key: 'last_login',
        className: 'last-login',
      },
      {
        title: 'TOTAL FLIGHTS BOOKED',
        dataIndex: 'total_booked_flight',
        key: 'total_booked_flight',
        className: 'total-booked-flight',
      },
      {
        title: 'MILES ACCUMULATED',
        dataIndex: 'miles_accumulated',
        key: 'miles_accumulated',
        className: 'miles-accumulated',
      },
    ] as ColumnType<TotalUsersRegistered>[];
  }, []);
  return { tableColumns };
};
