import clsx from 'clsx';
import { PropsWithChildren, ReactNode } from 'react';

export enum CardType {
  large = 'large',
  Medium = 'medium',
  small = 'small',
}

interface CardProps {
  isFiltered?: boolean;
  hasHeader?: boolean;
  hasBadge?: boolean;
  title?: string;
  hasButton?: ReactNode;
  trailingIcon1?: ReactNode;
  trailingIcon2?: ReactNode;
  hasBorder?: boolean;
  className?: string;
  titleClass?: string;
  mainClass?: string;
}

export const Card = ({
  isFiltered,
  hasHeader,
  hasBadge,
  title,
  hasButton,
  trailingIcon1,
  trailingIcon2,
  hasBorder,
  className,
  children,
  titleClass,
  mainClass,
}: PropsWithChildren<CardProps>) => {
  return (
    <div
      className={clsx(
        'mt-8 bg-primary-white shadow-default rounded-[20px] p-5 560:p-7 1240:p-9',
        mainClass,
      )}
    >
      {hasHeader && (
        <>
          <div
            className={clsx(
              hasBorder ? 'border-b border-b-light-blue-50' : '',
              'flex items-center justify-between pb-3',
              className,
            )}
          >
            <div className='flex items-center'>
              {hasBadge && (
                <span className='min-w-[10px] min-h-[10px] 560:w-3 560:h-3  rounded-full bg-light-blue-main mr-4'></span>
              )}
              {title && (
                <span
                  className={clsx(
                    'font-medium text-base 560:text-lg 1400:text-xl text-light-grey-700 ',
                    titleClass,
                  )}
                >
                  {title}
                </span>
              )}
            </div>
            <div className='flex items-center'>
              {hasButton && <span>{hasButton}</span>}
              {trailingIcon1 && (
                <span
                  className={clsx(
                    isFiltered && 'border-2 border-light-blue-50',
                    ' cursor-pointer ml-3 w-8 h-8 rounded-full shadow-100 grid place-content-center',
                  )}
                >
                  {trailingIcon1}
                </span>
              )}
              {trailingIcon2 && (
                <span className=' cursor-pointer ml-3 w-8 h-8 rounded-full shadow-100 grid place-content-center'>
                  {trailingIcon2}
                </span>
              )}
            </div>
          </div>
        </>
      )}
      {children}
    </div>
  );
};
