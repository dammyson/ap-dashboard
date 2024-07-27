import { AppLayout } from '../../components/layout/AppLayout';
import { Header } from '../../components/header';
import WelcomeMessage from '../../components/welcomeMessage';
import { Card } from '@/components/card';
import { Filter } from '@/components/svg/surveys/Surveys';
import { Update } from '@/components/svg/customer/Customer';
import { BorderRadius, Button, ButtonSize } from '@/components/button';
import { Table } from 'antd';
import { UseActivivtyLog } from '@/components/modules/activityLog/tableColumns';
import { acvtivityData } from './constants';

function ActivityLog() {
  const { tableColumns } = UseActivivtyLog();
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
        <div className='mt-10 pr-20'>
          <Card
            hasHeader
            hasBadge
            title='Activity log'
            trailingIcon1={<Filter />}
            trailingIcon2={<Update />}
            hasButton={
              <Button
                buttonText='Export log'
                radius={BorderRadius.Large}
                size={ButtonSize.Medium}
                className='text-light-blue-main font-semibold'
                onClick={() => {}}
              />
            }
          >
            <Table
              pagination={false}
              dataSource={acvtivityData}
              columns={tableColumns}
            />
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}

export default ActivityLog;
