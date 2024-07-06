import { useState } from 'react';
import { CustomSelect as RoleSelect, SelectType } from '../customSelect';
import { Input } from '../input';
import clsx from 'clsx';
import { DropDownArrow } from '../svg/settings/Settings';
import { SearchSelect } from '../searchSelect';

interface ProfileLabel {
  label: string;
  id: string;
}
type ProfileLabels = ProfileLabel[];

interface RoleOption {
  title: string;
  id: string;
}
type RoleOptions = RoleOption[];

export const ProfileInputForm = () => {
  const profileLabels = [
    { label: 'First Name', id: 'first name' },
    { label: 'Last Name', id: 'last name' },
    { label: 'Email Address', id: 'email address' },
    { label: 'Phone Number', id: 'phone number' },
    { label: 'Role', id: 'role' },
  ] as ProfileLabels;

  const roleOptions = [
    { title: 'Admin', id: 'admin' },
    { title: 'HR', id: 'hr' },
    { title: 'Trainer', id: 'trainer' },
  ] as RoleOptions;

  const [selectedRole, setSelectedRole] = useState<string>('' || 'Role');
  return (
    <div className='grid grid-cols-[minmax(250px,569px)_minmax(250px,569px)] gap-y-10 gap-32 justify-between py-6'>
      {profileLabels.map((label) => {
        return label.label === 'Role' ? (
          <div
            key={label.id}
            className='text-light-grey-200 font-medium text-xl max-w-[569px]'
          >
            <RoleSelect
              label='Role'
              selectType={SelectType.SELECT}
              hasBorder
              isCurved
              trailingIcon={<DropDownArrow />}
              selectedRole={selectedRole}
            >
              {roleOptions.map((option) => (
                <div
                  className={clsx(
                    selectedRole === option.title
                      ? 'bg-[#e0e0e0] hover:bg-[#e0e0e0]'
                      : '',
                  )}
                  key={option.id}
                  onClick={() => setSelectedRole(option.title)}
                >
                  {option.title}
                </div>
              ))}
            </RoleSelect>
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
