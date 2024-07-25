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
        dataIndex: 'avatar',
        key: 'avatar',
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
        dataIndex: 'name',
        key: 'name',
      },
      {
        dataIndex: 'role',
        key: 'role',
      },
      {
        dataIndex: 'email',
        key: 'email',
      },
      {
        dataIndex: '',
        key: '',
        render: (_, record) => (
          <Button
            buttonText='Remove'
            onClick={() => {
              setRemoveTeamMember(true);
              console.warn('removed', record);
            }}
            mode='text'
            trailingIcon={<Remove />}
          />
        ),
      },
      {
        dataIndex: '',
        key: '',
        render: (_, record) => (
          <Button
            buttonText='Update'
            onClick={() => {
              setUpdateTeamMember(true);
              console.warn('Update', record);
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
