import CategoryHeader from '../../../components/categoryHeader';
import { BorderRadius, Button, ButtonSize } from '../../../components/button';
import { Input } from '../../../components/input';
import { SlashedEye } from '../../../components/svg/auth/AuthIcons';

function ChangePassword() {
  return (
    <div className='mt-8 bg-primary-white shadow-[0px_0px_15px_4px_rgba(0,0,0,0.1)] rounded-[20px] p-10 flex items-center justify-center flex-col'>
      <CategoryHeader
        title='Change Passowrd'
        description='Please, fill in the information below.'
      />
      <ChangePasswordForm />
      <div className='w-full max-w-[447px] grid items-center gap-9 mt-28 mb-[80px]'>
        <Button
          onClick={() => {}}
          buttonText='Update Password'
          size={ButtonSize.Large}
          radius={BorderRadius.Large}
          className='text-light-blue-main !text-[24px] font-semibold'
        />
        <Button
          onClick={() => {}}
          buttonText='Cancel'
          mode='outlined'
          size={ButtonSize.Large}
          radius={BorderRadius.Large}
          className='text-light-blue-main hover:border-light-blue-100 !text-[24px] font-semibold'
        />
      </div>
    </div>
  );
}

export default ChangePassword;

interface PassowrdRequirement {
  label: string;
  id: string;
}

type PassowrdRequirements = PassowrdRequirement[];

export const ChangePasswordForm = () => {
  const changePassword = [
    { label: 'Current Password', id: 'current password' },
    { label: 'New Password', id: 'new password' },
    { label: 'Confirm Password', id: 'confirm password' },
  ] as PassowrdRequirements;

  return (
    <div className='w-full'>
      <div className='grid grid-cols-[minmax(250px,569px)_minmax(250px,569px)] gap-y-10 gap-32 justify-between py-6 mt-8'>
        {changePassword.map((item) => {
          return item.id === 'new password' ? (
            <div
              key={item.id}
              className='text-light-grey-200 font-medium text-[16px] max-w-[569px] '
            >
              <Input
                label={item.label}
                isCurved
                hasBorder
                trailingIcon={<SlashedEye />}
                helper='Your password must be at least 8 characters long.'
                className='drop-shadow-none text-lg !border-[#BBCAE1] h-[65px]'
              />
            </div>
          ) : (
            <div
              key={item.id}
              className='text-light-grey-200 font-medium text-[16px] max-w-[569px] '
            >
              <Input
                label={item.label}
                isCurved
                hasBorder
                trailingIcon={<SlashedEye />}
                className='drop-shadow-none text-lg !border-[#BBCAE1] h-[65px]'
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
