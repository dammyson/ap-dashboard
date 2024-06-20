import React, { ReactNode } from 'react';
import { Field, Input as HeadlessInput, Label } from '@headlessui/react';
import clsx from 'clsx';

export enum InputState {
  Success = 'success',
  ERROR = 'error',
  NORMAL = 'normal',
  READ_ONLY = 'read_only',
}

interface InputProps
  extends Omit<JSX.IntrinsicElements['input'], 'placeholder' | 'label'> {
  label?: string;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  helper?: ReactNode;
  state?: InputState;
  className?: string;
  placeHolder?: string;
  inputSize?: 'small' | 'large';
  isCurved?: boolean;
  hasBorder?: boolean;
}

export function Input({
  className,
  type = 'text',
  label,
  leadingIcon,
  trailingIcon,
  helper,
  state,
  placeHolder,
  inputSize,
  isCurved,
  hasBorder,
}: InputProps) {
  return (
    <Field className='relative'>
      {label && <Label className={'mb-1 inline-block'}>{label}</Label>}
      <div className='relative'>
        <HeadlessInput
          type={type}
          placeholder={placeHolder}
          disabled={state === InputState.READ_ONLY}
          className={clsx(
            state === InputState.ERROR
              ? '!border-secondary-red'
              : state === InputState.Success
                ? '!border-light-success-100'
                : state === InputState.READ_ONLY
                  ? '!border-light-grey-200 hover:border-light-grey-200'
                  : '',
            'drop-shadow-md w-[474px] h-12 text-light-grey-200 font-medium py-3 text-base focus:border-light-primary-light_blue focus:ring-0 focus:outline-none hover:border-light-primary-light_blue caret-light-secondary-purple',
            inputSize === 'small' ? 'h-11' : 'h-[70px]',
            leadingIcon ? 'px-14' : 'px-4',
            isCurved ? 'rounded-[50px]' : 'rounded-[8px]',
            hasBorder ? 'border-light-grey-800' : 'border-transparent',
          )}
        />
        {leadingIcon && (
          <span
            className={clsx(
              inputSize === 'small'
                ? 'transform top-1/2 -translate-y-3'
                : 'transform top-1/2 -translate-y-3',
              'absolute left-6',
            )}
          >
            {leadingIcon}
          </span>
        )}
        {trailingIcon && (
          <span
            className={clsx(
              inputSize === 'small'
                ? 'transform top-1/2 -translate-y-3'
                : 'transform top-1/2 -translate-y-3',
              'absolute right-4',
            )}
          >
            {trailingIcon}
          </span>
        )}
      </div>
      {helper && (
        <p
          className={clsx(
            state === InputState.ERROR
              ? 'text-secondary-red'
              : state === InputState.Success
                ? 'text-light-success-100'
                : 'text-light-grey-500',
            'block mt-2',
          )}
        >
          {helper}
        </p>
      )}
    </Field>
  );
}
