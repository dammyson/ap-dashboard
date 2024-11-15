import clsx from 'clsx';
import { ArrowDown, ArrowUp, Fall, Rise } from '../svg/dashboard/Dashboard';
import { numberShortener } from '@/utils';
import { OverViewType, OverViewCardsType } from '@/types/types';
import { SkeletonLoader } from '@/components/customSkeletonLoader/skeletonLoader';

interface Props {
  activeStat: string;
  setActiveStat: React.Dispatch<React.SetStateAction<string>>;
  overView: OverViewType;
  isLoading: boolean;
}

export const OverView = ({
  activeStat,
  setActiveStat,
  overView,
  isLoading,
}: Props) => {
  const stats: OverViewCardsType[] = [
    {
      title: 'Total users registered',
      value:
        overView?.total_registered_users.total_registered_users_last_seven_days,
      variance: overView?.total_registered_users.percentage,
      state: 'registered',
    },
    {
      title: 'Tickets purchased via app',
      value: overView?.total_purchased_ticket.ticket7DaysAgo,
      variance: overView?.total_purchased_ticket.percentageChange,
      state: 'tickets',
    },
    {
      title: 'Total revenue',
      value: overView?.total_revenue.total7daysRevenue,
      variance: overView?.total_revenue.percentageChange,
      state: 'revenue',
    },
    {
      title: 'Active users',
      value:
        overView?.total_registered_users.total_registered_users_last_seven_days,
      variance: overView?.total_registered_users.percentage,
      state: 'active',
    },
  ];

  return (
    <div className='flex gap-8 items-center pt-4'>
      {stats.map((stat, index) => {
        const isLast = index === stats.length - 1;
        return (
          <>
            {isLoading ? (
              <SkeletonLoader hasOverview />
            ) : (
              <div
                onClick={() => {
                  if (!isLoading) {
                    setActiveStat((prevState) =>
                      prevState === stat.state ? '' : stat.state,
                    );
                  }
                }}
                key={index}
                className={clsx(
                  isLast && 'mr-6',
                  'min-h-[200px] py-5 px-4 cursor-pointer w-[410px] shadow-sm bg-primary-white rounded-[20px] flex flex-col justify-between',
                  activeStat === stat.state && '!bg-[#E9EEF5]',
                )}
              >
                <div>
                  <p className='text-light-grey-700 font-medium'>
                    {stat.title}
                  </p>
                  <p className='text-light-grey-700 text-sm font-normal'>
                    Last 7 days
                  </p>
                </div>
                <div className='flex items-center gap-3 justify-between'>
                  <div>
                    <h3 className='text-primary-black font-bold text-xl 560:text-2xl mb-4'>
                      {numberShortener(stat.value)}
                    </h3>
                    <div className='flex items-center gap-1'>
                      {stat.variance < 0 ? <ArrowDown /> : <ArrowUp />}
                      <p
                        className={clsx(
                          stat.variance < 0
                            ? 'text-light-error-800'
                            : 'text-light-success-100',
                          'text-sm font-medium',
                        )}
                      >
                        {stat.variance < 0 ? stat.variance * -1 : stat.variance}
                        %
                      </p>
                      <p className='text-light-grey-400 text-sm font-medium ml-2'>
                        vs last 7 days
                      </p>
                    </div>
                  </div>
                  {stat.variance < 0 ? <Fall /> : <Rise />}
                </div>
              </div>
            )}
          </>
        );
      })}
    </div>
  );
};
