import { AppLayout } from '../../components/layout/AppLayout';
import { Header } from '../../components/header';
import WelcomeMessage from '../../components/welcomeMessage';
import { Card } from '@/components/card';
import { Filter, RadioFilled } from '@/components/svg/surveys/Surveys';
import { BorderRadius, Button, ButtonSize } from '@/components/button';
import { Table } from 'antd';
import { UseActivivtyLog } from '@/components/modules/activityLog/tableColumns';
import { activityData } from './constants';
import { Update } from '@/components/svg/activityLog/ActivityLog';
import { ChangeEvent, useState } from 'react';
import { Modal, SizeType } from '@/components/modal';
import { Cancel } from '@/components/svg/modal/Modal';
import clsx from 'clsx';
import { CustomDatePicker, PickerType } from '@/components/datePicker';
import { useWindowSize } from '@/components/hooks/useWindowSize';

type ActivityRecord = {
  timeStamp: string;
  user: string;
  role: string;
  activityType: string;
  description: string;
  ipaddress: string;
};

export type OpenActivity = (record: ActivityRecord) => void;

function ActivityLog() {
  const [exportLog, setExportLog] = useState<boolean>();
  const [viewActivity, setViewActivity] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<ActivityRecord | null>(
    null,
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
  const formats = [
    { title: 'CSV', key: 'csv' },
    { title: 'JSON', key: 'json' },
    { title: 'PDF', key: 'pdf' },
    { title: 'PNG', key: 'png' },
  ];

  const activities = [
    { title: 'Time Stamp', key: 'timeStamp' },
    { title: 'User', key: 'user' },
    { title: 'Role', key: 'role' },
    { title: 'Activty Type', key: 'activityType' },
    { title: 'Description', key: 'description' },
    { title: 'Activities', key: 'activites' },
  ];
  const currentFormat = formats[0];
  const [selectedOption, setSelectedOption] = useState(currentFormat.key);
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const selectedValue = e.target.value;
    const selectedFormat = formats.find(
      (format) => format.key === selectedValue,
    );
    if (selectedFormat) {
      setSelectedOption(selectedFormat.key);
    }
  };

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
            username='Ayo'
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
            trailingIcon2={<Update />}
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
              dataSource={activityData}
              columns={tableColumns}
              rootClassName='overflow-x-scroll hidden-scrollbar'
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
                <h3 className='text-light-primary-deep_black text-[32px] font-medium text-center w-3/4'>
                  Please specify the time period of format for exporting the
                  activity log
                </h3>
              </div>
              <div className='w-11/12 mt-8'>
                <p className='font-medium text-light-grey-600 text-xl text-start'>
                  Time period
                </p>
                <div className='flex items-center justify-between gap-8 mt-2.5 '>
                  <div className='max-w-[420px] w-full'>
                    <CustomDatePicker type={PickerType.START} />
                  </div>
                  <div className='max-w-[420px] w-full'>
                    <CustomDatePicker type={PickerType.END} />
                  </div>
                </div>
              </div>

              <div className='w-36 my-12'>
                <p className='text-light-grey-600 text-xl font-medium text-start'>
                  Export format
                </p>
                <div className='grid gap-2 mt-3'>
                  {formats.map((format, index) => (
                    <div key={index} className='flex items-center gap-3 pt-2 '>
                      <div className='relative'>
                        <input
                          type='radio'
                          value={format.key}
                          checked={selectedOption === format.key}
                          onChange={handleChange}
                          name='option format'
                          className='w-8  h-8 inset-0 absolute opacity-0 cursor-pointer'
                        />
                        <div className='flex items-center justify-center w-7 h-7 border-light-blue-50 border-2 rounded-full'>
                          {selectedOption === format.key && (
                            <RadioFilled color='#23539F' className='w-4 h-4' />
                          )}
                        </div>
                      </div>
                      <span className='text-light-grey-500 text-[16px] font-medium'>
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
                    className='text-light-blue-main !font-semibold !text-2xl'
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
            <div className='border-b border-light-blue-50 pb-8'>
              <p className='text-light-primary-black text-2xl font-medium text-start'>
                Activity details
              </p>
            </div>
            <div>
              <div className='flex flex-col items-center'>
                <div className='text-start w-full'>
                  {activities.map((activity) => (
                    <div
                      className={clsx(
                        activity.key === 'description' ||
                          activity.key === 'activites'
                          ? ''
                          : 'flex items-center ',
                        'pt-4',
                      )}
                    >
                      <span className='text-light-primary-black font-medium text-2xl pr-6 w-full max-w-[340px]'>
                        {`${activity.title}:`}
                      </span>
                      <span className='text-light-grey-600 text-2xl text-start'>
                        {activity.key === 'timeStamp' ? (
                          selectedRecord.timeStamp
                        ) : activity.key === 'user' ? (
                          selectedRecord.user
                        ) : activity.key === 'role' ? (
                          selectedRecord.role
                        ) : activity.key === 'activityType' ? (
                          selectedRecord.activityType
                        ) : activity.key === 'description' ? (
                          <ul className='text-light-grey-600 text-[18px] list-disc list-inside ml-3 leading-tight'>
                            <li>Action - logged in</li>
                            <li>IP address - {selectedRecord.ipaddress}</li>
                          </ul>
                        ) : activity.key === 'activites' ? (
                          <ul className='text-light-grey-600 text-[18px] list-disc list-inside ml-3 leading-tight'>
                            <li>
                              Created new user account for user John Kevin with
                              ID: 1234
                            </li>
                            <li>Viewed the dashboard </li>
                            <li>Updated flight status for flight #1234</li>
                            <li>
                              Edited user role for John Kevin from sub-admin to
                              admin
                            </li>
                          </ul>
                        ) : (
                          ''
                        )}
                      </span>
                    </div>
                  ))}
                </div>
                <div className='w-full max-w-[447px] mt-20 mb-12'>
                  <Button
                    buttonText='Export log'
                    radius={BorderRadius.Large}
                    size={ButtonSize.Large}
                    className='text-light-blue-main !font-semibold !text-2xl'
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
