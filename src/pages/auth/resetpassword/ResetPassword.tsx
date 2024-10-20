import { BorderRadius, Button, ButtonSize } from '../../../components/button';
import { Input, InputState } from '../../../components/input';
import {
  Padlock,
  SlashedEye,
  UnslashedEye,
} from '../../../components/svg/auth/AuthIcons';
import mainLogo from '../../../assets/logos/main_logo.png';
import { useEffect, useState } from 'react';
import { passwordRegex } from '@/utils/regex';
import { Spinner } from '@/components/svg/spinner/Spinner';
import { useLogin } from '@/api/auth';
import clsx from 'clsx';
import { useLocation } from 'react-router';

function ResetPassword() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [newPassword, setNewPassowrd] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [validateNewPassword, setValidateNewPassword] = useState(false);
  const [validateConfirmPassword, setValidateConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const location = useLocation();
  const { handleResetPassword, updatingPassword } = useLogin();

  useEffect(() => {
    const param = new URLSearchParams(location.search);
    const emailFromUrl = param.get('email');
    const OtpFromUrl = param.get('otp');
    if (emailFromUrl) {
      setEmail(emailFromUrl);
    }
    if (OtpFromUrl) {
      setOtp(OtpFromUrl);
    }
  }, [location.search]);

  const handleReset = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (!validateNewPassword || !validateConfirmPassword) {
      return;
    } else handleResetPassword({ email, newPassword, confirmNewPassword, otp });
  };

  useEffect(() => {
    setValidateConfirmPassword(newPassword === confirmNewPassword);
  }, [newPassword, confirmNewPassword]);

  return (
    <form
      onSubmit={handleReset}
      className='mobile-container flex justify-center items-center h-lvh bg-auth-bg bg-no-repeat bg-center bg-cover'
    >
      <div className='grid 768:pt-12 768:pb-20 pt-8 pb-14 mobile-container 560:min-w-[440px] 880:min-w-[750px] px-8 768:px-16 max-h-[640px] shadow-2xl place-items-center rounded-3xl backdrop-blur-md'>
        <div className='w-[300px] 880:w-[480px]'>
          <div className='max-w-[204px] flex justify-center mb-10 768:mb-12 mx-auto'>
            <img src={mainLogo} alt='AirPeace Logo' />
          </div>
          <div
            className={clsx(
              newPassword && !validateNewPassword ? 'mb-6' : 'mb-10',
            )}
          >
            <Input
              value={newPassword}
              placeHolder='New Password'
              inputSize='large'
              leadingIcon={<Padlock />}
              isCurved
              required
              type={showNewPassword ? 'text' : 'password'}
              onClick={() => setShowNewPassword(!showNewPassword)}
              trailingIcon={showNewPassword ? <UnslashedEye /> : <SlashedEye />}
              state={
                newPassword && !validateNewPassword
                  ? InputState.ERROR
                  : InputState.NORMAL
              }
              onChange={(e) => {
                setNewPassowrd(e.target.value);
                setValidateNewPassword(passwordRegex.test(e.target.value));
              }}
              helper={
                newPassword &&
                !validateNewPassword &&
                'Your password must be at least 8 characters long and contain any of these: _!@#$%'
              }
            />
          </div>
          <div className='mb-2'>
            <Input
              value={confirmNewPassword}
              placeHolder='Confirm Password'
              inputSize='large'
              leadingIcon={<Padlock />}
              isCurved
              required
              type={showConfirmNewPassword ? 'text' : 'password'}
              onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              state={
                confirmNewPassword && !validateConfirmPassword
                  ? InputState.ERROR
                  : InputState.NORMAL
              }
              trailingIcon={
                showConfirmNewPassword ? <UnslashedEye /> : <SlashedEye />
              }
              helper={
                confirmNewPassword &&
                !validateConfirmPassword &&
                'Password must match the new password field'
              }
            />
          </div>
          <Button
            type='submit'
            buttonText={
              updatingPassword ? (
                <Spinner className='text-white w-5 h-5 768:w-7 768:h-7' />
              ) : (
                'Reset password'
              )
            }
            radius={BorderRadius.Large}
            className='mt-14 768:mt-20 font-bold'
            size={ButtonSize.Large}
            mode='solid'
          />
        </div>
      </div>
    </form>
  );
}

export default ResetPassword;
