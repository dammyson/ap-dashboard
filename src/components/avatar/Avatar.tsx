import clsx from 'clsx';

interface Props {
  initials?: string;
  getBackgroundColor?: (char: string) => string;
  size?: number;
  className?: string;
  bg?: string;
}

export const Avatar = ({
  initials,
  getBackgroundColor,
  size = 40,
  className,
  bg,
}: Props) => {
  const color = getBackgroundColor
    ? getBackgroundColor(initials?.charAt(0) ?? 'R')
    : bg
      ? bg
      : '#989898';

  return (
    <div className={'my-auto flex-shrink-0'}>
      <div
        className={clsx(
          'flex items-center justify-center rounded-full text-center',
          className,
        )}
        style={{
          backgroundColor: color,
          height: size,
          width: size,
        }}
      >
        <p className='text-xs font-normal text-white'>
          {initials ? initials?.toUpperCase() : '-'}
        </p>
      </div>
    </div>
  );
};
