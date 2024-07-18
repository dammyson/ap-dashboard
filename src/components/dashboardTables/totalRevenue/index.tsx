import { Card } from '@/components/card';
import { Filter } from '@/components/svg/surveys/Surveys';
import { Table } from 'antd';
import { TotalRevenueData } from '../data';
import { UseTotalRevenue } from '@/components/modules/dashboardColumns/totalRevenue/tableColumns';

export const TotalRevenue = () => {
  const { tableColumns } = UseTotalRevenue();
  return (
    <Card
      hasBadge
      hasHeader
      trailingIcon1={<Filter />}
      title='Tickets purchased via app'
    >
      <Table
        pagination={false}
        columns={tableColumns}
        dataSource={TotalRevenueData}
      />
    </Card>
  );
};
