import { Card } from '@/components/card';
import { Filter } from '@/components/svg/surveys/Surveys';
import { Spin, Table } from 'antd';
import { UseTotalRevenue } from '@/components/modules/dashboardColumns/totalRevenue/tableColumns';
import { TotalRevenueType } from '@/types/types';
import { LoadingOutlined } from '@ant-design/icons';

interface Props {
  isLoading: boolean;
  totalRevenueData: TotalRevenueType[];
}
export const TotalRevenue = ({ isLoading, totalRevenueData }: Props) => {
  const { tableColumns } = UseTotalRevenue();
  const filteredData = [...totalRevenueData].sort(
    (a: TotalRevenueType, b: TotalRevenueType) => {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    },
  );
  return (
    <Card hasBadge hasHeader trailingIcon1={<Filter />} title='Total Revenue'>
      <Table
        pagination={false}
        columns={tableColumns}
        dataSource={filteredData}
        scroll={{ y: 390, x: true }}
        rootClassName=' hidden-scrollbar'
        className='total-revenue-table custom-scrollbar hide-arrows overflow-x-scroll'
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
