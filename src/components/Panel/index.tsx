import clsx from 'clsx';
import { PropsWithChildren } from 'react';

export interface PanelNavigationItem {
  title: string;
  id: string;
}

interface PanelProps {
  navigationItems: PanelNavigationItem[];
  currentTab: PanelNavigationItem;
  setCurrentTab: (item: PanelNavigationItem) => void;
  className?: string;
}

export const Panel = ({
  navigationItems,
  currentTab,
  setCurrentTab,
  className,
  children,
}: PropsWithChildren<PanelProps>) => {
  return (
    <div className={clsx('pb-20', className)}>
      <div>
        <div className='flex p-[10px] 768:gap-6'>
          {navigationItems.map((item) => {
            return (
              <div key={item.id}>
                <p
                  onClick={() => {
                    setCurrentTab(item);
                  }}
                  className={clsx(
                    currentTab.id === item.id
                      ? 'text-light-blue-main hover:text-light-blue-main'
                      : 'hover:text-[rgb(151,150,150)]',
                    'cursor-pointer font-medium text-[#C7C7CC] p-[10px] text-center w-max 960:text-2xl 1300:text-[28px]',
                  )}
                >
                  <span>{item.title}</span>
                </p>
                {currentTab.id === item.id && (
                  <div className='w-full h-2 bg-light-blue-main rounded-lg'></div>
                )}
              </div>
            );
          })}
        </div>
        {children}
      </div>
    </div>
  );
};
