import { ColumnType } from 'antd/es/table';
import { useMemo } from 'react';
import { ViewParticipants } from '@/types/types';
import { Trophy } from '@/components/svg/surveys/Surveys';
import { ModalStateSetter } from '../tableColumns';

export const useViewResultColumn = (setAwardPoints: ModalStateSetter) => {
  const tableColumns = useMemo(() => {
    return [
      {
        title: 'TITLE',
        dataIndex: 'title',
        key: 'title',
        className: 'title',
        render: (_, { title }) => {
          return (
            <div className='text-light-grey-200 text-base font-normal'>
              {title !== null ? title : '---'}
            </div>
          );
        },
      },
      {
        title: 'NAME',
        dataIndex: 'name',
        key: 'name',
        className: 'name',
        render: (_, { first_name, last_name }) => {
          return (
            <span className='text-light-grey-200 text-base font-normal'>
              {`${first_name} ${last_name}`}
            </span>
          );
        },
      },
      {
        title: 'EMAIL',
        dataIndex: 'email',
        key: 'email',
        className: 'email',
      },
      {
        title: 'AIRPEACE ID',
        dataIndex: 'peace_id',
        key: 'peace_id',
        className: 'peaceId',
        render: (_, { peace_id }) => {
          return (
            <span className='text-light-blue-main font-semibold'>
              {peace_id}
            </span>
          );
        },
      },
      {
        title: 'GENDER',
        dataIndex: 'gender',
        key: 'gender',
        className: 'gender',
      },
      {
        title: 'NATIONALITY',
        dataIndex: 'nationality',
        key: 'nationality',
        className: 'nationality',
        render: (_, { nationality }) => {
          return (
            <div className='text-light-grey-200 text-base font-normal'>
              {nationality !== null ? nationality : '---'}
            </div>
          );
        },
      },
      {
        title: 'ACTION',
        dataIndex: '',
        key: '',
        render: (_) => (
          <span className='cursor-pointer' onClick={() => setAwardPoints(true)}>
            {<Trophy />}
          </span>
        ),
      },
    ] as ColumnType<ViewParticipants>[];
  }, []);

  return { tableColumns };
};
