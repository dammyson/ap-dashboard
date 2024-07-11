import { Card } from '@/components/card';
import { Header } from '@/components/header';
import { AppLayout } from '@/components/layout/AppLayout';
import WelcomeMessage from '@/components/welcomeMessage';
import { BorderRadius, Button, ButtonSize } from '@/components/button';
import { Table } from 'antd';
import { useSurveyColumn } from '@/components/modules/surveys/tableColumns';
import { Filter } from '@/components/svg/surveys/Surveys';

function Surveys() {
  const list = [
    {
      title: 'Customer feedback',
      dateCreated: '2024-05-23',
      status: ['Published', 'Active'],
    },
    {
      title: 'In-flight experience',
      dateCreated: '2024-05-23',
      status: ['Draft'],
    },
    {
      title: 'New route survey',
      dateCreated: '2024-05-23',
      status: ['Draft'],
    },
    {
      title: 'Customer feedback',
      dateCreated: '2024-05-23',
      status: ['Published', 'Completed'],
    },
    {
      title: 'Customer feedback',
      dateCreated: '2024-05-23',
      status: ['Published', 'Completed'],
    },
  ];

  const { tableColumns } = useSurveyColumn();

  return (
    <AppLayout logo=''>
      <div className='app-container py-2 pl-14 pr-10'>
        <Header />
        <div>
          <WelcomeMessage
            username='Ayo'
            description="Let's review today's insights"
          />
        </div>
        <Card
          hasHeader
          hasBadge
          title='Survey'
          trailingIcon1={<Filter />}
          hasButton={
            <Button
              buttonText='Create new survey'
              size={ButtonSize.Small}
              radius={BorderRadius.Large}
              className='font-semibold'
              onClick={() => {}}
            />
          }
        >
          <Table
            pagination={false}
            columns={tableColumns}
            dataSource={list}
            className='custom-survey-table'
          />
        </Card>
      </div>
    </AppLayout>
  );
}

export default Surveys;
