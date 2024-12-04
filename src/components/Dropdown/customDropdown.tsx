import { Field } from '@headlessui/react';
import clsx from 'clsx';
import { ReactNode, useState, useRef } from 'react';
import { RoleOption } from '@/pages/settings/profile';
import { useClickOutside } from '../hooks/useClickOutside';
interface SelectProps {
  className?: string;
  hasBorder?: Boolean;
  trailingIcon?: ReactNode;
  isCurved?: Boolean;
  selected: string | number;
  options: RoleOption[];
  placeholder?: string;
  onSelect?: (val: number | string) => void;
  onChange?: (value: number | string) => void;
  acceptLetters?: boolean;
}
export function CustomDropdown({
  className,
  hasBorder,
  isCurved,
  selected,
  placeholder,
  trailingIcon,
  options,
  onSelect,
  onChange,
  acceptLetters = false,
}: SelectProps) {
  const [isActive, setIsActive] = useState<boolean>(false);
  let divRef = useRef<HTMLInputElement>(null);

  useClickOutside(divRef, () => setIsActive(false), isActive);

  const handleClick = () => {
    setIsActive(!isActive);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && selected) setIsActive(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!acceptLetters) {
      onChange?.(!isNaN(Number(value)) ? Number(value) : '');
    } else onChange?.(value);
  };
  return (
    <Field className='relative'>
      <div className='relative'>
        <input
          type=''
          value={selected ? selected : ''}
          ref={divRef}
          onKeyUp={handleKeyDown}
          onClick={handleClick}
          placeholder={placeholder}
          onChange={handleInputChange}
          className={clsx(
            trailingIcon ? 'px-4' : '',
            hasBorder ? 'border-light-blue-50' : 'border-transparent',
            isCurved ? 'rounded-[50px]' : 'rounded-[8px]',
            className,
            'bg-primary-white relative w-full h-[65px] px-4 py-3 cursor-text border-[1px] !border-light-blue-50 hover:!border-[#acbbd0] shadow-md flex items-center text-sm 560:text-base 880:text-lg 1024:text-xl placeholder:text-base placeholder:text-light-primary-deep_black focus:border-light-blue-50 focus:ring-0 focus:outline-none',
          )}
        />
        {trailingIcon && (
          <span className='absolute right-6 cursor-pointer top-1/2 -translate-y-3 bg-white'>
            {trailingIcon}
          </span>
        )}

        {isActive && (
          <div className='text-sm absolute z-50 w-full max-h-40 overflow-auto hidden-scrollbar bg-primary-white rounded-2xl p-4-600 mt-2 py-2 border-[1px] border-[#BBCAE2] shadow-xl'>
            {options.map((option) => (
              <div
                className={clsx(
                  selected === option.value
                    ? 'bg-[#e0e0e0] cursor-pointer'
                    : ' hover:bg-[#f4f4f4]',
                  ' px-4 py-2 text-base 880:text-lg 1024:text-xl text-light-primary-deep_black cursor-pointer',
                )}
                key={option.value}
                onClick={() =>
                  onSelect && typeof option.value === 'number'
                    ? onSelect(option.value)
                    : onSelect &&
                        acceptLetters &&
                        typeof option.value === 'string'
                      ? onSelect(option.label)
                      : null
                }
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
