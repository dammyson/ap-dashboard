import CategoryHeader from '@/components/categoryHeader';
import { BorderRadius, Button, ButtonSize } from '@/components/button';
import { Input, InputState } from '@/components/input';
import { useUser } from '@/context/AppContext';
import { Edit, Upload } from '@/components/svg/settings/Settings';
import { Spinner } from '@/components/svg/spinner/Spinner';
import clsx from 'clsx';
import { Avatar } from '@/components/avatar/Avatar';
import { useGetColorByChar } from '@/hooks/useGetColorByChar';
import { getInitials } from '@/utils';
import { useEditProfile } from '@/api/settings/Profile';
import { phoneNumberRegex } from '@/utils/regex';

export interface RoleOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

function Profile() {
  const { user } = useUser();
  const {
    editProfile,
    loading,
    isEditable,
    setIsEditatble,
    phoneNumber,
    setPhoneNumber,
    validate,
    setValidate,
    image,
  } = useEditProfile();
  const { getColor } = useGetColorByChar();

  const handleEditProfile = () => {
    if (validate || image) {
      editProfile({
        phone_number: phoneNumber ?? null,
        image_url: image ?? null,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidate(phoneNumberRegex.test(e.target.value));
    setPhoneNumber(e.target.value);
  };

  return (
    <div>
      <CategoryHeader
        title='Profile'
        button={
          <Button
            onClick={() => {}}
            buttonText='Upload Photo'
            leadingIcon={<Upload />}
            mode='text'
            className='bg-transparent text-primary-white text-nowrap flex 560:hidden'
          />
        }
      />
      <div className='bg-[#00000003] flex items-center justify-between w-full border-[1px] border-light-blue-50 rounded-[20px] py-3 560:py-4 px-6 my-6 gap-4'>
        <div className='flex gap-4 items-center w-full max-w-[300px]'>
          <div className='min-w-[60px] min-h-[60px]  max-w-[80px] max-h-[80px]  560:max-w-[100px] 560:max-h-[100px]'>
            {user?.image_url ? (
              <img
                src={user?.image_url}
                alt='profile image'
                className='w-full rounded-full cursor-pointer'
              />
            ) : (
              <Avatar
                getBackgroundColor={getColor}
                textClassName='560:text-xl 960:text-4xl'
                className='!min-w-[60px] !min-h-[60px] 560:!w-[80px] 560:!h-[80px] 960:!w-[100px] 960:!h-[100px]'
                initials={
                  user?.user_name ? getInitials(user?.user_name) : undefined
                }
              />
            )}
          </div>
          <div className='grid gap-1.5 960:gap-3'>
            <div className='font-semibold text-lg 768:text-xl 960:text-2xl text-light-primary-black text-nowrap '>
              {user?.user_name}
            </div>
            <span className='font-normal text-primary-black text-base 768:text-lg 960:text-xl'>
              {user?.role}
            </span>
          </div>
        </div>
        <Button
          onClick={() => {}}
          buttonText='Upload Photo'
          leadingIcon={<Upload />}
          mode='text'
          className='bg-transparent text-light-primary-black hover:text-[#393939] text-nowrap hidden 560:flex'
        />
      </div>
      <div className='bg-[#00000003] w-full border-[1px] border-light-blue-50 rounded-[20px] py-6 px-8 flex items-center justify-center flex-col'>
        <div className='flex items-center justify-between w-full'>
          <p className='text-lg 560:text-xl 960:text-2xl font-medium text-primary-black'>
            Personal Information
          </p>
          <Button
            onClick={() => (
              setIsEditatble(true),
              setValidate(phoneNumberRegex.test(phoneNumber ?? ''))
            )}
            disabled={isEditable}
            buttonText='Edit'
            buttonClass='hidden 560:block'
            trailingIcon={<Edit />}
            mode='outlined'
            className='!w-14 560:!w-fit float-right !bg-[#E9EEF5] text-light-primary-black border-[1px] rounded-[20px] border-light-blue-50 hover:border-[#9daabe] py-[7px] 560:py-[11px] px-[12px]'
          />
        </div>
        <div className='grid grid-cols-[minmax(200px,480px)] 768:grid-cols-[minmax(250px,569px)_minmax(250px,569px)] gap-y-4 768:gap-y-10 gap-x-6 768:gap-x-12 960:gap-x-24 1300:gap-x-32 justify-between pt-3 pb-6 560:py-6'>
          <div className='text-light-grey-200 font-medium text-[17px] 768:text-xl max-w-[569px]'>
            <Input
              label='First Name'
              value={user?.user_name.split(' ')[0]}
              isCurved
              hasBorder
              state={InputState.READ_ONLY}
              className='drop-shadow-none text-base 768:text-xl !border-light-blue-50 !h-[50px] 960:!min-h-[65px] text-black'
            />
          </div>
          <div className='text-light-grey-200 font-medium text-[17px] 768:text-xl max-w-[569px]'>
            <Input
              label='Last Name'
              value={user?.user_name.split(' ')[1]}
              isCurved
              hasBorder
              state={InputState.READ_ONLY}
              className='drop-shadow-none text-base 768:text-xl !border-light-blue-50 !h-[50px] 960:!min-h-[65px]'
            />
          </div>
          <div className='text-light-grey-200 font-medium text-[17px] 768:text-xl max-w-[569px]'>
            <Input
              label='Email'
              value={user?.email}
              isCurved
              hasBorder
              state={InputState.READ_ONLY}
              className='drop-shadow-none text-base 768:text-xl !border-light-blue-50 !h-[50px] 960:!min-h-[65px]'
            />
          </div>
          <div className='text-light-grey-200 font-medium text-[17px] 768:text-xl max-w-[569px]'>
            <Input
              label='Phone Number'
              type='number'
              value={phoneNumber ?? ''}
              isCurved
              hasBorder
              onChange={handleChange}
              state={
                !isEditable
                  ? InputState.READ_ONLY
                  : phoneNumber && !validate
                    ? InputState.ERROR
                    : InputState.NORMAL
              }
              className={clsx(
                ' hide-arrows no-arrows drop-shadow-none text-base 768:text-xl !border-light-blue-50 !h-[50px] 960:!min-h-[65px]',
              )}
            />
          </div>
          <div className='text-light-grey-200 font-medium text-[17px] 768:text-xl max-w-[569px]'>
            <Input
              label='Role'
              value={user?.role}
              isCurved
              hasBorder
              state={InputState.READ_ONLY}
              className='drop-shadow-none text-base 768:text-xl !border-light-blue-50 !h-[50px] 960:!min-h-[65px]'
            />
          </div>
        </div>
        {isEditable && (
          <div className='w-full max-w-[447px] grid items-center gap-3 960:gap-5 my-4 960:mt-10  960:mb-12'>
            <Button
              onClick={handleEditProfile}
              buttonText={
                loading ? (
                  <Spinner className='text-white w-5 h-5 768:w-7 768:h-7' />
                ) : (
                  'Confirm'
                )
              }
              size={ButtonSize.Large}
              radius={BorderRadius.Large}
              className='768:!text-xl 1240:!text-2xl font-semibold !min-h-[55px] 960:!min-h-[66px]'
            />
            <Button
              onClick={() => setIsEditatble(false)}
              buttonText='Cancel'
              size={ButtonSize.Large}
              radius={BorderRadius.Large}
              mode='outlined'
              className='768:!text-xl 1240:!text-2xl font-semibold !min-h-[55px] 960:!min-h-[66px]'
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
