import Profile from '../../pages/settings/profile';
import { convertToUrlString } from '../../utils';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TeamMembers from '../../pages/settings/teamMembers';
import ChangePassword from '../../pages/settings/changePassword';

interface PanelNavigationItem {
  title: string;
  id: string;
}

type PanelNavigationItems = PanelNavigationItem[];

export const SettingsPanelItems = () => {
  const { pathname } = useLocation();
  const navigationItems = [
    {
      title: 'Profile',
      id: 'profile',
    },
    {
      title: 'Team members',
      id: 'team members',
    },
    {
      title: 'Change password',
      id: 'change password',
    },
  ] as PanelNavigationItems;

  const [currentTab, setCurrentTab] = useState(navigationItems[0]);

  useEffect(() => {});

  return (
    <div>
      <div className='flex p-[10px] 768:gap-6'>
        {navigationItems.map((item) => {
          return (
            <div key={item.id}>
              <p
                onClick={() => {
                  setCurrentTab(item);
                }}
                className={clsx(
                  currentTab.id === item.id
                    ? 'text-light-blue-main hover:text-light-blue-main'
                    : 'hover:text-[rgb(151,150,150)]',
                  'cursor-pointer font-medium text-[#C7C7CC] p-[10px] text-center w-max 960:text-2xl 1300:text-[28px]',
                )}
              >
                <span>{item.title}</span>
              </p>
              {currentTab.id === item.id && (
                <div className='w-full h-2 bg-light-blue-main rounded-lg'></div>
              )}
            </div>
          );
        })}
      </div>
      <div className='mt-10 pr-12'>
        {currentTab.id === 'profile' ? (
          <Profile />
        ) : currentTab.id === 'team members' ? (
          <TeamMembers />
        ) : (
          <ChangePassword />
        )}
      </div>
    </div>
  );
};

export const SettingsPanel = () => {
  return (
    <div>
      <SettingsPanelItems />
    </div>
  );
};
