import { useUser } from '@/context/AppContext';
import { CreateSurvey, MutationErrorPayload } from '@/types/types';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

export const useSurvey = () => {
  const { token } = useUser();
  const [surveys, setSurveys] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [surveyModal, setSurveyModal] = useState(false);
  const getSurvey = async () => {
    try {
      setIsLoading(true);
      const data = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}admin/surveys/survey-table`,
        {
          method: 'GET',
          headers: {
            Accept: 'aplication/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const res = await data.json();
      setIsLoading(false);
      if (res?.error) {
        toast.error(res.message);
      } else {
        setSurveys(res.survey_data);
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
            Accept: 'aplication/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const res = await data.json();
      setLoading(false);
      if (res?.error) {
      } else {
        setSurveyModal(false);
        await getSurvey();
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
  };
};

export const useCreateSurvey = () => {
  const { token } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
            image_url: value.image_url,
            questions: value.questions.map((x) => x.questions[0]),
          }),
        },
      );
      const res = await data.json();
      setLoading(false);
      if (res?.errors) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
        // navigate('/surveys');
      }
    } catch (error) {
      toast.error((error as MutationErrorPayload)?.data?.message);
    }
  };

  return {
    createSurvey,
    loading,
    setLoading,
  };
};
