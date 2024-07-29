import { PanelNavigationItem, Panel } from '@/components/Panel';
import { Header } from '@/components/header';
import { AppLayout } from '@/components/layout/AppLayout';
import { useState } from 'react';
import Profile from './profile';
import TeamMembers from './teamMembers';
import ChangePassword from './changePassword';

function Settings() {
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
  return (
    <AppLayout logo=''>
      <div className='app-container py-2 pl-14 pr-10'>
        <Header />
        <div className='pr-20'>
          <Panel
            navigationItems={navigationItems}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          >
            <div className='mt-10'>
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
