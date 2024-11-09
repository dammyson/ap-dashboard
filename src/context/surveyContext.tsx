import { RoleOption } from '@/components/Dropdown/listBox';
import { surveyDuration } from '@/pages/surveys/constants';
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
  duration: RoleOption | null;
  setDuration: React.Dispatch<React.SetStateAction<RoleOption | null>>;
  points: string | number;
  setPoints: React.Dispatch<React.SetStateAction<string | number>>;
  imagePreview: string;
  setImagePreview: React.Dispatch<React.SetStateAction<string>>;
  surveyBanner: string;
  setSurveyBanner: React.Dispatch<React.SetStateAction<string>>;
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
      id: 1,
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
  const [duration, setDuration] = useState<RoleOption | null>(() => {
    const storedDuration = sessionStorage.getItem('survey_duration');
    return storedDuration ? JSON.parse(storedDuration) : surveyDuration[0];
  });
  const [points, setPoints] = useState<number | string>(() => {
    const storedPoints = sessionStorage.getItem('survey_points');
    return storedPoints ? JSON.parse(storedPoints) : '';
  });

  const [imagePreview, setImagePreview] = useState(() => {
    const storedPreviewImage = sessionStorage.getItem(
      'survey_image_preview_url',
    );
    return storedPreviewImage ? storedPreviewImage : '';
  });
  const [surveyBanner, setSurveyBanner] = useState(() => {
    const storedBannerUrl = sessionStorage.getItem('survey_banner');
    return storedBannerUrl ? storedBannerUrl : '';
  });

  const resetSurvey = () => {
    setSurveyTitle('');
    sessionStorage.removeItem('survey_title');
    setSurveyQuestions(defaultQuestion);
    sessionStorage.removeItem('survey_questions');
    setDuration(surveyDuration[0]);
    sessionStorage.removeItem('survey_duration');
    setPoints('');
    sessionStorage.removeItem('survey_points');
    setImagePreview('');
    sessionStorage.removeItem('survey_image_preview_url');
    setSurveyBanner('');
    sessionStorage.removeItem('survey_banner');
  };

  useEffect(() => {
    sessionStorage.setItem('survey_title', surveyTitle);
    sessionStorage.setItem('survey_questions', JSON.stringify(surveyQuestions));
    sessionStorage.setItem('survey_duration', JSON.stringify(duration));
    sessionStorage.setItem('survey_points', JSON.stringify(points));
    sessionStorage.setItem('survey_image_preview_url', imagePreview);
    sessionStorage.setItem('survey_banner', surveyBanner);
  }, [
    surveyTitle,
    surveyQuestions,
    duration,
    points,
    imagePreview,
    surveyBanner,
  ]);

  return (
    <SurveyContext.Provider
      value={{
        surveyTitle,
        setSurveyTitle,
        resetSurvey,
        surveyQuestions,
        setSurveyQuestions,
        duration,
        setDuration,
        points,
        setPoints,
        imagePreview,
        setImagePreview,
        surveyBanner,
        setSurveyBanner,
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
};
