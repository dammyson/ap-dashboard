import { Header } from '../../components/header';
import { AppLayout } from '../../components/layout/AppLayout';
import { UsersRegistered } from '@/components/dashboardTables/usersRegistered';
import { TicketsPurchased } from '@/components/dashboardTables/ticketsPurchased';
import { TotalRevenue } from '@/components/dashboardTables/totalRevenue';
import { ActiveUsers } from '@/components/dashboardTables/activeUsers';
import { useEffect, useState } from 'react';
import { numberShortener } from '@/utils';
import {
  ArrowRight,
  OptionsVertical,
} from '@/components/svg/dashboard/Dashboard';
import clsx from 'clsx';
import { Card } from '@/components/card';
import { Filter } from '@/components/svg/surveys/Surveys';
import { RecentActivities } from './constants';
import { Chart } from '@/components/chart/Chart';
import { HorizontalBarChart } from '@/components/chart/HorizontalBarChart';
import { useWindowSize } from '@/components/hooks/useWindowSize';
import { useManageDashboard } from '@/api/dashboard/dashboard';
import { WeeklyAnalysis } from '@/components/dashboardAnalytics/weeklyAnalysis';
import { SkeletonChartData } from '@/components/skeletonLoader/skeletonChartData';
import { SkeletonByDevices } from '@/components/skeletonLoader/skeletonByDevices';
import { PieChartData } from '@/components/chart/PieChart';
import { SkeletonByScreen } from '@/components/skeletonLoader/skeletonByScreen';
import { SkeletonActivities } from '@/components/skeletonLoader/skeletonActivities';

