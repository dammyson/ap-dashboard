import { Field, Label } from '@headlessui/react';
import clsx from 'clsx';
import React, {
  PropsWithChildren,
  ReactNode,
  useEffect,
  useState,
  useRef,
} from 'react';
import { SearchSelect } from '../searchSelect';

export enum SelectType {
  SELECT = 'select',
  SEARCH_SELECT = 'search_select',
}

interface SelectProps {
  selectType: SelectType;
  label: string;
  className?: string;
  hasBorder?: Boolean;
  trailingIcon?: ReactNode;
  isCurved?: Boolean;
  selectedRole: string;
}

export function CustomSelect({
  selectType,
  label,
  children,
  className,
  hasBorder,
  isCurved,
  selectedRole = 'Role..',
  trailingIcon,
}: PropsWithChildren<SelectProps>) {
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
        {selectType === SelectType.SELECT ? (
          <>
            <div
              ref={divRef}
              onClick={handleClick}
              className={clsx(
                trailingIcon ? 'p4-4' : '',
                hasBorder ? 'border-light-blue-50' : 'border-transparent',
                isCurved ? 'rounded-[50px]' : 'rounded-[8px]',
                className,
                'bg-primary-white relative w-full h-[65px] px-4 py-3 cursor-pointer border-[1px] !border-light-blue-50 hover:!border-[#acbbd0] shadow-md flex items-center',
              )}
            >
              {selectedRole}
              {trailingIcon && (
                <span className='absolute right-6 cursor-pointer top-1/2 -translate-y-3'>
                  {trailingIcon}
                </span>
              )}
            </div>

            {isActive && (
              <div className=' absolute w-full max-h-40 overflow-auto no-scrollbar bg-primary-white rounded-2xl p-4-600 mt-2 py-2 border-[1px] border-[#BBCAE2]  shadow-xl'>
                {React.Children.map(children, (child) =>
                  React.cloneElement(child as React.ReactElement<any>, {
                    className: clsx(
                      'text-xl cursor-pointer px-4 py-2 hover:bg-[#f4f4f4]',
                      (child as React.ReactElement<any>).props.className,
                    ),
                  }),
                )}
              </div>
            )}
          </>
        ) : (
          <>
            <SearchSelect />
          </>
        )}
      </div>
    </Field>
  );
}
