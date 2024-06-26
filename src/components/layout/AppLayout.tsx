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
    <div className='flex'>
      <SideNavigationContent />
      {children}
    </div>
  );
};
