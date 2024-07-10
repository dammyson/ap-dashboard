import { Add, CircleCancel } from '../../../components/svg/settings/Settings';
import { Button, ButtonSize } from '../../../components/button';
import { useState } from 'react';
import AddMembers from './addMembers';
import { Table } from 'antd';
import { useTeamMembersColumn } from '../../../components/modules/teamMembers/tableColumns';
import profileImage from '../../../assets/profileImage/profile-img.png';
import { SizeType, Modal } from '../../../components/modal';
import CategoryHeader from '@/components/categoryHeader';

function TeamMembers() {
  const [addMembers, setAddMembers] = useState(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

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

          {modalOpen && (
            <Modal
              isCentered
              isBackground
              size={SizeType.MEDIUM}
              cancelIcon={<CircleCancel />}
              cancelType='filled'
              onClick={() => setModalOpen(false)}
            ></Modal>
          )}
        </div>
      )}
    </div>
  );
}

export default TeamMembers;
