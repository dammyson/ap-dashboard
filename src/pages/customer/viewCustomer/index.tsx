import { Card } from '@/components/card';
import { Header } from '@/components/header';
import { AppLayout } from '@/components/layout/AppLayout';
// import { useCustomerActivityLog } from '@/components/modules/customer/activityLog/tableColumns';
import {
  Flight,
  // SmallDropDown,
  UsageTime,
} from '@/components/svg/customer/Customer';
import { Filter } from '@/components/svg/surveys/Surveys';
import { numberShortener } from '@/utils';
// import { Table } from 'antd';
import clsx from 'clsx';
import { useNavigate, useParams } from 'react-router';
import { usageStats, UserFlightDetails } from './constants';
// import { Button } from '@/components/button';
import { useEffect, useState } from 'react';
import { Chart } from '@/components/chart/Chart';
import { useWindowSize } from '@/components/hooks/useWindowSize';
import { useManageCustomer } from '@/api/customer/customer';
import { SkeletonLoader } from '@/components/customSkeletonLoader/skeletonLoader';
import { CustomerOverView } from '@/components/overViewCards/customer';
import dayjs from 'dayjs';

function ViewCustomer() {
  const navigate = useNavigate();
  const isWindowSize604 = useWindowSize(604);
  const { id } = useParams();
  // const { tableColumns } = useCustomerActivityLog();
  const {
    chartData,
    isChartLoading,
    getCustomerRevenue,
    getCustomerById,
    customer,
    fetching,
  } = useManageCustomer();

  const tabs = [
    { name: 'Flight bookings', value: chartData?.ticket.ticket_amount },
    { name: 'In-app purchases', value: chartData?.ancillary.ancillary_amount },
    // { name: 'Gamification', value: customerRevenue?.app_purchase_amount },
    { name: 'Total revenue', value: chartData?.revenue.revenue_amount },
  ];
  const currentTab = tabs[0];
  const [activeTab, setActiveTab] = useState(currentTab);

  useEffect(() => {
    if (id) {
      getCustomerRevenue(id);
      getCustomerById(id);
    }
  }, []);

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
                  Loyalty tier -
                  <span className='text-light-secondary-orange'> GOLD</span>
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
            <CustomerOverView
              fetching={fetching}
              user_referral_Count={customer?.user_refferal_Count}
              user_total_flight_flown={customer?.user_total_flight_flown}
            />
          </div>
          <>
            <div className='mt-2 grid grid-cols-12 gap-4 1240:gap-10 pb-2'>
              <div className='col-span-12 1240:col-span-8 relative'>
                {isChartLoading ? (
                  <SkeletonLoader hasChartData />
                ) : (
                  chartData && (
                    <Card
                      hasBadge
                      hasHeader
                      title='Revenue sources'
                      trailingIcon1={<Filter />}
                      mainClass='h-full max-h-[513px]'
                    >
                      <div className='flex items-center gap-1 640:gap-2 mb-12 overflow-x-auto hidden-scrollbar'>
                        {tabs?.map((tab, index) => (
                          <div
                            onClick={() => setActiveTab(tab)}
                            key={index}
                            className={clsx(
                              activeTab.name === tab.name
                                ? 'border-b-4 border-b-light-blue-main sky-blue-gradient-bg'
                                : 'border-b border-b-[#E9E7FD]',
                              'p-2 pb-3.5 cursor-pointer w-fit max-h-[87px] 640:h-[78px]',
                              isWindowSize604
                                ? tab.name.includes('Gamification') &&
                                    'h-[87px]'
                                : '',
                            )}
                          >
                            <h3
                              className={clsx(
                                tab.name === 'Total revenue'
                                  ? 'text-light-secondary-mint_green'
                                  : 'text-primary-black',
                                'text-[17px] 640:text-xl font-bold mb-2',
                              )}
                            >
                              {tab?.value
                                ? numberShortener(tab.value)
                                : tab.value}
                            </h3>
                            <p className='text-xs font-medium text-light-grey-400'>
                              {tab.name}
                            </p>
                          </div>
                        ))}
                      </div>
                      <Chart
                        chartData={
                          activeTab.name === 'Flight bookings'
                            ? chartData?.ticket.ticket_data
                            : activeTab.name === 'In-app purchases'
                              ? chartData?.ancillary.ancillary_data
                              : chartData?.revenue.revenue_data
                        }
                        transactionType='all'
                      />
                    </Card>
                  )
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
              <Card>
                <div className='grid grid-cols-1 768:grid-cols-2 1024:flex 1024:items-start justify-items-center 1024:justify-between gap-3'>
                  {UserFlightDetails.map((user, index) => (
                    <div key={index}>
                      <div className='text-center 1024:text-start'>
                        <p className='text-light-grey-700 text-[16px] 768:text-xl 1240:text-lg 1400:text-x 1024:h-[56px] font-medium'>
                          {user.title}
                        </p>
                        <p className='text-light-primary-black font-bold text-xl 768:text-2xl 880:text-[26px] 1240:text-[28px] 1400:text-[30px]'>
                          {user.title === 'Travel preferences'
                            ? 'Window Seat'
                            : user.title === 'Last flight'
                              ? `${dayjs(
                                  customer?.last_flight.departure_time,
                                ).format('YYYY-MM-DD')}`
                              : user?.title === 'Upcoming flight'
                                ? `${dayjs(
                                    customer?.upcoming_flight.departure_time,
                                  ).format('YYYY-MM-DD')}`
                                : dayjs(customer?.user_date_of_reg).format(
                                    'YYYY-MM-DD',
                                  )}
                        </p>
                      </div>
                      {user.title.includes('flight') && (
                        <div
                          className={clsx(
                            user.title.includes('Last')
                              ? 'text-light-blue-main flex items-center'
                              : user.title.includes('Upcoming')
                                ? 'text-light-secondary-orange'
                                : '',
                            'flex gap-1 360:gap-3',
                          )}
                        >
                          <div>
                            <p className='font-medium text-xl 360:text-2xl 480:text-[26px] 1240:text-[26px] 1400:text-[30px] '>
                              {user.title === 'Last flight'
                                ? customer?.last_flight.origin_city != ''
                                  ? customer?.last_flight.origin_city
                                  : customer?.last_flight.origin
                                : customer?.upcoming_flight.origin_city != ''
                                  ? customer?.upcoming_flight.origin_city
                                  : customer?.upcoming_flight.origin}
                            </p>
                            <p className='text-[10px] 360:text-sm 480:text-[16px]'>
                              {customer?.last_flight.origin}
                            </p>
                          </div>
                          <div className='pt-[10px]'>
                            <Flight
                              color={clsx(
                                user.title.includes('Last')
                                  ? '#23539F'
                                  : user.title.includes('Upcoming')
                                    ? '#F09436'
                                    : '',
                              )}
                              className='max-w-[130px] w-full'
                            />
                          </div>
                          <div>
                            <p className='font-medium text-xl 360:text-2xl 480:text-[26px] 1240:text-[26px] 1400:text-[30px] '>
                              {user.title === 'Last flight'
                                ? customer?.last_flight.destination_city != ''
                                  ? customer?.last_flight.destination_city
                                  : customer?.last_flight.destination
                                : customer?.upcoming_flight.destination_city !=
                                    ''
                                  ? customer?.upcoming_flight.destination_city
                                  : customer?.upcoming_flight.destination}
                            </p>
                            <p className='float-end text-[10px] 360:text-sm 480:text-[16px]'>
                              {user.title === 'Last flight'
                                ? customer?.last_flight.destination
                                : customer?.upcoming_flight.destination}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            )}
            {/* <Card
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
                dataSource={ActivityList}
                columns={tableColumns}
                className='customer'
                rootClassName='w-full overflow-x-scroll hidden-scrollbar'
              />
            </Card> */}
          </>
        </div>
      </div>
    </AppLayout>
  );
}

export default ViewCustomer;
