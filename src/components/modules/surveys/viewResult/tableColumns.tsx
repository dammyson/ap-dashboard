import { ColumnType } from 'antd/es/table';
import { useMemo } from 'react';
import { ViewParticipants } from '@/types/types';
import { Trophy } from '@/components/svg/surveys/Surveys';
import { ModalStateSetter } from '../tableColumns';

export const useViewResultColumn = (setAwardPoints: ModalStateSetter) => {
  const tableColumns = useMemo(() => {
    return [
      { title: 'TITLE', dataIndex: 'title', key: 'title' },
      {
        title: 'NAME',
        dataIndex: 'name',
        key: 'name',
        className: 'table-name-column',
      },
      {
        title: 'EMAIL',
        dataIndex: 'email',
        key: 'email',
        className: 'email-column',
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
      { title: 'GENDER', dataIndex: 'gender', key: 'gender' },
      { title: 'NATIONALITY', dataIndex: 'nationality', key: 'nationality' },
      {
        title: 'ACTIONS',
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
