import { TotalRevenueType } from '@/types/types';
import { formatCurrency, renderValue } from '@/utils';
import { ColumnType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useMemo } from 'react';

export const UseTotalRevenue = () => {
  const tableColumns = useMemo(() => {
    return [
      {
        title: 'REVENUE ID',
        dataIndex: 'revenueID',
        key: 'id',
        className: 'revenue-id',
        render: (_, { id }) => {
          return <div className='font-semibold'>{renderValue(id)}</div>;
        },
      },
      {
        title: 'DATE',
        dataIndex: 'date',
        key: 'created_at',
        className: 'date',
        render: (_, { created_at }) => {
          return (
            <div>
              {created_at ? dayjs(created_at).format('DD-MM-YYYY') : '---'}
            </div>
          );
        },
      },
      {
        title: 'SOURCE',
        dataIndex: 'source',
        key: 'transaction_type',
        className: 'source',
        render: (_, { transaction_type }) => {
          return (
            <div className='font-semibold text-[#595959]'>
              {renderValue(transaction_type)}
            </div>
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
              {amount ? ` ${formatCurrency(Number(amount))}` : '---'}
            </div>
          );
        },
      },
      {
        title: 'PAYMENT METHOD',
        dataIndex: 'paymentMethod',
        key: 'payment_method',
        className: 'payment-method',
        render: (_, { payment_method }) => {
          return (
            <div className='text-[#595959]'>{renderValue(payment_method)}</div>
          );
        },
      },
      {
        title: 'CHANNEL',
        dataIndex: 'channel',
        key: 'channel',
        className: 'channel',
        render: (_, { channel }) => {
          return <div>{renderValue(channel)}</div>;
        },
      },
      {
        title: 'COUNTRY',
        dataIndex: 'country',
        key: 'country',
        className: 'country',
        render: (_, { country }) => {
          return <div>{renderValue(country)}</div>;
        },
      },
      {
        title: 'CURRENCY',
        dataIndex: 'currency',
        key: 'currency',
        className: 'currency',
        render: (_, { currency }) => {
          return <div>{renderValue(currency)}</div>;
        },
      },
      // {
      //   title: 'TRANSACTION COUNT',
      //   dataIndex: 'transactionCount',
      //   key: 'transactionCount',
      // },
    ] as ColumnType<TotalRevenueType>[];
  }, []);
  return { tableColumns };
};
