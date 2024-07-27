import { Card } from '@/components/card';
import { Filter } from '@/components/svg/surveys/Surveys';
import { Table } from 'antd';
import { TicketsPurchasedData } from '../data';
import { UseTicketsPurchased } from '@/components/modules/dashboardColumns/ticketsPurchased/tableColumns';

export const TicketsPurchased = () => {
  const { tableColumns } = UseTicketsPurchased();
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
        dataSource={TicketsPurchasedData}
        rootClassName='w-full overflow-x-scroll'
      />
    </Card>
  );
};
