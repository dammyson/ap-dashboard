import { ColumnType } from 'antd/es/table';
import { useMemo } from 'react';
import { Button } from '../../../components/button';
import { Surveys } from '@/types/types';
import clsx from 'clsx';
import { Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { convertToUrlString } from '@/utils';

export type ModalStateSetter = (value: boolean) => void;

export const useSurveyColumn = (
  setEditSurvey: ModalStateSetter,
  setPublishSurvey: ModalStateSetter,
  setUnpublishSurvey: ModalStateSetter,
  setDeleteSurvey: ModalStateSetter,
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
        dataIndex: 'dateCreated',
        key: 'dateCreated',
        className: 'dateCreated-column',
      },
      {
        title: 'STATUS',
        dataIndex: 'status',
        key: 'status',
        className: 'status-column',
        render: (_, { status }) => {
          const [firstStatus, secondStatus] = status;
          return (
            <div>
              {firstStatus && <span>{firstStatus}</span>}
              {secondStatus && (
                <span
                  className={clsx(
                    secondStatus === 'Active'
                      ? 'text-light-blue-main'
                      : secondStatus === 'Completed'
                        ? 'text-light-secondary-mint_green'
                        : '',
                    'ml-3',
                  )}
                >
                  {secondStatus}
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
                buttonText={
                  record.status.includes('Draft') ? 'Edit' : 'View Result'
                }
                onClick={() => {
                  if (record.status.includes('Draft')) {
                    setEditSurvey(true);
                  } else {
                    navigate(
                      `/surveys-feedback/${convertToUrlString(record.value)}`,
                    );
                  }
                }}
                className='!bg-[#C7C7CC] min-w-[105px] !px-0 hover:!bg-[#bababe]'
              />

              <Button
                buttonText={
                  record.status.includes('Active') ||
                  record.status.includes('Completed')
                    ? 'Unpublish'
                    : 'Publish'
                }
                onClick={() => {
                  if (
                    record.status.includes('Active') ||
                    record.status.includes('Completed')
                  ) {
                    setUnpublishSurvey(true);
                    console.warn(record, 'about to be unpublished');
                  } else {
                    setPublishSurvey(true);
                    console.warn(record, 'about to be published');
                  }
                }}
                className='!bg-[#C7C7CC] min-w-[105px] !px-0 hover:!bg-[#bababe]'
              />
              <Button
                buttonText='Delete'
                onClick={() => {
                  setDeleteSurvey(true);
                  console.warn(record, 'about to be deleted');
                }}
                className='!bg-[#C7C7CC] min-w-[105px] !px-0 hover:!bg-[#bababe]'
              />
            </>
          </Space>
        ),
      },
    ] as ColumnType<Surveys>[];
  }, []);

  return { tableColumns };
};
