import { Card } from '@/components/card';
import { Header } from '@/components/header';
import { AppLayout } from '@/components/layout/AppLayout';
import { SmallDropDown, UsageTime } from '@/components/svg/customer/Customer';
import clsx from 'clsx';
import { useNavigate, useParams } from 'react-router';
import { usageStats } from './constants';
import { useEffect, useState } from 'react';
import { useWindowSize } from '@/components/hooks/useWindowSize';
import { useManageCustomer } from '@/api/customer/customer';
import { SkeletonLoader } from '@/components/customSkeletonLoader/skeletonLoader';
import { CustomerOverView } from '@/components/overViewCards/customer';
import dayjs from 'dayjs';
import { Button } from '@/components/button';
import { Table } from 'antd';
import { useCustomerActivityLog } from '@/components/modules/customer/activityLog/tableColumns';
import { FlightInfo } from '@/components/modules/customer/flightInformation/flightInformation';
import { CustomerRevenueChart } from '@/components/modules/customer/revenueChart/revenueChart';
import { graphOptions } from '@/constants/constants';

function ViewCustomer() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { tableColumns } = useCustomerActivityLog();
  const {
    chartData,
    isChartLoading,
    getCustomerRevenue,
    getCustomerById,
    customer,
    fetching,
    showDropdown,
    isSucess,
    setShowDropdown,
  } = useManageCustomer();
  const [isgraphfiltered, setIsGraphFiltered] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState(graphOptions[0]);

  useEffect(() => {
    if (id) {
      getCustomerRevenue(id, 'weekly');
      getCustomerById(id);
      setIsGraphFiltered(false);
    }
  }, []);

  const filterGraph = async (val: string, id?: string) => {
    if (id) {
      await getCustomerRevenue(id, val);
      setIsGraphFiltered(isSucess);
    }
  };

  const sortedActivity = customer?.user_activity.sort((a, b) => {
    return dayjs(b.created_at).valueOf() - dayjs(a.created_at).valueOf();
  });

  return (
    <AppLayout logo=''>
      <div
        className={clsx(
          useWindowSize(1240) ? 'w-full' : 'app-container',
          'p-7 px-5 1240:pl-14 1240:pr-10',
        )}
      >
        <Header />
        <div className='1240:pr-12'>
          <div className='flex 640:flex-col-reverse 1024:flex-row justify-between items-center gap-2 1024:gap-4 pb-4 border-b border-b-light-blue-50'>
            <div className='w-full flex items-center '>
              <div className=' font-medium text-xl 768:text-2xl 960:text-[26px] 1240:text-[24px] 1400:text-[28px] flex items-center justify-center gap-2 768:gap-4'>
                <p className='text-light-blue-main flex items-center text-nowrap'>
                  <span className='inline-block min-w-2 min-h-2 1300:w-3 1300:h-3 rounded-full bg-light-blue-main mr-[6px] 768:mr-3'></span>
                  {customer?.user_firstname} {customer?.user_lastname}
                </p>
                <p className='text-light-blue-main hidden 640:flex items-center  '>
                  <span className='inline-block min-w-2 min-h-2 1300:w-3 1300:h-3 rounded-full bg-light-blue-main mr-[6px] 768:mr-3'></span>
                  {customer?.user_phonenumber}
                </p>
                <p className='text-light-grey-600 hidden 640:flex  items-center text-nowrap'>
                  <span className='inline-block min-w-2 min-h-2 1300:w-3 1300:h-3 rounded-full bg-light-blue-main mr-[6px] 768:mr-3'></span>
                  Loyalty tier -{' '}
                  <span className='text-light-secondary-orange uppercase'>
                    {' '}
                    {customer?.tier_information.tier_name}
                  </span>
                </p>
              </div>
            </div>

            <div className='w-fit 640:w-full 1024:w-fit flex items-center justify-end 1024:justify-center '>
              <span className='inline-block min-w-2 min-h-2 1300:w-3 1300:h-3 rounded-full bg-light-primary-black mr-[6px] 768:mr-3'></span>
              <p
                className='text-light-primary-black font-medium text-xl 768:text-2xl 960:text-[28px] 1240:text-[24px] 1400:text-[28px] cursor-pointer'
                onClick={() => navigate('/customer')}
              >
                LTV
              </p>
            </div>
          </div>
          <div className='hidden-scrollbar overflow-x-auto pb-4 pl-4'>
            {customer && (
              <CustomerOverView
                fetching={fetching}
                user_referral_Count={customer?.user_refferal_Count}
                user_total_flight_flown={customer?.user_total_flight_flown}
                user_point={customer?.user_point}
                user_all_time_point={customer?.user_all_time_point}
              />
            )}
          </div>
          <>
            <div className='mt-2 grid grid-cols-12 gap-4 1240:gap-10 pb-2'>
              <div className='col-span-12 1240:col-span-8 relative'>
                {isChartLoading ? (
                  <SkeletonLoader hasChartData />
                ) : (
                  <>
                    {id && (
                      <CustomerRevenueChart
                        id={id}
                        chartData={chartData}
                        isgraphfiltered={isgraphfiltered}
                        showDropdown={showDropdown}
                        setShowDropdown={setShowDropdown}
                        filterGraph={filterGraph}
                        setActiveFilterTab={setActiveFilterTab}
                        activeFilterTab={activeFilterTab}
                      />
                    )}
                  </>
                )}
              </div>
              <div className='col-span-12 1240:col-span-4 relative '>
                <Card
                  hasHeader
                  title='App usage time'
                  mainClass='1240:h-full 1240:max-h-[513px]'
                >
                  <div className='flex flex-col 560:flex-row 1240:flex-col items-center justify-around'>
                    <UsageTime className='h-[152px] 560:h-full 560:max-h-[230px] 1240:max-h-[147px] 1400:max-h-[175px] 1600:max-h-[205px]' />
                    <div className='text-[16px] 1240:text-[14px] 1600:text-[16px]'>
                      <p className='font-medium text-light-primary-deep_black'>
                        Average duration:{' '}
                        <span className='text-light-secondary-mint_green'>
                          12mins 45secs
                        </span>
                      </p>
                      {usageStats.map((stats, index) => (
                        <div key={index} className='flex items-center mt-2'>
                          <span className='560:max-w-3 560:max-h-3 min-w-[10px] min-h-[10px] rounded-full bg-light-blue-50 mr-3'></span>
                          <div>
                            <p className='text-light-grey-300'>
                              {stats.timeOfDay} {`(${stats.time}): `}
                              <span className='text-light-secondary-mint_green font-medium'>
                                {stats.usagePercentage}% of usage
                              </span>
                            </p>
                            <p className='text-light-grey-300'>
                              Peak usage: {stats.usageTime}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            </div>
            {fetching ? (
              <SkeletonLoader singleLoader />
            ) : (
              <FlightInfo customer={customer} />
            )}
            {fetching ? (
              <SkeletonLoader singleLoader />
            ) : (
              <Card
                hasBadge
                hasHeader
                hasBorder
                title='Activity log'
                titleClass='!text-light-blue-main 1300:!text-[32px]'
                className=' pb-5 mb-5'
                hasButton={
                  <Button
                    mode='text'
                    buttonText='View more'
                    trailingIcon={<SmallDropDown />}
                    className='!text-[#979797] font-medium text-xs !items-end !w-fit'
                    onClick={() => {}}
                  />
                }
              >
                <Table
                  pagination={false}
                  dataSource={sortedActivity}
                  columns={tableColumns}
                  scroll={{ y: 210, x: true }}
                  className='customer custom-scrollbar hide-arrows overflow-x-scroll'
                  rootClassName='hidden-scrollbar'
                />
              </Card>
            )}
          </>
        </div>
      </div>
    </AppLayout>
  );
}

export default ViewCustomer;
