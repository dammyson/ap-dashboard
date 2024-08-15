import CategoryHeader from '../../../components/categoryHeader';
import { ProfileData } from '../../../components/profileData';
import profileImage from '../../../assets/profileImage/profile-img.png';
import { Button } from '../../../components/button';
import { Edit, Upload } from '../../../components/svg/settings/Settings';
import { ProfileForm } from '../../../components/profileForm';

function Profile() {
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
            className='bg-transparent text-primary-white hover:text-[#393939] text-nowrap flex 560:hidden'
          />
        }
      />
      <div className='bg-[#00000003] flex items-center justify-between w-full border-[1px] border-light-blue-50 rounded-[20px] py-3 560:py-4 px-6 my-6 gap-4'>
        <ProfileData src={profileImage} name='Corlet Jasper' role='Admin' />
        <Button
          onClick={() => {}}
          buttonText='Upload Photo'
          leadingIcon={<Upload />}
          mode='text'
          className='bg-transparent text-light-primary-black hover:text-[#393939] text-nowrap hidden 560:flex'
        />
      </div>
      <div className='bg-[#00000003] w-full border-[1px] border-light-blue-50 rounded-[20px] py-6 px-8'>
        <div className='flex flex-col 560:flex-row 560:items-center justify-between w-full'>
          <p className='text-lg 560:text-xl 960:text-2xl font-medium text-primary-black'>
            Personal Information
          </p>
          <div className='w-full 560:w-fit '>
            <Button
              onClick={() => {}}
              buttonText='Edit'
              trailingIcon={<Edit className='w-4 560:w-5 ' />}
              mode='outlined'
              className='!w-fit float-right !bg-[#E9EEF5] text-light-primary-black border-[1px] rounded-[20px] border-light-blue-50 hover:border-[#9daabe] py-[7px] 560:py-[11px] px-[12px]'
            />
          </div>
        </div>
        <ProfileForm />
      </div>
    </div>
  );
}

export default Profile;
