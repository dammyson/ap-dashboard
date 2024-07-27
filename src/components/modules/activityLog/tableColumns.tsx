import { ActivityLog } from '@/types/types';
import { ColumnType } from 'antd/es/table';
import { useMemo } from 'react';

export const UseActivivtyLog = () => {
  const tableColumns = useMemo(() => {
    return [
      {
        title: 'TIME STAMP',
        dataIndex: 'timeStamp',
        key: 'timeStamp',
        className: 'timeStamp-column',
      },
      {
        title: 'USER',
        dataIndex: 'user',
        key: 'user',
        className: 'user-column',
      },
      { title: 'ROLE', dataIndex: 'role', key: 'role' },
      {
        title: 'ACTIVITY TYPE',
        dataIndex: 'activityType',
        key: 'activityType',
        className: 'activityType-column',
      },
      { title: 'DESCRIPTION', dataIndex: 'description', key: 'description' },
      {
        title: 'IP ADDRESS',
        dataIndex: 'ipaddress',
        key: 'ipaddress',
        className: 'ipaddress-column',
      },
    ] as ColumnType<ActivityLog>[];
  }, []);
  return { tableColumns };
};
