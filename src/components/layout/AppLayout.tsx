import { PropsWithChildren } from 'react';
import { SideNavigation } from '../sideNav';

interface LayoutProps {
  logo: string;
}

export const AppLayout = ({
  logo,
  children,
}: PropsWithChildren<LayoutProps>) => {
  return (
    <div className='flex'>
      <SideNavigation logo={logo} />
      {children}
    </div>
  );
};
