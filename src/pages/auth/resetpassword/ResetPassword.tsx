import { BorderRadius, Button, ButtonSize } from '../../../components/button';
import { Input, InputState } from '../../../components/input';
import { Padlock, SlashedEye } from '../../../components/svg/auth/AuthIcons';
import { useState } from 'react';
import mainLogo from '../../../assets/logos/main_logo.png';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  return (
    <div className='mobile-container flex justify-center items-center h-lvh bg-auth-bg bg-no-repeat bg-center bg-cover'>
      <div className='grid 768:pt-12 768:pb-20 pt-8 pb-14 mobile-container 560:min-w-[440px] 880:min-w-[750px] px-8 768:px-16 max-h-[640px] shadow-2xl place-items-center rounded-3xl backdrop-blur-md'>
        <div className='560:min-w-[300px] 880:min-w-[480px]'>
          <div className='max-w-[204px] flex justify-center mb-10 768:mb-12 mx-auto'>
            <img src={mainLogo} alt='AirPeace Logo' />
          </div>
          <div className='mb-10'>
            <Input
              state={hasError ? InputState.ERROR : InputState.NORMAL}
              label=''
              placeHolder='New Password'
              inputSize='large'
              leadingIcon={<Padlock />}
              trailingIcon={<SlashedEye />}
              isCurved
              type='password'
              helper={hasError ? 'Wrong Password' : ''}
            />
          </div>
          <div className='mb-2'>
            <Input
              state={hasError ? InputState.ERROR : InputState.NORMAL}
              label=''
              placeHolder='Confirm Password'
              inputSize='large'
              leadingIcon={<Padlock />}
              trailingIcon={<SlashedEye />}
              isCurved
              type='password'
              helper={hasError ? 'Wrong Password' : ''}
            />
          </div>
          <Button
            onClick={() => {}}
            buttonText='Reset password'
            radius={BorderRadius.Large}
            className='mt-14 768:mt-20 font-bold'
            size={ButtonSize.Large}
            mode='solid'
          />
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
