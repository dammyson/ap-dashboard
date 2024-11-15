import { useUser } from '@/context/AppContext';
import { Login, MutationErrorPayload, ResetPassword } from '@/types/types';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { useGetProfile } from './settings/Profile';
import { baseURL } from '@/constants/constants';

export const useLogin = () => {
  const navigate = useNavigate();
  const { setUser, setToken } = useUser();
  const { getProfile } = useGetProfile();
  const [loading, setLoading] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [otpModal, setOtpModal] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [updatingPassword, setUpdatingPassowrd] = useState(false);
  const [email, setEmail] = useState('');
  const [otpVals, setOtpVals] = useState('');

  const handleLogin = async (values: Login) => {
    try {
      setLoading(true);
      const data = await fetch(`${baseURL}admin/admin-login`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });
      const res = await data.json();
      setLoading(false);
      if (res.error) {
        toast.error(
          `${res.message}, kindly try again with the right credentials`,
        );
      } else {
        setUser(res.data.admin);
        setToken(res.data.token);
        getProfile(res.data.token);
        toast.success(`${res?.data?.admin?.role} Login Successful!`);
        navigate('/dashboard');
      }
    } catch (err) {
      toast.error((err as MutationErrorPayload)?.data?.message);
    }
  };

  const forgotPassword = async (val: string) => {
    try {
      setIsLoading(true);
      const data = await fetch(`${baseURL}admin/forgot-password`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: val,
        }),
      });
      const res = await data.json();
      setIsLoading(false);
      if (res.error) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
        setOtpModal(true);
      }
    } catch (err) {
      toast.error((err as MutationErrorPayload)?.data?.message);
    }
  };

  const verifyOtp = async ({ email, otp }: { email: string; otp: string }) => {
    try {
      setVerifying(true);
      const data = await fetch(`${baseURL}admin/verify/otp`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          otp: otp,
        }),
      });
      const res = await data.json();
      setVerifying(false);
      if (res?.errors) {
        toast.error(res.message);
      } else {
        navigate(`/reset-password?email=${email}&otp=${otp}`);
      }
    } catch (err) {
      toast.error((err as MutationErrorPayload)?.data?.message);
    }
  };

  const handleResetPassword = async (val: ResetPassword) => {
    try {
      setUpdatingPassowrd(true);
      const data = await fetch(`${baseURL}admin/reset/password`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: val.email,
          new_password: val.newPassword,
          new_password_confirmation: val.confirmNewPassword,
          otp: val.otp,
        }),
      });
      const res = await data.json();
      setUpdatingPassowrd(false);
      if (res?.errors) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
        navigate('/');
      }
    } catch (err) {
      toast.error((err as MutationErrorPayload)?.data?.message);
    }
  };

  return {
    handleLogin,
    loading,
    setLoading,
    isloading,
    forgotPassword,
    otpModal,
    verifying,
    verifyOtp,
    email,
    setEmail,
    otpVals,
    setOtpVals,
    handleResetPassword,
    updatingPassword,
  };
};
