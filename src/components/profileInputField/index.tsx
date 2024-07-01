import { Input } from '../input';

interface ProfileInput {
  label: string;
  id: string;
}

type ProfileInputs = ProfileInput[];

export const ProfileInputField = () => {
  const profileInputs = [
    { label: 'First Name', id: 'first name' },
    { label: 'Last Name', id: 'last name' },
    { label: 'Email Address', id: 'email address' },
    { label: 'Phone Number', id: 'phone number' },
    { label: 'Role', id: 'role' },
  ] as ProfileInputs;

  return (
    <div className='grid grid-cols-[minmax(250px,569px)_minmax(250px,569px)] gap-y-10 gap-32 justify-between py-6'>
      {profileInputs.map((item) => {
        return (
          <div
            key={item.id}
            className='text-light-grey-200 font-medium text-xl max-w-[569px]'
          >
            <Input
              label={item.label}
              isCurved
              hasBorder
              className='drop-shadow-none text-xl border-[#BBCAE1] hover:border-[#a1afc4] h-[65px]'
            />
          </div>
        );
      })}
    </div>
  );
};
