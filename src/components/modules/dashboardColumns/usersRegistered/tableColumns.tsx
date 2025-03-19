import { TotalUsersRegistered } from '@/types/types';
import { capitalizeFirstLetter, renderValue } from '@/utils';
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
          return <div className='font-semibold'>{renderValue(id)}</div>;
        },
      },
      {
        title: ' NAME',
        dataIndex: '',
        key: '',
        className: 'name',
        render: (_, record) => {
          return (
            <div>
              {record.user_first_name && record.user_last_name
                ? `${record.user_first_name} ${record.user_last_name}`
                : '---'}
            </div>
          );
        },
      },
      {
        title: 'EMAIL',
        dataIndex: 'email',
        key: 'email',
        className: 'email',
        render: (_, { email }) => {
          return <div>{renderValue(email)}</div>;
        },
      },
      {
        title: 'DATE REGISTERED',
        dataIndex: 'date_registered',
        key: 'date_registered',
        className: 'date-registered',
        render: (_, { date_registered }) => {
          return (
            <div>
              {date_registered
                ? dayjs(date_registered).format('DD-MM-YYYY')
                : '---'}
            </div>
          );
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
              {renderValue(tier)}
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
                status === 'active'
                  ? 'text-light-blue-main'
                  : status === 'inactive' || status === null
                    ? 'text-light-secondary-red'
                    : '',
                'font-semibold',
              )}
            >
              {status === 'active'
                ? capitalizeFirstLetter(status)
                : status === null
                  ? 'Inactive'
                  : '---'}
            </div>
          );
        },
      },
      {
        title: 'LAST LOGIN',
        dataIndex: 'last_login',
        key: 'last_login',
        className: 'last-login',
        render: (_, { last_login }) => {
          return (
            <div>
              {last_login ? dayjs(last_login).format('DD-MM-YYYY') : '---'}
            </div>
          );
        },
      },
      {
        title: 'TOTAL FLIGHTS BOOKED',
        dataIndex: 'total_booked_flight',
        key: 'total_booked_flight',
        className: 'total-booked-flight',
        render: (_, { total_booked_flight }) => {
          return <div>{renderValue(total_booked_flight)}</div>;
        },
      },
      {
        title: 'MILES ACCUMULATED',
        dataIndex: 'miles_accumulated',
        key: 'miles_accumulated',
        className: 'miles-accumulated',
        render: (_, { miles_accumulated }) => {
          return <div>{renderValue(miles_accumulated)}</div>;
        },
      },
    ] as ColumnType<TotalUsersRegistered>[];
  }, []);
  return { tableColumns };
};
