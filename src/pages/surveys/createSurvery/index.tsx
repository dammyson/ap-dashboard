import { BorderRadius, Button, ButtonSize } from '@/components/button';
import { Card } from '@/components/card';
import { Header } from '@/components/header';
import { useWindowSize } from '@/components/hooks/useWindowSize';
import { Input } from '@/components/input';
import { AppLayout } from '@/components/layout/AppLayout';
import { DropDownArrow } from '@/components/svg/settings/Settings';
import WelcomeMessage from '@/components/welcomeMessage';
import { useUser } from '@/context/AppContext';
import clsx from 'clsx';
import { useNavigate } from 'react-router';
import { awardPoints, OtherList, surveyDuration } from '../constants';
import SurveyQuestionCard from './questions';
import { useManageSurvey } from '@/api/surveys/surveys';
import { Spinner } from '@/components/svg/spinner/Spinner';
import { convertToMinutes } from '@/utils';
import { DragAndDrop } from '@/components/dragAndDrop';
import ListBox from '@/components/Dropdown/listBox';
import { CustomDropdown } from '@/components/Dropdown/customDropdown';
import { Modal, SizeType } from '@/components/modal';
import { Cancel } from '@/components/svg/modal/Modal';
import { NoticeIcon } from '@/components/svg/surveys/Surveys';
import { useEffect } from 'react';
import { useSurveyQuestions } from '@/context/surveyContext';

export interface SelectedOptions {
  [questionId: string]: string;
}

