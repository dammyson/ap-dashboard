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
import { FilterSurveyTable, SurveyType } from '@/types/types';
import dayjs from 'dayjs';
import { CustomDatePicker } from '@/components/datePicker';
import { Cancel } from '@/components/svg/modal/Modal';
import { Input } from '@/components/input';

function Surveys() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [isPublished, setisPublished] = useState<number>();
  const [deleteSurvey, setDeleteSurvey] = useState(false);
  const [surveyId, setSurveyId] = useState<number>();
  const [filterTable, setFilterTable] = useState(false);
  const {
    getSurvey,
    surveys,
    isLoading,
    tooglePublish,
    loading,
    surveyModal,
    setSurveyModal,
    surveyTitle,
    setSurveyTitle,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
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
    getSurvey({});
  }, []);

  const handleFilter = async () => {
    await getSurvey({
      title: surveyTitle?.toLowerCase(),
      startDate: startDate && dayjs(startDate).format('YYYY-MM-DD'),
      endDate: endDate && dayjs(endDate).format('YYYY-MM-DD'),
    });
    setFilterTable(false);
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
            trailingIcon1={
              <button onClick={() => setFilterTable(true)}>
                <Filter />
              </button>
            }
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
      {filterTable && (
        <Modal
          isBackground
          size={SizeType.SMALL}
          cancelIcon={<Cancel />}
          onClick={() => setFilterTable(false)}
        >
          <div className='max-w-[890px] w-full grid it'>
            <div className='flex items-center justify-center'>
              <h3 className='text-light-primary-deep_black text-lg 560:text-xl 768:text-2xl 960:text-[28px] 1240:text-[32px] font-medium text-center w-[85%] 960:w-3/4 pt-4 880:pt-0'>
                Filter Table
              </h3>
            </div>

            <div className='w-11/12 mt-2 560:mt-4 960:mt-8'>
              <p className='font-medium text-light-grey-600 text-base 560:text-lg 960:text-xl text-start mb-2'>
                Survey Title
              </p>
              <div>
                <Input
                  isCurved
                  hasBorder
                  inputSize='small'
                  value={surveyTitle ?? ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSurveyTitle(e.target.value)
                  }
                />
              </div>
            </div>
            <div className='w-11/12 mt-2 560:mt-4 960:mt-8'>
              <p className='font-medium text-light-grey-600 text-base 560:text-lg 960:text-xl text-start'>
                Time period
              </p>
              <div>
                <CustomDatePicker
                  startDate={startDate}
                  setStartDate={setStartDate}
                  endDate={endDate}
                  setEndDate={setEndDate}
                />
              </div>
            </div>
            <div className='flex justify-center items-center mt-16 '>
              <div className='w-full max-w-[300px] pb-4 grid gap-4'>
                <Button
                  buttonText={
                    isLoading ? (
                      <Spinner className='text-white w-5 h-5 768:w-7 768:h-7' />
                    ) : (
                      'Confirm'
                    )
                  }
                  radius={BorderRadius.Large}
                  size={ButtonSize.Medium}
                  className='text-light-blue-main !font-semibold'
                  onClick={handleFilter}
                />
                <Button
                  buttonText='Cancel'
                  radius={BorderRadius.Large}
                  size={ButtonSize.Medium}
                  mode='outlined'
                  className='text-light-blue-main !font-semibold '
                  onClick={() => setFilterTable(false)}
                />
              </div>
            </div>
          </div>
        </Modal>
      )}
    </AppLayout>
  );
}

export default Surveys;
