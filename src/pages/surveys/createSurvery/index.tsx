import { BorderRadius, Button, ButtonSize } from '@/components/button';
import { Card } from '@/components/card';
import { Header } from '@/components/header';
import { useWindowSize } from '@/components/hooks/useWindowSize';
import { Input } from '@/components/input';
import { AppLayout } from '@/components/layout/AppLayout';
import { ReactCustomSelect } from '@/components/searchSelect';
import { DropDownArrow } from '@/components/svg/settings/Settings';
import {
  CheckBoxSelect,
  CircledPlus,
  EmptyCircle,
  Photo,
  RadioFilled,
  RadioSelect,
  SmallBin,
} from '@/components/svg/surveys/Surveys';
import WelcomeMessage from '@/components/welcomeMessage';
import { useUser } from '@/context/AppContext';
import { RoleOption } from '@/pages/settings/profile';
import clsx from 'clsx';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { AwardOptions, Options, OtherList, SurveyHeaders } from '../constants';
import { PanelNavigationItem } from '@/components/Panel';

interface SurveyQuestion {
  id: string;
  question: [
    {
      headers: PanelNavigationItem[];
      options: RoleOption[];
    },
  ];
}

interface SelectedOptions {
  [questionId: string]: string;
}

function CreateSurvey() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<SelectedOptions>({});
  const formats: RoleOption[] = [
    {
      label: 'Multiple choice',
      value: 'multiple choice',
      icon: <RadioSelect />,
    },
    {
      label: 'Check boxes',
      value: 'check boxes',
      icon: <CheckBoxSelect />,
    },
  ];

  const [questionOption, setQuestionOption] = useState<RoleOption[]>([
    { label: '', value: 'option1' },
    { label: '', value: 'option2' },
  ]);

  const handleOptionSelect = (questionId: string, optionValue: string) => {
    setSelectedOption((prev) => ({
      ...prev,
      [questionId]: optionValue,
    }));
  };

  const [surveyQuestions, setSurveyQuestions] = useState<SurveyQuestion[]>([
    {
      id: '1',
      question: [
        {
          headers: [...SurveyHeaders],
          options: [...questionOption],
        },
      ],
    },
  ]);

  const handleAddQuestion = () => {
    const newQuestion: SurveyQuestion = {
      id: (surveyQuestions.length + 1).toString(),
      question: [
        {
          headers: [...SurveyHeaders],
          options: [...questionOption],
        },
      ],
    };
    setSurveyQuestions([...surveyQuestions, newQuestion]);
  };

  const handleAddOption = (questionId: string) => {
    setSurveyQuestions((prevQuestions) =>
      prevQuestions.map((question) => {
        if (question.id === questionId) {
          const newOption = {
            label: '',
            value: `option${question.question[0].options.length + 1}`,
          };

          return {
            ...question,
            question: [
              {
                ...question.question[0],
                options: [...question.question[0].options, newOption],
              },
            ],
          };
        }
        return question;
      }),
    );
  };

  const handleOptionChange = (
    questionId: string,
    index: number,
    value: string,
  ) => {
    setSurveyQuestions((prevQuestions) =>
      prevQuestions.map((question) => {
        if (question.id === questionId) {
          const updatedOptions = question.question[0].options.map(
            (option, idx) => {
              if (idx === index) {
                return { ...option, label: value };
              }
              return option;
            },
          );

          return {
            ...question,
            question: [
              {
                ...question.question[0],
                options: updatedOptions,
              },
            ],
          };
        }
        return question;
      }),
    );
  };

  const handleRemoveOption = (questionId: string, optionIndex: number) => {
    setSurveyQuestions((prevQuestions) =>
      prevQuestions.map((question) => {
        if (question.id === questionId) {
          const updatedOptions = question.question[0].options.filter(
            (_, index) => index !== optionIndex,
          );

          return {
            ...question,
            question: [
              {
                ...question.question[0],
                options: updatedOptions,
              },
            ],
          };
        }
        return question;
      }),
    );
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
              <>
                <div className='max-w-[620px] mt-10 mb-2'>
                  <p className='font-medium text-lg 768:text-xl 880:text-2xl 1024:text-3xl text-light-grey-200 pb-2'>
                    Title of the survey
                  </p>
                  <Input
                    placeHolder='Enter title of the survey'
                    isCurved
                    hasBorder
                    className='!border-light-blue-50 !drop-shadow-none placeholder:text-light-primary-deep_black placeholder:text-sm 560:placeholder:text-base !h-[55px] 960:!min-h-[70px]'
                  />
                </div>
              </>
            </Card>
            <Card
              hasHeader
              hasBadge
              hasBorder
              className='!border-b-light-secondary-light_blue'
              title='Add survey question'
            >
              {surveyQuestions.map((item, id) => (
                <div
                  key={id}
                  className='relative grid grid-cols-[minmax(200px,480px)] 768:grid-cols-[minmax(250px,480px)_minmax(250px,480px)] justify-between gap-5 pb-10 mt-3 768:mt-0'
                >
                  {item.question[0].headers.map((question, id) => (
                    <div key={id} className='max-w-[620px] 768:mt-10 mb-2'>
                      <p className='font-medium text-lg 768:text-xl 880:text-2xl 1024:text-3xl text-light-grey-200 pb-2'>
                        {question.title}
                      </p>
                      {question.id === 'option format' ? (
                        <ReactCustomSelect
                          options={formats}
                          isSearchable={false}
                          className=' placeholder:text-light-primary-deep_black placeholder:text-xl font-medium text-light-primary-deep_black !h-[55px] 960:!min-h-[70px]'
                        />
                      ) : (
                        <Input
                          placeHolder='Enter title of the survey'
                          isCurved
                          hasBorder
                          className='!border-light-blue-50 !drop-shadow-none placeholder:text-light-primary-deep_black !h-[55px] 960:!min-h-[70px]'
                        />
                      )}
                    </div>
                  ))}
                  <div className='font-normal text-xl text-light-primary-deep_black'>
                    {item.question[0].options.map((option, id) => (
                      <div key={id} className='flex items-center gap-3 pt-3 '>
                        <EmptyCircle
                          className='cursor-pointer'
                          onClick={() =>
                            handleOptionSelect(item.id, option.value)
                          }
                        >
                          {selectedOption[item.id] === option.value && (
                            <RadioFilled radius={6} />
                          )}
                        </EmptyCircle>
                        <input
                          type='text'
                          value={option.label}
                          onChange={(e) =>
                            handleOptionChange(item.id, id, e.target.value)
                          }
                          placeholder={`Option ${id + 1}`}
                          className='w-full text-lg 640:text-xl 960:text-2xl py-3 border-t-0 border-x-0 border-b border-b-[#C7C7CC] font-normal focus:ring-0 placeholder:text-light-primary-deep_black'
                        />
                      </div>
                    ))}
                  </div>
                  <div className='flex items-start gap-0 560:gap-2 880:gap-3 font-semibold text-light-blue-main'>
                    <div className='flex items-center justify-start'>
                      <Button
                        mode='text'
                        size={ButtonSize.Small}
                        leadingIcon={
                          <CircledPlus className='min-w-5 max-w-5 min-h-4 max-h-6 880:min-w-6 880:max-w-8 880:min-h-6 880:max-h-8 w-full' />
                        }
                        buttonText='Add option'
                        onClick={() => handleAddOption(item.id)}
                        className='!font-semibold !text-light-blue-main text-base 480:!text-[17px] 1300:!text-[18px] pl-0 pr-2 768:!px-0 880:!px-4 text-nowrap !gap-1 880:!gap-2'
                      />
                    </div>
                    <div className='flex items-center justify-start'>
                      <Button
                        mode='text'
                        size={ButtonSize.Small}
                        leadingIcon={
                          <SmallBin
                            className='min-w-5 max-w-5 min-h-4 max-h-6 880:min-w-6 880:max-w-8 880:min-h-6 880:max-h-8 w-full'
                            color={clsx(
                              item.question[0].options.length < 2
                                ? '#B0B0B0'
                                : '#23539f',
                            )}
                          />
                        }
                        buttonText='Remove option'
                        onClick={() => {
                          item.question[0].options.length > 1 &&
                            handleRemoveOption(item.id, id);
                        }}
                        className={clsx(
                          '!font-semibold text-[#B0B0B0] text-base 480:!text-[17px] 1300:!text-[18px] !px-2 768:!px-0 880:!px-4 text-nowrap !gap-1 880:!gap-2',
                          item.question[0].options.length > 1 &&
                            '!text-light-blue-main',
                        )}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <div
                className='
          flex gap-2 items-center justify-end font-semibold text-light-blue-main'
              >
                <Button
                  mode='text'
                  size={ButtonSize.Small}
                  leadingIcon={
                    <CircledPlus className='min-w-5 max-w-5 min-h-4 max-h-6 880:min-w-6 880:max-w-8 880:min-h-6 880:max-h-8 w-full' />
                  }
                  buttonText='Add question'
                  onClick={handleAddQuestion}
                  className='!font-semibold !text-light-blue-main text-base 480:!text-[17px] 1300:!text-[18px] text-nowrap  '
                />
              </div>
            </Card>

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
                          <ReactCustomSelect
                            options={AwardOptions}
                            isClearable
                            isSearchable
                            placeholder='Enter or select'
                            className='!placeholder:text-light-primary-deep_black text-light-primary-deep_black placeholder:text-xl font-medium !h-[55px] 960:!min-h-[70px] '
                          />
                        ) : (
                          <ReactCustomSelect
                            options={Options}
                            isClearable
                            isSearchable
                            placeholder='Enter or select'
                            className='!placeholder:text-light-primary-deep_black placeholder:text-xl font-medium text-light-primary-deep_black !h-[55px] 960:!min-h-[70px]'
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
                      buttonText='Save and publish'
                      onClick={() => {}}
                      className='!min-h-[55px] 960:!min-h-[66px]'
                    />
                  </div>
                </div>
              </>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
export default CreateSurvey;
