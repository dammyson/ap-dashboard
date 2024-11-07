import { useManageSurvey } from '@/api/surveys/surveys';
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
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import SurveyQuestionCard from '../createSurvery/questions';
import { awardPoints, OtherList, surveyDuration } from '../constants';
import { convertToMinutes } from '@/utils';
import { DragAndDrop } from '@/components/dragAndDrop';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Spinner } from '@/components/svg/spinner/Spinner';
import { CustomDropdown } from '@/components/Dropdown/customDropdown';
import ListBox from '@/components/Dropdown/listBox';

function EditSurvey({}) {
  const { titleId, surveyId } = useParams();
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    showSurvey,
    surveyQuestions,
    setSurveyQuestions,
    showLoading,
    surveyTitle,
    setSurveyTitle,
    duration,
    setDuration,
    points,
    setPoints,
    imagePreview,
    setImagePreview,
    surveyBanner,
    setSurveyBanner,
    changeSurveyBanner,
    editSurvey,
    editLoading,
  } = useManageSurvey();

  const id = Number(surveyId);
  useEffect(() => {
    id && showSurvey(id);
  }, []);

  const handleEditsurvey = (id: number) => {
    editSurvey(id, {
      title: surveyTitle,
      duration_of_survey: convertToMinutes(duration?.value as string),
      points_awarded: Number(points) || 0,
      is_active: true, // will modifly later
      questions: surveyQuestions,
    });
  };

  useEffect(() => {
    return () => {
      sessionStorage.removeItem('survey_title');
      setSurveyTitle('');
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
          {showLoading ? (
            <div className='text-black h-[70svh] w-full flex justify-center items-center'>
              <Spin
                indicator={
                  <LoadingOutlined
                    className='!text-[38px] 640:!text-[55px]'
                    spin
                  />
                }
              />
            </div>
          ) : (
            <div className='grid'>
              <Card
                hasHeader
                hasBadge
                hasBorder
                mainClass='!mt-4 560:!mt-8'
                className='!border-b-light-secondary-light_blue'
                title={`Edit survey: ${titleId}`}
              >
                <>
                  <div className='max-w-[620px] mt-10 mb-2'>
                    <p className='font-medium text-lg 768:text-xl 880:text-2xl 1024:text-3xl text-light-grey-200 pb-2'>
                      Title of the survey
                    </p>
                    <Input
                      value={surveyTitle}
                      onChange={(e) => setSurveyTitle(e.target.value)}
                      placeHolder='In-flight experience'
                      isCurved
                      hasBorder
                      className='!border-light-blue-50 !drop-shadow-none placeholder:text-light-primary-deep_black placeholder:text-sm 560:placeholder:text-base !h-[55px] 960:!min-h-[70px]'
                    />
                  </div>
                </>
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
                <>
                  <div className='grid grid-cols-[minmax(200px,480px)] 768:grid-cols-[minmax(250px,480px)_minmax(250px,480px)] justify-between gap-5 mt-3 768:mt-0'>
                    {OtherList.map((item) => (
                      <>
                        <div className='max-w-[620px] 768:mt-10 mb-2'>
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
                      </>
                    ))}
                  </div>
                  <DragAndDrop
                    imagePreview={imagePreview}
                    setImagePreview={setImagePreview}
                    setSurveyBanner={setSurveyBanner}
                  />
                  <div className='flex items-center justify-center mt-16 mb-8'>
                    <div className='grid w-full max-w-[330px] 880:max-w-[400px] gap-4'>
                      <Button
                        size={ButtonSize.Large}
                        radius={BorderRadius.Large}
                        trailingIcon={<DropDownArrow color='#23539F' />}
                        buttonText='Schedule for later'
                        onClick={() => {}}
                        className='!min-h-[55px] 960:!min-h-[66px]'
                      />
                      <Button
                        size={ButtonSize.Large}
                        radius={BorderRadius.Large}
                        mode='outlined'
                        buttonText={
                          editLoading ? (
                            <Spinner className='text-light-blue-main w-5 h-5 768:w-7 768:h-7' />
                          ) : (
                            'Save and publish'
                          )
                        }
                        onClick={() => {
                          handleEditsurvey(id);
                          surveyBanner && changeSurveyBanner(id, surveyBanner);
                        }}
                        className='!min-h-[55px] 960:!min-h-[66px]'
                      />
                    </div>
                  </div>
                </>
              </Card>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
export default EditSurvey;
