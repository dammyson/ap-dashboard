import { Card } from '@/components/card';
import { Header } from '@/components/header';
import { AppLayout } from '@/components/layout/AppLayout';
import WelcomeMessage from '@/components/welcomeMessage';
import { BorderRadius, Button, ButtonSize } from '@/components/button';
import { Table } from 'antd';
import { useSurveyColumn } from '@/components/modules/surveys/tableColumns';
import { Filter } from '@/components/svg/surveys/Surveys';
import { useState } from 'react';
import CreateSurvey from './createSurvery';
import { Modal, SizeType } from '@/components/modal';
import EditSurvey from './editSurvey';

function Surveys() {
  const [createNewSurvey, setCreateNewSurvey] = useState<boolean>(false);
  const [editSurvey, setEditSurvey] = useState<boolean>(false);
  const [publishSurvey, setPublishSurvey] = useState<boolean>(false);
  const [unpublishSurvey, setUnpublishSurvey] = useState<boolean>(false);
  const [deleteSurvey, setDeleteSurvey] = useState<boolean>(false);
  const { tableColumns } = useSurveyColumn(
    setEditSurvey,
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
      <div className='app-container py-2 pl-14 pr-10'>
        <Header />
        <div className='flex justify-between items-center'>
          <WelcomeMessage
            username='Ayo'
            description="Let's review today's insights"
          />
          {createNewSurvey || editSurvey ? (
            <Button
              buttonText='Back to survey'
              radius={BorderRadius.Large}
              size={ButtonSize.Small}
              onClick={() => window.history.back()}
            />
          ) : (
            <></>
          )}
        </div>
        {createNewSurvey ? (
          <CreateSurvey />
        ) : editSurvey ? (
          <EditSurvey />
        ) : (
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
                onClick={() => {
                  setCreateNewSurvey(true);
                }}
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
        )}
      </div>
      {publishSurvey ? (
        <Modal
          isBackground
          isCentered
          size={SizeType.MEDIUM}
          onClick={() => setPublishSurvey(false)}
        >
          <p className='font-semibold text-[22px] mb-4 mt-8 text-[#1C1C1E]'>
            Are you sure you want to publish this survey?
          </p>
          <p className='pb-11 text-[17px] text-[#1C1C1E]'>
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
          <p className='font-semibold text-[22px] mb-4 mt-8 text-[#1C1C1E]'>
            Are you sure you want to unpublish this survey?
          </p>
          <p className='pb-11 text-[17px] text-[#1C1C1E]'>
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
          <p className='font-semibold text-[22px] mb-4 mt-8 text-[#1C1C1E]'>
            Are you sure you want to delete this survey?
          </p>
          <p className='pb-11 text-[17px] text-[#1C1C1E]'>
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
