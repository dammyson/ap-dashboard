import ReactSelect, { components, DropdownIndicatorProps } from 'react-select';
import '../../index.css';
import { DropDownArrow } from '../svg/settings/Settings';
import { RoleOption } from '../profileForm';

interface SearchSelectProps {
  className?: string;
  options: RoleOption[];
}

const DropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator {...props}>
      <DropDownArrow />
    </components.DropdownIndicator>
  );
};

export function SearchSelect({ className, options }: SearchSelectProps) {
  return (
    <div>
      <ReactSelect
        options={options}
        classNamePrefix='react-select'
        placeholder='Enter or select'
        components={{ DropdownIndicator }}
        className={className}
      />
    </div>
  );
}
