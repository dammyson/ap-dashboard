import clsx from 'clsx';
import { Card } from '../card';
import {
  GoldTrophy,
  // Miles,
  Plane,
  UserReferral,
} from '../svg/customer/Customer';
import { formatNumber } from '@/utils';
import { SkeletonLoader } from '../customSkeletonLoader/skeletonLoader';

interface Props {
  fetching: boolean;
  user_referral_Count: number;
  user_total_flight_flown: number;
  user_point: number;
  user_all_time_point: number;
}

export const CustomerOverView = ({
  user_referral_Count,
  user_total_flight_flown,
  user_all_time_point,
  user_point,
  fetching,
}: Props) => {
  const userStats = [
    {
      title: 'Active loyal points',
      value: user_point ?? 0,
      icon: <GoldTrophy />,
      iconName: 'trophy',
    },
    {
      title: 'Total loyal points',
      value: user_all_time_point ?? 0,
      icon: <GoldTrophy />,
      iconName: 'trophy',
    },
    {
      title: 'Total flights flown',
      value: user_total_flight_flown ?? 0,
      icon: <Plane />,
      iconName: 'plane',
    },
    {
      title: 'Referrals',
      value: user_referral_Count ?? 0,
      icon: <UserReferral />,
      iconName: 'userReferral',
    },
    // {
    //   title: 'Frequent flyer miles',
    //   value: 250000,
    //   icon: <Miles />,
    //   iconName: 'miles',
    // },
  ];

  return (
    <div className='flex items-center gap-4 w-fit'>
      {userStats.map((stats, index) => {
        const lastCard = index === userStats.length - 1;
        return (
          <>
            {fetching ? (
              <SkeletonLoader hasCustomerOverView />
            ) : (
              <Card
                key={index}
                mainClass={clsx(
                  lastCard && 'mr-5',
                  'w-[210px] 640:w-[235px] !p-6',
                )}
              >
                <div
                  className={clsx(
                    stats.iconName === 'trophy'
                      ? 'bg-[#F7CB454D]'
                      : stats.iconName === 'plane'
                        ? 'bg-[#5CC8BE4D]'
                        : stats.iconName === 'userReferral'
                          ? 'bg-[#BD38264D]'
                          : stats.iconName === 'miles'
                            ? 'bg-inherit'
                            : '',
                    'flex items-center justify-center rounded-full w-14 h-14',
                  )}
                >
                  {stats.icon}
                </div>
                <div className='text-light-grey-700 font-medium text-[17px] 640:text-xl mt-8'>
                  {stats.title}
                </div>
                <div className='text-2xl 640:text-[28px] 1240:text-[32px] text-light-primary-black font-bold mb-2'>
                  {formatNumber(stats.value)}
                </div>
              </Card>
            )}
          </>
        );
      })}
    </div>
  );
};
