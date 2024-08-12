import { CustomerActivityLog } from '@/types/types';
import { ColumnType } from 'antd/es/table';
import { useMemo } from 'react';

export const useCustomerActivityLog = () => {
  const tableColumns = useMemo(() => {
    return [
      {
        title: 'DATE',
        dataIndex: 'date',
        key: 'date',
        className: 'date',
        render: (_, { date }) => {
          return (
            <div className='font-semibold text-light-primary-deep_black'>
              {date}
            </div>
          );
        },
      },
      {
        title: 'ACTIVITY TYPE',
        dataIndex: 'activityType',
        key: 'activityType',
        className: 'activityType',
        render: (_, { activityType }) => {
          return (
            <div className='font-semibold text-light-primary-deep_black'>
              {activityType}
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
