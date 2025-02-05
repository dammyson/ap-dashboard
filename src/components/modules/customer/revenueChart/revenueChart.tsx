import { Card } from '@/components/card';
import { Chart } from '@/components/chart/Chart';
import { CustomFilter } from '@/components/filter/filter';
import { useClickOutside } from '@/components/hooks/useClickOutside';
import { useWindowSize } from '@/components/hooks/useWindowSize';
import { Filter } from '@/components/svg/surveys/Surveys';
import { graphOptions } from '@/constants/constants';
import { CustomerChart } from '@/types/types';
import { numberShortener } from '@/utils';
import clsx from 'clsx';
import { useRef, useState } from 'react';

export interface ChartProps {
  id: string;
  chartData: CustomerChart | null;
  isgraphfiltered: boolean;
  showDropdown: boolean;
  activeFilterTab: { key: string; value: string };
  setActiveFilterTab: React.Dispatch<
    React.SetStateAction<{ key: string; value: string }>
  >;
  setShowDropdown: (value: React.SetStateAction<boolean>) => void;
  filterGraph: (val: string, id?: string) => Promise<void>;
}

export const CustomerRevenueChart = ({
  id,
  chartData,
  isgraphfiltered,
  showDropdown,
  setShowDropdown,
  filterGraph,
  activeFilterTab,
  setActiveFilterTab,
}: ChartProps) => {
  const isWindowSize604 = useWindowSize(604);
  const filterRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(filterRef, () => setShowDropdown(false), showDropdown);

  const tabs = [
    { name: 'Flight bookings', value: chartData?.ticket.ticket_amount ?? 0 },
    {
      name: 'In-app purchases',
      value: chartData?.ancillary.ancillary_amount ?? 0,
    },
    // { name: 'Gamification', value: customerRevenue?.app_purchase_amount },
    { name: 'Total revenue', value: chartData?.revenue.revenue_amount ?? 0 },
  ];

  const currentTab = tabs[0];
  const [activeTab, setActiveTab] = useState(currentTab);
  return (
    <>
      {
        <Card
          hasBadge
          hasHeader
          title='Revenue sources'
          isFiltered={isgraphfiltered}
          trailingIcon1={
            <div ref={filterRef} className='relative '>
              <div onClick={() => setShowDropdown(!showDropdown)}>
                <Filter />
              </div>
              <CustomFilter
                id={id}
                showDropdown={showDropdown}
                activeFilterTab={activeFilterTab}
                setActiveFilterTab={setActiveFilterTab}
                filterGraph={filterGraph}
                graphOptions={graphOptions}
              />
            </div>
          }
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
                    ? tab.name.includes('Gamification') && 'h-[87px]'
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
                  {tab?.value ? numberShortener(tab.value) : tab.value}
                </h3>
                <p className='text-xs font-medium text-light-grey-400'>
                  {tab.name}
                </p>
              </div>
            ))}
          </div>
          <Chart
            chartData={
              chartData
                ? activeTab.name === 'Flight bookings'
                  ? chartData?.ticket.ticket_data
                  : activeTab.name === 'In-app purchases'
                    ? chartData?.ancillary.ancillary_data
                    : chartData?.revenue.revenue_data
                : []
            }
            transactionType='all'
          />
        </Card>
      }
    </>
  );
};