function Dashboard() {
  const [activeStat, setActiveStat] = useState<string>('');
  const {
    isLoading,
    registeredUsers,
    registeredPercentChange,
    ticketsPurchased,
    ticketsPercentChange,
    totalRevenue,
    revenuePrecentChange,
    registeredUsersData,
    ticketsPurchasedData,
    chartData,
    ticketSales,
    ancillary,
    revenue,
    setChartData,
    // setPeriod,
    isChartLoading,
    getDashboardAnalytics,
  } = useManageDashboard();

  const tabs = [
    { name: 'Ticket sales', value: ticketSales.amount },
    { name: 'Ancillary sales', value: ancillary.amount },
    { name: 'Total revenue', value: revenue.amount },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  useEffect(() => {
    getDashboardAnalytics();
  }, []);

  useEffect(() => {
    if (activeTab.name === 'Ticket sales') {
      setChartData(ticketSales.data);
    } else if (activeTab.name === 'Ancillary sales') {
      setChartData(ancillary.data);
    } else setChartData(revenue.data);
  }, [activeTab]);

  return (
    <AppLayout logo=''>
      <div
        className={clsx(
          useWindowSize(1240) ? 'w-full' : 'app-container',
          'py-7 px-5 1240:pl-14 1240:pr-10',
        )}
      >
        <div className='1240:pr-12'>
          <Header hasWelcomeMessage />
          <div className='flex items-center justify-end gap-1 mt-5 480:mt-0'>
            <p className='text-gradient text-[16px] 560:text-lg font-medium'>
              Swipe
            </p>
            <ArrowRight className='w-3 h-3 560:w-4 560:h-4' />
          </div>
          <div className='hidden-scrollbar overflow-x-auto'>
            <div className='min-w-fit'>
              <WeeklyAnalysis
                activeStat={activeStat}
                setActiveStat={setActiveStat}
                registeredUsers={registeredUsers}
                registeredPercentChange={registeredPercentChange}
                ticketsPurchased={ticketsPurchased}
                ticketsPercentChange={ticketsPercentChange}
                totalRevenue={totalRevenue}
                revenuePrecentChange={revenuePrecentChange}
                isLoading={isLoading}
              />
            </div>
          </div>
          {activeStat !== 'active' && (
            <div className='mt-2 grid grid-cols-12 gap-4 1240:gap-10 pb-2'>
              <div className='col-span-12 1240:col-span-8 relative'>
                {isChartLoading ? (
                  <SkeletonChartData />
                ) : (
                  <Card
                    hasBadge
                    hasHeader
                    trailingIcon1={<Filter />}
                    title='Revenue via app'
                    mainClass='relative grid justify-items-between h-[513px]'
                    titleClass='text-lg'
                  >
                    <div className='flex items-center gap-1.5 480:gap-5 mb-6 560:mb-12'>
                      {tabs.map((tab, index) => {
                        return (
                          <div
                            onClick={() => setActiveTab(tab)}
                            key={index}
                            className={clsx(
                              activeTab.name === tab.name
                                ? 'border-b-4 border-b-light-blue-main sky-blue-gradient-bg'
                                : 'border-b border-b-[#E9E7FD]',
                              'p-2 pb-3.5 cursor-pointer',
                            )}
                          >
                            <h3 className='text-primary-black text-[16px] 480:text-lg 560:text-xl font-bold mb-2'>
                              {numberShortener(tab.value)}
                            </h3>
                            <p className='text-sm font-medium text-light-grey-400'>
                              {tab.name}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                    <Chart chartData={chartData} transactionType='all' />
                  </Card>
                )}
              </div>
              <div className='col-span-12 1240:col-span-4 '>
                {isLoading ? (
                  <SkeletonByDevices />
                ) : (
                  <Card
                    hasHeader
                    trailingIcon1={<Filter />}
                    title='Users by devices'
                    className='!pb-0.5'
                    mainClass='1240:h-full max-h-[513px]'
                    titleClass='text-lg'
                  >
                    <PieChartData />
                  </Card>
                )}
              </div>
            </div>
          )}
          {activeStat === 'registered' ? (
            <UsersRegistered
              isLoading={isLoading}
              registeredUsersData={registeredUsersData}
            />
          ) : activeStat === 'tickets' ? (
            <TicketsPurchased
              isLoading={isLoading}
              ticketsPurchasedData={ticketsPurchasedData}
            />
          ) : activeStat === 'revenue' ? (
            <TotalRevenue />
          ) : activeStat === 'active' ? (
            <ActiveUsers />
          ) : (
            <>
              <div className='mt-2 560:mt-8 1240:mt-2 grid grid-cols-12 gap-4 1240:gap-10 pb-2'>
                <div className='col-span-12 1240:col-span-8 relative'>
                  {isLoading ? (
                    <SkeletonByScreen />
                  ) : (
                    <Card
                      hasHeader
                      hasBadge
                      title='Users by screen resolution'
                      trailingIcon1={<Filter />}
                      titleClass='text-lg'
                    >
                      <HorizontalBarChart />
                    </Card>
                  )}
                </div>
                <div className='col-span-12 1240:col-span-4'>
                  {isLoading ? (
                    <SkeletonActivities />
                  ) : (
                    <Card
                      hasHeader
                      title='Recent activities'
                      titleClass='text-lg'
                    >
                      <div className='flex flex-col gap-3 h-[390px] overflow-y-auto hidden-scrollbar mb-4 560:mb-12'>
                        {RecentActivities.map((activity, index) => (
                          <div
                            key={index}
                            className=' bg-[#E9EEF5] rounded-tr-[10px] rounded-tl-[10px] rounded-bl-[10px] px-4 py-3'
                          >
                            <div className='flex items-center gap-2 justify-between'>
                              <p className='text-[16px] text-light-blue-main font-medium'>
                                {activity.label}
                              </p>
                              <OptionsVertical className='cursor-pointer' />
                            </div>
                            <div className='flex items-center justify-between gap-6'>
                              <p className='text-[13px] text-light-grey-600 truncate max-w-[221px]'>
                                {activity.description}
                              </p>
                              <span className='text-light-grey-600 text-[10px] min-w-[60px]'>
                                12 mins ago
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

export default Dashboard;
