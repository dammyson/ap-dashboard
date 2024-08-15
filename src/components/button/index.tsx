import { ReactNode } from 'react';
import { Button as HeadlessButton } from '@headlessui/react';
import clsx from 'clsx';

export enum BorderRadius {
  Large = 'large',
  Medium = 'medium',
  Small = 'small',
}

export enum ButtonSize {
  Large = 'large',
  Medium = 'medium',
  Small = 'small',
}

interface ButtonProps {
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  mode?: 'solid' | 'outlined' | 'text';
  radius?: BorderRadius;
  buttonText: string;
  size?: ButtonSize;
  className?: string;
  buttonClass?: string;
  onClick: () => void;
}

export function Button({
  leadingIcon,
  trailingIcon,
  mode = 'solid',
  radius,
  className,
  buttonText,
  buttonClass,
  size,
  onClick,
}: ButtonProps) {
  return (
    <div className='relative'>
      <HeadlessButton
        onClick={onClick}
        className={clsx(
          radius === BorderRadius.Large
            ? 'rounded-[50px]'
            : radius === BorderRadius.Medium
              ? 'rounded-[20px]'
              : 'rounded-[10px]',
          size === ButtonSize.Large
            ? 'w-full min-h-[55px] text-base 768:min-h-[66px] 768:text-lg'
            : size === ButtonSize.Medium
              ? 'w-full min-h-[44px] text-base'
              : 'w-full min-[30px] text-sm',
          mode === 'solid'
            ? 'bg-light-blue-50 border-none text-light-blue-main hover:bg-light-blue-100'
            : mode === 'outlined'
              ? 'border-2 border-light-blue-50 hover:border-[#acbbd0] bg-transparent text-light-blue-main'
              : 'border-none text-primary-black bg-transparent',
          'cursor-pointer flex justify-center items-center gap-2 py-2 px-4 focus:outline-none',
          className,
        )}
      >
        {leadingIcon}
        <p className={buttonClass}>{buttonText}</p>
        {trailingIcon}
      </HeadlessButton>
    </div>
  );
}
