import { Card } from '@/components/card';
import { Filter } from '@/components/svg/surveys/Surveys';
import { Table } from 'antd';
import { ActiveUsersData } from '../data';
import { UseActiveUsers } from '@/components/modules/dashboardColumns/activeUsers/tableColumns';

export const ActiveUsers = () => {
  const { tableColumns } = UseActiveUsers();
  return (
    <Card hasBadge hasHeader trailingIcon1={<Filter />} title='Active Users'>
      <Table
        pagination={false}
        columns={tableColumns}
        dataSource={ActiveUsersData}
        rootClassName='w-full overflow-x-scroll hidden-scrollbar'
      />
    </Card>
  );
};
