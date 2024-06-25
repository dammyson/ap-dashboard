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
  isRoot?: boolean;
  verified?: boolean;
  countId?: string;
  show?: boolean;
  hasChildren?: boolean;
  children?: Array<{ title: string; id: string }>;
}

type NavigationItems = NavigationItem[];

export const SideNavigationItems = () => {
  const { pathname } = useLocation();
  const [showChildren, setShowChildren] = useState(false);
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
      title: 'Surverys',
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

  function checkIsActive(pathname: string, query: string, isRoot?: boolean) {
    if (isRoot && pathname === '/') return true;
    return !!pathname.split('/')[1]?.includes(convertToUrlString(query));
  }

  return (
    <div className='relative py-[15px] h-lvh '>
      <div className='max-w-[256px] flex justify-center items-center py-10 pr-[4.6rem] pl-8'>
        <img src={whiteLogo} alt='' />
      </div>
      <div className='grid gap-6 pl-6'>
        {navigationItems
          ?.slice(0, -2)
          .map(
            (
              { icon, title, countId, id, isRoot, hasChildren, children },
              index,
            ) => {
              const route = `${convertToUrlString(id ?? title)}`;

              const isActive = checkIsActive(pathname, id ?? title, isRoot);

              return (
                <div
                  key={title}
                  className={
                    index === 4
                      ? 'border-b border-customPurple pb-[15px] mb-[15px]'
                      : ''
                  }
                >
                  {hasChildren ? (
                    <button
                      onClick={() => {
                        setShowChildren(!showChildren);
                      }}
                      className={clsx(
                        isActive ? 'bg-[#40072B] rounded' : '',
                        'w-full cursor-pointer text-white no-underline relative flex text-sm font-normal transition-colors duration-200 px-4 py-3 font-inter mb-1 ',
                      )}
                    >
                      <div className='flex gap-12 items-center'>
                        <span>{icon}</span>
                        <span>{title}</span>
                      </div>
                      {hasChildren && (
                        <button className='absolute top-15 right-10 text-xs bg-transparent border-none cursor-pointer'>
                          {/* {showChildren ? <ChevronUp /> : <ChevronDown />} */}
                        </button>
                      )}
                    </button>
                  ) : (
                    <NavLink
                      to={isRoot ? '/' : route}
                      className={clsx(
                        isActive
                          ? 'bg-light-blue-main border-r-4 border-r-light-blue-100 rounded-tl-md rounded-bl-md'
                          : '',
                        'hover:text-light-grey-300 cursor-pointer text-white no-underline relative flex text-sm font-normal transition-colors duration-200 px-4 py-3 font-inter mb-1 ',
                      )}
                    >
                      <div className='flex gap-8 items-center'>
                        <span>{icon}</span>
                        <span className='hidden 768:block'>{title}</span>
                      </div>
                      {countId && (
                        <div className='absolute top-15 right-10 text-xs font-light bg-gray-200 rounded-full px-2 py-1 text-gray-700 font-inter shadow-sm'>
                          {countId}
                        </div>
                      )}
                    </NavLink>
                  )}
                  {hasChildren &&
                    showChildren &&
                    children?.map(({ title, id }) => {
                      const route = `${convertToUrlString(id ?? title)}`;

                      return (
                        <div className='max-h-[48px]' key={id}>
                          <a
                            href={route}
                            className='text-white opacity-50 no-underline relative flex items-center text-sm font-normal transition duration-200 ease-in-out py-3 px-12 cursor-pointer font-inter border-none bg-red-800'
                          >
                            {title}
                          </a>
                        </div>
                      );
                    })}
                </div>
              );
            },
          )}
      </div>

      <div className='fixed bottom-12 grid gap-6 pl-6 py-15 w-[256px]'>
        {navigationItems
          ?.slice(-2)
          .map(({ icon, title, countId, id, verified, isRoot }, index) => {
            const route = `${convertToUrlString(id ?? title)}`;

            if (verified) return <Fragment key={title}></Fragment>;

            const isActive = checkIsActive(pathname, id ?? title, isRoot);

            return (
              <div key={title}>
                <a
                  href={isRoot ? '/' : route}
                  className={clsx(
                    isActive
                      ? 'bg-light-blue-main border-r-4 border-r-light-blue-100 rounded-tl-md rounded-bl-md'
                      : '',
                    'hover:text-light-grey-300 cursor-pointer text-white no-underline relative flex text-sm font-normal transition-colors duration-200 font-inter mb-1 px-4 py-3',
                  )}
                >
                  <div className='flex gap-8 items-center'>
                    <span>{icon}</span>
                    <span className='hidden 768:block'>{title}</span>
                  </div>
                  {countId && (
                    <div className='absolute top-15 right-10 text-xs font-light bg-gray-200 rounded-full px-2 py-1 text-gray-700 font-inter shadow-sm'>
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
