import { Card } from '@/components/card';
import { Header } from '@/components/header';
import { AppLayout } from '@/components/layout/AppLayout';
import WelcomeMessage from '@/components/welcomeMessage';
import { BorderRadius, Button, ButtonSize } from '@/components/button';
import { Table } from 'antd';
import { useSurveyColumn } from '@/components/modules/surveys/tableColumns';
import { Filter } from '@/components/svg/surveys/Surveys';
import { useState } from 'react';

import { Modal, SizeType } from '@/components/modal';

import { useNavigate } from 'react-router';
import { useWindowSize } from '@/components/hooks/useWindowSize';
import clsx from 'clsx';

function Surveys() {
  const navigate = useNavigate();
  const [publishSurvey, setPublishSurvey] = useState<boolean>(false);
  const [unpublishSurvey, setUnpublishSurvey] = useState<boolean>(false);
  const [deleteSurvey, setDeleteSurvey] = useState<boolean>(false);
  const { tableColumns } = useSurveyColumn(
    setPublishSurvey,
    setUnpublishSurvey,
    setDeleteSurvey,
  );
  const list = [
    {
      title: 'Customer feedback',
      dateCreated: '2024-05-23',
      status: ['Published', 'Active'],
      value: 'feedback',
    },
    {
      title: 'In-flight experience',
      dateCreated: '2024-05-23',
      status: ['Draft'],
      value: 'experience',
    },
    {
      title: 'New route survey',
      dateCreated: '2024-05-23',
      status: ['Draft'],
      value: 'new route survey',
    },
    {
      title: 'Customer feedback',
      dateCreated: '2024-05-23',
      status: ['Published', 'Completed'],
      value: 'feedback',
    },
    {
      title: 'Customer feedback',
      dateCreated: '2024-05-23',
      status: ['Published', 'Completed'],
      value: 'feedback',
    },
  ];

  return (
    <AppLayout logo=''>
      <div
        className={clsx(
          useWindowSize(1240) ? 'w-full' : 'app-container',
          'py-7 px-5 1240:pl-14 1240:pr-10',
        )}
      >
        <Header />
        <div className='1240:pr-12'>
          <div className='flex flex-col gap-2 560:block'>
            <WelcomeMessage
              username='Ayo'
              description="Let's review today's insights"
            />
            <div>
              <Button
                buttonText='Create new survey'
                size={ButtonSize.Small}
                radius={BorderRadius.Large}
                className='font-semibold !w-fit float-right 560:hidden'
                onClick={() => {
                  navigate(`/surveys-create/create-new-survey`);
                }}
              />
            </div>
          </div>
          <Card
            hasHeader
            hasBadge
            title='Survey'
            trailingIcon1={<Filter />}
            mainClass='!mt-4 560:!mt-8'
            hasButton={
              <Button
                buttonText='Create new survey'
                size={ButtonSize.Small}
                radius={BorderRadius.Large}
                className='font-semibold hidden 560:flex'
                onClick={() => {
                  navigate(`/surveys-create/create-new-survey`);
                }}
              />
            }
          >
            <Table
              pagination={false}
              columns={tableColumns}
              dataSource={list}
              className='custom-survey-table'
              rootClassName='overflow-x-scroll'
            />
          </Card>
        </div>
      </div>
      {publishSurvey ? (
        <Modal
          isBackground
          isCentered
          size={SizeType.MEDIUM}
          onClick={() => setPublishSurvey(false)}
        >
          <p className='font-semibold text-[22px] mb-4 mt-8 text-light-primary-deep_black'>
            Are you sure you want to publish this survey?
          </p>
          <p className='pb-11 text-[17px] text-light-primary-deep_black'>
            This will make the survey available for participants
          </p>
          <div className='w-full max-w-[380px]'>
            <Button
              size={ButtonSize.Medium}
              radius={BorderRadius.Large}
              buttonText='Publish'
              onClick={() => {}}
              className='mb-5 !font-semibold !text-[17px]'
            />
            <Button
              size={ButtonSize.Medium}
              radius={BorderRadius.Large}
              mode='outlined'
              buttonText='Cancel'
              onClick={() => setPublishSurvey(false)}
              className='!font-semibold !text-[17px] '
            />
          </div>
        </Modal>
      ) : unpublishSurvey ? (
        <Modal
          isBackground
          isCentered
          size={SizeType.MEDIUM}
          onClick={() => setUnpublishSurvey(false)}
        >
          <p className='font-semibold text-[22px] mb-4 mt-8 text-light-primary-deep_black'>
            Are you sure you want to unpublish this survey?
          </p>
          <p className='pb-11 text-[17px] text-light-primary-deep_black'>
            This will make the survey unavailable for participants
          </p>
          <div className='w-full max-w-[380px]'>
            <Button
              size={ButtonSize.Medium}
              radius={BorderRadius.Large}
              buttonText='Unpublish'
              onClick={() => {}}
              className='mb-5 !font-semibold !text-[17px]'
            />
            <Button
              size={ButtonSize.Medium}
              radius={BorderRadius.Large}
              mode='outlined'
              buttonText='Cancel'
              onClick={() => setUnpublishSurvey(false)}
              className='!font-semibold !text-[17px] '
            />
          </div>
        </Modal>
      ) : deleteSurvey ? (
        <Modal
          isBackground
          isCentered
          size={SizeType.MEDIUM}
          onClick={() => setDeleteSurvey(false)}
        >
          <p className='font-semibold text-[22px] mb-4 mt-8 text-light-primary-deep_black'>
            Are you sure you want to delete this survey?
          </p>
          <p className='pb-11 text-[17px] text-light-primary-deep_black'>
            This action cannot be undone
          </p>
          <div className='w-full max-w-[380px]'>
            <Button
              size={ButtonSize.Medium}
              radius={BorderRadius.Large}
              buttonText='Delete'
              onClick={() => {}}
              className='mb-5 !font-semibold !text-[17px]'
            />
            <Button
              size={ButtonSize.Medium}
              radius={BorderRadius.Large}
              mode='outlined'
              buttonText='Cancel'
              onClick={() => setDeleteSurvey(false)}
              className='!font-semibold !text-[17px] '
            />
          </div>
        </Modal>
      ) : (
        <></>
      )}
    </AppLayout>
  );
}

export default Surveys;
