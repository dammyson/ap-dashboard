import { TicketsPurchasedViaApp } from '@/types/types';
import { ColumnType } from 'antd/es/table';
import clsx from 'clsx';
import { useMemo } from 'react';

export const UseTicketsPurchased = () => {
  const tableColumns = useMemo(() => {
    return [
      {
        title: 'TRANSACTION ID',
        dataIndex: 'transactionID',
        key: 'transactionID',
        render: (_, { transactionID }) => {
          return <div className='font-semibold'>{transactionID}</div>;
        },
      },
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
        title: 'DATE OF PURCHASE',
        dataIndex: 'dateOfPurchase',
        key: 'dateOfPurchase',
        render: (_, { dateOfPurchase }) => {
          return <div className='text-[#595959]'>{dateOfPurchase}</div>;
        },
      },
      {
        title: 'ITEMS PURCHASED',
        dataIndex: 'itemsPurchased',
        key: 'itemsPurchased',
        render: (_, { itemPurchased }) => {
          return (
            <div className='font-semibold text-[#595959]'>{itemPurchased}</div>
          );
        },
      },
      {
        title: 'AMOUNT',
        dataIndex: 'amount',
        key: 'amount',
        render: (_, { amount }) => {
          return (
            <div className='font-semibold text-[#595959]'>{`$${amount}`}</div>
          );
        },
      },
      {
        title: 'PAYMENT METHOD',
        dataIndex: 'paymentMethod',
        key: 'paymentMethod',
      },
      {
        title: 'STATUS',
        dataIndex: 'status',
        key: 'status',
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
              {status}
            </div>
          );
        },
      },
    ] as ColumnType<TicketsPurchasedViaApp>[];
  }, []);
  return { tableColumns };
};
