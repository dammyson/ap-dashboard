import { Card } from '@/components/card';
import { Header } from '@/components/header';
import { AppLayout } from '@/components/layout/AppLayout';
import WelcomeMessage from '@/components/welcomeMessage';
import { BorderRadius, Button, ButtonSize } from '@/components/button';
import { Table } from 'antd';
import { useCustomerFeedbackColumn } from '@/components/modules/surveys/customerFeedback/tableColumns';
import { Panel, PanelNavigationItem } from '@/components/Panel';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { SurveyResults } from '@/components/modules/surveys/SurveyResults';
import { DropDownArrow } from '@/components/svg/settings/Settings';
import { CustomSelect, SelectType } from '@/components/customSelect';
import { Modal, SizeType } from '@/components/modal';
import { Cancel } from '@/components/svg/modal/Modal';
import clsx from 'clsx';
import { useWindowSize } from '@/components/hooks/useWindowSize';

function CustomerFeedback() {
  const navigate = useNavigate();
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
  const pointOptions = [
    { label: '2000', value: '2000' },
    { label: '3000', value: '3000' },
  ];
  const reasonOptions = [
    {
      label: 'Loyalty and repeat business',
      value: 'loyalty and repeat business',
    },
  ];
  const [awardPoints, setAwardPoints] = useState<boolean>(false);
  const [selectedPointOption, setSelectedPointOption] = useState<string>('');
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [currentTab, setCurrentTab] = useState(navigationItems[0]);

  const { tableColumns } = useCustomerFeedbackColumn(setAwardPoints);
  return (
    <AppLayout logo=''>
      <div
        className={clsx(
          useWindowSize(1240) ? 'w-full' : 'app-container',
          'py-7 px-5 1240:pl-14 1240:pr-10',
        )}
      >
        <div className='1240:pr-12'>
          <Header />
          <div className='flex flex-col gap-2 560:block'>
            <WelcomeMessage
              username='Ayo'
              description="Let's review today's insights"
            />
            <div>
              <Button
                buttonText='Back to survey'
                size={ButtonSize.Small}
                radius={BorderRadius.Large}
                className='font-semibold !w-fit float-right 560:hidden'
                onClick={() => navigate('/surveys')}
              />
            </div>
          </div>

          <Card
            hasHeader
            hasBadge
            title={`Survey:${id}`}
            hasBorder
            className='!pb-2'
            mainClass='!mt-4 560:!mt-8'
            hasButton={
              <Button
                buttonText='Back to survey'
                size={ButtonSize.Small}
                radius={BorderRadius.Large}
                className='font-semibold hidden 560:block'
                onClick={() => navigate('/surveys')}
              />
            }
          >
            <Panel
              navigationItems={navigationItems}
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
              className='!pb-0'
            >
              <div className='mt-8'>
                {currentTab.id === 'Survey participants' ? (
                  <Table
                    pagination={false}
                    columns={tableColumns}
                    dataSource={list}
                    className='survey-participants'
                    rootClassName='overflow-x-scroll'
                  />
                ) : (
                  <SurveyResults />
                )}
              </div>
            </Panel>
          </Card>
        </div>
        {awardPoints && (
          <Modal
            isBackground
            isCentered
            size={SizeType.LARGE}
            cancelIcon={<Cancel />}
            onClick={() => setAwardPoints(false)}
          >
            <div className='flex  flex-col items-center justify-center max-w-[633px] w-full py-5'>
              <h3 className='text-light-primary-deep_black text-[32px] font-medium mb-10'>
                Manually award points to user
              </h3>
              <div className='w-11/12'>
                <div className='mb-10 text-light-grey-600'>
                  <p className='text-left text-xl font-medium pb-4'>
                    Points to award
                  </p>
                  <CustomSelect
                    label=''
                    options={pointOptions}
                    selectType={SelectType.SELECT}
                    hasBorder
                    isCurved
                    trailingIcon={<DropDownArrow />}
                    selectedRole={selectedPointOption}
                    onSelect={(option) => setSelectedPointOption(option)}
                  />
                </div>
                <div className='mb-5 text-light-grey-600'>
                  <p className='text-left text-xl  font-medium pb-4'>
                    Reason for awarding points
                  </p>
                  <CustomSelect
                    label=''
                    options={reasonOptions}
                    selectType={SelectType.SELECT}
                    hasBorder
                    isCurved
                    trailingIcon={<DropDownArrow />}
                    selectedRole={selectedReason}
                    onSelect={(option) => setSelectedReason(option)}
                  />
                </div>
              </div>

              <ul className='w-full list-disc list-inside text-left pt-2 pb-20'>
                <li className='text-[16px] text-light-grey-600'>
                  <span className='font-medium'>Note:</span> Manually awarded
                  points will be reflected in the user's account immediately.
                </li>
                <li className='text-[16px] text-light-grey-600'>
                  Please ensure the points amount is accurate and the reason is
                  clear.
                </li>
              </ul>

              <div className='grid gap-4 w-11/12'>
                <Button
                  size={ButtonSize.Large}
                  radius={BorderRadius.Large}
                  buttonText='Award points'
                  onClick={() => {}}
                  className='!font-semibold !text-2xl'
                />
                <Button
                  size={ButtonSize.Large}
                  radius={BorderRadius.Large}
                  mode='outlined'
                  buttonText='Cancel'
                  onClick={() => setAwardPoints(false)}
                  className='!font-semibold !text-2xl'
                />
              </div>
            </div>
          </Modal>
        )}
      </div>
    </AppLayout>
  );
}

export default CustomerFeedback;
