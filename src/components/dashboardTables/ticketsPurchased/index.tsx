import { Card } from '@/components/card';
import { Filter } from '@/components/svg/surveys/Surveys';
import { Table } from 'antd';
import { TicketsPurchasedData } from '../data';
import { UseTicketsPurchased } from '@/components/modules/dashboardColumns/ticketsPurchased/tableColumns';
import { TicketsPurchasedViaApp } from '@/types/types';

interface Props {
  ticketsPurchasedData: TicketsPurchasedViaApp[];
}

export const TicketsPurchased = ({ ticketsPurchasedData }: Props) => {
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
        dataSource={ticketsPurchasedData}
        scroll={{ y: 390, x: true }}
        className='tickets-purchased-table custom-scrollbar hide-arrows overflow-x-scroll'
        rootClassName=' hidden-scrollbar'
      />
    </Card>
  );
};
