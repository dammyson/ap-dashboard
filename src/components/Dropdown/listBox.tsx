import {
  Field,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import clsx from 'clsx';

export interface RoleOption {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}

interface SelectProps {
  options: RoleOption[];
  label?: string;
  selected: RoleOption;
  className?: string;
  hasBorder?: boolean;
  isCurved?: boolean;
  trailingIcon?: React.ReactNode;
  onSelect?: (value: RoleOption) => void;
}

export default function ListBox({
  label,
  options,
  selected,
  className,
  hasBorder = true,
  isCurved = false,
  trailingIcon,
  onSelect,
}: SelectProps) {
  return (
    <Field className='relative'>
      {label && <Label className={'mb-1 inline-block'}>{label}</Label>}
      <Listbox value={selected} onChange={onSelect}>
        <ListboxButton
          className={clsx(
            trailingIcon ? 'pr-[4rem]' : '',
            hasBorder ? 'border-light-blue-50' : 'border-transparent',
            isCurved ? 'rounded-[50px]' : 'rounded-[8px]',
            'bg-primary-white relative w-full h-[65px] px-4 py-3  border-[1px] !border-light-blue-50 hover:!border-[#acbbd0] shadow-md flex items-center  text-sm 560:text-base 880:text-lg 1024:text-xl placeholder:text-base placeholder:text-light-primary-deep_black text-light-primary-deep_black cursor-pointer',
            className,
          )}
        >
          {selected?.icon && <span className='mr-2'>{selected?.icon}</span>}
          {selected?.label}
          {trailingIcon && (
            <span className='absolute right-6 cursor-pointer top-1/2 -translate-y-3 bg-white'>
              {trailingIcon}
            </span>
          )}
        </ListboxButton>
        <ListboxOptions className='text-sm absolute z-50 w-full max-h-40 overflow-auto hidden-scrollbar bg-primary-white rounded-2xl p-4-600 mt-2 py-2 border-[1px] border-[#BBCAE2] shadow-xl'>
          {options.map((option) => (
            <ListboxOption
              key={option.value}
              value={option}
              className={({ active, selected }) =>
                clsx(
                  active ? 'bg-[#e0e0e0]' : 'hover:bg-[#f4f4f4]',
                  selected ? 'font-medium bg-[#e0e0e0]' : 'font-normal',
                  'px-4 py-2 text-base 880:text-lg 1024:text-xl text-light-primary-deep_black cursor-pointer flex items-center',
                )
              }
            >
              {option.icon && <span className='mr-2'>{option.icon}</span>}
              <div>{option.label}</div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </Field>
  );
}
