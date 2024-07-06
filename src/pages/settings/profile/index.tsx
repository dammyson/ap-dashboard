import CategoryHeader from '../../../components/categoryHeader';
import { ProfileData } from '../../../components/profileData';
import profileImage from '../../../assets/profileImage/profile-img.png';
import { Button } from '../../../components/button';
import { Edit, Upload } from '../../../components/svg/settings/Settings';
import { ProfileInputForm } from '../../../components/profileInputForm';

function Profile() {
  return (
    <div>
      <CategoryHeader title='Profile' />
      <div className='bg-[#00000003] flex items-center justify-between w-full border-[1px] border-light-blue-50 rounded-[20px] py-4 px-6 my-6'>
        <ProfileData src={profileImage} name='Corlet Jasper' role='Admin' />
        <Button
          onClick={() => {}}
          buttonText='Upload Photo'
          leadingIcon={<Upload />}
          mode='text'
          className='bg-transparent text-light-primary-black hover:text-[#393939]'
        />
      </div>
      <div className='bg-[#00000003] w-full border-[1px] border-light-blue-50 rounded-[20px] py-6 px-8'>
        <div className='flex items-center justify-between'>
          <p className='text-2xl font-medium'>Personal Information</p>
          <Button
            onClick={() => {}}
            buttonText='Edit'
            trailingIcon={<Edit />}
            mode='outlined'
            className='!bg-[#E9EEF5] text-light-primary-black border-[1px] rounded-[20px] border-light-blue-50 hover:border-[#9daabe] py-[11px] px-[12px]'
          />
        </div>
        <ProfileInputForm />
      </div>
    </div>
  );
}

export default Profile;
