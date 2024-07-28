import { Eye } from '@/components/svg/customer/Customer';
import { ActivityLog } from '@/types/types';
import { ColumnType } from 'antd/es/table';
import { useMemo } from 'react';
import { OpenActivity } from '@/pages/activity-log';

export const UseActivivtyLog = (openModal: OpenActivity) => {
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
      {
        title: 'DESCRIPTION',
        dataIndex: 'description',
        key: 'description',
        className: 'description-column',
      },
      {
        title: 'IP ADDRESS',
        dataIndex: 'ipaddress',
        key: 'ipaddress',
        className: 'ipaddress-column',
      },
      {
        title: 'ACTION',
        dataIndex: 'action',
        key: 'action',
        render: (_, record) => {
          return (
            <span
              className='cursor-pointer'
              onClick={() => {
                openModal(record), console.warn('view', record);
              }}
            >
              <Eye />
            </span>
          );
        },
      },
    ] as ColumnType<ActivityLog>[];
  }, []);
  return { tableColumns };
};
