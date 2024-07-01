import CategoryHeader from '../../../../components/categoryHeader';
import { Button, ButtonSize } from '../../../../components/button';
import { Upload } from '../../../../components/svg/settings/Settings';

function AddMembers() {
  return (
    <div className='mt-10'>
      <CategoryHeader
        title='Personal Information'
        button={
          <Button
            onClick={() => {}}
            buttonText='Upload Photo'
            mode='outlined'
            leadingIcon={<Upload />}
            size={ButtonSize.Small}
            className='text-light-grey-100 text-[16px] h-9 border-none'
          />
        }
      />
    </div>
  );
}

export default AddMembers;
