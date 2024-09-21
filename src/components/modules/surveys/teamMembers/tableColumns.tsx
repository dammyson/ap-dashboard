import { ColumnType } from 'antd/es/table';
import { useMemo } from 'react';
import { ITeamMembers } from '@/types/types';
import { Button } from '@/components/button';
import { CircularArrow, Remove } from '@/components/svg/settings/Settings';
import clsx from 'clsx';
import { ModalStateSetter } from '@/components/modules/surveys/tableColumns';

export const useTeamMembersColumn = (
  setRemoveTeamMember: ModalStateSetter,
  setUpdateTeamMember: ModalStateSetter,
) => {
  const tableColumns = useMemo(() => {
    return [
      {
        dataIndex: 'image_url',
        key: 'image_url',
        width: 100,
        render: (_, record) => (
          <img
            src={record.avatar}
            alt='profile image'
            className={clsx('w-8 h-8 rounded-full')}
          />
        ),
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
        render: (_) => (
          <Button
            buttonText='Remove'
            onClick={() => {
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
        render: (_) => (
          <Button
            buttonText='Update'
            onClick={() => {
              setUpdateTeamMember(true);
            }}
            mode='text'
            trailingIcon={<CircularArrow />}
          />
        ),
      },
    ] as ColumnType<ITeamMembers>[];
  }, []);

  return { tableColumns };
};
