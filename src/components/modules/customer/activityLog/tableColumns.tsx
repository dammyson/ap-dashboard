import { CustomerActivityLog } from '@/types/types';
import { capitalizeFirstLetter } from '@/utils';
import { ColumnType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useMemo } from 'react';

export const useCustomerActivityLog = () => {
  const tableColumns = useMemo(() => {
    return [
      {
        title: 'DATE',
        dataIndex: 'created_at',
        key: 'created_at',
        className: 'date',
        render: (_, { created_at }) => {
          return (
            <div className='font-semibold text-light-primary-deep_black'>
              {dayjs(created_at).format('YYYY-MM-DD')}
            </div>
          );
        },
      },
      {
        title: 'ACTIVITY TYPE',
        dataIndex: 'activity_type',
        key: 'activity_type',
        className: 'activityType',
        render: (_, { activity_type }) => {
          return (
            <div className='font-semibold text-light-primary-deep_black'>
              {capitalizeFirstLetter(activity_type)}
            </div>
          );
        },
      },
      {
        title: 'DESCRIPTION',
        dataIndex: 'description',
        key: 'description',
        className: 'description',
        render: (_, { description }) => {
          return (
            <div className='font-semibold text-light-primary-deep_black'>
              {description}
            </div>
          );
        },
      },
    ] as ColumnType<CustomerActivityLog>[];
  }, []);
  return { tableColumns };
};
