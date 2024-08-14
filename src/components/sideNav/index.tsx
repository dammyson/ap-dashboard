import { ReactNode } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import {
  Exit,
  HeartBeatLine,
  Home,
  People,
  Settings,
  TodoList,
} from '../svg/sideNav/SideNav';
import clsx from 'clsx';
import { convertToUrlString } from '../../utils';
import whiteLogo from '../../assets/logos/white_logo.png';
import birdLogo from '../../assets/logos/Bird Logo White.png';
import { useWindowSize } from '../hooks/useWindowSize';

interface NavigationItem {
  icon: ReactNode;
  title: string;
  id?: string;
  countId?: string;
  show?: boolean;
  hasChildren?: boolean;
  children?: Array<{ title: string; id: string }>;
}

type NavigationItems = NavigationItem[];

export const SideNavigationItems = () => {
  const { pathname } = useLocation();

  const navigationItems = [
    {
      icon: <Home />,
      title: 'Dashboard',
      show: true,
    },
    {
      icon: <People />,
      title: 'Customer',
      show: true,
    },
    {
      icon: <HeartBeatLine />,
      title: 'Activity Log',
      show: true,
    },
    {
      icon: <TodoList />,
      title: 'Surveys',
      show: true,
    },
    {
      icon: <Settings />,
      title: 'Settings',
      show: true,
    },
    {
      icon: <Exit />,
      title: 'Logout',
      show: true,
    },
  ] as NavigationItems;

  return (
    <div>
      {useWindowSize(1240) ? (
        <div className='flex justify-center items-center pt-6 1240:pt-10 pl-3 pr-3'>
          <img src={birdLogo} alt='airpeace-bird logo' />
        </div>
      ) : (
        <div className='flex justify-center items-center pt-10 pr-[4.6rem] pl-8'>
          <img src={whiteLogo} alt='airpeace logo' />
        </div>
      )}
      <div className='grid gap-6 pl-[14px] 560:pl-6 mt-[60px] 1240:mt-[85px]'>
        {navigationItems
          ?.slice(0, -2)
          .map(({ icon, title, countId, id }, index) => {
            const route = `/${convertToUrlString(id ?? title)}`;
            const isActive = pathname.includes(convertToUrlString(id ?? title))
              ? true
              : false;
            return (
              <div
                key={title}
                className={
                  index === 4
                    ? 'border-b border-customPurple pb-[15px] mb-[15px]'
                    : ''
                }
              >
                <NavLink
                  to={route}
                  className={clsx(
                    isActive
                      ? 'bg-light-blue-main border-r-[5px] 560:border-r-[7px] border-r-light-blue-100 rounded-tl-md rounded-bl-md'
                      : '',
                    'hover:text-light-grey-300 cursor-pointer text-white no-underline relative flex text-sm font-normal transition-colors duration-200 px-[12px] 560:px-4 py-3 mb-1',
                  )}
                >
                  <div className='flex gap-8 items-center'>
                    <span>{icon}</span>
                    {useWindowSize(1240) ? <></> : <span>{title}</span>}
                  </div>
                  {countId && (
                    <div className='absolute top-15 right-10 text-xs font-light bg-gray-200 rounded-full px-2 py-1 text-gray-700 shadow-sm'>
                      {countId}
                    </div>
                  )}
                </NavLink>
              </div>
            );
          })}
      </div>

      <div
        className={clsx(
          'w-[70px] 560:w-24 1240:w-[270px] fixed bottom-12 grid gap-6 pl-[12px] 560:pl-6 py-15',
        )}
      >
        {navigationItems?.slice(-2).map(({ icon, title, countId, id }) => {
          const route = `/${convertToUrlString(id ?? title)}`;
          const isActive = pathname.includes(convertToUrlString(id ?? title))
            ? true
            : false;

          return (
            <div key={title}>
              <a
                href={title === 'Settings' ? route : '/'}
                className={clsx(
                  isActive
                    ? 'bg-light-blue-main border-r-[5px] 560:border-r-[7px] border-r-light-blue-100 rounded-tl-md rounded-bl-md'
                    : '',
                  'hover:text-light-grey-300 cursor-pointer text-white no-underline relative flex text-sm font-normal transition-colors duration-200  mb-1 px-[14px] 560:px-4 py-3',
                )}
              >
                <div className='flex gap-8 items-center'>
                  <span>{icon}</span>
                  {useWindowSize(1240) ? <></> : <span>{title}</span>}
                </div>
                {countId && (
                  <div className='absolute top-15 right-10 text-xs font-light bg-gray-200 rounded-full px-2 py-1 text-gray-700  shadow-sm'>
                    {countId}
                  </div>
                )}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const SideNavigationContent = () => {
  return (
    <div>
      <div
        className={clsx(
          'w-[70px] 560:w-24 1240:w-[270px] h-lvh bg-black fixed top-0 left-0 py-[15px]',
        )}
      >
        <SideNavigationItems />
      </div>
    </div>
  );
};
