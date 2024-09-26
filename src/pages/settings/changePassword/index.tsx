import CategoryHeader from '../../../components/categoryHeader';
import { BorderRadius, Button, ButtonSize } from '../../../components/button';
import { Input, InputState } from '../../../components/input';
import {
  SlashedEye,
  UnslashedEye,
} from '../../../components/svg/auth/AuthIcons';
import { useEffect, useState } from 'react';
import { Modal, SizeType } from '@/components/modal';
import {
  CircleCancel,
  LargeCheckmark,
} from '@/components/svg/settings/Settings';
import { Card } from '@/components/card';
import { passwordRegex } from '@/utils/regex';
import { useChangePassword } from '@/api/settings/changePassword';
import { Spinner } from '@/components/svg/spinner/Spinner';

function ChangePassword() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    handleChangePassword,
    loading,
    updatePasswordModal,
    setUpdatePasswordModal,
    passwordField,
    setPasswordField,
    validatePassword,
    setValidatePassword,
  } = useChangePassword();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordField((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name !== 'currentPassword') {
      const result = passwordRegex.test(value);
      setValidatePassword((prevState) => ({
        ...prevState,
        [name]: result,
      }));
    }
  };

  useEffect(() => {
    if (passwordField.newPassword && passwordField.confirmPassword) {
      const result =
        passwordField.newPassword === passwordField.confirmPassword;
      setValidatePassword({
        ...validatePassword,
        confirmPassword: result,
      });
    }
  }, [passwordField.newPassword, passwordField.confirmPassword]);

  const handleUpdatePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validatePassword.confirmPassword) {
      return;
    } else handleChangePassword({ ...passwordField });
  };

  return (
    <Card>
      <div className='flex items-center justify-center flex-col'>
        <CategoryHeader
          title='Change Passowrd'
          className='!text-base 560:!text-[18px]'
          description='Please, fill in the information below.'
          textClass='hidden 640:block'
        />
        <form
          onSubmit={handleUpdatePassword}
          className=' flex items-center justify-center flex-col'
        >
          <div className='w-full'>
            <div className='grid grid-cols-[minmax(200px,480px)] 768:grid-cols-[minmax(250px,569px)_minmax(250px,569px)] gap-y-7 768:gap-y-10 gap-x-8 1024:gap-x-28 justify-between py-6 mt-4 768:mt-8'>
              <div className='text-light-grey-200 font-medium text-[16px] max-w-[569px] '>
                <Input
                  label='Current Password'
                  name='currentPassword'
                  value={passwordField.currentPassword}
                  isCurved
                  hasBorder
                  required
                  type={showCurrentPassword ? 'text' : 'password'}
                  onChange={handleOnChange}
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  trailingIcon={
                    showCurrentPassword ? <UnslashedEye /> : <SlashedEye />
                  }
                  className='drop-shadow-none text-lg !border-[#BBCAE1] !h-[50px] 960:!min-h-[65px]'
                />
              </div>
              <div className='text-light-grey-200 font-medium text-[16px] max-w-[569px] '>
                <Input
                  label='New Password'
                  name='newPassword'
                  value={passwordField.newPassword}
                  isCurved
                  hasBorder
                  required
                  type={showNewPassword ? 'text' : 'password'}
                  onChange={handleOnChange}
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  state={
                    passwordField.newPassword && !validatePassword.newPassword
                      ? InputState.ERROR
                      : InputState.NORMAL
                  }
                  trailingIcon={
                    showNewPassword ? <UnslashedEye /> : <SlashedEye />
                  }
                  helper={
                    passwordField.newPassword &&
                    !validatePassword.newPassword &&
                    'Your password must be at least 8 characters long and contain any of these: _!@#$%'
                  }
                  className='drop-shadow-none text-lg !border-[#BBCAE1] !h-[50px] 960:!min-h-[65px]'
                />
              </div>
              <div className='text-light-grey-200 font-medium text-[16px] max-w-[569px] '>
                <Input
                  label='Confirm Password'
                  name='confirmPassword'
                  value={passwordField.confirmPassword}
                  isCurved
                  hasBorder
                  required
                  type={showConfirmPassword ? 'text' : 'password'}
                  onChange={handleOnChange}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  state={
                    passwordField.confirmPassword &&
                    !validatePassword.confirmPassword
                      ? InputState.ERROR
                      : InputState.NORMAL
                  }
                  helper={
                    passwordField.confirmPassword &&
                    !validatePassword.confirmPassword &&
                    'Password must match the new password field'
                  }
                  trailingIcon={
                    showConfirmPassword ? <UnslashedEye /> : <SlashedEye />
                  }
                  className='drop-shadow-none text-lg !border-[#BBCAE1] !h-[50px] 960:!min-h-[65px]'
                />
              </div>
            </div>
          </div>
          <div className='w-full max-w-[447px] grid items-center gap-6 960:gap-9 mt-8 960:mt-28 960:mb-[80px]'>
            <Button
              type='submit'
              buttonText={
                loading ? (
                  <Spinner className='text-white w-5 h-5 768:w-7 768:h-7' />
                ) : (
                  'Update Password'
                )
              }
              size={ButtonSize.Large}
              radius={BorderRadius.Large}
              className=' 768:!text-xl 1240:!text-2xl !min-h-[55px]  960:!min-h-[65px] font-semibold'
            />
            <Button
              onClick={() => {}}
              buttonText='Cancel'
              mode='outlined'
              size={ButtonSize.Large}
              radius={BorderRadius.Large}
              className=' hover:border-light-blue-100 768:!text-xl 1240:!text-2xl !min-h-[55px] 960:!min-h-[65px] font-semibold'
            />
          </div>
        </form>
        {updatePasswordModal && (
          <Modal
            isBackground
            isCentered
            size={SizeType.MEDIUM}
            cancelIcon={<CircleCancel />}
            cancelType='filled'
            onClick={() => setUpdatePasswordModal(false)}
            className='  640:!max-w-[610px] 1240:!max-w-[717px]'
          >
            <div className='mb-4 768:mb-8 mt-4 1024:mt-9'>
              <LargeCheckmark className='w-12 h-12 768:w-16 768:h-16 1300:w-[101px] 1300:h-[100px]' />
            </div>
            <p className='font-medium text-xl 1240:text-[26px] text-[#010101] pb-8'>
              Your password has been updated. Remember to use the new password
              on your next log in.
            </p>
          </Modal>
        )}
      </div>
    </Card>
  );
}

export default ChangePassword;
