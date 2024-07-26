import { ColumnType } from 'antd/es/table';
import { useMemo } from 'react';
import { CustomerInfomation } from '@/types/types';
import clsx from 'clsx';
import { Trophy } from '@/components/svg/surveys/Surveys';
import { Eye } from '@/components/svg/customer/Customer';
import { ModalStateSetter } from '../../surveys/tableColumns';
import { useNavigate } from 'react-router';

export const useCustomerInformation = (setAwardPoints: ModalStateSetter) => {
  const navigate = useNavigate();
  const tableColumns = useMemo(() => {
    return [
      {
        dataIndex: 'avatar',
        key: 'avatar',
        width: 100,
        render: (_, record) => (
          <img
            src={record.avatar}
            alt='profile image'
            className={clsx('w-10 h-10 rounded-full')}
          />
        ),
      },
      { title: 'TITLE', dataIndex: 'title', key: 'title' },
      {
        title: 'NAME',
        dataIndex: 'name',
        key: 'name',
      },
      { title: 'EMAIL', dataIndex: 'email', key: 'email' },
      {
        title: 'NATIONALITY',
        dataIndex: 'nationality',
        key: 'nationality',
        render: (_, { nationality }) => {
          return <span className='font-semibold'>{nationality}</span>;
        },
      },
      {
        title: 'AIRPEACE ID',
        dataIndex: 'airpeaceID',
        key: 'airpeaceID',
        render: (_, { airpeaceID }) => {
          return (
            <span className='text-light-blue-main font-semibold'>
              {airpeaceID}
            </span>
          );
        },
      },

      {
        title: 'ACTIONS',
        dataIndex: '',
        key: '',
        render: (_, record) => (
          <div className='flex gap-2 items-center'>
            <span
              className='cursor-pointer'
              onClick={() => (
                navigate(`/customer-view/${record.title}/${record.name}`),
                console.warn(record, 'viewed')
              )}
            >
              {<Eye />}
            </span>
            <span
              className='cursor-pointer'
              onClick={() => {
                setAwardPoints(true), console.warn(record, 'awarded');
              }}
            >
              {<Trophy />}
            </span>
          </div>
        ),
      },
    ] as ColumnType<CustomerInfomation>[];
  }, []);

  return { tableColumns };
};
