import { PropsWithChildren } from 'react';
import { SideNavigationContent } from '../sideNav';
import clsx from 'clsx';

interface LayoutProps {
  logo: string;
}

export const AppLayout = ({ children }: PropsWithChildren<LayoutProps>) => {
  return (
    <div className='flex bg-[#00000003] '>
      <div className={clsx('w-[70px] 560:w-24 1240:w-[270px] relative ')}>
        <SideNavigationContent />
      </div>
      <div
        className={clsx(
          'w-[calc(100%-70px)] 560:w-[calc(100%-96px)] 1240:w-[calc(100%-270px)] overflow-y-auto h-lvh',
        )}
      >
        {children}
      </div>
    </div>
  );
};
