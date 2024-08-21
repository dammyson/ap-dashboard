import clsx from 'clsx';
import { ReactNode } from 'react';

interface CategoryHeaderProps {
  title: string;
  description?: string;
  button?: ReactNode;
  className?: string;
  textClass?: string;
}

function CategoryHeader({
  title,
  description,
  button,
  className,
  textClass,
}: CategoryHeaderProps) {
  return (
    <div className='w-full h-14 bg-light-blue-main flex items-center justify-between px-6 gap-3'>
      <p
        className={clsx(
          'text-primary-white font-medium text-[18px]',
          className,
        )}
      >
        {title}
      </p>
      {description && (
        <p
          className={clsx(
            'text-primary-white font-medium text-[14px]',
            textClass,
          )}
        >
          {description}
        </p>
      )}
      {button && <div> {button}</div>}
    </div>
  );
}

export default CategoryHeader;
