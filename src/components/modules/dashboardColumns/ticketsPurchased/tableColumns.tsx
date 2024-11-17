import { TicketsPurchasedViaApp } from '@/types/types';
import { formatCurrency } from '@/utils';
import { ColumnType } from 'antd/es/table';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useMemo } from 'react';

export const UseTicketsPurchased = () => {
  const tableColumns = useMemo(() => {
    return [
      {
        title: 'TRANSACTION ID',
        dataIndex: 'id',
        key: 'id',
        className: 'transaction-id',
        render: (_, { id }) => {
          return <div className='font-semibold'>{id}</div>;
        },
      },
      {
        title: 'USER ID',
        dataIndex: 'userID',
        key: 'user_id',
        className: 'user-id',
        render: (_, { user_id }) => {
          return <div className='font-semibold'>{user_id}</div>;
        },
      },
      {
        title: ' NAME',
        dataIndex: '',
        key: '',
        className: 'name',
        render: (_, record) => {
          return (
            <div>{`${record.user.first_name} ${record.user.last_name}`}</div>
          );
        },
      },
      {
        title: 'EMAIL',
        dataIndex: '',
        key: '',
        className: 'email',
        render: (_, { user }) => {
          return <div>{`${user.email}`}</div>;
        },
      },
      {
        title: 'DATE OF PURCHASE',
        dataIndex: 'created_at',
        key: 'created_at',
        className: 'date-of-purchase',
        render: (_, { created_at }) => {
          return (
            <div className='text-[#595959]'>
              {dayjs(created_at).format('DD-MM-YYYY')}
            </div>
          );
        },
      },
      {
        title: 'ITEMS PURCHASED',
        dataIndex: 'ticket_type',
        key: 'ticket_type',
        className: 'tickets-purchased',
        render: (_, { ticket_type }) => {
          return (
            <div className='font-semibold text-[#595959]'>{ticket_type}</div>
          );
        },
      },
      {
        title: 'AMOUNT',
        dataIndex: 'amount',
        key: 'amount',
        className: 'amount',
        render: (_, { amount }) => {
          return (
            <div className='font-semibold text-[#595959]'>
              {formatCurrency(Number(amount))}
            </div>
          );
        },
      },
      {
        title: 'PAYMENT METHOD',
        dataIndex: 'paymentMethod',
        key: 'paymentMethod',
        className: 'payment-method',
        render: (_, { paymentMethod }) => {
          return <div>{paymentMethod ? paymentMethod : '---'}</div>;
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
                status === 'Completed'
                  ? 'text-light-blue-main'
                  : status === 'Pending'
                    ? 'text-light-secondary-orange'
                    : status === 'Canceled'
                      ? 'text-light-secondary-red'
                      : '',
                'font-medium',
              )}
            >
              {status ? status : '---'}
            </div>
          );
        },
      },
    ] as ColumnType<TicketsPurchasedViaApp>[];
  }, []);
  return { tableColumns };
};
