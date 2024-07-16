import { TotalRevenue } from '@/types/types';
import { ColumnType } from 'antd/es/table';
import { useMemo } from 'react';

export const UseTotalRevenue = () => {
  const tableColumns = useMemo(() => {
    return [
      { title: 'REVENUE ID', dataIndex: 'revenueID', key: 'revenueID' },
      { title: 'DATE', dataIndex: 'date', key: 'date' },
      { title: 'SOURCE', dataIndex: 'source', key: 'source' },
      { title: 'AMOUNT', dataIndex: 'amount', key: 'amount' },
      {
        title: 'PAYMENT METHOD',
        dataIndex: 'payment method',
        key: 'payment method',
      },
      { title: 'CHANNEL', dataIndex: 'channel', key: 'channel' },
      { title: 'COUNTRY', dataIndex: 'country', key: 'country' },
      { title: 'CURRENCY', dataIndex: 'country', key: 'country' },
      {
        title: 'TRANSACTION COUNT',
        dataIndex: 'transaction count',
        key: 'transaction count',
      },
    ] as ColumnType<TotalRevenue>[];
  }, []);
  return { tableColumns };
};
