import { useState } from 'react';
import { CustomSelect, SelectType } from '../customSelect';
import { Input } from '../input';
import { DropDownArrow } from '../svg/settings/Settings';

export interface ProfileLabel {
  label: string;
  id: string;
}

export interface RoleOption {
  label: string;
  value: string;
}

export const ProfileForm = () => {
  const profileLabels: ProfileLabel[] = [
    { label: 'First Name', id: 'first name' },
    { label: 'Last Name', id: 'last name' },
    { label: 'Email Address', id: 'email address' },
    { label: 'Phone Number', id: 'phone number' },
    { label: 'Role', id: 'role' },
  ];

  const roleOptions: RoleOption[] = [
    { label: 'Admin', value: 'admin' },
    { label: 'HR', value: 'hr' },
    { label: 'Trainer', value: 'trainer' },
  ];

  const [selectedRole, setSelectedRole] = useState<string>('');

  return (
    <div className='grid grid-cols-[minmax(250px,569px)_minmax(250px,569px)] gap-y-10 gap-32 justify-between py-6'>
      {profileLabels.map((label) => {
        return label.label === 'Role' ? (
          <div
            key={label.id}
            className='text-light-grey-200 font-medium text-xl max-w-[569px]'
          >
            <CustomSelect
              label='Role'
              selectType={SelectType.SEARCH_SELECT}
              hasBorder
              isCurved
              trailingIcon={<DropDownArrow />}
              selectedRole={selectedRole}
              options={roleOptions}
              onSelect={(info) => setSelectedRole(info)}
            />
          </div>
        ) : (
          <div
            key={label.id}
            className='text-light-grey-200 font-medium text-xl max-w-[569px]'
          >
            <Input
              label={label.label}
              isCurved
              hasBorder
              className='drop-shadow-none text-xl !border-light-blue-50 hover:!border-[#acbbd0] h-[65px]'
            />
          </div>
        );
      })}
    </div>
  );
};
