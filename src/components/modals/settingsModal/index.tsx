import { ReactNode, useEffect, useRef } from 'react';
import { BorderRadius, Button, ButtonSize } from '../../../components/button';
import clsx from 'clsx';

export enum ButtonType {
  DELETE = 'delete',
  UPDATE = 'update',
}

export enum SizeType {
  LARGE = 'large',
  MEDIUM = 'medium',
}

interface ModalProps {
  isBackground?: boolean;
  buttonType?: ButtonType;
  startingIcon?: ReactNode;
  cancelIcon: ReactNode;
  cancelType?: 'filled' | 'outlined';
  size?: SizeType;
  hasbutton?: boolean;
  topic?: string;
  description?: string;
  className?: string;
  onClick: () => void;
}
export const SettingsModal = ({
  isBackground,
  buttonType,
  startingIcon,
  cancelIcon,
  cancelType = 'outlined',
  topic,
  size,
  className,
  description,
  onClick,
}: ModalProps) => {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeBackground = (e: MouseEvent) => {
      if (e.target === backgroundRef.current && isBackground) onClick();
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
            ? 'max-w-[717px] h-[339px] '
            : 'max-w-[512px] h-[335px]',
          'relative w-full rounded-[20px] bg-primary-white grid items-center justify-items-center px-10 pt-7 pb-9 text-center drop-shadow-2xl',
        )}
      >
        {cancelIcon && (
          <span
            onClick={onClick}
            className={clsx(
              cancelType === 'filled'
                ? 'right-[-20px] top-[-20px]'
                : 'right-3 top-3',
              'absolute cursor-pointer',
            )}
          >
            {cancelIcon}
          </span>
        )}
        {startingIcon && <span>{startingIcon}</span>}
        {topic && <div className='font-medium text-[24px] my-5'>{topic}</div>}
        {description && (
          <div
            className={clsx(
              'font-normal text-[22px] mb-9 text-[#1C1C1E]',
              className,
            )}
          >
            {description}
          </div>
        )}
        {buttonType === ButtonType.DELETE ? (
          <div className='w-full max-w-[340px]'>
            <Button
              size={ButtonSize.Large}
              radius={BorderRadius.Large}
              buttonText='Delete'
              onClick={() => {}}
              className='!font-semibold !text-xl'
            />
          </div>
        ) : buttonType === ButtonType.UPDATE ? (
          <div className='w-full max-w-[340px]'>
            <Button
              size={ButtonSize.Large}
              radius={BorderRadius.Large}
              buttonText='Update'
              onClick={() => {}}
              className='!font-semibold !text-xl '
            />{' '}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
