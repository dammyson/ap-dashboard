import { baseURL } from '@/constants/constants';
import { useUser } from '@/context/AppContext';
import { useSurveyQuestions } from '@/context/surveyContext';
import { surveyDuration } from '@/pages/surveys/constants';
import {
  CreateSurvey,
  FilterSurveyTable,
  MutationErrorPayload,
} from '@/types/types';
import { convertFromMinutes } from '@/utils';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

export const useSurvey = () => {
  const { token } = useUser();
  const { setisDeactivating, isDeactivating, deactivateSurvey } =
    useManageSurvey();
  const [surveys, setSurveys] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [surveyModal, setSurveyModal] = useState(false);
  const [surveyTitle, setSurveyTitle] = useState<string | undefined>(undefined);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [isSucess, setIsSucess] = useState(false);
  const [viewDelete, setViewDelete] = useState(false);
  const [endActiveSurvey, setEndActiveSurvey] = useState(false);
  const getSurvey = async (value: FilterSurveyTable) => {
    try {
      setIsLoading(true);
      const data = await fetch(`${baseURL}admin/surveys/survey-table`, {
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
      });
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
      if (endActiveSurvey) {
        setisDeactivating(true);
      } else setLoading(true);
      const data = await fetch(
        `${baseURL}admin/surveys/${id}/toogle-publish-survey`,
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
        if (res.message.includes('active')) {
          setSurveyModal(false);
          setEndActiveSurvey(true);
        }
      } else {
        setSurveyModal(false);
        setEndActiveSurvey(false);
        setisDeactivating(false);
        await getSurvey({});
        toast.success(res.message);
      }
    } catch (error) {
      toast.error((error as MutationErrorPayload)?.data?.message);
    }
  };

  const deleteSurvey = async (id: number) => {
    try {
      setLoading(true);
      const data = await fetch(`${baseURL}admin/surveys/${id}/delete`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'content-type': 'application/json',
        },
      });
      const res = await data.json();
      setLoading(false);
      if (res?.error) {
        toast.error(res.message);
      } else {
        setViewDelete(false);
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
    viewDelete,
    setViewDelete,
    deleteSurvey,
    endActiveSurvey,
    setEndActiveSurvey,
    isDeactivating,
    deactivateSurvey,

    surveyInfo: {},
  };
};

