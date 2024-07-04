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
      <SideNavigationContent />
      <div className='ml-[270px] w-full'>{children}</div>
    </div>
  );
};
