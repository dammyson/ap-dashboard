import ReactSelect, { components, DropdownIndicatorProps } from 'react-select';
import '../../index.css';
import { DropDownArrow } from '../svg/settings/Settings';

interface SearchSelectProps {
  className?: string;
}

const DropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator {...props}>
      <DropDownArrow />
    </components.DropdownIndicator>
  );
};

export function SearchSelect({}: SearchSelectProps) {
  const roleOptions = [
    { title: 'Admin', id: 'admin' },
    { title: 'HR', id: 'hr' },
    { title: 'Trainer', id: 'trainer' },
    { title: 'Hee', id: 'hee' },
  ];

  const mappedOptions = roleOptions.map((option) => ({
    label: option.title,
    value: option.id,
  }));

  return (
    <div>
      <ReactSelect
        options={mappedOptions}
        classNamePrefix='react-select'
        placeholder='Enter or select'
        components={{ DropdownIndicator }}
      />
    </div>
  );
}
