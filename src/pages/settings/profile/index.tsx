import profileImage from '@/assets/profileImage/profile-img.png';
import CategoryHeader from '@/components/categoryHeader';
import { ProfileData } from '@/components/profileData';
import { Button } from '@/components/button';
import { Upload } from 'antd';
import { Input } from '@/components/input';
import { CustomSelect, SelectType } from '@/components/customSelect';
import { useUser } from '@/context/AppContext';
import { DropDownArrow, Edit } from '@/components/svg/settings/Settings';

export interface RoleOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

function Profile() {
  const { user } = useUser();
  const roleOptions: RoleOption[] = [
    { label: 'Admin', value: 'admin' },
    { label: 'Sub-admin', value: 'sub-admin' },
  ];

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
        <div className='flex items-center justify-between w-full'>
          <p className='text-lg 560:text-xl 960:text-2xl font-medium text-primary-black'>
            Personal Information
          </p>
          <Button
            onClick={() => {}}
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
              className='drop-shadow-none text-base 768:text-xl !border-light-blue-50 hover:!border-[#acbbd0] !h-[50px] 960:!min-h-[65px] text-black'
            />
          </div>
          <div className='text-light-grey-200 font-medium text-[17px] 768:text-xl max-w-[569px]'>
            <Input
              label='Last Name'
              value={user?.user_name.split(' ')[1]}
              isCurved
              hasBorder
              className='drop-shadow-none text-base 768:text-xl !border-light-blue-50 hover:!border-[#acbbd0] !h-[50px] 960:!min-h-[65px]'
            />
          </div>
          <div className='text-light-grey-200 font-medium text-[17px] 768:text-xl max-w-[569px]'>
            <Input
              label='Email'
              value={user?.email}
              isCurved
              hasBorder
              className='drop-shadow-none text-base 768:text-xl !border-light-blue-50 hover:!border-[#acbbd0] !h-[50px] 960:!min-h-[65px]'
            />
          </div>
          <div className='text-light-grey-200 font-medium text-[17px] 768:text-xl max-w-[569px]'>
            <Input
              label='Phone Number'
              value=''
              isCurved
              hasBorder
              className='drop-shadow-none text-base 768:text-xl !border-light-blue-50 hover:!border-[#acbbd0] !h-[50px] 960:!min-h-[65px]'
            />
          </div>

          <div className='text-light-grey-200 font-medium text-[17px] 760:text-xl max-w-[569px]'>
            <CustomSelect
              label='Role'
              selectType={SelectType.SELECT}
              hasBorder
              isCurved
              trailingIcon={<DropDownArrow />}
              selectedRole={user?.role}
              options={roleOptions}
              // onSelect={(info) => setSelectedRole(info)}
              className='!h-[50px] 960:!min-h-[65px]'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
