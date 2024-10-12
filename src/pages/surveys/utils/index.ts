import { SurveyOption, SurveyQuestion } from '@/types/types';
import { RoleOption } from '@/pages/settings/profile';

export const questionOption: SurveyOption[] = [
  { option_text: '', value: 'option1' },
  { option_text: '', value: 'option2' },
];

interface props {
  surveyQuestions: SurveyQuestion[];
  setSurveyQuestions: React.Dispatch<React.SetStateAction<SurveyQuestion[]>>;
}

export const useSurveyForm = ({
  surveyQuestions,
  setSurveyQuestions,
}: props) => {
  const handleSelectFormat = (id: string, format: RoleOption) => {
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
      id: (surveyQuestions.length + 1).toString(),
      question_text: '',
      is_multiple_choice: 0,
      options: [...questionOption],
    };
    setSurveyQuestions([...surveyQuestions, newQuestion]);
  };

  const handleRemoveQuestion = (questionId: string) => {
    setSurveyQuestions((prevQuestion) =>
      prevQuestion.filter((question) => question.id !== questionId),
    );
  };

  const handleAddOption = (questionId: string) => {
    setSurveyQuestions((prevQuestion) =>
      prevQuestion.map((question) => {
        if (question.id === questionId) {
          const newOption = {
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

  const handleOptionChange = (
    questionId: string,
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

  const handleRemoveOption = (questionId: string) => {
    setSurveyQuestions((prevQuestions) =>
      prevQuestions.map((question) => {
        if (question.id === questionId) {
          const updatedOptions = question.options.slice(0, -1);
          return {
            ...question,
            options: updatedOptions,
          };
        }
        return question;
      }),
    );
  };

  const handleQuestionText = (
    e: React.ChangeEvent<HTMLInputElement>,
    questionId: string,
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
  };
};