function CreateSurvey() {
  const { user } = useUser();
  const navigate = useNavigate();
  const { resetSurvey } = useSurveyQuestions();
  const {
    createSurvey,
    loading,
    surveyTitle,
    duration,
    points,
    surveyQuestions,
    setPoints,
    setDuration,
    setSurveyQuestions,
    setSurveyTitle,
    imagePreview,
    setImagePreview,
    setSurveyBanner,
    isDraftLoading,
    isModalOpen,
    setIsModalOpen,
    deactivateSurvey,
  } = useManageSurvey();

  const handleCreateSurvey = (isActive: boolean) => {
    createSurvey({
      title: surveyTitle,
      duration_of_survey: convertToMinutes(duration?.value as string),
      points_awarded: Number(points) || 0,
      is_active: isActive,
      questions: surveyQuestions,
    });
  };

  const handleDeactivate = async () => {
    await deactivateSurvey();
    handleCreateSurvey(true);
  };

  const allTrue = [surveyTitle, surveyQuestions].every((field) => {
    if (typeof field === 'string') return field.trim() !== '';
    if (Array.isArray(field)) {
      return field.map(
        (question) =>
          question.question_text.trim() !== '' &&
          question.options.map((option) => option.option_text.trim() !== ''),
      );
    }
    return false;
  });

  useEffect(() => {
    const surveyData = sessionStorage.getItem('survey_data');

    if (!surveyData && navigator.onLine) {
      sessionStorage.setItem('survey_data', 'true');
    }
    return () => {
      if (navigator.onLine) {
        sessionStorage.removeItem('survey_data');
      }
      if (!surveyData && navigator.onLine) {
        resetSurvey();
      }
    };
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
          <div className='flex items-start flex-col 560:flex-row 560:justify-between 560:items-center gap-2'>
            <WelcomeMessage
              username={user?.user_name.split(' ')[1]}
              description="Let's review today's insights"
            />
            <div className='w-full 560:w-fit'>
              <Button
                buttonText='Back to survey'
                radius={BorderRadius.Large}
                size={ButtonSize.Small}
                className='float-right !w-fit'
                onClick={() => navigate('/surveys')}
              />
            </div>
          </div>
          <div className='grid'>
            <Card
              hasHeader
              hasBadge
              hasBorder
              mainClass='!mt-4 560:!mt-8'
              className='!border-b-light-secondary-light_blue'
              title='Create new survey'
            >
              <div className='max-w-[620px] mt-10 mb-2'>
                <p className='font-medium text-lg 768:text-xl 880:text-2xl 1024:text-3xl text-light-grey-200 pb-2'>
                  Title of the survey
                </p>
                <Input
                  value={surveyTitle}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    setSurveyTitle(inputValue);
                    inputValue.trim() === '' && setSurveyTitle?.('');
                  }}
                  placeHolder='Enter title of the survey'
                  isCurved
                  hasBorder
                  className='!border-light-blue-50 !drop-shadow-none placeholder:text-light-primary-deep_black placeholder:text-sm 560:placeholder:text-base !h-[55px] 960:!min-h-[70px]'
                />
              </div>
            </Card>
            <SurveyQuestionCard
              setSurveyQuestions={setSurveyQuestions}
              surveyQuestions={surveyQuestions}
            />
            <Card
              hasHeader
              hasBadge
              hasBorder
              className='!border-b-light-secondary-light_blue'
              title='Others'
            >
              <div className='grid grid-cols-[minmax(200px,480px)] 768:grid-cols-[minmax(250px,480px)_minmax(250px,480px)] justify-between gap-5 mt-3 768:mt-0'>
                {OtherList.map((item, id) => (
                  <div key={id} className='max-w-[620px] 768:mt-10 mb-2'>
                    <p className='font-medium text-lg 768:text-xl 880:text-2xl 1024:text-3xl text-light-grey-200 pb-2'>
                      {item.title}
                    </p>
                    {item.id === 'points awarded (optional)' ? (
                      <CustomDropdown
                        selected={points}
                        isCurved
                        placeholder='Enter or select'
                        trailingIcon={<DropDownArrow />}
                        options={awardPoints}
                        onSelect={(val) => setPoints(val)}
                        onChange={(val) => setPoints(val)}
                        className='font-medium text-light-primary-deep_black !h-[55px] 960:!min-h-[70px] !border-light-blue-50 '
                      />
                    ) : (
                      <ListBox
                        selected={duration}
                        options={surveyDuration}
                        trailingIcon={<DropDownArrow />}
                        isCurved
                        onSelect={(value) => {
                          setDuration(value);
                        }}
                        className='font-medium text-light-primary-deep_black !h-[55px] 960:!min-h-[70px]'
                      />
                    )}
                  </div>
                ))}
              </div>
              <DragAndDrop
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
                setSurveyBanner={setSurveyBanner}
              />
              <div className='flex items-center justify-center mt-16 mb-8'>
                <div className='grid w-full max-w-[330px] 880:max-w-[400px] gap-4 '>
                  <Button
                    size={ButtonSize.Large}
                    radius={BorderRadius.Large}
                    buttonText={
                      isDraftLoading ? (
                        <Spinner className='text-light-blue-main w-5 h-5 768:w-7 768:h-7' />
                      ) : (
                        'Save as Draft'
                      )
                    }
                    onClick={() => handleCreateSurvey(false)}
                    className='!min-h-[55px] 960:!min-h-[66px]'
                  />
                  <Button
                    disabled={allTrue ? false : true}
                    size={ButtonSize.Large}
                    radius={BorderRadius.Large}
                    mode='outlined'
                    buttonText={
                      loading ? (
                        <Spinner className='text-light-blue-main w-5 h-5 768:w-7 768:h-7' />
                      ) : (
                        'Save and publish'
                      )
                    }
                    onClick={() => handleCreateSurvey(true)}
                    className='!min-h-[55px] 960:!min-h-[66px]'
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          isBackground
          isCentered
          cancelIcon={<Cancel />}
          size={SizeType.MEDIUM}
          onClick={() => setIsModalOpen(false)}
        >
          <NoticeIcon className='w-16 h-16 880:w-20 880:h-20 ' />
          <div className='pb-5 max-w-[460px] 880:max-w-[560px] text-lg 880:text-[22px] mb-2 mt-2 560:my-3 880:mt-5 text-light-primary-deep_black'>
            A survey is currently active would you like to deactivate and
            publish a new survey?
          </div>
          <div className='w-full max-w-[300px] 880:max-w-[380px]'>
            <Button
              size={ButtonSize.Medium}
              radius={BorderRadius.Large}
              buttonText={
                loading ? (
                  <Spinner className='text-white w-5 h-5 768:w-7 768:h-7' />
                ) : (
                  'Deactivate and Publish'
                )
              }
              onClick={handleDeactivate}
              className='!font-semibold !text-[17px] mb-5'
            />
            <Button
              size={ButtonSize.Medium}
              radius={BorderRadius.Large}
              mode='outlined'
              buttonText='Cancel'
              onClick={() => setIsModalOpen(false)}
              className='!font-semibold !text-[17px]'
            />
          </div>
        </Modal>
      )}
    </AppLayout>
  );
}
export default CreateSurvey;
