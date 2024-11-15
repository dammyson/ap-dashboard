import { devices } from '@/pages/dashboard/constants';
import { Dot } from '../svg/dashboard/Dashboard';
import { PieChart } from 'react-minimal-pie-chart';
import { formatToDollar } from '@/utils';

export const PieChartData = () => {
  return (
    <>
      <p className='text-light-grey-700 text-sm font-normal'>Last 7 days</p>
      <div>
        <PieChart
          lineWidth={53}
          radius={28}
          data={devices}
          segmentsStyle={(index) => ({
            strokeWidth: index == 1 ? '18' : '',
            cursor: 'pointer',
          })}
          animate
          startAngle={90}
          labelStyle={{
            fontSize: 5,
            fill: '#fff',
            fontWeight: 600,
          }}
          labelPosition={70}
          className='max-h-[300px] 1240:max-h-inherit'
          totalValue={100}
          label={({ dataEntry }) => `${dataEntry.value}%`}
        />
      </div>
      <div className='grid gap-2 pb-2 560:pb-0'>
        {devices.map((device, index) => {
          return (
            <div key={index} className='flex items-center gap-2'>
              <Dot
                className={
                  index === 0
                    ? 'text-light-secondary-bright_blue'
                    : 'text-light-secondary-dark_pink'
                }
              />
              <p className='text-light-grey-300 text-sm min-w-[60px]'>
                {device.label}
              </p>
              <p className='text-[#1C2A53] text-sm min-w-[60px]'>
                {formatToDollar(device.amount)}
              </p>
              <p className='text-light-grey-300 text-sm min-w-[60px] ml-2'>
                {device.value}%
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};
