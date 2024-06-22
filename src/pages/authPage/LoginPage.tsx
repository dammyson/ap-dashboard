import { BorderRadius, Button, ButtonSize } from '../../components/button';
import { Input, InputState } from '../../components/input';
import {
  Email,
  Padlock,
  SlashedEye,
} from '../../components/svg/auth/AuthIcons';
import { useState } from 'react';
import mainLogo from '../../assets/logos/main_logo.png';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

function LoginPage() {
  const [hasError, setHasError] = useState(true);
  return (
    <div className='flex justify-center h-lvh bg-auth-bg bg-no-repeat bg-center bg-cover'>
      <div className='grid pt-8 pb-16 px-20 my-32 mx-auto fixed border-none shadow-2xl place-items-center rounded-3xl max-w-[816px] backdrop-blur-md'>
        <div className='max-w-[700px] mx-auto'>
          <div className='max-w-[204px] flex justify-center mb-12 mx-auto'>
            <img src={mainLogo} alt='AirPeace Logo' />
          </div>
          <Input
            className={clsx(hasError ? 'mb-2' : 'mb-10')}
            state={hasError ? InputState.ERROR : InputState.NORMAL}
            label=''
            placeHolder='Email Address'
            inputSize='large'
            leadingIcon={<Email />}
            isCurved
            helper={hasError ? 'Enter the correct email address.' : ''}
          />

          <Input
            className={clsx(hasError ? 'mb-2' : 'mb-5')}
            state={hasError ? InputState.ERROR : InputState.NORMAL}
            label=''
            placeHolder='Password'
            inputSize='large'
            leadingIcon={<Padlock />}
            trailingIcon={<SlashedEye />}
            isCurved
            type='password'
            helper={hasError ? 'Wrong Password' : ''}
          />

          <span className='float-right'>
            <NavLink to={'/forgotPassword'}>Forgot password?</NavLink>
          </span>
          <Button
            buttonText='Log in'
            radius={BorderRadius.Large}
            className='mt-14 font-bold focus:outline-none hover:border-light-primary-red hover:border-1 hover:border-solid active:transform active:translate-y-0.5 active:transition-all active:duration-[20ms] active:ease-in-out"'
            size={ButtonSize.Large}
            mode='solid'
          />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
