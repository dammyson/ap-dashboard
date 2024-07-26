import { Card } from '@/components/card';
import { Header } from '@/components/header';
import { AppLayout } from '@/components/layout/AppLayout';
import WelcomeMessage from '@/components/welcomeMessage';
import { BorderRadius, Button, ButtonSize } from '@/components/button';
import { Table } from 'antd';
import { useCustomerFeedbackColumn } from '@/components/modules/surveys/customerFeedback/tableColumns';
import { Panel, PanelNavigationItem } from '@/components/Panel';
import { useState } from 'react';
import { useParams } from 'react-router';
import { SurveyResults } from '@/components/modules/surveys/SurveyResults';

function CustomerFeedback() {
  const { id } = useParams();
  const list = [
    {
      title: 'Mrs',
      name: 'Benson Ella',
      email: 'Bensonella@gmail.com',
      airpeaceID: 11111,
      gender: 'Female',
      nationality: 'Nigerian',
    },
    {
      title: 'Mr',
      name: 'Benson Daniel',
      email: 'Bensondaniel@gmail.com',
      airpeaceID: 98811,
      gender: 'Male',
      nationality: 'Nigerian',
    },
    {
      title: 'Mrs',
      name: 'Corlet joy',
      email: 'Corletjoy@gmail.com',
      airpeaceID: 13411,
      gender: 'Female',
      nationality: 'British',
    },
    {
      title: 'Mr',
      name: 'Daniel',
      email: 'daniel@gmail.com',
      airpeaceID: 10911,
      gender: 'Male',
      nationality: 'Nigerian',
    },
    {
      title: 'Mrs',
      name: 'Tiwa Savage',
      email: 'Tiwasavage@gmail.com',
      airpeaceID: 10111,
      gender: 'Female',
      nationality: 'Nigerian',
    },
    {
      title: 'Mr',
      name: 'Neymar Sanchez',
      email: 'Neymarsanchez@gmail.com',
      airpeaceID: 87101,
      gender: 'Male',
      nationality: 'Brazilian',
    },
  ];

  const navigationItems: PanelNavigationItem[] = [
    {
      title: `Survey participants (${list.length})`,
      id: 'Survey participants',
    },
    {
      title: 'Survey results',
      id: 'Survey results',
    },
  ];
  const [currentTab, setCurrentTab] = useState(navigationItems[0]);

  const { tableColumns } = useCustomerFeedbackColumn();
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
          title={`Survey:${id}`}
          hasBorder
          className='!pb-2'
          hasButton={
            <Button
              buttonText='Back to survey'
              size={ButtonSize.Small}
              radius={BorderRadius.Large}
              className='font-semibold'
              onClick={() => window.history.back()}
            />
          }
        >
          <Panel
            navigationItems={navigationItems}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            className='pb-0'
          >
            <div className='mt-8'>
              {currentTab.id === 'Survey participants' ? (
                <Table
                  pagination={false}
                  columns={tableColumns}
                  dataSource={list}
                  rootClassName='overflow-x-scroll'
                />
              ) : (
                <SurveyResults />
              )}
            </div>
          </Panel>
        </Card>
      </div>
    </AppLayout>
  );
}

export default CustomerFeedback;
