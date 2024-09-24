import { Input } from '../input';
import { Bell, Search } from '../svg/dashboard/Dashboard';
import { ProfileData } from '../profileData';
import { useNavigate } from 'react-router';
import { useUser } from '@/context/AppContext';
import { Avatar } from '../avatar/Avatar';
import { useGetColorByChar } from '@/hooks/useGetColorByChar';
import { getInitials } from '@/utils';
import profileImage from '../../assets/profileImage/profile-img.png';

export const Header = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { getColor } = useGetColorByChar();

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
      <div className='flex items-center 560:gap-7'>
        {user?.image_url ? (
          <div className='hidden 560:flex min-w-[60px] max-w-[80px]'>
            <img
              onClick={() => navigate('/settings')}
              src={user?.image_url}
              alt='profile image'
              className={'w-12 h-12 rounded-full cursor-pointer'}
            />
          </div>
        ) : (
          <Avatar
            getBackgroundColor={getColor}
            size={48}
            initials={
              user?.user_name ? getInitials(user?.user_name) : undefined
            }
            onClick={() => navigate('/settings')}
            className='hidden 560:flex'
            textClassName='560:text-lg 960:text-xl'
          />
        )}
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
