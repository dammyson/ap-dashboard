import { BorderRadius, Button, ButtonSize } from '../../../components/button';
import { Input, InputState } from '../../../components/input';
import {
  Email,
  Padlock,
  SlashedEye,
} from '../../../components/svg/auth/AuthIcons';
import mainLogo from '../../../assets/logos/main_logo.png';
import { NavLink } from 'react-router-dom';
import { useLogin } from '@/api/auth';
import { useState } from 'react';
import { Spinner } from '@/components/svg/spinner/Spinner';
import { emailRegex, passwordRegex } from '@/utils/regex';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handleLogin, loading } = useLogin();
  const [errorMessage, setErrorMessage] = useState('');
  const [show, setShow] = useState(false);
  const [isValidEmail, setIsValidMail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please enter a valid email and password');
    } else handleLogin({ email, password });
  };

  const validate = (type: string, text: string) => {
    if (type === 'email') {
      if (emailRegex.test(text) === false) {
        setIsValidMail(false);
      } else {
        setIsValidMail(true);
      }
      setEmail(text);
    } else {
      if (passwordRegex.test(text) === false) {
        setIsValidPassword(false);
      } else {
        setIsValidPassword(true);
      }
      setPassword(text);
    }
  };

  return (
    <div className='mobile-container flex justify-center items-center h-lvh bg-auth-bg bg-no-repeat bg-center bg-cover'>
      <div className='grid 768:pt-12 768:pb-20 pt-8 pb-14 mobile-container 560:min-w-[440px] 880:min-w-[750px] px-8 768:px-16 max-h-[640px] shadow-2xl place-items-center rounded-3xl backdrop-blur-md'>
        <form
          onSubmit={onSubmit}
          className='560:min-w-[300px] 880:min-w-[480px]'
        >
          <div className='max-w-[204px] flex justify-center mb-10 768:mb-12 mx-auto'>
            <img src={mainLogo} alt='AirPeace Logo' />
          </div>
          <div className='mb-10'>
            <Input
              value={email}
              state={!isValidEmail ? InputState.ERROR : InputState.NORMAL}
              placeHolder='Email Address'
              inputSize='large'
              leadingIcon={<Email />}
              isCurved
              required
              type='text'
              onChange={(e) => validate('email', e.target.value)}
            />
          </div>
          <div className='mb-2'>
            <Input
              state={!isValidPassword ? InputState.ERROR : InputState.NORMAL}
              placeHolder='Password'
              inputSize='large'
              leadingIcon={<Padlock />}
              trailingIcon={
                <span onClick={() => setShow(!show)}>
                  <SlashedEye />
                </span>
              }
              isCurved
              type={show ? 'text' : 'password'}
              required
              onChange={(e) => validate('password', e.target.value)}
              helper={errorMessage}
            />
          </div>
          <NavLink
            className={
              'float-right text-light-blue-main text-xs 480:text-sm 768:text-base hover:text-light-blue-900'
            }
            to={'/forgot-password'}
          >
            Forgot password?
          </NavLink>
          <Button
            type='submit'
            buttonText={
              loading ? (
                <Spinner className='text-white w-5 h-5 768:w-7 768:h-7' />
              ) : (
                'Log in'
              )
            }
            radius={BorderRadius.Large}
            className='mt-14 768:mt-20 font-bold'
            size={ButtonSize.Large}
            mode='solid'
          />
        </form>
      </div>
    </div>
  );
}

export default Login;
