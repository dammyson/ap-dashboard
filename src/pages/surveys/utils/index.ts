import { useState } from 'react';
import { SurveyOption, SurveyQuestion } from '@/types/types';

const questionOption: SurveyOption[] = [
  { option_text: '', value: 'option1' },
  { option_text: '', value: 'option2' },
];

export const useSurveyForm = () => {
  const [surveyTitle, setSurveyTitle] = useState('');
  const [duration, setDuration] = useState<number>(0);
  const [points, setPoints] = useState<number>(0);
  const [image, setImage] = useState('some url');
  const [questionText, setQuestionText] = useState('');
  const [surveyQuestions, setSurveyQuestions] = useState<SurveyQuestion[]>([
    {
      id: '1',
      questions: [
        {
          question_text: questionText,
          options: [...questionOption],
        },
      ],
    },
  ]);

  const handleAddQuestion = () => {
    const newQuestion: SurveyQuestion = {
      id: (surveyQuestions.length + 1).toString(),
      questions: [
        {
          question_text: questionText,
          options: [...questionOption],
        },
      ],
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
            value: `option${question.questions[0].options.length + 1}`,
          };

          return {
            ...question,
            questions: [
              {
                ...question.questions[0],
                options: [...question.questions[0].options, newOption],
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
          const updatedOptionsText = question.questions[0].options.map(
            (option, idx) => {
              if (idx === index) {
                return { ...option, option_text: value };
              }
              return option;
            },
          );
          return {
            ...question,
            questions: [
              {
                ...question.questions[0],
                options: updatedOptionsText,
              },
            ],
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
          const updatedOptions = question.questions[0].options.slice(0, -1);
          return {
            ...question,
            questions: [
              {
                ...question.questions[0],
                options: updatedOptions,
              },
            ],
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
    setSurveyQuestions((prev) =>
      prev.map((quest) => {
        if (quest.id === questionId) {
          return {
            ...quest,
            questions: [
              {
                ...quest.questions[0],
                question_text: e.target.value,
              },
            ],
          };
        }
        return quest;
      }),
    );
  };

  return {
    surveyTitle,
    setSurveyTitle,
    duration,
    setDuration,
    points,
    setPoints,
    image,
    setImage,
    questionText,
    setQuestionText,
    surveyQuestions,
    setSurveyQuestions,
    handleAddQuestion,
    handleRemoveQuestion,
    handleAddOption,
    handleOptionChange,
    handleRemoveOption,
    handleQuestionText,
  };
};
