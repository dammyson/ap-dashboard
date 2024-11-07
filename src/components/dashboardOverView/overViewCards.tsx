import clsx from 'clsx';
import { ArrowDown, ArrowUp, Fall, Rise } from '../svg/dashboard/Dashboard';
import { numberShortener } from '@/utils';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { OverViewType } from '@/types/types';

interface Props {
  activeStat: string;
  setActiveStat: React.Dispatch<React.SetStateAction<string>>;
  registeredUsers: number;
  registeredPercentChange: number;
  ticketsPurchased: number;
  ticketsPercentChange: number;
  totalRevenue: number;
  revenuePrecentChange: number;
  isLoading: boolean;
}

export const OverView = ({
  activeStat,
  setActiveStat,
  registeredUsers,
  registeredPercentChange,
  ticketsPurchased,
  ticketsPercentChange,
  totalRevenue,
  revenuePrecentChange,
  isLoading,
}: Props) => {
  const stats: OverViewType[] = [
    {
      title: 'Total users registered',
      period: 'Last 7 days',
      value: registeredUsers,
      variance: registeredPercentChange,
      state: 'registered',
    },
    {
      title: 'Tickets purchased via app',
      period: 'Last 7 days',
      value: ticketsPurchased,
      variance: ticketsPercentChange,
      state: 'tickets',
    },
    {
      title: 'Total revenue',
      period: 'Last 7 days',
      value: totalRevenue,
      variance: revenuePrecentChange,
      state: 'revenue',
    },
    {
      title: 'Active users',
      period: 'Last 7 days',
      value: 1200,
      variance: 6,
      state: 'active',
    },
  ];

  return (
    <div className='flex gap-8 items-center pt-4'>
      {stats.map((stat, index) => {
        const isLast = index === stats.length - 1;
        return (
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
              <p className='text-light-grey-700 font-medium'>{stat.title}</p>
              <p className='text-light-grey-700 text-sm font-normal'>
                {stat.period}
              </p>
            </div>
            {isLoading ? (
              <div className='text-black h-[50px] w-full flex justify-center items-center'>
                <Spin
                  indicator={
                    <LoadingOutlined
                      className='!text-[38px] 640:!text-[55px]'
                      spin
                    />
                  }
                />
              </div>
            ) : (
              <div className='flex items-center gap-3 justify-between text-light-grey-100'>
                <div>
                  <h3 className='text-primary-black font-bold text-xl 560:text-2xl mb-4'>
                    {numberShortener(stat.value)}
                  </h3>
                  <div className='flex items-center gap-1 text-light-grey-100'>
                    {stat.variance === 0 ? (
                      '-'
                    ) : stat.variance < 0 ? (
                      <ArrowDown />
                    ) : (
                      <ArrowUp />
                    )}
                    <p
                      className={clsx(
                        stat.variance === 0
                          ? 'text-light-grey-100'
                          : stat.variance < 0
                            ? 'text-light-error-800'
                            : 'text-light-success-100',
                        'text-sm font-medium',
                      )}
                    >
                      {stat.variance < 0 ? stat.variance * -1 : stat.variance}
                    </p>
                    <p className='text-light-grey-400 text-sm font-medium ml-2'>
                      vs last 7 days
                    </p>
                  </div>
                </div>
                {stat.variance === 0 ? (
                  '---'
                ) : stat.variance < 0 ? (
                  <Fall />
                ) : (
                  <Rise />
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
