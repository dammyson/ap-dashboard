import { Fragment, ReactNode, useState } from 'react';
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
    <div className='relative py-[15px] h-lvh '>
      <div className='max-w-[256px] flex justify-center items-center py-10 pr-[4.6rem] pl-8'>
        <img src={whiteLogo} alt='' />
      </div>
      <div className='grid gap-6 pl-6'>
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
                      ? 'bg-light-blue-main border-r-[7px] border-r-light-blue-100 rounded-tl-md rounded-bl-md'
                      : '',
                    'hover:text-light-grey-300 cursor-pointer text-white no-underline relative flex text-sm font-normal transition-colors duration-200 px-4 py-3  mb-1 ',
                  )}
                >
                  <div className='flex gap-8 items-center'>
                    <span>{icon}</span>
                    <span className='hidden 768:block'>{title}</span>
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

      <div className='fixed bottom-12 grid gap-6 pl-6 py-15 w-[256px]'>
        {navigationItems
          ?.slice(-2)
          .map(({ icon, title, countId, id }, index) => {
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
                      ? 'bg-light-blue-main border-r-4 border-r-light-blue-100 rounded-tl-md rounded-bl-md'
                      : '',
                    'hover:text-light-grey-300 cursor-pointer text-white no-underline relative flex text-sm font-normal transition-colors duration-200  mb-1 px-4 py-3',
                  )}
                >
                  <div className='flex gap-8 items-center'>
                    <span>{icon}</span>
                    <span className='hidden 768:block'>{title}</span>
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
      <div className='h-full w-full bg-black '>
        <div className='h-calcvh-minus-92'>
          <SideNavigationItems />
        </div>
      </div>
    </div>
  );
};
