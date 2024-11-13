import { ColumnType } from 'antd/es/table';
import { useMemo } from 'react';
import { Button } from '../../../components/button';
import { SurveyType } from '@/types/types';
import clsx from 'clsx';
import { Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

export type ModalStateSetter = React.Dispatch<React.SetStateAction<boolean>>;
export const useSurveyColumn = (
  setSurveyModal: ModalStateSetter,
  setisPublished: React.Dispatch<React.SetStateAction<boolean | undefined>>,
  setViewDelete: ModalStateSetter,
  setSurveyId: React.Dispatch<React.SetStateAction<number | undefined>>,
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>,
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
                <span>{record.is_published ? 'Published' : 'Draft'}</span>
              )}

              <span
                className={clsx(
                  record.is_active
                    ? 'text-light-blue-main'
                    : record.is_completed
                      ? 'text-light-secondary-mint_green'
                      : '',
                  'ml-3',
                )}
              >
                {record.is_active
                  ? 'Active'
                  : record.is_completed
                    ? 'Completed'
                    : ''}
              </span>
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
                buttonText={!record.is_published ? 'Edit' : 'View Result'}
                onClick={() => {
                  if (!record.is_published) {
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
                buttonText={record.is_published ? 'Unpublish' : 'Publish'}
                onClick={() => {
                  if (record.is_active && record.is_published) {
                    setIsActive(record?.is_active);
                  } else setIsActive(false);
                  setisPublished(record?.is_published);
                  setSurveyId(record?.id);
                  setSurveyModal(true);
                }}
                className='!bg-[#C7C7CC] min-w-[105px] !px-0 hover:!bg-[#bababe]'
              />
              <Button
                buttonText='Delete'
                onClick={() => {
                  if (record.is_active && record.is_published) {
                    setIsActive(record?.is_active);
                  } else setIsActive(false);
                  setSurveyId(record?.id);
                  setViewDelete(true);
                  console.log(record);
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
