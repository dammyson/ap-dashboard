import { ColumnType } from 'antd/es/table';
import { useMemo } from 'react';
import { Button } from '../../../components/button';
import { SurveyType } from '@/types/types';
import clsx from 'clsx';
import { Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

export type ModalStateSetter = (value: boolean) => void;
export const useSurveyColumn = (
  setSurveyModal: ModalStateSetter,
  setisPublished: (value: number) => void,
  setDeleteSurvey: ModalStateSetter,
  setSurveyId: (id: number) => void,
) => {
  const navigate = useNavigate();
  const tableColumns = useMemo(() => {
    return [
      {
        title: 'TITLE',
        dataIndex: 'title',
        key: 'title',
        className: 'title-column',
      },
      {
        title: 'DATE CREATED',
        dataIndex: 'created_at',
        key: 'created_at',
        className: 'dateCreated-column',
        render: (_, record) => {
          return (
            <div>
              {record && (
                <span>{dayjs(record.created_at).format('YYYY-MM-DD')}</span>
              )}
            </div>
          );
        },
      },
      {
        title: 'STATUS',
        dataIndex: 'is_published',
        key: 'is_published',
        className: 'status-column',
        render: (_, record) => {
          return (
            <div>
              {record && (
                <span>{record.is_published === 1 ? 'Published' : 'Draft'}</span>
              )}
              {record.is_active && (
                <span
                  className={clsx(
                    record.is_active
                      ? 'text-light-blue-main'
                      : !record.is_active
                        ? 'text-light-secondary-mint_green'
                        : '',
                    'ml-3',
                  )}
                >
                  {record.is_active ? 'Active' : 'Completed'}
                </span>
              )}
            </div>
          );
        },
      },
      {
        title: 'ACTION',
        dataIndex: '',
        key: 'action',
        className: 'action-column',
        render: (_, record) => (
          <Space size='middle'>
            <>
              <Button
                buttonText={record.is_published !== 1 ? 'Edit' : 'View Result'}
                onClick={() => {
                  if (record.is_published !== 1) {
                    navigate(`/surveys-edit/${record.title}/${record.id}`);
                  } else {
                    navigate(
                      `/surveys-view-result/${record.title}/${record.id}`,
                    );
                  }
                }}
                className='!bg-[#C7C7CC] min-w-[105px] !px-0 hover:!bg-[#bababe]'
              />

              <Button
                buttonText={record.is_published === 1 ? 'Unpublish' : 'Publish'}
                onClick={() => {
                  setSurveyModal(true);
                  setSurveyId(record?.id);
                  setisPublished(record?.is_published);
                }}
                className='!bg-[#C7C7CC] min-w-[105px] !px-0 hover:!bg-[#bababe]'
              />
              <Button
                buttonText='Delete'
                onClick={() => {
                  setDeleteSurvey(true);
                }}
                className='!bg-[#C7C7CC] min-w-[105px] !px-0 hover:!bg-[#bababe]'
              />
            </>
          </Space>
        ),
      },
    ] as ColumnType<SurveyType>[];
  }, []);

  return { tableColumns };
};
