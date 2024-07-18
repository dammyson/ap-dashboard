import { Card } from '@/components/card';
import { UseUserRegistered } from '@/components/modules/dashboardColumns/usersRegistered/tableColumns';
import { Filter } from '@/components/svg/surveys/Surveys';
import { Table } from 'antd';
import { usersRegistered } from '../data';

export const UsersRegistered = () => {
  const { tableColumns } = UseUserRegistered();
  return (
    <Card
      hasBadge
      hasHeader
      trailingIcon1={<Filter />}
      title='Total users registered'
    >
      <Table
        pagination={false}
        columns={tableColumns}
        dataSource={usersRegistered}
      />
    </Card>
  );
};
