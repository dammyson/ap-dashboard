import { Card } from '@/components/card';
import { Header } from '@/components/header';
import { AppLayout } from '@/components/layout/AppLayout';
import WelcomeMessage from '@/components/welcomeMessage';
import { Filter } from '@/components/svg/surveys/Surveys';
import { Spin, Table } from 'antd';
import { useCustomerInformation } from '@/components/modules/customer/customerInformation/tableColumns';
import { useEffect, useState } from 'react';
import { Modal, SizeType } from '@/components/modal';
import { Cancel } from '@/components/svg/modal/Modal';
import { BorderRadius, Button, ButtonSize } from '@/components/button';
import { DropDownArrow } from '@/components/svg/settings/Settings';
import { useWindowSize } from '@/components/hooks/useWindowSize';
import clsx from 'clsx';
import { useUser } from '@/context/AppContext';
import { point, reason } from '../surveys/viewResult/constants';
import { useManageCustomer } from '@/api/customer/customer';
import { LoadingOutlined } from '@ant-design/icons';
import { Spinner } from '@/components/svg/spinner/Spinner';
import { CustomDropdown } from '@/components/Dropdown/customDropdown';

function Customer() {
  const { user } = useUser();
  const [userId, setUserId] = useState<number | null>(null);
  const {
    loading,
    customersData,
    getCustomerTable,
    isPointLoading,
    allocatePonit,
    isModalOpen,
    setIsModalOpen,
    selectedPoint,
    setSelectedPoint,
    selectedReason,
    setSelectedReason,
  } = useManageCustomer();
  const { tableColumns } = useCustomerInformation(setIsModalOpen, setUserId);

  const handleAllocatePoint = (id: number) => {
    allocatePonit(id, {
      points: (selectedPoint as number) || 0,
      reason: selectedReason as string,
    });
  };

  useEffect(() => {
    getCustomerTable();
  }, []);

  return (
    <AppLayout logo=''>
      <div
        className={clsx(
          useWindowSize(1240) ? 'w-full' : 'app-container',
          'py-7 px-5 1240:pl-14 1240:pr-10',
        )}
      >
        <Header />
        <div className='1240:pr-12'>
          <div>
            <WelcomeMessage
              username={user?.user_name.split(' ')[0]}
              description="Let's review today's insights"
            />
          </div>

          <Card
            hasHeader
            hasBadge
            title='Customers Information'
            trailingIcon1={<Filter />}
            className='mb-5'
          >
            <Table
              pagination={false}
              columns={tableColumns}
              dataSource={customersData}
              scroll={{ y: 390, x: true }}
              className=' customer-table custom-scrollbar hide-arrows overflow-x-scroll'
              rootClassName='hidden-scrollbar'
              loading={{
                spinning: loading,
                indicator: (
                  <Spin
                    indicator={
                      <LoadingOutlined style={{ fontSize: 48 }} spin />
                    }
                  />
                ),
              }}
            />
          </Card>
          {isModalOpen && (
            <Modal
              isBackground
              isCentered
              size={SizeType.LARGE}
              cancelIcon={<Cancel />}
              onClick={() => setIsModalOpen(false)}
            >
              <div className='flex flex-col items-center justify-center w-full 768:w-4/5 960:w-[68%] 1240:py-5'>
                <h3 className='text-light-primary-deep_black text-lg 560:text-xl 768:text-2xl 960:text-[28px] 1240:text-[32px] font-medium mb-4 768:mb-6 1400:mb-10 pt-5 960:pt-0'>
                  Manually award points to user
                </h3>
                <div className='w-full'>
                  <div className='mb-3 768:mb-5 1400:mb-10 text-light-grey-600'>
                    <p className='text-left text-base 768:text-lg 960:text-xl font-medium 960:pb-2 1400:pb-4'>
                      Points to award
                    </p>

                    <CustomDropdown
                      isCurved
                      trailingIcon={<DropDownArrow />}
                      selected={selectedPoint}
                      options={point}
                      placeholder='Enter or select'
                      onSelect={(point) => setSelectedPoint(point)}
                      onChange={(point) => setSelectedPoint(point)}
                      className=' placeholder:!text-light-primary-deep_black placeholder:1400:!text-xl 1024:!text-lg font-medium text-light-primary-deep_black !!h-[50px] 1024:!h-[57px] 1300:!min-h-[65px]'
                    />
                  </div>
                  <div className='768:mb-5 text-light-grey-600'>
                    <p className='text-left text-base 768:text-lg 960:text-xl font-medium 960:pb-2 1400:pb-4'>
                      Reason for awarding points
                    </p>
                    <CustomDropdown
                      acceptLetters
                      isCurved
                      trailingIcon={<DropDownArrow />}
                      selected={selectedReason}
                      options={reason}
                      placeholder='Enter or select'
                      onSelect={(reason) => setSelectedReason(reason)}
                      onChange={(reason) => setSelectedReason(reason)}
                      className=' placeholder:!text-light-primary-deep_black placeholder:1400:!text-xl 1024:!text-lg font-medium text-light-primary-deep_black !!h-[50px] 1024:!h-[57px] 1300:!min-h-[65px]'
                    />
                  </div>
                </div>

                <ul className='w-[96%] list-disc list-outside text-left pt-2 pb-8 1240:pb-10 1400:pb-20 '>
                  <li className='text-xs 1024:text-base text-light-grey-600'>
                    <span className='font-medium'>Note:</span> Manually awarded
                    points will be reflected in the user's account immediately.
                  </li>
                  <li className='text-xs 1024:text-base text-light-grey-600'>
                    Please ensure the points amount is accurate and the reason
                    is clear.
                  </li>
                </ul>

                <div className='grid gap-4 w-11/12'>
                  <Button
                    size={ButtonSize.Large}
                    radius={BorderRadius.Large}
                    buttonText={
                      isPointLoading ? (
                        <Spinner className='text-light-blue-main w-5 h-5 768:w-7 768:h-7' />
                      ) : (
                        'Award points'
                      )
                    }
                    onClick={() => userId && handleAllocatePoint(userId)}
                    className='!font-semibold 768:!text-xl 1240:!text-2xl !min-h-[50px] 1024:!min-h-[57px] 1300:!min-h-[65px]'
                  />
                  <Button
                    size={ButtonSize.Large}
                    radius={BorderRadius.Large}
                    mode='outlined'
                    buttonText='Cancel'
                    onClick={() => setIsModalOpen(false)}
                    className='!font-semibold 768:!text-xl 1240:!text-2xl !min-h-[50px] 1024:!min-h-[57px] 1300:!min-h-[65px]'
                  />
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

export default Customer;
