import { ReactNode } from 'react';
import { Field, Label } from '@headlessui/react';
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
  state?: InputState | boolean;
  className?: string;
  placeHolder?: string;
  inputSize?: 'small' | 'large';
  isCurved?: boolean;
  hasBorder?: boolean;
  onClick?: () => void;
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
  onClick,
  ...rest
}: InputProps) {
  return (
    <Field className='relative'>
      {label && <Label className={'mb-1 inline-block'}>{label}</Label>}
      <div className='relative'>
        <input
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
            'drop-shadow-md w-full text-light-grey-200 font-medium py-3 text-base focus:border-light-blue-50 focus:ring-0 focus:outline-none hover:border-light-blue-50 caret-light-secondary-purple',
            inputSize === 'small' ? 'h-11' : 'h-[55px] 768:h-[70px]',
            leadingIcon ? 'px-14' : 'px-4',
            trailingIcon ? 'pr-14' : '',
            isCurved ? 'rounded-[50px]' : 'rounded-[8px]',
            hasBorder ? 'border-light-grey-800' : 'border-transparent',
            className,
          )}
          {...rest}
        />
        {leadingIcon && (
          <span
            className={clsx('absolute left-6 transform top-1/2 -translate-y-3')}
          >
            {leadingIcon}
          </span>
        )}
        {trailingIcon && (
          <span
            onClick={onClick}
            className={clsx(
              'absolute right-6 cursor-pointer top-1/2 -translate-y-3',
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
            '768:absolute mt-2 text-xs 480:text-sm 880:text-base',
          )}
        >
          {helper}
        </p>
      )}
    </Field>
  );
}
