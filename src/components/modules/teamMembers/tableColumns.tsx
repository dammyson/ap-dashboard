import { ColumnType } from 'antd/es/table';
import { useMemo } from 'react';
import { ITeamMembers } from '@/types/types';
import { Button } from '../../../components/button';
import { Remove } from '../../../components/svg/settings/Settings';

export const useTeamMembersColumn = () => {
  const tableColumns = useMemo(() => {
    return [
      {
        title: '',
        dataIndex: 'avatar',
        key: 'avatar',
      },
      {
        title: '',
        dataIndex: 'firstName',
        key: 'firstName',
      },
      {
        title: '',
        dataIndex: 'lastName',
        key: 'lastName',
      },
      {
        title: '',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '',
        dataIndex: '',
        key: '',
        render: (_, record) => (
          <Button
            buttonText='Remove'
            onClick={() => console.warn('removed', record)}
            mode='text'
            trailingIcon={<Remove />}
          />
        ),
      },
    ] as ColumnType<ITeamMembers>[];
  }, []);

  return { tableColumns };
};
