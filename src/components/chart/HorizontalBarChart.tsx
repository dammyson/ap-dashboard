import { barChartData } from '@/pages/dashboard/constants';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface CustomLabelProps {
  x: number;
  y: number;
  width: number;
  value: number;
}

export const HorizontalBarChart = () => {
  const customLabel = ({ x, y, width, value }: CustomLabelProps) => {
    return (
      <text
        x={x + width + 7}
        y={y + 18}
        fill='#595959'
        textAnchor='start'
        fontSize={14}
        fontWeight={500}
      >
        {`${value}%`}
      </text>
    );
  };
  const customLegend = () => {
    return (
      <div className='w-[450px] grid gap-3 items-start grid-cols-3 mt-5'>
        {barChartData.map((entry, index) => (
          <div key={index} className='flex gap-3 items-center justify-start'>
            <div
              style={{ backgroundColor: entry.colors }}
              className=' w-[30px] h-[30px]'
            ></div>
            <span className='font-medium text-[14px] text-light-grey-600'>
              {entry.resolution}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <ResponsiveContainer width='100%' height={430}>
      <BarChart
        width={400}
        height={400}
        data={barChartData}
        layout='vertical'
        margin={{
          top: 20,
          right: 80,
          left: 70,
          bottom: 5,
        }}
      >
        <CartesianGrid
          horizontal={false}
          vertical
          strokeDasharray='3 3'
          opacity={0.5}
        />
        <XAxis
          type='number'
          ticks={[0, 20, 40, 60, 80, 100]}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          dataKey='resolution'
          type='category'
          tickLine={false}
          axisLine={{ stroke: '#989898' }}
          tick={{ fill: '#989898' }}
        />
        <Legend content={customLegend} />
        <Tooltip cursor={{ fill: 'transparent' }} />
        <Bar dataKey='percentage' label={customLabel} barSize={25}>
          {barChartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.colors} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
