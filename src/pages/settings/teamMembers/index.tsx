import { Add } from '../../../components/svg/settings/Settings';
import { Button, ButtonSize } from '../../../components/button';
import { useState } from 'react';
import AddMembers from './addMembers';
import CategoryHeader from '../../../components/categoryHeader';
import { Table } from 'antd';
import { useTeamMembersColumn } from '../../../components/modules/teamMembers/tableColumns';
import profileImage from '../../../assets/profileImage/profile-img.png';

function TeamMembers() {
  const [addMembers, setAddMembers] = useState(false);

  const list = [
    {
      avatar: profileImage,
      firstName: 'Corlet',
      lastName: 'Jasper',
      role: 'Admin',
      email: 'corletjasper@gmail.com',
    },
    {
      avatar: profileImage,
      firstName: 'Corlet',
      lastName: 'Jasper',
      role: 'Admin',
      email: 'corletjasper@gmail.com',
    },
    {
      avatar: profileImage,
      firstName: 'Corlet',
      lastName: 'Jasper',
      role: 'Admin',
      email: 'corletjasper@gmail.com',
    },
    {
      avatar: profileImage,
      firstName: 'Corlet',
      lastName: 'Jasper',
      role: 'Admin',
      email: 'corletjasper@gmail.com',
    },
  ];

  const { tableColumns } = useTeamMembersColumn();

  return (
    <div className='mt-8 bg-primary-white shadow-default rounded-[20px] p-10'>
      {addMembers ? (
        <AddMembers />
      ) : (
        <div>
          <CategoryHeader
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
          <Table
            pagination={false}
            columns={tableColumns}
            className='table'
            dataSource={list}
            scroll={{
              y: 506,
            }}
            rootClassName='w-full'
            showHeader={false}
          />
        </div>
      )}
    </div>
  );
}

export default TeamMembers;
