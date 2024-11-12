import { Card } from '@/components/card';
import { UseUserRegistered } from '@/components/modules/dashboardColumns/usersRegistered/tableColumns';
import { Filter } from '@/components/svg/surveys/Surveys';
import { Spin, Table } from 'antd';
import { TotalUsersRegistered } from '@/types/types';
import { LoadingOutlined } from '@ant-design/icons';

interface Props {
  registeredUsersData: TotalUsersRegistered[];
  isLoading: boolean;
}
export const UsersRegistered = ({ registeredUsersData, isLoading }: Props) => {
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
        dataSource={registeredUsersData}
        scroll={{ y: 390, x: true }}
        className='registered-users-table custom-scrollbar hide-arrows overflow-x-scroll'
        rootClassName=' hidden-scrollbar'
        loading={{
          spinning: isLoading,
          indicator: (
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
            />
          ),
        }}
      />
    </Card>
  );
};
