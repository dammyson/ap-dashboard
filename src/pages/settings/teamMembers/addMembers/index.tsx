import CategoryHeader from '@/components/categoryHeader';
import { BorderRadius, Button, ButtonSize } from '@/components/button';
import {
  Copy,
  DropDownArrow,
  Upload,
} from '@/components/svg/settings/Settings';
import { Input } from '@/components/input';
import { CustomSelect, SelectType } from '@/components/customSelect';
import { useState } from 'react';
import { RoleOption } from '@/components/profileForm';

function AddMembers() {
  return (
    <div className=' flex items-center justify-center flex-col'>
      <CategoryHeader
        title='Personal Information'
        className='!text-base 560:!text-[18px] text-nowrap'
        button={
          <Button
            onClick={() => {}}
            buttonText='Upload Photo'
            mode='outlined'
            buttonClass='hidden 560:block'
            leadingIcon={<Upload />}
            size={ButtonSize.Small}
            className='text-light-grey-100 text-[16px] h-9 border-none text-nowrap'
          />
        }
      />
      <AddMembersInputForm />
      <div className='w-full max-w-[447px] grid items-center gap-6 960:gap-9 mt-8 960:mt-28 mb-10 960:mb-[80px]'>
        <Button
          onClick={() => {}}
          buttonText='Generate OTP'
          size={ButtonSize.Large}
          radius={BorderRadius.Large}
          className='768:!text-xl 1240:!text-2xl font-semibold !min-h-[55px] 960:!min-h-[66px]'
        />
        <Button
          onClick={() => {}}
          buttonText='1234'
          trailingIcon={<Copy />}
          mode='outlined'
          size={ButtonSize.Large}
          radius={BorderRadius.Large}
          className=' hover:border-light-blue-100 768:!text-xl 1240:!text-2xl !min-h-[55px]  960:!min-h-[66px] '
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
      <div className='grid grid-cols-[minmax(200px,480px)] 768:grid-cols-[minmax(250px,569px)_minmax(250px,569px)] gap-y-4 768:gap-y-10 gap-x-8 1024:gap-x-28 justify-between py-6 mt-4 768:mt-8'>
        {AddMembersInputs.map((item) => {
          return item.label === 'Role' ? (
            <div
              key={item.id}
              className='text-light-grey-200 font-medium text-base max-w-[569px]'
            >
              <CustomSelect
                label='Role'
                selectType={SelectType.SELECT}
                hasBorder
                isCurved
                className='!h-[50px] 960:!min-h-[66px]'
                trailingIcon={<DropDownArrow />}
                selectedRole={selectedRole}
                options={roleOptions}
                onSelect={(info) => setSelectedRole(info)}
              />
            </div>
          ) : (
            <div
              key={item.id}
              className='text-light-grey-200 font-medium text-base max-w-[569px] '
            >
              <Input
                label={item.label}
                isCurved
                hasBorder
                className='drop-shadow-none text-lg !border-[#BBCAE1] !h-[50px] 960:!min-h-[66px]'
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
