import { ColumnType } from 'antd/es/table';
import { useMemo } from 'react';
import { TeamMembers } from '@/types/types';
import { Button } from '@/components/button';
import { CircularArrow, Remove } from '@/components/svg/settings/Settings';
import clsx from 'clsx';
import { ModalStateSetter } from '@/components/modules/surveys/tableColumns';
import { Avatar } from '@/components/avatar/Avatar';
import { useGetColorByChar } from '@/hooks/useGetColorByChar';
import { getActualImageUrl, getInitials } from '@/utils';
import { useUser } from '@/context/AppContext';

export const useTeamMembersColumn = (
  setRemoveTeamMember: ModalStateSetter,
  setUpdateTeamMember: ModalStateSetter,
  setNewRole: (role: string) => void,
  setEmail: (email: string) => void,
  setId: (id: number) => void,
) => {
  const { getColor } = useGetColorByChar();
  const { user, setAccessDenied } = useUser();

  const tableColumns = useMemo(() => {
    return [
      {
        dataIndex: 'image_url',
        key: 'image_url',
        width: 100,
        render: (_, record) => {
          const actualImageUrl = getActualImageUrl(record.image_url_link);
          const shouldShowImage =
            actualImageUrl &&
            actualImageUrl !== 'https://srv575046.hstgr.cloud/storage/' &&
            actualImageUrl !== 'http://127.0.0.1:8000/storage/';

          return shouldShowImage ? (
            <div className='rounded-full overflow-hidden w-8 h-8 aspect-square'>
              <img
                src={actualImageUrl}
                alt='profile image'
                className={clsx('w-full h-full object-cover')}
              />
            </div>
          ) : (
            <Avatar
              getBackgroundColor={getColor}
              size={36}
              initials={
                record.user_name ? getInitials(record.user_name) : undefined
              }
            />
          );
        },
      },
      {
        dataIndex: 'user_name',
        key: 'user_name',
      },
      {
        dataIndex: 'role',
        key: 'role',
        className: 'role',
      },
      {
        dataIndex: 'email',
        key: 'email',
      },
      {
        dataIndex: 'remove',
        key: 'remove',
        className: 'remove-member',
        render: (_, { id }) => (
          <Button
            buttonText='Remove'
            onClick={() => {
              if (user?.role === 'sub-admin') {
                setAccessDenied(true);
                return;
              }
              setId(id);
              setRemoveTeamMember(true);
            }}
            mode='text'
            trailingIcon={<Remove />}
          />
        ),
      },
      {
        dataIndex: 'update',
        key: 'update',
        className: 'update-member',
        render: (_, record) => (
          <Button
            buttonText='Update'
            onClick={() => {
              if (user?.role === 'sub-admin') {
                setAccessDenied(true);
                return;
              }
              setUpdateTeamMember(true);
              setEmail(record.email);
              record.role === 'Admin'
                ? setNewRole('Sub-admin')
                : setNewRole('Admin');
            }}
            mode='text'
            trailingIcon={<CircularArrow />}
          />
        ),
      },
    ] as ColumnType<TeamMembers>[];
  }, []);

  return { tableColumns };
};
