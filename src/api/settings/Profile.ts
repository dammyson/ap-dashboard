import { useUser } from '@/context/AppContext';
import { MutationErrorPayload } from '@/types/types';
import { toast } from 'sonner';
import { EditProfile } from '@/types/types';
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
  const [image, setImage] = useState(user?.image_url);

  const editProfile = async (value: EditProfile) => {
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
            image_url: value.image_url,
            phone_number: value.phone_number,
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
  };
};
