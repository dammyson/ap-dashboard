import { Eye } from '@/components/svg/customer/Customer';
import { ColumnType } from 'antd/es/table';
import { useMemo } from 'react';
import { OpenActivity } from '@/pages/activity-log';
import dayjs from 'dayjs';
import { typeActivityLog } from '@/types/types';

export const UseActivivtyLog = (openModal: OpenActivity) => {
  const tableColumns = useMemo(() => {
    return [
      {
        title: 'TIME STAMP',
        dataIndex: 'created_at',
        key: 'created_at',
        className: 'timeStamp-column',
        render: (_, record) => {
          return (
            <span>{dayjs(record.created_at).format('YYYY-MM-DD hh:mma')}</span>
          );
        },
      },
      {
        title: 'USER',
        dataIndex: 'user_name',
        key: 'user_name',
        className: 'user-column',
      },
      {
        title: 'ROLE',
        dataIndex: 'role',
        key: 'role',
        className: 'role-column',
      },
      {
        title: 'ACTIVITY TYPE',
        dataIndex: 'activity_type',
        key: 'activity_type',
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
        dataIndex: 'ip_address',
        key: 'ip_address',
        className: 'ipaddress-column',
      },
      {
        title: 'ACTION',
        dataIndex: 'action',
        key: 'action',
        className: 'action-column',
        render: (_, record) => {
          return (
            <span
              className='cursor-pointer'
              onClick={() => {
                openModal(record);
              }}
            >
              <Eye />
            </span>
          );
        },
      },
    ] as ColumnType<typeActivityLog>[];
  }, []);
  return { tableColumns };
};
