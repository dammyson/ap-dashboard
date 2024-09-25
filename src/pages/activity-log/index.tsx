import { AppLayout } from '../../components/layout/AppLayout';
import { Header } from '../../components/header';
import WelcomeMessage from '../../components/welcomeMessage';
import { Card } from '@/components/card';
import { Filter, RadioFilled } from '@/components/svg/surveys/Surveys';
import { BorderRadius, Button, ButtonSize } from '@/components/button';
import { Spin, Table } from 'antd';
import { UseActivivtyLog } from '@/components/modules/activityLog/tableColumns';
import { activities, formats } from './constants';
import { Update } from '@/components/svg/activityLog/ActivityLog';
import { useEffect, useState } from 'react';
import { Modal, SizeType } from '@/components/modal';
import { Cancel } from '@/components/svg/modal/Modal';
import clsx from 'clsx';
import { CustomDatePicker } from '@/components/datePicker';
import { useWindowSize } from '@/components/hooks/useWindowSize';
import { useUser } from '@/context/AppContext';
import { useActivityLog } from '@/api/activityLog/activityLog';
import { LoadingOutlined } from '@ant-design/icons';
import { typeActivityLog } from '@/types/types';
import dayjs from 'dayjs';

export type OpenActivity = (record: typeActivityLog) => void;

