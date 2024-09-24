import clsx from 'clsx';

interface Props {
  initials?: string;
  getBackgroundColor?: (char: string) => string;
  size?: number;
  className?: string;
  textClassName?: string;
  bg?: string;
  onClick?: () => void;
}

export const Avatar = ({
  initials,
  getBackgroundColor,
  size = 40,
  className,
  textClassName,
  bg,
  onClick,
}: Props) => {
  const color = getBackgroundColor
    ? getBackgroundColor(initials?.charAt(0) ?? 'R')
    : bg
      ? bg
      : '#989898';

  return (
    <div onClick={onClick} className={'my-auto flex-shrink-0'}>
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
        <p className={clsx('text-xs font-normal text-white', textClassName)}>
          {initials ? initials?.toUpperCase() : '-'}
        </p>
      </div>
    </div>
  );
};
