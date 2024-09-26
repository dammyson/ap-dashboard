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
            <span>
              {record.created_at
                ? dayjs(record.created_at).format('YYYY-MM-DD hh:mma')
                : '---'}
            </span>
          );
        },
      },
      {
        title: 'USER',
        dataIndex: 'user_name',
        key: 'user_name',
        className: 'user-column',
        render: (_, record) => {
          return (
            <span>
              {record.admin.user_name
                ? record.admin.user_name.split(' ').slice(0, 2).join(' ')
                : '---'}
            </span>
          );
        },
      },
      {
        title: 'ROLE',
        dataIndex: 'role',
        key: 'role',
        className: 'role-column',
        render: (_, record) => {
          return <span> {record.admin.role ? record.admin.role : '---'}</span>;
        },
      },
      {
        title: 'ACTIVITY TYPE',
        dataIndex: 'activity_type',
        key: 'activity_type',
        className: 'activityType-column',
        render: (_, record) => {
          return (
            <span> {record.activity_type ? record.activity_type : '---'}</span>
          );
        },
      },
      {
        title: 'DESCRIPTION',
        dataIndex: 'description',
        key: 'description',
        className: 'description-column',
        render: (_, record) => {
          return (
            <span> {record.description ? record.description : '---'}</span>
          );
        },
      },
      {
        title: 'IP ADDRESS',
        dataIndex: 'ip_address',
        key: 'ip_address',
        className: 'ipaddress-column',
        render: (_, record) => {
          return <span> {record.ip_address ? record.ip_address : '---'}</span>;
        },
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
