import clsx from 'clsx';

interface ProfileDataProps {
  src: string;
  name?: string;
  role?: string;
  onClick?: () => void;
  className?: string;
}

export const ProfileData = ({
  src,
  name,
  role,
  className,
  onClick,
}: ProfileDataProps) => {
  return (
    <div
      className={clsx(
        name ? 'flex gap-4 items-center' : '',
        'w-full max-w-[300px]',
        className,
      )}
    >
      <div className='max-w-[80px] 560:max-w-[100px]'>
        <img
          onClick={onClick}
          src={src}
          alt='profile image'
          className={clsx(
            name ? 'w-full ' : 'w-12 h-12',
            'rounded-full cursor-pointer',
          )}
        />
      </div>
      <div className='grid gap-1.5 960:gap-3'>
        {name && (
          <div className='font-semibold text-lg 768:text-xl 960:text-2xl text-light-primary-black text-nowrap '>
            {name}
          </div>
        )}
        {role && (
          <span className='font-normal text-primary-black text-base 768:text-lg 960:text-xl'>
            {role}
          </span>
        )}
      </div>
    </div>
  );
};
