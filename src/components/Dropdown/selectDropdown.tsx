import { Field, Label } from '@headlessui/react';
import clsx from 'clsx';
import { ReactNode, useEffect, useState, useRef } from 'react';
import { RoleOption } from '@/pages/settings/profile';

interface SelectProps {
  label: string;
  className?: string;
  hasBorder?: Boolean;
  trailingIcon?: ReactNode;
  isCurved?: Boolean;
  selectedRole: string | undefined;
  options: RoleOption[];
  onSelect?: (info: string) => void;
}

export function CustomSelect({
  label,
  className,
  hasBorder,
  isCurved,
  selectedRole,
  trailingIcon,
  options,
  onSelect,
}: SelectProps) {
  const [isActive, setIsActive] = useState<boolean>(false);

  let divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let handler = (e: MouseEvent) => {
      if (isActive && !divRef.current?.contains(e.target as Node))
        setIsActive(false);
    };

    document.addEventListener('click', handler);

    return () => {
      document.removeEventListener('click', handler);
    };
  });

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <Field className='relative'>
      {label && <Label className={'mb-1 inline-block'}>{label}</Label>}
      <div className='relative'>
        <div
          ref={divRef}
          onClick={handleClick}
          className={clsx(
            trailingIcon ? 'px-4' : '',
            hasBorder ? 'border-light-blue-50' : 'border-transparent',
            isCurved ? 'rounded-[50px]' : 'rounded-[8px]',
            className,
            'bg-primary-white relative w-full h-[65px] px-4 py-3 cursor-pointer border-[1px] !border-light-blue-50 hover:!border-[#acbbd0] shadow-md flex items-center  text-nowrap text-sm 560:text-base 880:text-lg 1024:text-xl',
          )}
        >
          {selectedRole}
          {trailingIcon && (
            <span className='absolute right-6 cursor-pointer top-1/2 -translate-y-3 bg-white'>
              {trailingIcon}
            </span>
          )}
        </div>
        {isActive && (
          <div className='text-sm absolute z-50 w-full max-h-40 overflow-auto hidden-scrollbar bg-primary-white rounded-2xl p-4-600 mt-2 py-2 border-[1px] border-[#BBCAE2] shadow-xl'>
            {options.map((option) => (
              <div
                className={clsx(
                  selectedRole === option.label
                    ? 'bg-[#e0e0e0] cursor-pointer'
                    : ' hover:bg-[#f4f4f4]',
                  'px-4 py-2 text-base 880:text-lg 1024:text-xl',
                )}
                key={option.value}
                onClick={() => (onSelect ? onSelect(option.label) : null)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </Field>
  );
}
