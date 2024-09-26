import { Add, SmallCheckmark } from '@/components/svg/settings/Settings';
import { BorderRadius, Button, ButtonSize } from '@/components/button';
import { useEffect, useState } from 'react';
import AddMembers from './addMembers';
import { Table, Spin } from 'antd';
import { useTeamMembersColumn } from '@/components/modules/surveys/teamMembers/tableColumns';
import CategoryHeader from '@/components/categoryHeader';
import { Modal, SizeType } from '@/components/modal';
import { Bin, Cancel } from '@/components/svg/modal/Modal';
import { Card } from '@/components/card';
import { useTeamMembers } from '@/api/settings/teamMembers';
import { LoadingOutlined } from '@ant-design/icons';
import { useChangeRole } from '@/api/settings/teamMembers';
import { Spinner } from '@/components/svg/spinner/Spinner';

function TeamMembers() {
  const [addMembers, setAddMembers] = useState(false);
  const [removeMemberModal, setRemoveMemberModal] = useState(false);
  const { getTeamMembers, teamMembers, isLoading } = useTeamMembers();
  const {
    changeAdminRole,
    loading,
    updateMemberModal,
    setUpdateMemberModal,
    newRole: new_role,
    email,
    setNewRole,
    setEmail,
  } = useChangeRole();

  const { tableColumns } = useTeamMembersColumn(
    setRemoveMemberModal,
    setUpdateMemberModal,
    setNewRole,
    setEmail,
  );

  useEffect(() => {
    getTeamMembers();
  }, []);

  const HandleNewRole = () => {
    changeAdminRole({ email, new_role });
  };

  return (
    <Card>
      {addMembers ? (
        <AddMembers />
      ) : (
        <div>
          <CategoryHeader
            title='Team Members'
            className='!text-base 560:!text-[18px]'
            button={
              <Button
                onClick={() => setAddMembers(true)}
                buttonText='Add members'
                mode='outlined'
                trailingIcon={<Add />}
                size={ButtonSize.Small}
                buttonClass='hidden 560:block'
                className='bg-transparent text-primary-white hover:text-light-grey-100 hover:border-inherit h-9'
              />
            }
          />

          {isLoading ? (
            <div className='flex items-center justify-center py-6 '>
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
              />
            </div>
          ) : (
            <Table
              pagination={false}
              columns={tableColumns}
              className='custom-scrollbar hide-arrows  overflow-x-scroll'
              dataSource={teamMembers}
              scroll={{
                y: 420,
                x: true,
              }}
              rootClassName='w-full hidden-scrollbar '
              showHeader={false}
            />
          )}
        </div>
      )}
      {removeMemberModal && (
        <Modal
          isCentered
          cancelIcon={<Cancel />}
          isBackground
          size={SizeType.SMALL}
          onClick={() => setRemoveMemberModal(false)}
        >
          <Bin />
          <div className='font-normal text-lg 768:text-[22px] mt-2 768::mt-4 mb-5 768:mb-9 text-light-primary-deep_black'>
            This team member will no longer have access to the portal.
          </div>
          <div className='w-full max-w-[340px]'>
            <Button
              size={ButtonSize.Large}
              radius={BorderRadius.Large}
              buttonText='Delete'
              onClick={() => {}}
              className='!font-semibold 768:!text-xl 1240:!text-2xl !min-h-[50px] 1024:!min-h-[57px] 1300:!min-h-[65px]'
            />
          </div>
        </Modal>
      )}
      {updateMemberModal && (
        <Modal
          isCentered
          cancelIcon={<Cancel />}
          isBackground
          size={SizeType.SMALL}
          onClick={() => setUpdateMemberModal(false)}
        >
          <SmallCheckmark />
          <div className='font-normal text-lg 768:text-[22px] mt-2 768:mt-4 mb-5 768:mb-9 text-light-primary-deep_black'>
            {`This team member’s role will be updated to ${new_role}.`}
          </div>
          <div className='w-full max-w-[340px]'>
            <Button
              size={ButtonSize.Large}
              radius={BorderRadius.Large}
              buttonText={
                loading ? (
                  <Spinner className='text-white w-5 h-5 768:w-7 768:h-7' />
                ) : (
                  'Update'
                )
              }
              onClick={HandleNewRole}
              className='!font-semibold 768:!text-xl 1240:!text-2xl !min-h-[50px] 1024:!min-h-[57px] 1300:!min-h-[65px] '
            />
          </div>
        </Modal>
      )}
    </Card>
  );
}

export default TeamMembers;
