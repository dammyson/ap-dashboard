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
  onClick: () => void;
}
export const Modal = ({
  isBackground,
  isCentered,
  cancelIcon,
  cancelType = 'outlined',
  size,
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
        'fixed z-10 inset-0 w-full h-lvh flex items-center justify-center',
      )}
    >
      <div
        className={clsx(
          size === SizeType.LARGE
            ? 'max-w-[817px] '
            : size === SizeType.MEDIUM
              ? 'max-w-[717px]'
              : size === SizeType.SMALL
                ? 'max-w-[512px]'
                : '',
          'relative w-full rounded-[20px] bg-primary-white p-10 text-center drop-shadow-2xl',
          isCentered ? 'grid items-center justify-items-center' : '',
        )}
      >
        {cancelIcon && (
          <span
            onClick={onClick}
            className={clsx(
              cancelType === 'outlined'
                ? size === SizeType.LARGE
                  ? 'right-11 top-11'
                  : size === SizeType.MEDIUM || size === SizeType.SMALL
                    ? 'right-3 top-3'
                    : ''
                : cancelType === 'filled'
                  ? 'right-[-20px] top-[-20px]'
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
