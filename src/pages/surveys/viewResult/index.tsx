import { Card } from '@/components/card';
import { Header } from '@/components/header';
import { AppLayout } from '@/components/layout/AppLayout';
import WelcomeMessage from '@/components/welcomeMessage';
import { BorderRadius, Button, ButtonSize } from '@/components/button';
import { Spin, Table } from 'antd';
import { useViewResultColumn } from '@/components/modules/surveys/viewResult/tableColumns';
import { Panel, PanelNavigationItem } from '@/components/Panel';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { SurveyResults } from '@/components/modules/surveys/SurveyResults';
import { DropDownArrow } from '@/components/svg/settings/Settings';
import { Modal, SizeType } from '@/components/modal';
import { Cancel } from '@/components/svg/modal/Modal';
import clsx from 'clsx';
import { useWindowSize } from '@/components/hooks/useWindowSize';
import { useUser } from '@/context/AppContext';
import { point, reason } from './constants';
import { useViewSurveyResult } from '@/api/surveys/viewResults';
import { LoadingOutlined } from '@ant-design/icons';
import ListBox, { RoleOption } from '@/components/Dropdown/listBox';

function ViewResult() {
  const navigate = useNavigate();
  const { titleId, surveyId } = useParams();
  const id = Number(surveyId);

  const {
    getSurveyParticipants,
    participants,
    Loading,
    getSurveyResults,
    isloading,
    results,
  } = useViewSurveyResult();

  useEffect(() => {
    if (id) {
      getSurveyParticipants(id);
      getSurveyResults(id);
    }
  }, []);

  const navigationItems: PanelNavigationItem[] = [
    {
      title: `Survey participants (${participants?.length})`,
      id: 'Survey participants',
    },
    {
      title: 'Survey results',
      id: 'Survey results',
    },
  ];

  const [awardPoints, setAwardPoints] = useState<boolean>(false);
  const [selectedPoint, setSelectedPoint] = useState<RoleOption>(point[0]);
  const [selectedReason, setSelectedReason] = useState<RoleOption>(reason[0]);
  const [currentTab, setCurrentTab] = useState(navigationItems[0]);
  const { user } = useUser();

  const { tableColumns } = useViewResultColumn(setAwardPoints);

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
              username={user?.user_name.split(' ')[1]}
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
            title={`Survey: ${titleId}`}
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
                    dataSource={participants}
                    className='survey-participants'
                    rootClassName='overflow-x-scroll hidden-scrollbar'
                    loading={{
                      spinning: Loading,
                      indicator: (
                        <Spin
                          indicator={
                            <LoadingOutlined style={{ fontSize: 48 }} spin />
                          }
                        />
                      ),
                    }}
                  />
                ) : (
                  <SurveyResults results={results} isloading={isloading} />
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
                  <ListBox
                    trailingIcon={<DropDownArrow />}
                    selected={selectedPoint}
                    options={point}
                    onSelect={(point) => setSelectedPoint(point)}
                    isCurved
                    className=' placeholder:!text-light-primary-deep_black placeholder:!text-xl font-medium text-light-primary-deep_black !!h-[50px] 1024:!h-[57px] 1300:!min-h-[65px]'
                  />
                </div>
                <div className='mb-5 text-light-grey-600'>
                  <p className='text-left text-xl  font-medium pb-4'>
                    Reason for awarding points
                  </p>
                  <ListBox
                    trailingIcon={<DropDownArrow />}
                    selected={selectedReason}
                    options={reason}
                    onSelect={(reason) => setSelectedReason(reason)}
                    isCurved
                    className=' placeholder:!text-light-primary-deep_black placeholder:!text-xl font-medium text-light-primary-deep_black !!h-[50px] 1024:!h-[57px] 1300:!min-h-[65px]'
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

export default ViewResult;
