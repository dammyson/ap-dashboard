import { ActiveUsers } from '@/types/types';
import { ColumnType } from 'antd/es/table';
import { useMemo } from 'react';

export const UseActiveUsers = () => {
  const tableColumns = useMemo(() => {
    return [
      { title: 'MONTH/YR', dataIndex: 'month year', key: 'month year' },
      {
        title: 'TOTAL ACTIVE USERS',
        dataIndex: 'total active users',
        key: 'total active users',
      },
      {
        title: 'NEW REGISTRATIONS',
        dataIndex: 'new registrations',
        key: 'new registrations',
      },
      {
        title: 'RETURNING USERS',
        dataIndex: 'returning users',
        key: 'returning users',
      },
      { title: 'CHURN RATE', dataIndex: 'churn date', key: 'churn date' },
      {
        title: 'TOTAL SESSIONS',
        dataIndex: 'total sessions',
        key: 'total sessions',
      },
      {
        title: 'AVERAGE SESSION DURATION',
        dataIndex: 'average session duration',
        key: 'average session duration',
      },
      {
        title: 'GEOGRAPHICAL DISTRIBUTION',
        dataIndex: 'geographical distribustion',
        key: 'geographical distribustion',
      },
      {
        title: 'DEVICE DISTRIBUTION',
        dataIndex: 'device distrubution',
        key: '',
      },
    ] as ColumnType<ActiveUsers>[];
  }, []);
  return { tableColumns };
};
