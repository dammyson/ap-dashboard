import CategoryHeader from '@/components/categoryHeader';
import { BorderRadius, Button, ButtonSize } from '@/components/button';
import { DropDownArrow, Upload } from '@/components/svg/settings/Settings';
import { Input, InputState } from '@/components/input';
import { CustomSelect, SelectType } from '@/components/customSelect';
import { RoleOption } from '@/components/profileForm';
import { useAddMembers } from '@/api/settings/addMembers';
import { Spinner } from '@/components/svg/spinner/Spinner';
import { emailRegex } from '@/utils/regex';

function AddMembers() {
  const {
    handleAddMembers,
    loading,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    isValidMail,
    setIsValidMail,
    selectedRole,
    setSelectedRole,
  } = useAddMembers();

  const validateMail = (val: string) => {
    if (emailRegex.test(val) === false) {
      setIsValidMail(false);
    } else setIsValidMail(true);
    setEmail(val);
  };

  const handleAddAdmin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userName = `${firstName} ${lastName}`;
    if (!firstName || !lastName || !isValidMail || !selectedRole) {
      return;
    } else {
      handleAddMembers({ userName, email, selectedRole });
    }
  };

  const roleOptions: RoleOption[] = [
    { label: 'Admin', value: 'admin' },
    { label: 'Sub-admin', value: 'sub-admin' },
  ];
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
      <form
        onSubmit={handleAddAdmin}
        className=' flex items-center justify-center flex-col'
      >
        <div className='w-full'>
          <div className='grid grid-cols-[minmax(200px,480px)] 768:grid-cols-[minmax(250px,569px)_minmax(250px,569px)] gap-y-4 768:gap-y-10 gap-x-8 1024:gap-x-28 justify-between py-6 mt-4 768:mt-8'>
            <div className='text-light-grey-200 font-medium text-base max-w-[569px] '>
              <Input
                label='First Name'
                value={firstName}
                isCurved
                hasBorder
                required
                className='drop-shadow-none text-lg !border-[#BBCAE1] !h-[50px] 960:!min-h-[66px]'
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className='text-light-grey-200 font-medium text-base max-w-[569px] '>
              <Input
                label='Last Name'
                value={lastName}
                isCurved
                required
                hasBorder
                className='drop-shadow-none text-lg !border-[#BBCAE1] !h-[50px] 960:!min-h-[66px]'
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className='text-light-grey-200 font-medium text-base max-w-[569px] '>
              <Input
                label='Email Address'
                value={email}
                required
                isCurved
                hasBorder
                state={
                  email && !isValidMail ? InputState.ERROR : InputState.NORMAL
                }
                helper={email && !isValidMail && 'Please enter a valid email'}
                className='drop-shadow-none text-lg !border-[#BBCAE1] !h-[50px] 960:!min-h-[66px]'
                onChange={(e) => validateMail(e.target.value)}
              />
            </div>
            <div className='text-light-grey-200 font-medium text-base max-w-[569px]'>
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
          </div>
        </div>
        <div className='w-full max-w-[447px] grid items-center gap-6 960:gap-9 mt-8 960:mt-28 mb-10 960:mb-[80px]'>
          <Button
            type='submit'
            buttonText={
              loading ? (
                <Spinner className='text-white w-5 h-5 768:w-7 768:h-7' />
              ) : (
                'Add Member'
              )
            }
            size={ButtonSize.Large}
            radius={BorderRadius.Large}
            className='768:!text-xl 1240:!text-2xl font-semibold !min-h-[55px] 960:!min-h-[66px]'
          />
        </div>
      </form>
    </div>
  );
}

export default AddMembers;