function ActivityLog() {
  const { user } = useUser();
  const currentFormat = formats[0];
  const { getActivityLog, loading, activityData } = useActivityLog();
  const [exportLog, setExportLog] = useState(false);
  const [viewActivity, setViewActivity] = useState(false);
  const [selectedOption, setSelectedOption] = useState(currentFormat.key);
  const [selectedRecord, setSelectedRecord] = useState<typeActivityLog | null>(
    null,
  );
  const sortedActivity = (activityData ?? []).sort(
    (a: typeActivityLog, b: typeActivityLog) => {
      return dayjs(b.created_at).valueOf() - dayjs(a.created_at).valueOf();
    },
  );
  const openModal: OpenActivity = (record) => {
    setSelectedRecord(record);
    setViewActivity(true);
  };
  const closeModal = () => {
    setSelectedRecord(null);
    setViewActivity(false);
  };
  const { tableColumns } = UseActivivtyLog(openModal);

  useEffect(() => {
    getActivityLog();
  }, []);

  useEffect(() => {
    if (!exportLog) {
      setSelectedOption(currentFormat.key);
    }
  }, [exportLog]);

  return (
    <AppLayout logo=''>
      <div
        className={clsx(
          useWindowSize(1240) ? 'w-full' : 'app-container',
          'py-7 px-5 1240:pl-14 1240:pr-10',
        )}
      >
        <Header />
        <div className='flex flex-col gap-2 560:block'>
          <WelcomeMessage
            username={user?.user_name.split(' ')[1]}
            description="Let's review today's insights"
          />
          <div>
            <Button
              buttonText='Export log'
              radius={BorderRadius.Large}
              size={ButtonSize.Medium}
              className='text-light-blue-main !font-semibold !w-fit float-right 560:hidden text-sm'
              onClick={() => setExportLog(true)}
            />
          </div>
        </div>
        <div className='1240:pr-12'>
          <Card
            hasHeader
            hasBadge
            title='Activity log'
            trailingIcon1={<Filter />}
            trailingIcon2={
              <button disabled={loading} onClick={getActivityLog}>
                <Update className={loading ? 'spinner' : ''} />
              </button>
            }
            mainClass='!mt-4 560:!mt-8'
            hasButton={
              <Button
                buttonText='Export log'
                radius={BorderRadius.Large}
                size={ButtonSize.Medium}
                className='text-light-blue-main !font-semibold hidden 560:flex'
                onClick={() => setExportLog(true)}
              />
            }
          >
            <Table
              pagination={false}
              dataSource={sortedActivity}
              columns={tableColumns}
              scroll={{ y: 390, x: true }}
              className=' activity-table custom-scrollbar hide-arrows overflow-x-scroll'
              rootClassName=' w-full  hidden-scrollbar'
              loading={{
                spinning: loading,
                indicator: (
                  <Spin
                    indicator={
                      <LoadingOutlined style={{ fontSize: 48 }} spin />
                    }
                  />
                ),
              }}
            />
          </Card>
        </div>
        {exportLog && (
          <Modal
            isBackground
            size={SizeType.LARGE}
            cancelIcon={<Cancel />}
            onClick={() => setExportLog(false)}
          >
            <div className='max-w-[890px] w-full grid it'>
              <div className='flex items-center justify-center'>
                <h3 className='text-light-primary-deep_black text-lg 560:text-xl 768:text-2xl 960:text-[28px] 1240:text-[32px] font-medium text-center w-[85%] 960:w-3/4 pt-4 880:pt-0'>
                  Please specify the time period of format for exporting the
                  activity log
                </h3>
              </div>
              <div className='w-11/12 mt-2 560:mt-4 960:mt-8'>
                <p className='font-medium text-light-grey-600 text-base 560:text-lg 960:text-xl text-start'>
                  Time period
                </p>
                <div>
                  <CustomDatePicker />
                </div>
              </div>

              <div className='w-36 my-4 768:my-6 960:my-12'>
                <p className='text-light-grey-600 560:text-lg 960:text-xl font-medium text-start'>
                  Export format
                </p>
                <div className='grid 768:gap-2 768:mt-3'>
                  {formats.map((format, index) => (
                    <div
                      key={index}
                      className='flex items-center gap-3 pt-2 relative'
                    >
                      <div
                        onClick={() => setSelectedOption(format.key)}
                        className='flex items-center justify-center w-7 h-7 border-light-blue-50 border-2 rounded-full'
                      >
                        {selectedOption === format.key && (
                          <RadioFilled color='#23539F' className='w-4 h-4' />
                        )}
                      </div>

                      <span className='text-light-grey-500 text-sm 768:text-base font-medium'>
                        {format.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className='flex justify-center items-center '>
                <div className='w-full max-w-[447px] pb-4'>
                  <Button
                    buttonText='Export log'
                    radius={BorderRadius.Large}
                    size={ButtonSize.Large}
                    className='text-light-blue-main !font-semibold 768:!text-xl 1240:!text-2xl !min-h-[50px] 1024:!min-h-[57px] 1300:!min-h-[66px]'
                    onClick={() => {}}
                  />
                </div>
              </div>
            </div>
          </Modal>
        )}
        {selectedRecord && viewActivity && (
          <Modal
            isBackground
            size={SizeType.LARGE}
            cancelIcon={<Cancel />}
            onClick={() => closeModal()}
          >
            <div className='border-b border-light-blue-50 pb-2 880:pb-5'>
              <p className='text-light-primary-black text-xl 960:text-2xl font-medium text-start'>
                Activity details
              </p>
            </div>
            <div>
              <div className='flex flex-col items-center'>
                <div className='text-start w-full'>
                  {activities.map((activity, index) => (
                    <div
                      key={index}
                      className={clsx(
                        activity.key === 'description' ||
                          activity.key === 'activites'
                          ? ''
                          : 'flex items-center ',
                        'pt-2 880:pt-4',
                      )}
                    >
                      <span className='text-light-primary-black font-medium text-base 560:text-lg 768:text-xl 960:text-2xl 768:pr-6 w-full max-w-[110px] 560:max-w-[160px] 768:max-w-[240px] 880:max-w-[340px]'>
                        {`${activity.title}:`}
                      </span>
                      <span className='text-light-grey-600 text-base 560:text-lg 768:text-xl 960:text-2xl text-start'>
                        {activity.key === 'timeStamp' ? (
                          dayjs(selectedRecord.created_at).format(
                            'YYYY-MM-DD hh:mma',
                          )
                        ) : activity.key === 'user' ? (
                          selectedRecord.admin.user_name
                        ) : activity.key === 'role' ? (
                          selectedRecord.admin.role
                        ) : activity.key === 'activityType' ? (
                          selectedRecord.activity_type
                        ) : activity.key === 'description' ? (
                          <ul className='text-light-grey-600 text-sm 768:text-base 960:text-lg list-disc list-outside 560:list-inside ml-3 leading-tight'>
                            <li>Action - {selectedRecord.activity_type}</li>
                            <li>IP address - {selectedRecord.ip_address}</li>
                          </ul>
                        ) : activity.key === 'activites' ? (
                          <ul className='text-light-grey-600 text-sm  768:text-base 960:text-lg list-disc list-outside 560:list-inside ml-3 leading-tight'>
                            <li>{selectedRecord.description}</li>
                            <li>Viewed the dashboard </li>
                            <li>Updated flight status for flight #1234</li>
                            <li>
                              Edited user role for John Kevin from sub-admin to
                              admin
                            </li>
                          </ul>
                        ) : (
                          <></>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
                <div className='w-full max-w-[360px] 768:max-w-[447px] mt-6 768:mt-10 960:mt-17 mb-3 768:mb-5 960:mb-8'>
                  <Button
                    buttonText='Export log'
                    radius={BorderRadius.Large}
                    size={ButtonSize.Large}
                    className='text-light-blue-main !font-semibold 768:!text-xl 1240:!text-2xl !min-h-[50px] 1024:!min-h-[57px] 1300:!min-h-[65px]'
                    onClick={() => {}}
                  />
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </AppLayout>
  );
}

export default ActivityLog;
