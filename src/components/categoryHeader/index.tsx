import { ReactNode } from 'react';

interface CategoryHeaderProps {
  title: string;
  description?: string;
  button?: ReactNode;
}

function CategoryHeader({ title, description, button }: CategoryHeaderProps) {
  return (
    <div className='w-full h-14 bg-light-blue-main flex items-center justify-between px-6'>
      <p className='text-primary-white font-medium text-[18px]'> {title}</p>
      {description && (
        <p className='text-primary-white font-medium text-[14px]'>
          {description}
        </p>
      )}
      {button && <div> {button}</div>}
    </div>
  );
}

export default CategoryHeader;
