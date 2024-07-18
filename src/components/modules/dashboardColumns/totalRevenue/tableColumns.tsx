import { TotalRevenue } from '@/types/types';
import { ColumnType } from 'antd/es/table';
import { useMemo } from 'react';

export const UseTotalRevenue = () => {
  const tableColumns = useMemo(() => {
    return [
      {
        title: 'REVENUE ID',
        dataIndex: 'revenueID',
        key: 'revenueID',
        render: (_, { revenueID }) => {
          return <div className='font-semibold'>{revenueID}</div>;
        },
      },
      { title: 'DATE', dataIndex: 'date', key: 'date' },
      {
        title: 'SOURCE',
        dataIndex: 'source',
        key: 'source',
        render: (_, { source }) => {
          return <div className='font-semibold text-[#595959]'>{source}</div>;
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
        render: (_, { paymentMethod }) => {
          return <div className='text-[#595959]'>{paymentMethod}</div>;
        },
      },
      { title: 'CHANNEL', dataIndex: 'channel', key: 'channel' },
      { title: 'COUNTRY', dataIndex: 'country', key: 'country' },
      { title: 'CURRENCY', dataIndex: 'currency', key: 'currency' },
      {
        title: 'TRANSACTION COUNT',
        dataIndex: 'transactionCount',
        key: 'transactionCount',
      },
    ] as ColumnType<TotalRevenue>[];
  }, []);
  return { tableColumns };
};
