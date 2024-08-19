import { PropsWithChildren, ReactNode, useEffect, useRef } from 'react';
import clsx from 'clsx';

export enum SizeType {
  LARGE = 'large',
  MEDIUM = 'medium',
  SMALL = 'small',
}

interface ModalProps {
  isBackground?: boolean;
  isCentered?: boolean;
  cancelIcon?: ReactNode;
  cancelType?: 'filled' | 'outlined';
  size?: SizeType;
  className?: string;
  onClick: () => void;
}
export const Modal = ({
  isBackground,
  isCentered,
  cancelIcon,
  cancelType = 'outlined',
  size,
  className,
  children,
  onClick,
}: PropsWithChildren<ModalProps>) => {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeBackground = (e: MouseEvent) => {
      if (e.target === backgroundRef.current && isBackground) {
        onClick();
      }
    };
    document.addEventListener('click', closeBackground);

    return () => {
      document.removeEventListener('click', closeBackground);
    };
  });

  return (
    <div
      ref={backgroundRef}
      className={clsx(
        isBackground ? 'bg-[#00000033]' : '',
        'fixed z-10 inset-0 w-full h-dvh flex items-center justify-center',
      )}
    >
      <div
        className={clsx(
          size === SizeType.LARGE
            ? 'w-5/6 640:w-[68.5%] 1400:w-full max-w-[980px]'
            : size === SizeType.MEDIUM
              ? ' w-5/6 640:w-[75%] 1240:w-full max-w-[717px]'
              : size === SizeType.SMALL
                ? 'w-[75%] 1240:w-full  max-w-[512px]'
                : '',
          'relative rounded-[20px] bg-primary-white p-7 960:p-10 text-center drop-shadow-2xl',
          isCentered ? 'grid items-center justify-items-center' : '',
          className,
        )}
      >
        {cancelIcon && (
          <span
            onClick={onClick}
            className={clsx(
              cancelType === 'outlined'
                ? size === SizeType.LARGE
                  ? 'right-5 top-5 960:right-11 960:top-11'
                  : size === SizeType.MEDIUM || size === SizeType.SMALL
                    ? 'right-3 top-3'
                    : ''
                : cancelType === 'filled'
                  ? 'right-[-14px] top-[-14px] 960:right-[-20px] 960:top-[-20px]'
                  : '',
              'absolute cursor-pointer',
            )}
          >
            {cancelIcon}
          </span>
        )}
        {children}
      </div>
    </div>
  );
};
