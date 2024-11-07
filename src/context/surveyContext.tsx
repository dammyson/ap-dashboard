import { questionOption } from '@/pages/surveys/utils';
import { SurveyQuestion } from '@/types/types';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface SurveyQuestionType {
  surveyTitle: string;
  setSurveyTitle: React.Dispatch<React.SetStateAction<string>>;
  resetSurvey: () => void;
  surveyQuestions: SurveyQuestion[];
  setSurveyQuestions: React.Dispatch<React.SetStateAction<SurveyQuestion[]>>;
}
const SurveyContext = createContext<SurveyQuestionType | undefined>(undefined);

export const useSurveyQuestions = () => {
  const context = useContext(SurveyContext);

  if (!context) {
    throw new Error('useSurveyQuestions must be used within a SurveyProvider');
  }
  return context;
};

interface SurveyProviderProps {
  children: ReactNode;
}

export const SurveyProvider: React.FC<SurveyProviderProps> = ({ children }) => {
  const defaultQuestion: SurveyQuestion[] = [
    {
      id: '1',
      question_text: '',
      is_multiple_choice: 0,
      options: [...questionOption],
    },
  ];
  const [surveyTitle, setSurveyTitle] = useState<string>(() => {
    const storedTitle = sessionStorage.getItem('survey_title');
    return storedTitle ? storedTitle : '';
  });
  const [surveyQuestions, setSurveyQuestions] = useState<SurveyQuestion[]>(
    () => {
      const storedQuestion = sessionStorage.getItem('survey_questions');
      return storedQuestion ? JSON.parse(storedQuestion) : defaultQuestion;
    },
  );

  const resetSurvey = () => {
    setSurveyTitle('');
    sessionStorage.removeItem('survey_title');
    setSurveyQuestions(defaultQuestion);
    sessionStorage.removeItem('survey_questions');
  };

  useEffect(() => {
    sessionStorage.setItem('survey_title', surveyTitle);
    sessionStorage.setItem('survey_questions', JSON.stringify(surveyQuestions));
  }, [surveyTitle, surveyQuestions]);

  return (
    <SurveyContext.Provider
      value={{
        surveyTitle,
        setSurveyTitle,
        resetSurvey,
        surveyQuestions,
        setSurveyQuestions,
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
};
