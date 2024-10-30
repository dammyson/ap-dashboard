import { RoleOption } from '@/components/Dropdown/listBox';
import { useUser } from '@/context/AppContext';
import { surveyDuration } from '@/pages/surveys/constants';
import { questionOption } from '@/pages/surveys/utils';
import {
  CreateSurvey,
  FilterSurveyTable,
  MutationErrorPayload,
  SurveyQuestion,
} from '@/types/types';
import { convertFromMinutes } from '@/utils';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

export const useSurvey = () => {
  const { token } = useUser();
  const [surveys, setSurveys] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [surveyModal, setSurveyModal] = useState(false);
  const [surveyTitle, setSurveyTitle] = useState<string | undefined>(undefined);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [isSucess, setIsSucess] = useState(false);
  const getSurvey = async (value: FilterSurveyTable) => {
    try {
      setIsLoading(true);
      const data = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}admin/surveys/survey-table`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: value.title,
            from_date: value.startDate,
            to_date: value.endDate,
          }),
        },
      );
      const res = await data.json();
      setIsLoading(false);
      if (res?.error) {
        toast.error(res.message);
        setIsSucess(false);
      } else {
        setSurveys(res.surveys);
        setIsSucess(true);
        setSurveyTitle(undefined);
        setStartDate(undefined);
        setEndDate(undefined);
      }
    } catch (error) {
      toast.error((error as MutationErrorPayload)?.data?.message);
    }
  };

  const tooglePublish = async (id: number) => {
    try {
      setLoading(true);
      const data = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}admin/surveys/${id}/toogle-publish-survey`,
        {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const res = await data.json();
      setLoading(false);
      if (res?.error) {
      } else {
        setSurveyModal(false);
        await getSurvey({});
        toast.success(res.message);
      }
    } catch (error) {
      toast.error((error as MutationErrorPayload)?.data?.message);
    }
  };

  return {
    getSurvey,
    surveys,
    isLoading,
    tooglePublish,
    loading,
    surveyModal,
    setSurveyModal,
    surveyTitle,
    setSurveyTitle,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    isSucess,
  };
};

export const useManageSurvey = () => {
  const { token } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [survey, setSurvey] = useState<CreateSurvey>();
  const [surveyTitle, setSurveyTitle] = useState('');
  const [duration, setDuration] = useState<RoleOption | null>(
    surveyDuration[0],
  );
  const [points, setPoints] = useState<number | string>('');
  const [imagePreview, setImagePreview] = useState('');
  const [surveyBanner, setSurveyBanner] = useState<File | null>(null);
  const [showLoading, setShowLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  const [surveyQuestions, setSurveyQuestions] = useState<SurveyQuestion[]>([
    {
      id: '1',
      question_text: '',
      is_multiple_choice: 0,
      options: [...questionOption],
    },
  ]);

  const getRoleOptionFromDuration = (val: number) => {
    const convertedVal = convertFromMinutes(val);
    const matchingOption = surveyDuration.find(
      (option) => option.value === convertedVal,
    );
    return matchingOption || null;
  };

  const createSurvey = async (value: CreateSurvey) => {
    try {
      setLoading(true);
      const data = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}admin/surveys/create-survey`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'content-type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            title: value.title,
            duration_of_survey: value.duration_of_survey,
            points_awarded: value.points_awarded,
            questions: value.questions.map((x) => x),
          }),
        },
      );
      const res = await data.json();
      setLoading(false);
      if (res?.errors) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
        navigate('/surveys');
      }
    } catch (error) {
      toast.error((error as MutationErrorPayload)?.data?.message);
    }
  };

  const showSurvey = async (id: number) => {
    try {
      setShowLoading(true);
      const data = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}admin/surveys/${id}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const res = await data.json();
      setShowLoading(false);

      if (res?.error) {
        toast.error(res.message);
      } else {
        const surveyData = res.surveyData.survey;
        setSurvey(surveyData);
        setSurveyTitle(surveyData.title);
        setSurveyQuestions(surveyData.questions);
        setDuration(getRoleOptionFromDuration(surveyData.duration_of_survey));
        setPoints(surveyData.points_awarded);
        setImagePreview(res.surveyData.image_url_link);
      }
    } catch (error) {
      toast.error((error as MutationErrorPayload)?.data?.message);
    }
  };

  const changeSurveyBanner = async (id: number, image: File) => {
    const bannerImage = new FormData();
    bannerImage.append('image_url', image);
    try {
      setImageLoading(true);
      const data = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}admin/surveys/${id}/update-survey-image`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
          body: bannerImage,
        },
      );
      const res = await data.json();
      setImageLoading(false);
      if (res?.error) {
        toast.error(res.message);
      } else {
        console.log(res);
      }
    } catch (error) {
      toast.error((error as MutationErrorPayload)?.data?.message);
    }
  };

  const editSurvey = async (id: number, value: CreateSurvey) => {
    try {
      setEditLoading(true);
      const data = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}admin/surveys/${id}/edit`,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: value.title,
            duration_of_survey: value.duration_of_survey,
            points_awarded: value.points_awarded,
            questions: value.questions.map((x) => x),
          }),
        },
      );

      const res = await data.json();
      setEditLoading(false);

      if (res?.error) {
        toast.error(res.message);
      } else {
        toast.success('Edited survey successfully!');
        navigate('/surveys');
      }
    } catch (error) {
      toast.error((error as MutationErrorPayload)?.data?.message);
    }
  };

  return {
    createSurvey,
    loading,
    setLoading,
    showSurvey,
    survey,
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
    imageLoading,
  };
};
