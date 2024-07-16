import { Add, SmallCheckmark } from '../../../components/svg/settings/Settings';
import { BorderRadius, Button, ButtonSize } from '../../../components/button';
import { useState } from 'react';
import AddMembers from './addMembers';
import { Table } from 'antd';
import { useTeamMembersColumn } from '../../../components/modules/teamMembers/tableColumns';
import profileImage from '../../../assets/profileImage/profile-img.png';
import CategoryHeader from '@/components/categoryHeader';
import { Modal, SizeType } from '@/components/modal';
import { Bin, Cancel } from '@/components/svg/modal/Modal';

function TeamMembers() {
  const [addMembers, setAddMembers] = useState<boolean>(false);
  const [removeTeamMember, setRemoveTeamMember] = useState<boolean>(false);
  const [updateTeamMember, setUpdateTeamMember] = useState<boolean>(false);
  const { tableColumns } = useTeamMembersColumn(
    setRemoveTeamMember,
    setUpdateTeamMember,
  );

  const list = [
    {
      avatar: profileImage,
      name: 'Corlet Jasper',
      role: 'Admin',
      email: 'corletjasper@gmail.com',
    },
    {
      avatar: profileImage,
      name: 'Corlet Jasper',
      role: 'Admin',
      email: 'corletjasper@gmail.com',
    },
    {
      avatar: profileImage,
      name: 'Corlet Jasper',
      role: 'Admin',
      email: 'corletjasper@gmail.com',
    },
    {
      avatar: profileImage,
      name: 'Corlet Jasper',
      role: 'Admin',
      email: 'corletjasper@gmail.com',
    },
  ];

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
      {removeTeamMember ? (
        <Modal
          isCentered
          cancelIcon={<Cancel />}
          isBackground
          size={SizeType.SMALL}
          onClick={() => setRemoveTeamMember(false)}
        >
          <Bin />
          <div className='font-normal text-[22px]  mt-4 mb-9 text-light-primary-deep_black'>
            This team member will no longer have access to the portal.
          </div>
          <div className='w-full max-w-[340px]'>
            <Button
              size={ButtonSize.Large}
              radius={BorderRadius.Large}
              buttonText='Delete'
              onClick={() => {}}
              className='!font-semibold !text-xl'
            />
          </div>
        </Modal>
      ) : updateTeamMember ? (
        <Modal
          isCentered
          cancelIcon={<Cancel />}
          isBackground
          size={SizeType.SMALL}
          onClick={() => setUpdateTeamMember(false)}
        >
          <SmallCheckmark />
          <div className='font-normal text-[22px] mt-4 mb-9 text-light-primary-deep_black'>
            This team member’s role will be updated to admin.
          </div>
          <div className='w-full max-w-[340px]'>
            <Button
              size={ButtonSize.Large}
              radius={BorderRadius.Large}
              buttonText='Update'
              onClick={() => {}}
              className='!font-semibold !text-xl '
            />
          </div>
        </Modal>
      ) : (
        <></>
      )}
    </div>
  );
}

export default TeamMembers;
