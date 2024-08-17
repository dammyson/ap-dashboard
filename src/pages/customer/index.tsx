import { Card } from '@/components/card';
import { Header } from '@/components/header';
import { AppLayout } from '@/components/layout/AppLayout';
import WelcomeMessage from '@/components/welcomeMessage';
import { Filter } from '@/components/svg/surveys/Surveys';
import { Table } from 'antd';
import { useCustomerInformation } from '@/components/modules/customer/customerInformation/tableColumns';
import { Customerslist } from './constants';
import { useState } from 'react';
import { Modal, SizeType } from '@/components/modal';
import { Cancel } from '@/components/svg/modal/Modal';
import { BorderRadius, Button, ButtonSize } from '@/components/button';
import { CustomSelect, SelectType } from '@/components/customSelect';
import { DropDownArrow } from '@/components/svg/settings/Settings';
import { useWindowSize } from '@/components/hooks/useWindowSize';
import clsx from 'clsx';

function Customer() {
  const [awardPoints, setAwardPoints] = useState<boolean>(false);
  const [selectedPointOption, setSelectedPointOption] = useState<string>('');
  const [selectedReason, setSelectedReason] = useState<string>('');
  const { tableColumns } = useCustomerInformation(setAwardPoints);

  const pointOptions = [
    { label: '2000', value: '2000' },
    { label: '3000', value: '3000' },
  ];
  const reasonOptions = [
    {
      label: 'Loyalty and repeat business',
      value: 'loyalty and repeat business',
    },
  ];
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
              username='Ayo'
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
              dataSource={Customerslist}
              rootClassName='w-full overflow-x-scroll hidden-scrollbar'
            />
          </Card>
          {awardPoints && (
            <Modal
              isBackground
              isCentered
              size={SizeType.LARGE}
              cancelIcon={<Cancel />}
              onClick={() => setAwardPoints(false)}
              className=''
            >
              <div className='flex flex-col items-center justify-center w-full 768:w-4/5 960:w-[70%] 1240:py-5'>
                <h3 className='text-light-primary-deep_black text-lg 560:text-xl 768:text-2xl 960:text-[28px] 1240:text-[32px] font-medium mb-4 768:mb-6 1400:mb-10 pt-5 960:pt-0'>
                  Manually award points to user
                </h3>
                <div className='w-11/12'>
                  <div className='mb-3 768:mb-5 1400:mb-10 text-light-grey-600'>
                    <p className='text-left text-base 768:text-lg 960:text-xl font-medium 960:pb-2 1400:pb-4'>
                      Points to award
                    </p>
                    <CustomSelect
                      label=''
                      options={pointOptions}
                      selectType={SelectType.SELECT}
                      hasBorder
                      isCurved
                      trailingIcon={<DropDownArrow />}
                      selectedRole={selectedPointOption}
                      onSelect={(option) => setSelectedPointOption(option)}
                      className='!h-[50px] 1024:!h-[57px] 1300:!min-h-[65px]'
                    />
                  </div>
                  <div className='768:mb-5 text-light-grey-600'>
                    <p className='text-left text-base 768:text-lg 960:text-xl font-medium 960:pb-2 1400:pb-4'>
                      Reason for awarding points
                    </p>
                    <CustomSelect
                      label=''
                      options={reasonOptions}
                      selectType={SelectType.SELECT}
                      hasBorder
                      isCurved
                      trailingIcon={<DropDownArrow />}
                      selectedRole={selectedReason}
                      onSelect={(option) => setSelectedReason(option)}
                      className='!h-[50px] 1024:!h-[57px] 1300:!min-h-[65px]'
                    />
                  </div>
                </div>

                <ul className='w-full list-disc list-inside text-left pt-2 pb-8 1240:pb-10 1400:pb-20'>
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
                    buttonText='Award points'
                    onClick={() => {}}
                    className='!font-semibold 768:!text-xl 1240:!text-2xl !min-h-[50px] 1024:!min-h-[57px] 1300:!min-h-[65px]'
                  />
                  <Button
                    size={ButtonSize.Large}
                    radius={BorderRadius.Large}
                    mode='outlined'
                    buttonText='Cancel'
                    onClick={() => setAwardPoints(false)}
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
