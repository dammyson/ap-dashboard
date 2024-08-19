import { PanelNavigationItem, Panel } from '@/components/Panel';
import { Header } from '@/components/header';
import { AppLayout } from '@/components/layout/AppLayout';
import { useState } from 'react';
import Profile from './profile';
import TeamMembers from './teamMembers';
import ChangePassword from './changePassword';
import { useWindowSize } from '@/components/hooks/useWindowSize';
import clsx from 'clsx';
import { Modal, SizeType } from '@/components/modal';
import { AccessLock, Cancel } from '@/components/svg/modal/Modal';

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
  const [adminRole, setAdminRole] = useState(false);
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
            setCurrentTab={setCurrentTab}
            className='!pb-0 1240:!pb-10'
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
      {adminRole && (
        <Modal
          isBackground
          isCentered
          size={SizeType.MEDIUM}
          cancelIcon={<Cancel />}
          onClick={() => setAdminRole(false)}
          className='640:!max-w-[610px] 1240:!max-w-[717px]'
        >
          <div className='mb-4 mt-3'>
            <AccessLock />
          </div>
          <h3 className='font-medium text-[22px] 768:text-2xl 1240:text-[30px] text-light-primary-deep_black pb-4'>
            Access Denied
          </h3>
          <p className='text-lg 880:text-xl text-light-primary-deep_black font-medium'>
            You do not have permission to view team members. Please contact your
            system administrator if you believe this is an error.
          </p>
        </Modal>
      )}
    </AppLayout>
  );
}

export default Settings;
