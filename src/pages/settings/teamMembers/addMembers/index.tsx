import CategoryHeader from '../../../../components/categoryHeader';
import {
  BorderRadius,
  Button,
  ButtonSize,
} from '../../../../components/button';
import {
  Copy,
  DropDownArrow,
  Upload,
} from '../../../../components/svg/settings/Settings';
import { Input } from '../../../../components/input';
import { CustomSelect, SelectType } from '../../../../components/customSelect';
import { useState } from 'react';
import { RoleOption } from '../../../../components/profileForm';

function AddMembers() {
  return (
    <div className=' flex items-center justify-center flex-col'>
      <CategoryHeader
        title='Personal Information'
        button={
          <Button
            onClick={() => {}}
            buttonText='Upload Photo'
            mode='outlined'
            leadingIcon={<Upload />}
            size={ButtonSize.Small}
            className='text-light-grey-100 text-[16px] h-9 border-none '
          />
        }
      />
      <AddMembersInputForm />
      <div className='w-full max-w-[447px] grid items-center gap-9 mt-28 mb-[80px]'>
        <Button
          onClick={() => {}}
          buttonText='Generate OTP'
          size={ButtonSize.Large}
          radius={BorderRadius.Large}
          className='text-light-blue-main !text-[24px] font-semibold'
        />
        <Button
          onClick={() => {}}
          buttonText='1234'
          trailingIcon={<Copy />}
          mode='outlined'
          size={ButtonSize.Large}
          radius={BorderRadius.Large}
          className='text-light-blue-main hover:border-light-blue-100 !text-[24px]'
        />
      </div>
    </div>
  );
}

export default AddMembers;

interface AddMembersLabels {
  label: string;
  id: string;
}
export const AddMembersInputForm = () => {
  const AddMembersInputs: AddMembersLabels[] = [
    { label: 'First Name', id: 'first name' },
    { label: 'Last Name', id: 'last name' },
    { label: 'Email Address', id: 'email address' },
    { label: 'Role', id: 'role' },
  ];

  const roleOptions: RoleOption[] = [
    { label: 'Admin', value: 'admin' },
    { label: 'HR', value: 'hr' },
    { label: 'Trainer', value: 'trainer' },
  ];

  const [selectedRole, setSelectedRole] = useState<string>('');

  return (
    <div className='w-full'>
      <div className='grid grid-cols-[minmax(250px,569px)_minmax(250px,569px)] gap-y-10 gap-32 justify-between py-6 mt-8'>
        {AddMembersInputs.map((item) => {
          return item.label === 'Role' ? (
            <div
              key={item.id}
              className='text-light-grey-200 font-medium text-xl max-w-[569px]'
            >
              <CustomSelect
                label='Role'
                selectType={SelectType.SELECT}
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
              key={item.id}
              className='text-light-grey-200 font-medium text-[16px] max-w-[569px] '
            >
              <Input
                label={item.label}
                isCurved
                hasBorder
                className='drop-shadow-none text-lg !border-[#BBCAE1]   h-[65px]'
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
