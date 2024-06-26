import clsx from 'clsx';

interface ProfileDataProps {
  src: string;
  name?: string;
  role?: string;
  imageSize: 'small' | 'large';
}

export const ProfileData = ({
  src,
  name,
  role,
  imageSize,
}: ProfileDataProps) => {
  return (
    <div
      className={clsx(
        imageSize === 'small' ? '' : 'flex gap-4 items-center',
        'w-max',
      )}
    >
      <img
        src={src}
        alt='profile image'
        className={clsx(
          imageSize === 'small' ? 'w-12 h-12' : 'w-[120px] h-[120px]',
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
