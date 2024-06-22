import { BorderRadius, Button, ButtonSize } from '../../components/button';
import { Input, InputState } from '../../components/input';
import { Email } from '../../components/svg/auth/AuthIcons';
import mainLogo from '../../assets/logos/main_logo.png';

function ForgotPassword() {
  return (
    <div className='flex justify-center h-lvh bg-auth-bg bg-no-repeat bg-center bg-cover'>
      <div className='grid pt-8 pb-16 px-20 my-32 mx-auto fixed border-none shadow-2xl place-items-center rounded-3xl max-w-[816px] backdrop-blur-md'>
        <div className='max-w-[700px] mx-auto'>
          <div className='max-w-[204px] flex justify-center mb-10 mx-auto'>
            <img src={mainLogo} alt='AirPeace Logo' />
          </div>
          <div className='grid place-items-center max-w-[474px]'>
            <h2 className='text-2xl text-light-primary-dark_blue font-semibold '>
              Forgot Password?
            </h2>
            <p className='text-base text-light-grey-600 text-center font-medium my-7'>
              Enter the email associated with your account to receive an OTP to
              recover your password.
            </p>
          </div>
          <Input
            className='mb-8'
            state={InputState.NORMAL}
            label=''
            placeHolder='Email Address'
            inputSize='large'
            leadingIcon={<Email />}
            isCurved
          />

          <Button
            buttonText='Send Link'
            radius={BorderRadius.Large}
            className='mt-8 font-bold focus:outline-none hover:border-light-primary-red hover:border-1 hover:border-solid active:transform active:translate-y-0.5 active:transition-all active:duration-[20ms] active:ease-in-out"'
            size={ButtonSize.Large}
            mode='solid'
          />
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
