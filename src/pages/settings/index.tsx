import { PanelNavigationItem, Panel } from '@/components/Panel';
import { Header } from '@/components/header';
import { AppLayout } from '@/components/layout/AppLayout';
import { useState } from 'react';
import Profile from './profile';
import TeamMembers from './teamMembers';
import ChangePassword from './changePassword';
import { useWindowSize } from '@/components/hooks/useWindowSize';
import clsx from 'clsx';
import { useUser } from '@/context/AppContext';
import { usePermission, UserRole } from '@/context/permissionContext';

function Settings() {
  const { user } = useUser();
  const navigationItems: PanelNavigationItem[] = [
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
  ];

  const [currentTab, setCurrentTab] = useState(navigationItems[0]);
  const { setAccessDenied } = usePermission();

  const handleChangeTab = (item: PanelNavigationItem) => {
    if (user?.role === UserRole.SUB_ADMIN && item.id === 'team members') {
      setAccessDenied(true);
      return;
    } else setCurrentTab(item);
  };
  return (
    <AppLayout logo=''>
      <div
        className={clsx(
          useWindowSize(1240) ? 'w-full' : 'app-container',
          'py-7 px-5 1240:pl-14 1240:pr-10',
        )}
      >
        <Header />
        <div className='1240:pr-12'>
          <Panel
            navigationItems={navigationItems}
            currentTab={currentTab}
            setCurrentTab={handleChangeTab}
            className='!pb-0'
          >
            <div className='mt-6 640:mt-10'>
              {currentTab.id === 'profile' ? (
                <Profile />
              ) : currentTab.id === 'team members' ? (
                <TeamMembers />
              ) : (
                <ChangePassword />
              )}
            </div>
          </Panel>
        </div>
      </div>
    </AppLayout>
  );
}

export default Settings;
