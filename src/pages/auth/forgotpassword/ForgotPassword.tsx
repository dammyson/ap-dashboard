import { BorderRadius, Button, ButtonSize } from '../../../components/button';
import { Input, InputState } from '../../../components/input';
import { Email } from '../../../components/svg/auth/AuthIcons';
import { useEffect, useRef, useState } from 'react';
import mainLogo from '../../../assets/logos/main_logo.png';
import { useLogin } from '@/api/auth';
import { emailRegex } from '@/utils/regex';
import { Spinner } from '@/components/svg/spinner/Spinner';
import clsx from 'clsx';
import birdLogo from '../../../assets/logos/colored_Bird_Logo.png';
import { maskedEmail } from '@/utils';

function ForgotPassword() {
  const [isValidEmail, setIsValidMail] = useState(false);
  const [otp, setOtp] = useState(new Array(4).fill(''));
  const [allFields, setAllFields] = useState(false);
  const otpRef = useRef<(HTMLInputElement | null)[]>([]);
  const {
    isloading,
    forgotPassword,
    otpModal,
    verifying,
    verifyOtp,
    email,
    setEmail,
    otpVals,
    setOtpVals,
  } = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const result = emailRegex.test(value);
    setIsValidMail(result);
    setEmail(value);
  };
  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number,
  ) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return false;
    const upadtedOtp = otp.map((data, indx) => (indx === i ? value : data));
    setOtp(upadtedOtp);

    if (value) otpRef.current[i + 1]?.focus();
    if (value === '') otpRef.current[i - 1]?.focus();
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const value = e.clipboardData.getData('text');

    if (isNaN(Number(value)) || !value || value.trim() === '') return false;

    const pastedValues = value.toString().split('').slice(0, otp.length);
    setOtp((prevOtp) => {
      const updatedOtp = [...prevOtp];
      let currentIndex = 0;

      for (let i = 0; i < updatedOtp.length; i++) {
        if (!updatedOtp[i] && currentIndex < pastedValues.length) {
          updatedOtp[i] = pastedValues[currentIndex];
          currentIndex++;
        }
      }
      setTimeout(() => {
        const firstEmptyInputIndex = updatedOtp.findIndex((val) => !val);
        if (firstEmptyInputIndex !== -1) {
          otpRef.current[firstEmptyInputIndex]?.focus();
        } else (document.activeElement as HTMLElement)?.blur();
      }, 0);
      return updatedOtp;
    });
  };

  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    i: number,
  ) => {
    const { key } = e;
    const value = e.currentTarget.value;

    if (key === 'Backspace' && value === '') {
      if (i > 0) {
        otpRef.current[i - 1]?.focus();
        setOtp((prevOtp) =>
          prevOtp.map((data, indx) => (indx === i - 1 ? '' : data)),
        );
      }
    }
  };

  useEffect(() => {
    const allvalue = otp.every((field) => field && field.trim() !== '');
    if (allvalue) {
      const otpValues = otp.join('');
      setAllFields(allvalue);
      verifyOtp({ email: email, otp: otpValues });
      setOtpVals(otpValues);
    } else setAllFields(false);
  }, [otp]);

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
          <div className={clsx(!isValidEmail && email ? 'mb-5' : 'mb-10')}>
            <Input
              state={
                !isValidEmail && email ? InputState.ERROR : InputState.NORMAL
              }
              label=''
              value={email}
              placeHolder='Email Address'
              inputSize='large'
              leadingIcon={<Email />}
              isCurved
              onChange={(e) => handleChange(e)}
              helper={
                !isValidEmail && email ? 'Enter the correct email address.' : ''
              }
            />
          </div>
          <Button
            buttonText={
              isloading ? (
                <Spinner className='text-white w-5 h-5 768:w-7 768:h-7' />
              ) : (
                'Send link'
              )
            }
            radius={BorderRadius.Large}
            className='mt-14 768:mt-20 font-bold'
            size={ButtonSize.Large}
            mode='solid'
            disabled={!isValidEmail}
            onClick={() => forgotPassword(email)}
          />
        </div>
      </div>
      {otpModal && (
        <>
          <div className='mobile-container bg-[#00000033] fixed z-10 inset-0 w-full h-lvh flex items-center justify-center backdrop-blur-sm'>
            <div className='grid 768:py-12 py-8 bg-[#cecece] mobile-container 480:min-w-[400px] 640:min-w-[530px] 880:min-w-[700px] px-8 768:px-16 max-h-[640px] shadow-2xl place-items-center rounded-3xl'>
              <div className='560:min-w-[300px] 880:min-w-[480px]'>
                <div className='grid place-items-center max-w-[474px]'>
                  <div className='flex items-center gap-3'>
                    <img
                      src={birdLogo}
                      alt='AirPeace Bird Logo'
                      className='hidden 560:block 560:w-[55px] 880:w-[60px]'
                    />

                    <h2 className='text-2xl 1240:text-[28px] text-light-blue-main font-semibold '>
                      OTP Verification
                    </h2>
                  </div>
                  <p className='text-base text-light-grey-600 text-center font-medium my-7'>
                    {`Please enter the OTP code sent to ${maskedEmail(email)}`}
                  </p>
                </div>
                <div className='mb-10 flex items-center justify-center gap-3 '>
                  {otp.map((data, i) => (
                    <input
                      key={i}
                      value={data}
                      type='text'
                      maxLength={1}
                      ref={(el) => (otpRef.current[i] = el)}
                      onChange={(e) => handleOtpChange(e, i)}
                      onPaste={(e) => handleOtpPaste(e)}
                      onKeyDown={(e) => handleOtpKeyDown(e, i)}
                      className='w-12 h-12 text-center drop-shadow-md text-light-grey-200 font-medium py-3 text-base focus:border-light-blue-50 focus:ring-0 focus:outline-none hover:border-light-blue-50 caret-light-secondary-purple border-light-grey-800 rounded-[8px]'
                    />
                  ))}
                </div>
                <div className='text-center'>
                  <p className='text-base text-light-grey-600 text-center'>
                    Didn't receive OTP code?
                  </p>
                  <button
                    onClick={() => forgotPassword(email)}
                    className='text-light-blue-main font-semibold text-[14px] cursor-pointer bg-transparent focus:outline-0'
                  >
                    {isloading ? (
                      <Spinner className='text-white w-5 h-5 768:w-7 768:h-7' />
                    ) : (
                      ' Resend code'
                    )}
                  </button>
                </div>

                <div className='flex justify-center items-center mt-8 '>
                  <div className='w-full max-w-[230px] pb-4 grid gap-4'>
                    <Button
                      disabled={!allFields}
                      buttonText={
                        verifying ? (
                          <Spinner className='text-white w-5 h-5 768:w-7 768:h-7' />
                        ) : (
                          'Confirm'
                        )
                      }
                      radius={BorderRadius.Large}
                      size={ButtonSize.Medium}
                      className={clsx(
                        allFields &&
                          ' bg-light-blue-main !text-light-blue-100 hover:!text-light-blue-main hover:bg-light-blue-100 shadow-md',
                        ' !font-semibold ',
                      )}
                      onClick={() => verifyOtp({ email: email, otp: otpVals })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          ;
        </>
      )}
    </div>
  );
}

export default ForgotPassword;
