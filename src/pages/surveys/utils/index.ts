import { SurveyOption, SurveyQuestion } from '@/types/types';
import { RoleOption } from '@/pages/settings/profile';
import { deleteIcon } from '../createSurvery/questions';

export const questionOption: SurveyOption[] = [
  { id: 1, option_text: '', value: 'option1' },
  { id: 2, option_text: '', value: 'option2' },
];

interface props {
  surveyQuestions: SurveyQuestion[];
  setSurveyQuestions: React.Dispatch<React.SetStateAction<SurveyQuestion[]>>;
  setShowDeleteIcon: React.Dispatch<deleteIcon>;
}

export const useSurveyForm = ({
  surveyQuestions,
  setSurveyQuestions,
  setShowDeleteIcon,
}: props) => {
  const handleSelectFormat = (id: number, format: RoleOption) => {
    setSurveyQuestions((prevQuestions) =>
      prevQuestions.map((question) => {
        if (question.id === id) {
          return {
            ...question,
            is_multiple_choice: Number(format.value),
          };
        }
        return question;
      }),
    );
  };

  const handleAddQuestion = () => {
    const newQuestion: SurveyQuestion = {
      id: surveyQuestions.length + 1,
      question_text: '',
      is_multiple_choice: 0,
      options: [...questionOption],
    };
    setSurveyQuestions([...surveyQuestions, newQuestion]);
  };

  const handleRemoveQuestion = (questionId: number) => {
    setSurveyQuestions((prevQuestion) =>
      prevQuestion.filter((question) => question.id !== questionId),
    );
  };

  const handleAddOption = (questionId: number) => {
    setSurveyQuestions((prevQuestion) =>
      prevQuestion.map((question) => {
        if (question.id === questionId) {
          const newOption = {
            id: question.options.length + 1,
            option_text: '',
            value: `option${question.options.length + 1}`,
          };

          return {
            ...question,
            options: [...question.options, newOption],
          };
        }
        return question;
      }),
    );
  };

  const handleDisplayIcon = (questionId: number, index: number) => {
    setShowDeleteIcon({
      questionId: questionId,
      optionId: index,
      visible: true,
    });
  };

  const handleHideIcon = (questionId: number, index: number) => {
    setShowDeleteIcon({
      questionId: questionId,
      optionId: index,
      visible: false,
    });
  };

  const handleOptionChange = (
    questionId: number,
    index: number,
    value: string,
  ) => {
    setSurveyQuestions((prevQuestions) =>
      prevQuestions.map((question) => {
        if (question.id === questionId) {
          const updatedOptionsText = question.options.map((option, idx) => {
            if (idx === index) {
              return { ...option, option_text: value };
            }
            return option;
          });
          return {
            ...question,
            options: updatedOptionsText,
          };
        }
        return question;
      }),
    );
  };

  const handleRemoveOption = (questionId: number, index: number) => {
    setSurveyQuestions((prevQuestions) =>
      prevQuestions.map((question) => {
        if (question.id === questionId) {
          const updatedOtions = question.options.filter(
            (_, idx) => idx !== index,
          );
          return {
            ...question,
            options: updatedOtions,
          };
        }
        return question;
      }),
    );
  };

  const handleQuestionText = (
    e: React.ChangeEvent<HTMLInputElement>,
    questionId: number,
  ) => {
    const newValue = e.target.value;
    setSurveyQuestions((prev) =>
      prev.map((quest) => {
        if (quest.id === questionId) {
          return {
            ...quest,
            question_text: newValue,
          };
        }
        return quest;
      }),
    );
  };

  return {
    surveyQuestions,
    handleSelectFormat,
    setSurveyQuestions,
    handleAddQuestion,
    handleRemoveQuestion,
    handleAddOption,
    handleOptionChange,
    handleRemoveOption,
    handleQuestionText,
    handleHideIcon,
    handleDisplayIcon,
  };
};
