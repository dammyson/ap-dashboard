import { Input } from '../input';
import { Bell, Search } from '../svg/dashboard/Dashboard';
import { useNavigate } from 'react-router';
import { useUser } from '@/context/AppContext';
import { Avatar } from '../avatar/Avatar';
import { useGetColorByChar } from '@/hooks/useGetColorByChar';
import { getInitials } from '@/utils';
import WelcomeMessage from '../welcomeMessage';
import { useState } from 'react';
import NotificationUi from '../Notification/notification';
import { NotificationsType } from '@/types/types';

interface Props {
  hasWelcomeMessage?: boolean;
}

export const Header = ({ hasWelcomeMessage = false }: Props) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { getColor } = useGetColorByChar();
  const [showUi, setShowUi] = useState(false);
  const [message, setMessage] = useState<NotificationsType[] | []>([]);

  // const getLength = (messages: NotificationsType[]) => {
  //   return messages.filter((unreadMessages) => !unreadMessages.isRead).length;
  // };

  return (
    <div className='flex w-full h-20 gap-5 560:gap-10 items-center justify-between px-2 mb-6 768:px-4'>
      <div className='flex-grow max-w-[480px] 560:min-w-[255px]'>
        {hasWelcomeMessage ? (
          <div className='mt-5'>
            <WelcomeMessage
              username={user?.user_name.split(' ')[1]}
              description="Let's review today's insights"
            />
          </div>
        ) : (
          <Input
            placeHolder='Search'
            inputSize='small'
            trailingIcon={<Search />}
            className='placeholder:text-light-grey-900'
            hasBorder
          />
        )}
      </div>
      <div className='flex items-center 560:gap-7'>
        {user?.image_url_link &&
        user?.image_url_link !== 'https://srv575046.hstgr.cloud/storage/' &&
        user?.image_url_link !== 'http://127.0.0.1:8000/storage/' ? (
          <div className='rounded-full overflow-hidden hidden 560:block  w-[45px] aspect-square'>
            <img
              onClick={() => navigate('/settings')}
              src={user?.image_url_link}
              alt='profile image'
              className='w-full h-full object-cover cursor-pointer'
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
            className='hidden 560:flex cursor-pointer'
            textClassName='560:text-lg 960:text-xl'
          />
        )}
        <NotificationBell onClick={() => setShowUi(true)} notification={0} />
        <NotificationUi
          message={message}
          setMessage={setMessage}
          showUi={showUi}
          setShowUi={setShowUi}
        />
      </div>
    </div>
  );
};

interface NotificationBellProps {
  notification: number;
  onClick: () => void;
}

export const NotificationBell = ({
  notification,
  onClick,
}: NotificationBellProps) => {
  return (
    <div className='relative cursor-pointer' onClick={onClick}>
      <Bell />
      {notification > 0 && notification <= 50 ? (
        <span className='bg-light-secondary-red text-primary-white text-[10px] flex items-center justify-center rounded-full w-4 h-4 absolute top-[-3px] right-0'>
          <span className='h-[13px]'>{notification}</span>
        </span>
      ) : notification > 50 ? (
        <span className='bg-light-secondary-red text-primary-white text-[9px] flex items-center justify-center rounded-full w-5 h-5 absolute top-[-7px] right-[-5px]'>
          <span className='h-[14px]'>50+</span>
        </span>
      ) : (
        <></>
      )}
    </div>
  );
};
