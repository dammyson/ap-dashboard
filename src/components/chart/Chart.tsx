import {
  XAxis,
  Tooltip,
  Area,
  AreaChart,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { useMemo } from 'react';
import { formatToDollar, numberShortener } from '@/utils';
import { CustomTooltip } from './CustomTooltip';
import { GraphValues } from '@/types/types';

interface Props {
  chartData: GraphValues[];
  transactionType: string;
}

export const Chart = ({ chartData, transactionType }: Props) => {
  const defaultYAxis = [0, 500000, 1000000, 1500000, 2000000, 2500000, 3000000];

  const data = useMemo(() => {
    const defaultXAxis = [
      'SUNDAY',
      'MONDAY',
      'TUESDAY',
      'WEDNESDAY',
      'THURSDAY',
      'FRIDAY',
      'SATURDAY',
    ];
    if (chartData.length === 0) {
      return defaultXAxis.map((day) => ({ name: day, value: 0 }));
    }
    return chartData.map((item) => ({
      name: item.name,
      value: item.value,
    }));
  }, [chartData]);

  return (
    <ResponsiveContainer width='100%' height={291}>
      <AreaChart
        height={300}
        data={data}
        margin={{
          bottom: 10,
          right: 10,
          left: 0,
          top: 5,
        }}
        className='w-full min-w-[500px] max-w-[800px]'
      >
        <Tooltip
          content={
            <CustomTooltip
              yAxisAccessor={'value'}
              formatter={(value) => {
                return `${formatToDollar(parseInt(value))}`;
              }}
            />
          }
        />
        <defs>
          <linearGradient id='colorGradient' x1='0' y1='0' x2='1' y2='0'>
            <stop offset='0%' stopColor='#23539F' />
            <stop offset='100%' stopColor='#23539F' />
          </linearGradient>
        </defs>

        <XAxis fontSize={11} dataKey='name' tickLine={false} />

        <YAxis
          fontSize={11}
          width={40}
          dataKey={'value'}
          tickFormatter={numberShortener}
          ticks={chartData.length === 0 ? defaultYAxis : undefined}
          axisLine={false}
          tickLine={false}
        />

        {transactionType === 'credit' || transactionType === 'all' ? (
          <Area
            type='monotone'
            dataKey='value'
            strokeWidth={4}
            stroke='url(#colorGradient)'
            fillOpacity={1}
            fill='url(#colorPv)'
          >
            <linearGradient id='colorPv' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#BA1A1A1A' stopOpacity={0.8} />
              <stop offset='95%' stopColor='#2954CC' stopOpacity={0} />
            </linearGradient>
          </Area>
        ) : null}

        <CartesianGrid strokeOpacity={0} strokeDasharray='3 3' />
      </AreaChart>
    </ResponsiveContainer>
  );
};
