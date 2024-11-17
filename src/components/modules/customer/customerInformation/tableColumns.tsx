import { ColumnType } from 'antd/es/table';
import { useMemo } from 'react';
import { CustomerInfomation } from '@/types/types';
import { Trophy } from '@/components/svg/surveys/Surveys';
import { Eye } from '@/components/svg/customer/Customer';
import { ModalStateSetter } from '../../surveys/tableColumns';
import { useNavigate } from 'react-router';
import { convertToUrlString, getInitials } from '@/utils';
import { Avatar } from '@/components/avatar/Avatar';
import { useGetColorByChar } from '@/hooks/useGetColorByChar';

export const useCustomerInformation = (
  setIsModalOpen: ModalStateSetter,
  setUserId: React.Dispatch<React.SetStateAction<number | null>>,
) => {
  const navigate = useNavigate();
  const { getColor } = useGetColorByChar();
  const tableColumns = useMemo(() => {
    return [
      {
        dataIndex: 'avatar',
        key: 'image_url_link',
        className: 'avatar',
        render: (_, record) => {
          const userName = `${record.user_first_name} ${record.user_last_name}`;
          return (
            <>
              {record.image_url_link &&
              record.image_url_link !==
                'https://srv575046.hstgr.cloud/storage/' ? (
                <div className='w-10 h-10 rounded-full overflow-hidden aspect-square'>
                  <img
                    src={record.image_url_link}
                    alt='profile image'
                    className='w-full h-full object-cover cursor-pointer'
                  />
                </div>
              ) : (
                <Avatar
                  getBackgroundColor={getColor}
                  textClassName='text-base w-full'
                  className='w-10 h-10'
                  size={40}
                  initials={record ? getInitials(userName) : undefined}
                />
              )}
            </>
          );
        },
      },
      {
        title: 'TITLE',
        dataIndex: 'title',
        key: 'title',
        className: 'title',
        render: (_, record) => <div>{record.title ? record.title : '---'}</div>,
      },
      {
        title: 'NAME',
        dataIndex: 'name',
        key: 'name',
        className: 'name',
        render: (_, record) => (
          <div>{`${record.user_first_name} ${record.user_last_name}`}</div>
        ),
      },
      { title: 'EMAIL', dataIndex: 'email', key: 'email', className: 'email' },
      {
        title: 'NATIONALITY',
        dataIndex: 'nationality',
        key: 'nationality',
        className: 'nationality',
        render: (_, { nationality }) => {
          return (
            <span className='font-semibold'>
              {nationality ? nationality : '---'}
            </span>
          );
        },
      },
      {
        title: 'AIRPEACE ID',
        dataIndex: 'peaceID',
        key: 'peaceID',
        className: 'peaceID',
        render: (_, { peace_id }) => {
          return (
            <span className='text-light-blue-main font-semibold'>
              {peace_id ? peace_id : '---'}
            </span>
          );
        },
      },

      {
        title: 'ACTIONS',
        dataIndex: '',
        key: '',
        className: 'action',
        render: (_, { id, title, user_first_name, user_last_name }) => {
          const userName = `${user_first_name} ${user_last_name}`;
          return (
            <div className='flex gap-3 items-center'>
              <span
                className='cursor-pointer'
                onClick={() => {
                  if (id) {
                    navigate(
                      `/customer-view/${id}/${title}/${convertToUrlString(userName)}`,
                    );
                  }
                }}
              >
                {<Eye />}
              </span>
              <span
                className='cursor-pointer'
                onClick={() => {
                  setUserId(id);
                  setIsModalOpen(true);
                }}
              >
                {<Trophy />}
              </span>
            </div>
          );
        },
      },
    ] as ColumnType<CustomerInfomation>[];
  }, []);

  return { tableColumns };
};
