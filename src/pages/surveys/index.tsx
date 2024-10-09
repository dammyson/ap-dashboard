import { Card } from '@/components/card';
import { Header } from '@/components/header';
import { AppLayout } from '@/components/layout/AppLayout';
import WelcomeMessage from '@/components/welcomeMessage';
import { BorderRadius, Button, ButtonSize } from '@/components/button';
import { Spin, Table } from 'antd';
import { useSurveyColumn } from '@/components/modules/surveys/tableColumns';
import { Filter } from '@/components/svg/surveys/Surveys';
import { useEffect, useState } from 'react';
import { Modal, SizeType } from '@/components/modal';
import { useNavigate } from 'react-router';
import { useWindowSize } from '@/components/hooks/useWindowSize';
import clsx from 'clsx';
import { useUser } from '@/context/AppContext';
import { useSurvey } from '@/api/surveys/surveys';
import { LoadingOutlined } from '@ant-design/icons';
import { Spinner } from '@/components/svg/spinner/Spinner';
import { SurveyType } from '@/types/types';
import dayjs from 'dayjs';

function Surveys() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [isPublished, setisPublished] = useState<number>();
  const [deleteSurvey, setDeleteSurvey] = useState(false);
  const [surveyId, setSurveyId] = useState<number>();
  const {
    getSurvey,
    surveys,
    isLoading,
    tooglePublish,
    loading,
    surveyModal,
    setSurveyModal,
  } = useSurvey();

  const { tableColumns } = useSurveyColumn(
    setSurveyModal,
    setisPublished,
    setDeleteSurvey,
    setSurveyId,
  );

  const sortedSurveys = (surveys ?? []).sort((a: SurveyType, b: SurveyType) => {
    return dayjs(b.created_at).valueOf() - dayjs(a.created_at).valueOf();
  });

  useEffect(() => {
    getSurvey();
  }, []);

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
              username={user?.user_name.split(' ')[1]}
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
              dataSource={sortedSurveys}
              scroll={{ y: 390, x: true }}
              className='survey-table custom-scrollbar hide-arrows overflow-x-scroll'
              rootClassName='hidden-scrollbar'
              loading={{
                spinning: isLoading,
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
      </div>
      {surveyModal && (
        <Modal
          isBackground
          isCentered
          size={SizeType.MEDIUM}
          onClick={() => setSurveyModal(false)}
        >
          <p className='font-semibold text-lg 880:text-[22px] mb-2 560:mb-4 mt-2 560:mt-4 880:mt-8 text-light-primary-deep_black'>
            {isPublished === 0
              ? 'Are you sure you want to publish this survey?'
              : 'Are you sure you want to unpublish this survey?'}
          </p>
          <p className=' pb-7 880:pb-11 text-[15px] 880:text-[17px] text-light-primary-deep_black'>
            {isPublished === 0
              ? 'This will make the survey available for participants'
              : 'This will make the survey unavailable for participants'}
          </p>
          <div className='w-full max-w-[300px] 880:max-w-[380px]'>
            <Button
              size={ButtonSize.Medium}
              radius={BorderRadius.Large}
              buttonText={
                loading ? (
                  <Spinner className='text-white w-5 h-5 768:w-7 768:h-7' />
                ) : isPublished === 0 ? (
                  'Publish'
                ) : (
                  'UnPublish'
                )
              }
              onClick={() => surveyId && tooglePublish(surveyId)}
              className='mb-5 !font-semibold !text-[17px]'
            />
            <Button
              size={ButtonSize.Medium}
              radius={BorderRadius.Large}
              mode='outlined'
              buttonText='Cancel'
              onClick={() => setSurveyModal(false)}
              className='!font-semibold !text-[17px] '
            />
          </div>
        </Modal>
      )}
      {deleteSurvey && (
        <Modal
          isBackground
          isCentered
          size={SizeType.MEDIUM}
          onClick={() => setDeleteSurvey(false)}
        >
          <p className='font-semibold text-lg 880:text-[22px] mb-2 560:mb-4 mt-2 560:mt-4 880:mt-8 text-light-primary-deep_black'>
            Are you sure you want to delete this survey?
          </p>
          <p className='pb-7 880:pb-11 text-[15px] 880:text-[17px] text-light-primary-deep_black'>
            This action cannot be undone
          </p>
          <div className='w-full max-w-[300px] 880:max-w-[380px]'>
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
      )}
    </AppLayout>
  );
}

export default Surveys;
