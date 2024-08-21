import { Input } from '../input';
import { Bell, Search } from '../svg/dashboard/Dashboard';
import profileImage from '../../assets/profileImage/profile-img.png';
import { ProfileData } from '../profileData';
import { useNavigate } from 'react-router';

export const Header = () => {
  const navigate = useNavigate();
  return (
    <div className='flex w-full h-20 gap-5 560:gap-10 items-center justify-between px-2 mb-6 768:px-4'>
      <div className='flex-grow max-w-[480px] 560:min-w-[255px]'>
        <Input
          placeHolder='Search'
          inputSize='small'
          trailingIcon={<Search />}
          className='placeholder:text-light-grey-900'
          hasBorder
        />
      </div>
      <div className='flex items-center gap-7'>
        <ProfileData
          src={profileImage}
          onClick={() => {
            navigate('/settings');
          }}
          className='hidden 560:flex'
        />
        <NotificationBell notification={1} />
      </div>
    </div>
  );
};

interface NotificationBellProps {
  notification: number;
}

export const NotificationBell = ({ notification }: NotificationBellProps) => {
  return (
    <div className='relative cursor-pointer'>
      {notification > 0 ? (
        <span className='bg-light-secondary-red text-primary-white text-[10px] flex items-center justify-center rounded-full w-3 h-3 absolute top-[-3px] right-0'>
          <span className='h-[13px]'>{notification}</span>
        </span>
      ) : (
        <></>
      )}
      <Bell />
    </div>
  );
};
