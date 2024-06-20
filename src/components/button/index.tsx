import React, { PropsWithChildren, ReactNode } from 'react';
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
  icon?: ReactNode;
  mode?: 'solid' | 'outlined' | 'text';
  radius?: BorderRadius;
  buttonText: string;
  size?: ButtonSize;
  className?: string;
}

export function Button({
  icon,
  mode = 'solid',
  radius,
  className,
  buttonText,
  size,
}: ButtonProps) {
  return (
    <HeadlessButton
      className={clsx(
        radius === BorderRadius.Large
          ? 'rounded-[50px]'
          : radius === BorderRadius.Medium
            ? 'rounded-[20px]'
            : 'rounded-[10px]',
        size === ButtonSize.Large
          ? 'w-full min-h-[66px] text-lg'
          : size === ButtonSize.Medium
            ? 'w-full min-h-[44px] text-base'
            : 'w-full min-[30px] text-sm',
        mode === 'solid'
          ? 'bg-light-primary-light_blue border-none text-light-primary-dark_blue'
          : mode === 'outlined'
            ? 'border-2 border-light-primary-light_blue bg-transparent text-light-primary-dark_blue'
            : 'border-none text-primary-black',
        'cursor-pointer flex justify-center items-center gap-4 py-2 px-4',
        className,
      )}
    >
      <p>{buttonText}</p>
      {icon}
    </HeadlessButton>
  );
}
