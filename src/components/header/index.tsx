import { Input } from '../input';
import { Bell, Search } from '../svg/dashboard/Dashboard';
import profileImage from '../../assets/profileImage/profile-img.png';
import { ProfileData } from '../profileData';

export const Header = () => {
  return (
    <div className='flex w-[calc(100vw-256px)]  h-20 gap-10  items-center justify-between'>
      <div className=' flex-grow max-w-[480px] min-w-[255px]'>
        <Input
          placeHolder='Search'
          inputSize='small'
          trailingIcon={<Search />}
          className='placeholder:text-light-grey-800/[28%]'
        />
      </div>
      <div className='flex items-center gap-7'>
        <ProfileData src={profileImage} imageSize='small' />
        <NotificationBell notification={1} />
      </div>
    </div>
  );
};

interface NotificationBellProps {
  notification?: number;
}

export const NotificationBell = ({ notification }: NotificationBellProps) => {
  return (
    <div className='relative cursor-pointer'>
      {notification && (
        <span className='bg-light-secondary-red text-primary-white text-[10px] text-center rounded-full w-3 h-3 absolute top-[-3px] right-0'>
          {notification}
        </span>
      )}
      <Bell />
    </div>
  );
};
