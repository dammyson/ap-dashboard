import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import clsx from 'clsx';
import { useState } from 'react';

interface RoleOption {
  label: string;
  value: string | number;
}

interface SelectProps {
  options: RoleOption[];
  label?: string;
  className?: string;
  hasBorder?: boolean;
  isCurved?: boolean;
  trailingIcon?: React.ReactNode;
  onSelect?: (value: string | number) => void;
  selectedLabel: string;
}

export function CustomCombobox({
  selectedLabel,
  options,
  className,
  hasBorder = true,
  isCurved = false,
  trailingIcon,
  onSelect,
}: SelectProps) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<RoleOption | null>(null);

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) =>
          option.label.toLowerCase().includes(query.toLowerCase()),
        );

  return (
    <div className='relative w-full'>
      <Combobox
        immediate
        value={selected}
        onChange={(value: RoleOption | null) => {
          setSelected(value);
          if (value?.value !== undefined) {
            onSelect?.(value.value);
          }
        }}
      >
        <div className='relative'>
          <ComboboxInput
            className={clsx(
              trailingIcon ? 'pr-[4rem]' : '',
              hasBorder ? 'border-light-blue-50' : 'border-transparent',
              isCurved ? 'rounded-[50px]' : 'rounded-[8px]',
              'bg-primary-white relative w-full h-[65px] px-4 py-3 cursor-text border-[1px] !border-light-blue-50 hover:!border-[#acbbd0] shadow-md flex items-center text-sm 560:text-base 880:text-lg 1024:text-xl placeholder:text-base placeholder:text-light-primary-deep_black',
              className,
            )}
            placeholder='Enter or select'
            onChange={(e) => setQuery(e.target.value)}
            displayValue={() => selectedLabel || selected?.label || ''}
          />

          {trailingIcon && (
            <ComboboxButton className='absolute right-6 cursor-pointer top-1/2 -translate-y-3 bg-white'>
              <span className=''>{trailingIcon}</span>
            </ComboboxButton>
          )}
        </div>

        <ComboboxOptions className='text-sm absolute z-50 w-full max-h-40 overflow-auto hidden-scrollbar bg-primary-white rounded-2xl p-4-600 mt-2 py-2 border-[1px] border-[#BBCAE2] shadow-xl'>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <ComboboxOption
                key={option.value}
                value={option}
                className={({ active }) =>
                  clsx(
                    active ? 'bg-[#e0e0e0]' : ' hover:bg-[#f4f4f4]',
                    'px-4 py-2 text-base 880:text-lg 1024:text-xl text-light-primary-deep_black cursor-pointer',
                  )
                }
              >
                {({ selected }) => (
                  <span
                    className={clsx(
                      'block truncate',
                      selected ? 'font-medium' : 'font-normal',
                    )}
                  >
                    {option.label}
                  </span>
                )}
              </ComboboxOption>
            ))
          ) : (
            <div className='py-2 px-4 text-gray-500'>No options found</div>
          )}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
}
