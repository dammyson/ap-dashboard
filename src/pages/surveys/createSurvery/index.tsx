import { BorderRadius, Button, ButtonSize } from '@/components/button';
import { Card } from '@/components/card';
import { Header } from '@/components/header';
import { useWindowSize } from '@/components/hooks/useWindowSize';
import { Input } from '@/components/input';
import { AppLayout } from '@/components/layout/AppLayout';
import { DropDownArrow } from '@/components/svg/settings/Settings';
import { Photo } from '@/components/svg/surveys/Surveys';
import WelcomeMessage from '@/components/welcomeMessage';
import { useUser } from '@/context/AppContext';
import clsx from 'clsx';
import { useNavigate } from 'react-router';
import { awardPoints, OtherList, surveyDuration } from './constants';
import SurveyQuestionCard from './questions';
import { useCreateSurvey } from '@/api/surveys/surveys';
import { Spinner } from '@/components/svg/spinner/Spinner';
import { CustomCombobox } from '../../../components/Dropdown/comboBox';
import { useSurveyForm } from '../utils';
import { convertToMinutes } from '@/utils';

export interface SelectedOptions {
  [questionId: string]: string;
}

function CreateSurvey() {
  const { user } = useUser();
  const navigate = useNavigate();
  const { createSurvey, loading } = useCreateSurvey();
  const {
    surveyTitle,
    setSurveyTitle,
    duration,
    setDuration,
    points,
    setPoints,
    image,
    setImage,
    surveyQuestions,
    selectedOption,
    checkedOption,
    handleAddQuestion,
    handleCheckselect,
    handleOptionSelect,
    handleRemoveQuestion,
    handleAddOption,
    handleOptionChange,
    handleRemoveOption,
    handleQuestionText,
  } = useSurveyForm();

  const handleCreateSurvey = () => {
    createSurvey({
      title: surveyTitle,
      duration_of_survey: duration,
      points_awarded: points,
      image_url: image,
      questions: surveyQuestions,
    });
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
                  onChange={(e) => setSurveyTitle(e.target.value)}
                  placeHolder='Enter title of the survey'
                  isCurved
                  hasBorder
                  className='!border-light-blue-50 !drop-shadow-none placeholder:text-light-primary-deep_black placeholder:text-sm 560:placeholder:text-base !h-[55px] 960:!min-h-[70px]'
                />
              </div>
            </Card>
            <SurveyQuestionCard
              handleAddQuestion={handleAddQuestion}
              handleOptionSelect={handleOptionSelect}
              handleRemoveQuestion={handleRemoveQuestion}
              handleAddOption={handleAddOption}
              handleOptionChange={handleOptionChange}
              handleRemoveOption={handleRemoveOption}
              handleQuestionText={handleQuestionText}
              handleCheckselect={handleCheckselect}
              surveyQuestions={surveyQuestions}
              selectedOption={selectedOption}
              checkedOPtion={checkedOption}
            />
            <Card
              hasHeader
              hasBadge
              hasBorder
              className='!border-b-light-secondary-light_blue'
              title='Others'
            >
              <div className='grid grid-cols-[minmax(200px,480px)] 768:grid-cols-[minmax(250px,480px)_minmax(250px,480px)] justify-between gap-5 mt-3 768:mt-0'>
                {OtherList.map((item) => (
                  <>
                    <div className='max-w-[620px] 768:mt-10 mb-2'>
                      <p className='font-medium text-lg 768:text-xl 880:text-2xl 1024:text-3xl text-light-grey-200 pb-2'>
                        {item.title}
                      </p>
                      {item.id === 'points awarded (optional)' ? (
                        <CustomCombobox
                          options={awardPoints}
                          trailingIcon={<DropDownArrow />}
                          isCurved
                          onSelect={(value) => {
                            setPoints(Number(value));
                          }}
                          className='font-medium text-light-primary-deep_black !h-[55px] 960:!min-h-[70px]'
                        />
                      ) : (
                        <CustomCombobox
                          options={surveyDuration}
                          trailingIcon={<DropDownArrow />}
                          isCurved
                          onSelect={(value) => {
                            const minutes = convertToMinutes(value.toString());
                            setDuration(minutes);
                          }}
                          className='font-medium text-light-primary-deep_black !h-[55px] 960:!min-h-[70px]'
                        />
                      )}
                    </div>
                  </>
                ))}
              </div>
              <div className='w-full'>
                <div className='max-w-[620px] mt-10 mb-2'>
                  <p className='font-medium text-xl 960:text-[26px] 1024:text-3xl text-light-grey-200 pb-2'>
                    Add image/banner
                  </p>
                </div>
                <div className='w-full rounded-[50px] border border-light-blue-50 flex flex-col gap-2 items-center justify-center p-10'>
                  <Photo className='w-12 h-12 640:w-14 640:h-14 960:w-16 960:h-16 1400:w-20 1400:h-20' />
                  <div className=' w-full max-w-[139px] 768:max-w-[159px] pb-4'>
                    <Button
                      size={ButtonSize.Medium}
                      radius={BorderRadius.Large}
                      buttonText='Browse'
                      className='!min-h-[30px] max-h-[35px] !text-[14px] 768:!text-base 768:!min-h-[40px] 960:!min-h-[44px]'
                      onClick={() => {}}
                    />
                  </div>
                  <p className='text-[#8E8E93] text-center 560:text-start text-base 768:text-lg 1240:text-xl font-normal'>
                    Drag and drop a file here
                  </p>
                  <p className='text-light-primary-deep_black text-base text-center 560:text-start 768:text-lg 1240:text-xl font-medium'>
                    File supported .png, .jpg & .webp
                  </p>
                </div>
              </div>
              <div className='flex items-center justify-center mt-16 mb-8'>
                <div className='grid w-full max-w-[330px] 880:max-w-[400px] gap-4 '>
                  <Button
                    size={ButtonSize.Large}
                    trailingIcon={<DropDownArrow color='#23539F' />}
                    radius={BorderRadius.Large}
                    buttonText='Schedule for later'
                    onClick={() => {}}
                    className='!min-h-[55px] 960:!min-h-[66px]'
                  />
                  <Button
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
                    onClick={handleCreateSurvey}
                    className='!min-h-[55px] 960:!min-h-[66px]'
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
export default CreateSurvey;
