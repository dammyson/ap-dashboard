import { Card } from '@/components/card';
import { Input } from '@/components/input';
import { SurveyQuestion } from '@/types/types';
import {
  CheckBoxSelect,
  CircledPlus,
  EmptyBoxSelect,
  EmptyCircle,
  RadioSelect,
  SmallBin,
} from '@/components/svg/surveys/Surveys';
import { Button, ButtonSize } from '@/components/button';
import clsx from 'clsx';
import { RoleOption } from '@/pages/settings/profile';
import { DropDownArrow } from '@/components/svg/settings/Settings';
import ListBox from '@/components/Dropdown/listBox';
import { useSurveyForm } from '../utils';
import { Cancel } from '@/components/svg/modal/Modal';
import { useState } from 'react';

export const optionFormats: RoleOption[] = [
  {
    label: 'Single choice',
    value: 0,
    icon: <RadioSelect />,
  },
  {
    label: 'Multi choice',
    value: 1,
    icon: <CheckBoxSelect />,
  },
];

interface props {
  surveyQuestions: SurveyQuestion[];
  setSurveyQuestions: React.Dispatch<React.SetStateAction<SurveyQuestion[]>>;
  surveyId?: number;
  setQuestionId?: React.Dispatch<React.SetStateAction<string>>;
  setIsDeleteQuestionModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface deleteIcon {
  questionId: string | null;
  optionId: number | null;
  visible: boolean;
}

const SurveyQuestionCard = ({
  surveyQuestions,
  setSurveyQuestions,
  surveyId,
  setQuestionId,
  setIsDeleteQuestionModalOpen,
}: props) => {
  const [showDeleteIcon, setShowDeleteIcon] = useState<deleteIcon>({
    questionId: null,
    optionId: null,
    visible: false,
  });
  const {
    handleSelectFormat,
    handleAddQuestion,
    handleRemoveQuestion,
    handleAddOption,
    handleOptionChange,
    handleRemoveOption,
    handleQuestionText,
    handleHideIcon,
    handleDisplayIcon,
  } = useSurveyForm({ surveyQuestions, setSurveyQuestions, setShowDeleteIcon });

  return (
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
          <div className='max-w-[620px] 768:mt-10 mb-2'>
            <p className='font-medium text-lg 768:text-xl 880:text-2xl 1024:text-3xl text-light-grey-200 pb-2'>
              Question
            </p>
            <Input
              value={item.question_text}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleQuestionText(e, item.id)
              }
              placeHolder='Enter title of the survey'
              isCurved
              hasBorder
              className='!border-light-blue-50 !drop-shadow-none placeholder:text-light-primary-deep_black !h-[55px] 960:!min-h-[70px]'
            />
          </div>
          <div className='max-w-[620px] 768:mt-10 mb-2'>
            <p className='font-medium text-lg 768:text-xl 880:text-2xl 1024:text-3xl text-light-grey-200 pb-2'>
              Option format
            </p>

            <ListBox
              trailingIcon={<DropDownArrow />}
              selected={optionFormats[item.is_multiple_choice]}
              options={optionFormats}
              onSelect={(format) => handleSelectFormat(item.id, format)}
              isCurved
              className=' placeholder:!text-light-primary-deep_black placeholder:!text-xl font-medium text-light-primary-deep_black !h-[55px] 960:!min-h-[70px]'
            />
          </div>
          <div className='font-normal text-xl text-light-primary-deep_black'>
            {item.options.map((option, id) => (
              <div key={id} className='flex items-center gap-3 pt-3 '>
                {optionFormats[item.is_multiple_choice].value === 0 ? (
                  <EmptyCircle />
                ) : (
                  <EmptyBoxSelect />
                )}
                <div className='relative'>
                  <input
                    type='text'
                    value={option.option_text}
                    onChange={(e) =>
                      handleOptionChange(item.id, id, e.target.value)
                    }
                    onFocus={() => handleDisplayIcon(item.id, id)}
                    onBlur={() => handleHideIcon(item.id, id)}
                    placeholder={`Option ${id + 1}`}
                    className='w-[90%] text-lg 640:text-xl 960:text-2xl py-3 pr-9 border-t-0 border-x-0 border-b border-b-[#C7C7CC] font-normal focus:ring-0 placeholder:text-light-primary-deep_black'
                  />
                  {showDeleteIcon.questionId === item.id &&
                    showDeleteIcon.optionId === id &&
                    showDeleteIcon.visible &&
                    item.options.length !== 1 && (
                      <span
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleRemoveOption(item.id, id);
                        }}
                        className={clsx(
                          'absolute right-[31px] transform top-1/2 -translate-y-3 cursor-pointer',
                        )}
                      >
                        <Cancel color='#D02626' />
                      </span>
                    )}
                </div>
              </div>
            ))}
          </div>
          <div className='flex flex-col justify-between items-start gap-0 560:gap-2 880:gap-3 font-semibold text-light-blue-main'>
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
            {item.id !== '1' && (
              <div className='flex justify-end items-center w-full '>
                <Button
                  mode='text'
                  size={ButtonSize.Small}
                  leadingIcon={
                    <SmallBin className='min-w-5 max-w-5 min-h-4 max-h-6 880:min-w-6 880:max-w-8 880:min-h-6 880:max-h-8 w-full' />
                  }
                  buttonText='Remove question'
                  onClick={() => {
                    if (surveyId) {
                      setQuestionId?.(item.id);
                      setIsDeleteQuestionModalOpen?.(true);
                    } else handleRemoveQuestion(item.id);
                  }}
                  className='!font-semibold !text-light-blue-main text-base 480:!text-[17px] 1300:!text-[18px] pl-0 pr-2 768:!px-0 880:!px-4 text-nowrap !gap-1 880:!gap-2'
                />
              </div>
            )}
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
  );
};

export default SurveyQuestionCard;
