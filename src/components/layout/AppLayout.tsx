import { PropsWithChildren } from 'react';
import { SideNavigationContent } from '../sideNav';
import clsx from 'clsx';
import { useWindowSize } from '../hooks/useWindowSize';

interface LayoutProps {
  logo: string;
}

export const AppLayout = ({ children }: PropsWithChildren<LayoutProps>) => {
  return (
    <div className='flex bg-[#00000003] '>
      <div
        className={clsx(
          useWindowSize(1240) ? 'w-24' : 'w-[270px]',
          'relative ',
        )}
      >
        <SideNavigationContent />
      </div>
      <div
        className={clsx(
          useWindowSize(1240) ? 'w-[calc(100%-96px)]' : 'w-[calc(100%-270px)]',
          'overflow-y-auto h-lvh',
        )}
      >
        {children}
      </div>
    </div>
  );
};
