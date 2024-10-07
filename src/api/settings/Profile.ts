import { useUser } from '@/context/AppContext';
import { MutationErrorPayload } from '@/types/types';
import { toast } from 'sonner';
import { useState } from 'react';

export const useGetProfile = () => {
  const { setUser } = useUser();
  const getProfile = async (token: string) => {
    try {
      const data = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}admin/settings/profile`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        },
      );
      const res = await data.json();
      if (res?.error) {
        toast.error(res?.message);
      } else setUser(res?.admin_data);
    } catch (err) {
      toast.error((err as MutationErrorPayload)?.data?.message);
    }
  };

  return { getProfile };
};

export const useEditProfile = () => {
  const { user, token } = useUser();
  const { getProfile } = useGetProfile();
  const [loading, setLoading] = useState(false);
  const [isEditable, setIsEditatble] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(user?.phone_number);
  const [validate, setValidate] = useState(false);
  const [image, setImage] = useState(user?.image_url_link);
  const [imageLoading, setImageLoading] = useState(false);

  const editProfile = async (value: string | null) => {
    try {
      setLoading(true);
      const data = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}admin/settings/profile/edit`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'content-type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            phone_number: value,
          }),
        },
      );

      const res = await data.json();
      setLoading(false);
      if (res?.error) {
        toast.error(res.message);
      } else {
        setIsEditatble(false);
        getProfile(token ?? '');
        toast.success(res.message);
      }
    } catch (error) {
      toast.error((error as MutationErrorPayload)?.data?.message);
    }
  };

  const UploadProfileImage = async (image: File) => {
    const profileImage = new FormData();
    profileImage.append('image_url', image);
    try {
      setImageLoading(true);
      const data = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}admin/settings/profile/change-profile-image`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
          body: profileImage,
        },
      );

      const res = await data.json();
      setImageLoading(false);
      if (res?.error) {
        toast.error(res.message);
      } else {
        setImage(res.image_url_link);
        token && (await getProfile(token));
        toast.success(res.message);
      }
    } catch (error) {}
  };

  return {
    editProfile,
    loading,
    setLoading,
    isEditable,
    setIsEditatble,
    phoneNumber,
    setPhoneNumber,
    validate,
    setValidate,
    image,
    setImage,
    UploadProfileImage,
    imageLoading,
  };
};
