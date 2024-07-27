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
        width: 392,
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
        width: 392,
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
        width: 392,
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
