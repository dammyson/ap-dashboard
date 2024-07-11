import { PropsWithChildren } from 'react';
import { SideNavigationContent } from '../sideNav';

interface LayoutProps {
  logo: string;
}

export const AppLayout = ({
  logo,
  children,
}: PropsWithChildren<LayoutProps>) => {
  return (
    <div className='flex bg-[#00000003] '>
      <div className='relative w-[270px]'>
        <SideNavigationContent />
      </div>
      <div className='w-[calc(100%-270px)] overflow-y-auto h-lvh'>
        {children}
      </div>
    </div>
  );
};
