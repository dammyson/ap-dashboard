import { Card } from '@/components/card';
import { Filter } from '@/components/svg/surveys/Surveys';
import { Spin, Table } from 'antd';
import { UseTicketsPurchased } from '@/components/modules/dashboardColumns/ticketsPurchased/tableColumns';
import { TicketsPurchasedViaApp } from '@/types/types';
import { LoadingOutlined } from '@ant-design/icons';

interface Props {
  isLoading: boolean;
  ticketsPurchasedData: TicketsPurchasedViaApp[];
}

export const TicketsPurchased = ({
  ticketsPurchasedData,
  isLoading,
}: Props) => {
  const { tableColumns } = UseTicketsPurchased();

  const filteredData = [...ticketsPurchasedData].sort(
    (a: TicketsPurchasedViaApp, b: TicketsPurchasedViaApp) => {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    },
  );
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
        dataSource={filteredData}
        scroll={{ y: 390, x: true }}
        className='tickets-purchased-table custom-scrollbar hide-arrows overflow-x-scroll'
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
