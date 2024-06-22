import { BorderRadius, Button, ButtonSize } from '../../components/button';
import { Input, InputState } from '../../components/input';
import { Email } from '../../components/svg/auth/AuthIcons';
import { useState } from 'react';
import mainLogo from '../../assets/logos/main_logo.png';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  return (
    <div className='mobile-container flex justify-center items-center h-lvh bg-auth-bg bg-no-repeat bg-center bg-cover'>
      <div className='grid 768:pt-12 768:pb-20 pt-8 pb-14 mobile-container 560:min-w-[440px] 880:min-w-[750px] px-8 768:px-16 max-h-[640px] shadow-2xl place-items-center rounded-3xl backdrop-blur-md'>
        <div className='560:min-w-[300px] 880:min-w-[480px]'>
          <div className='max-w-[204px] flex justify-center mb-10 768:mb-12 mx-auto'>
            <img src={mainLogo} alt='AirPeace Logo' />
          </div>
          <div className='grid place-items-center max-w-[474px]'>
            <h2 className='text-2xl text-light-blue-main font-semibold '>
              Forgot Password?
            </h2>
            <p className='text-base text-light-grey-600 text-center font-medium my-7'>
              Enter the email associated with your account to receive an OTP to
              recover your password.
            </p>
          </div>
          <div className='mb-10'>
            <Input
              state={hasError ? InputState.ERROR : InputState.NORMAL}
              label=''
              placeHolder='Email Address'
              inputSize='large'
              leadingIcon={<Email />}
              isCurved
              helper={hasError ? 'Enter the correct email address.' : ''}
            />
          </div>
          <Button
            buttonText='Send link'
            radius={BorderRadius.Large}
            className='mt-14 768:mt-20 font-bold'
            size={ButtonSize.Large}
            mode='solid'
            onClick={() => navigate('/reset-password')}
          />
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
