import Select, { components, DropdownIndicatorProps } from 'react-select';
import '../../index.css';
import { DropDownArrow } from '../svg/settings/Settings';
import { RoleOption } from '@/pages/settings/profile';

interface SearchSelectProps {
  className?: string;
  options: RoleOption[];
  isSearchable?: boolean;
  isMulti?: boolean;
  isClearable?: boolean;
  placeholder?: string;
}

const DropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator {...props}>
      <DropDownArrow />
    </components.DropdownIndicator>
  );
};

// TO RENDER ICON IN THE DROPDOWN
const CustomOption = (props: any) => {
  return (
    <components.Option {...props}>
      <div className='flex items-center'>
        {props.data.icon && <span className='mr-2'>{props.data.icon}</span>}
        {props.data.label}
      </div>
    </components.Option>
  );
};

// TO RENDER SINGLE SELECT
const CustomSingleValue = (props: any) => {
  return (
    <components.SingleValue {...props}>
      <div className='flex items-center'>
        {props.data.icon && <span className='mr-2'>{props.data.icon}</span>}
        {props.data.label}
      </div>
    </components.SingleValue>
  );
};

const customStyles = (isSearchable: boolean) => ({
  control: (provided: any) => ({
    ...provided,
    cursor: isSearchable ? 'text' : 'pointer',
  }),
});

export function ReactCustomSelect({
  className,
  isSearchable = true,
  isMulti,
  isClearable,
  options,
  placeholder,
}: SearchSelectProps) {
  return (
    <div className='hello'>
      <Select
        options={options}
        isMulti={isMulti}
        isClearable={isClearable}
        isSearchable={isSearchable}
        classNamePrefix='react-select'
        placeholder={placeholder}
        components={{
          DropdownIndicator,
          Option: CustomOption,
          SingleValue: CustomSingleValue,
        }}
        className={className}
        styles={customStyles(isSearchable)}
      />
    </div>
  );
}
