import { barChartData } from '@/pages/dashboard/constants';
import { ByScreenResolution } from '@/types/types';
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
interface Props {
  data: ByScreenResolution[];
}

export const HorizontalBarChart = ({ data }: Props) => {
  // const barChartData = [
  //   {
  //     resolution: data.screen_resolution,
  //     percentage: data.percentage,
  //     colors: '#357AF6',
  //   },
  //   // { resolution: '1536x864', percentage: 20.8, colors: '#F09436' },
  //   // { resolution: '1366x766', percentage: 15.95, colors: '#5CC8BE' },
  //   // { resolution: '393x873', percentage: 25.28, colors: '#5856D6' },
  //   // { resolution: '390x844', percentage: 18.96, colors: '#AF52DE' },
  //   // { resolution: '360x800', percentage: 13.46, colors: '#EA3354' },
  // ];

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
      <div className='w-full max-w-[210px] 480:max-w-[395px] 1240:max-w-[450px] grid gap-1.5 1024:gap-3 items-start grid-cols-2 480:grid-cols-3 mt-5'>
        {data.map((entry, index) => (
          <div
            key={index}
            className='w-full 640:min-w-[107px] flex flex-row gap-1.5 1240:gap-3 items-start 640:items-center justify-start'
          >
            <div
              style={{ backgroundColor: 'red' }}
              className='w-[15px] h-[15px] 1240:w-[30px] 1240:h-[30px]'
            ></div>
            <span className='font-medium text-xs 768:text-[14px] text-light-grey-600'>
              {entry.screen_resolution}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <ResponsiveContainer width='100%' height={430} className='graph'>
      <BarChart
        width={400}
        height={400}
        data={data}
        layout='vertical'
        margin={{
          top: 20,
          right: 20,
          left: 30,
          bottom: 5,
        }}
        className='graph'
      >
        <CartesianGrid
          horizontal={false}
          vertical
          strokeDasharray='3 3'
          opacity={0.5}
        />
        <XAxis
          type='number'
          ticks={[0, 2, 4, 6, 8, 10]}
          axisLine={false}
          tickLine={false}
          width={20}
        />
        <YAxis
          dataKey='screen_resolution'
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
