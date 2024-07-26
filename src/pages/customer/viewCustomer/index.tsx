import { Card } from '@/components/card';
import { Header } from '@/components/header';
import { AppLayout } from '@/components/layout/AppLayout';
import { useActivityLog } from '@/components/modules/customer/activityLog/tableColumns';
import {
  Flight,
  GoldTrophy,
  Miles,
  Plane,
  SmallDropDown,
  UsageTime,
  UserReferral,
} from '@/components/svg/customer/Customer';
import { Filter } from '@/components/svg/surveys/Surveys';
import { formatNumber } from '@/utils';
import { Table } from 'antd';
import clsx from 'clsx';
import { useNavigate, useParams } from 'react-router';
import { ActivityList, usageStats, UserFlightDetails } from './constants';
import { Button } from '@/components/button';

function ViewCustomer() {
  const userStats = [
    {
      title: 'Active loyal points',
      value: 10000,
      icon: <GoldTrophy />,
      iconName: 'trophy',
    },
    {
      title: 'Total loyal points',
      value: 20000,
      icon: <GoldTrophy />,
      iconName: 'trophy',
    },
    {
      title: 'Total flights flown',
      value: 45,
      icon: <Plane />,
      iconName: 'plane',
    },
    {
      title: 'Referrals',
      value: 100,
      icon: <UserReferral />,
      iconName: 'userReferral',
    },
    {
      title: 'Frequent flyer miles',
      value: 250000,
      icon: <Miles />,
      iconName: 'miles',
    },
  ];

  const { titleId, nameId } = useParams();
  const { tableColumns } = useActivityLog();
  const navigate = useNavigate();
  return (
    <AppLayout logo=''>
      <div className='app-container py-2 pl-14 pr-10'>
        <Header />

        <div className='mt-10 pr-20'>
          <div className='flex justify-between items-center gap-4 pb-4 border-b border-b-light-blue-50'>
            <div>
              <div className='font-medium text-3xl flex items-center justify-center gap-4'>
                <p className='text-light-blue-main'>
                  <span className='inline-block w-3 h-3 rounded-full bg-light-blue-main mr-3 mb-[6px]'></span>
                  {titleId} {nameId}
                </p>
                <p className='text-light-blue-main'>
                  <span className='inline-block w-3 h-3 rounded-full bg-light-blue-main mr-3 mb-[6px]'></span>
                  09013426578
                </p>
                <p className='text-light-grey-600'>
                  <span className='inline-block w-3 h-3 rounded-full bg-light-blue-main mr-3 mb-[6px]'></span>
                  Loyalty tier -
                  <span className='text-light-secondary-orange'> GOLD</span>
                </p>
              </div>
            </div>

            <div className='flex items-center justify-center '>
              <span className='inline-block w-3 h-3 rounded-full bg-light-primary-black mr-3'></span>
              <p
                className='text-light-primary-black font-medium text-3xl cursor-pointer'
                onClick={() => navigate('/customer')}
              >
                LTV
              </p>
            </div>
          </div>
          <div className='flex items-center gap-4'>
            {userStats.map((stats, index) => (
              <Card key={index} mainClass='max-w-[247px] w-full !p-6'>
                <div
                  className={clsx(
                    stats.iconName === 'trophy'
                      ? 'bg-[#F7CB454D]'
                      : stats.iconName === 'plane'
                        ? 'bg-[#5CC8BE4D]'
                        : stats.iconName === 'userReferral'
                          ? 'bg-[#BD38264D]'
                          : stats.iconName === 'miles'
                            ? 'bg-inherit w-[67] h-[67]'
                            : '',
                    'flex items-center justify-center rounded-full w-14 h-14',
                  )}
                >
                  {stats.icon}
                </div>
                <div className='text-light-grey-700 font-medium text-xl mt-8'>
                  {stats.title}
                </div>
                <div className='text-[32px] text-light-primary-black font-bold mb-2'>
                  {formatNumber(stats.value)}
                </div>
              </Card>
            ))}
          </div>
          <div className='mt-2 grid grid-cols-12 gap-10 pb-2'>
            <div className='col-span-8 relative'>
              <Card
                hasBadge
                hasHeader
                title='Revenue sources'
                trailingIcon1={<Filter />}
              ></Card>
            </div>
            <div className='col-span-4 relative'>
              <Card hasHeader title='App usage time'>
                <UsageTime />
                <div className='text-[16px]'>
                  <p className='font-medium text-light-primary-deep_black'>
                    Average duration:{' '}
                    <span className='text-light-secondary-mint_green'>
                      12mins 45secs
                    </span>
                  </p>

                  {usageStats.map((stats, index) => (
                    <div key={index} className='flex items-center mt-4'>
                      <span className='w-3 h-3 rounded-full bg-light-blue-50 mr-3'></span>
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
              </Card>
            </div>
          </div>
          <Card>
            <div className='flex items-start justify-between '>
              {UserFlightDetails.map((user, index) => (
                <div key={index}>
                  <div>
                    <p className='text-light-grey-700 text-xl font-medium'>
                      {user.title}
                    </p>
                    <p className='text-light-primary-black font-bold text-[32px]'>
                      {user.detail}
                    </p>
                  </div>
                  {user.title.includes('flight') && (
                    <div
                      className={clsx(
                        user.title.includes('Last')
                          ? 'text-light-blue-main'
                          : user.title.includes('Upcoming')
                            ? 'text-light-secondary-orange'
                            : '',
                        'flex gap-3',
                      )}
                    >
                      <div>
                        <p className='font-medium text-[32px]'>LOS</p>
                        <p className=' text-[16px]'>Lagos</p>
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
                        />
                      </div>
                      <div>
                        <p className='font-medium text-[32px]'>ABV</p>
                        <p className='float-end text-[16px]'>Abuja</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
          <Card
            hasBadge
            hasHeader
            hasBorder
            title='Activity log'
            titleClass='!text-light-blue-main !text-[32px]'
            className=' pb-5 mb-5'
            hasButton={
              <Button
                mode='text'
                buttonText='View more'
                trailingIcon={<SmallDropDown />}
                className='!text-[#979797] font-medium text-xs !items-end'
                onClick={() => {}}
              />
            }
          >
            <Table
              pagination={false}
              dataSource={ActivityList}
              columns={tableColumns}
            />
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}

export default ViewCustomer;
