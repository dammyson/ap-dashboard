import { Button, ButtonSize } from '../../../../components/button';
import { Upload } from '../../../../components/svg/settings/Settings';
import CatergoryHeader from '../../../../components/settings-catergory-header';

function AddMembers() {
  return (
    <div className='mt-10'>
      <CatergoryHeader
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
