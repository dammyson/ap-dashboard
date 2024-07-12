import { ColumnType } from 'antd/es/table';
import { useMemo } from 'react';
import { Button } from '../../../components/button';
import { Surveys } from '@/types/types';
import clsx from 'clsx';
import { Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { convertToUrlString } from '@/utils';

export const useSurveyColumn = () => {
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
                  navigate(
                    `/surveys-feedback/${convertToUrlString(record.value)}`,
                  );
                }}
                className='!bg-[#C7C7CC] min-w-[108px] hover:!bg-[#bababe]'
              />

              <Button
                buttonText={
                  record.status.includes('Active') ? 'Unpublish' : 'Publish'
                }
                onClick={() => console.warn('published', record)}
                className='!bg-[#C7C7CC] min-w-[108px] hover:!bg-[#bababe]'
              />
              <Button
                buttonText='Delete'
                onClick={() => console.warn('deleted', record)}
                className='!bg-[#C7C7CC] min-w-[108px] hover:!bg-[#bababe]'
              />
            </>
          </Space>
        ),
      },
    ] as ColumnType<Surveys>[];
  }, []);

  return { tableColumns };
};
