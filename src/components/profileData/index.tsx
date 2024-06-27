import clsx from 'clsx';

interface ProfileDataProps {
  src: string;
  name?: string;
  role?: string;
  isName: boolean;
  onClick?: () => void;
}

export const ProfileData = ({
  src,
  name,
  role,
  isName,
  onClick,
}: ProfileDataProps) => {
  return (
    <div className={clsx(isName ? 'flex gap-4 items-center' : '', 'w-max')}>
      <img
        onClick={onClick}
        src={src}
        alt='profile image'
        className={clsx(
          isName ? 'w-[120px] h-[120px]' : 'w-12 h-12',
          'rounded-full cursor-pointer',
        )}
      />
      <div className='grid gap-3'>
        {name && (
          <div className='font-semibold text-2xl text-light-primary-black '>
            {name}
          </div>
        )}
        {role && <span className='font-normal text-xl'>{role}</span>}
      </div>
    </div>
  );
};
