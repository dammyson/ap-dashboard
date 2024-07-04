import CategoryHeader from '../../../../components/categoryHeader';
import {
  BorderRadius,
  Button,
  ButtonSize,
} from '../../../../components/button';
import { Copy, Upload } from '../../../../components/svg/settings/Settings';
import { Input } from '../../../../components/input';

function AddMembers() {
  return (
    <div className='mt-8 bg-primary-white shadow-[0px_0px_15px_4px_rgba(0,0,0,0.1)] rounded-[20px] p-10 flex items-center justify-center flex-col'>
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

interface AddMembersInput {
  label: string;
  id: string;
}

type AddMembersInputs = AddMembersInput[];

export const AddMembersInputForm = () => {
  const AddMembersInputs = [
    { label: 'First Name', id: 'first name' },
    { label: 'Last Name', id: 'last name' },
    { label: 'Email Address', id: 'email address' },
    { label: 'Role', id: 'role' },
  ] as AddMembersInputs;

  return (
    <div className='w-full'>
      <div className='grid grid-cols-[minmax(250px,569px)_minmax(250px,569px)] gap-y-10 gap-32 justify-between py-6 mt-8'>
        {AddMembersInputs.map((item) => {
          return (
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