export const useManageSurvey = () => {
  const { token } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [survey, setSurvey] = useState<CreateSurvey>();
  const [showLoading, setShowLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [isDraftLoading, setIsDraftLoading] = useState(false);
  const [endActiveSurvey, setEndActiveSurvey] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [questionId, setQuestionId] = useState<number>();
  const [optionId, setOptionId] = useState<number>();
  const [isDeactivating, setisDeactivating] = useState(false);
  const {
    surveyTitle,
    setSurveyTitle,
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
  } = useSurveyQuestions();

  const getRoleOptionFromDuration = (val: number) => {
    const convertedVal = convertFromMinutes(val);
    const matchingOption = surveyDuration.find(
      (option) => option.value === convertedVal,
    );
    return matchingOption || null;
  };

  const createSurvey = async (value: CreateSurvey) => {
    try {
      if (!value.is_active) {
        setIsDraftLoading(true);
      } else if (endActiveSurvey) {
        setisDeactivating(true);
      } else setLoading(true);

      const data = await fetch(`${baseURL}admin/surveys/create-survey`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json',
          Accept: 'application/json',
        },
        body: value.image_url
          ? JSON.stringify({
              title: value.title,
              image_url: value.image_url,
              duration_of_survey: value.duration_of_survey,
              points_awarded: value.points_awarded,
              is_active: value.is_active,
              is_published: value.is_published,
              questions: value.questions.map((x) => x),
            })
          : JSON.stringify({
              title: value.title,
              duration_of_survey: value.duration_of_survey,
              points_awarded: value.points_awarded,
              is_active: value.is_active,
              is_published: value.is_published,
              questions: value.questions.map((x) => x),
            }),
      });
      const res = await data.json();
      setLoading(false);
      setIsDraftLoading(false);
      setisDeactivating(false);
      if (res?.errors) {
        toast.error(res.message);
      }
      if (res?.error) {
        if (res.message.includes('active')) {
          setEndActiveSurvey(true);
        }
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
      const data = await fetch(`${baseURL}admin/surveys/${id}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
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

  const uploadSurveyBanner = async (image: File) => {
    const bannerImage = new FormData();
    bannerImage.append('image_url', image);
    try {
      setImageLoading(true);
      const data = await fetch(`${baseURL}admin/surveys/create-survey-banner`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
        body: bannerImage,
      });
      const res = await data.json();
      setImageLoading(false);
      if (res?.error) {
        toast.error(res.message);
      } else {
        setSurveyBanner(res.image_url);
        setImagePreview(res.image_url_link);
      }
    } catch (error) {
      toast.error((error as MutationErrorPayload)?.data?.message);
    }
  };

  const editSurvey = async (id: number, value: CreateSurvey) => {
    try {
      if (!value.is_active) {
        setIsDraftLoading(true);
      } else if (endActiveSurvey) {
        setisDeactivating(true);
      } else setEditLoading(true);
      const data = await fetch(`${baseURL}admin/surveys/${id}/edit`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: value.image_url
          ? JSON.stringify({
              title: value.title,
              image_url: value.image_url,
              duration_of_survey: value.duration_of_survey,
              points_awarded: value.points_awarded,
              is_active: value.is_active,
              is_published: value.is_published,
              questions: value.questions.map((x) => x),
            })
          : JSON.stringify({
              title: value.title,
              duration_of_survey: value.duration_of_survey,
              points_awarded: value.points_awarded,
              is_active: value.is_active,
              is_published: value.is_published,
              questions: value.questions.map((x) => x),
            }),
      });

      const res = await data.json();
      setEditLoading(false);
      setIsDraftLoading(false);
      setisDeactivating(false);

      if (res?.error) {
        if (res.message.includes('active')) {
          setEndActiveSurvey(true);
        }
      } else {
        toast.success('Edited survey successfully!');
        navigate('/surveys');
      }
    } catch (error) {
      toast.error((error as MutationErrorPayload)?.data?.message);
    }
  };

  const deactivateSurvey = async () => {
    try {
      setisDeactivating(true);
      const data = await fetch(`${baseURL}admin/surveys/deactivate-survey`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });
      const res = await data.json();
      setisDeactivating(false);
      if (res?.error) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
      }
    } catch (error) {
      toast.error((error as MutationErrorPayload)?.data?.message);
    }
  };

  const deleteQuestion = async (surveyId: number, questionId: number) => {
    try {
      setIsDeleting(true);
      const data = await fetch(
        `${baseURL}admin/surveys/${surveyId}/questions/${questionId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'content-type': 'application/json',
          },
        },
      );
      const res = await data.json();
      setIsDeleting(false);
      if (res?.error) {
        toast.error(res.message);
      } else {
        setDeleteModal(false);
        setQuestionId(undefined);
        showSurvey(surveyId);
        toast.success(res.message);
      }
    } catch (error) {
      toast.error((error as MutationErrorPayload)?.data?.message);
    }
  };
  const deleteOption = async (
    surveyId: number,
    questionId: number,
    optionId: number,
  ) => {
    try {
      setIsDeleting(true);
      const data = await fetch(
        `${baseURL}admin/surveys/${surveyId}/questions/${questionId}/options/${optionId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'content-type': 'application/json',
          },
        },
      );
      const res = await data.json();
      setIsDeleting(false);
      if (res?.error) {
        toast.error(res.message);
      } else {
        setDeleteModal(false);
        setOptionId(undefined);
        setQuestionId(undefined);
        showSurvey(surveyId);
        toast.success(res.message);
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
    uploadSurveyBanner,
    editSurvey,
    editLoading,
    setEditLoading,
    imageLoading,
    isDraftLoading,
    endActiveSurvey,
    setEndActiveSurvey,
    deactivateSurvey,
    questionId,
    setQuestionId,
    deleteQuestion,
    isDeleting,
    deleteModal,
    setDeleteModal,
    optionId,
    setOptionId,
    deleteOption,
    isDeactivating,
    setisDeactivating,
  };
};
