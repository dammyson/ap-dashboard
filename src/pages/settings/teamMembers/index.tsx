import { Add } from '../../../components/svg/settings/Settings';
import { Button, ButtonSize } from '../../../components/button';
import CatergoryHeader from '../../../components/settings-catergory-header';
import { useState } from 'react';
import AddMembers from './addMembers';

function TeamMembers() {
  const [addMembers, setAddMembers] = useState(false);

  return (
    <div>
      {addMembers ? (
        <AddMembers />
      ) : (
        <CatergoryHeader
          title='Team Members'
          button={
            <Button
              onClick={() => setAddMembers(true)}
              buttonText='Add members'
              mode='outlined'
              trailingIcon={<Add />}
              size={ButtonSize.Small}
              className='bg-transparent text-primary-white hover:text-light-grey-100 hover:border-inherit h-9'
            />
          }
        />
      )}
    </div>
  );
}

export default TeamMembers;
