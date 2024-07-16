import { TicketsPurchasedViaApp } from '@/types/types';
import { ColumnType } from 'antd/es/table';
import { useMemo } from 'react';

export const UseTicketsPurchased = () => {
  const tableColumns = useMemo(() => {
    return [
      {
        title: 'TRANSACTION ID',
        dataIndex: 'transactionID',
        key: 'transactionID',
      },
      { title: 'USER ID', dataIndex: 'userID', key: 'userID' },
      { title: ' NAME', dataIndex: 'name', key: 'name' },
      { title: 'EMAIL', dataIndex: 'email', key: 'email' },
      {
        title: 'DATE OF PURCHASE',
        dataIndex: 'date of purchase',
        key: 'date of purchase',
      },
      {
        title: 'ITEMS PURCHASED',
        dataIndex: 'items purchased',
        key: 'items purchased',
      },
      { title: 'AMOUNT', dataIndex: 'amount', key: 'amount' },
      {
        title: 'PAYMENT METHOD',
        dataIndex: 'payment method',
        key: 'payment method',
      },
      { title: 'STATUS', dataIndex: 'status', key: 'status' },
    ] as ColumnType<TicketsPurchasedViaApp>[];
  }, []);
  return { tableColumns };
};
