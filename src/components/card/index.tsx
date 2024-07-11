import { PropsWithChildren, ReactNode } from 'react';

export enum CardType {
  large = 'large',
  Medium = 'medium',
  small = 'small',
}

interface CardProps {
  hasHeader?: boolean;
  hasBadge?: boolean;
  title?: string;
  hasButton?: ReactNode;
  trailingIcon1?: ReactNode;
  trailingIcon2?: ReactNode;
}

export const Card = ({
  hasHeader,
  hasBadge,
  title,
  hasButton,
  trailingIcon1,
  trailingIcon2,
  children,
}: PropsWithChildren<CardProps>) => {
  return (
    <div className='mt-8 bg-primary-white shadow-default rounded-[20px] p-9'>
      {hasHeader && (
        <>
          <div className='flex items-start justify-between mb-3'>
            <div className='flex items-center'>
              {hasBadge && (
                <span className='w-3 h-3 rounded-full bg-light-blue-main mr-4'></span>
              )}
              {title && (
                <span className='font-medium text-xl text-light-grey-700 '>
                  {title}
                </span>
              )}
            </div>
            <div className='flex items-center pt-3'>
              {hasButton && <span>{hasButton}</span>}
              {trailingIcon1 && (
                <span className=' cursor-pointer ml-3 w-8 h-8 rounded-full shadow-100 grid place-content-center'>
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
