import { Dot } from '../svg/dashboard/Dashboard';
import { PieChart } from 'react-minimal-pie-chart';

import { UsersByDevice } from '@/types/types';

interface Props {
  usersByDevice: UsersByDevice;
}

export const PieChartData = ({ usersByDevice }: Props) => {
  const roundPercent = (value: number): number => {
    return value % 1 !== 0 ? parseFloat(value.toFixed(1)) : value;
  };

  const devices = [
    {
      label: 'Andriod',
      value: roundPercent(usersByDevice.android_percent),
      color: '#5856D6',
      amount: 830.03,
    },
    {
      label: 'IOS',
      value: roundPercent(usersByDevice.ios_percent),
      color: '#EA3354',
      amount: 500.75,
    },
  ];

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
            fontSize: 3.5,
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
              {/* <p className='text-[#1C2A53] text-sm min-w-[60px]'>
                {formatToDollar(device.amount)}
              </p> */}
              <p className='text-light-grey-300 text-sm min-w-[60px]'>
                {device.value}%
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};
