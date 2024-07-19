import { handleSort } from '@/utils';
import clsx from 'clsx';
import { Bar } from '../svg/dashboard/Dashboard';

type Payload = {
  name: string;
  value: any;
  payload: Record<string, any>;
};

type Props = Record<string, any> & {
  formatter: (value: string) => string;
  yAxisAccessor: string;
  payload?: Payload[];
};

export const CustomTooltip = ({
  active,
  payload,
  formatter,
  yAxisAccessor,
  label,
}: Props) => {
  if (!active) return null;

  return (
    <div className='min-w-[130px] rounded-[4px] border border-[#DCD8EC66] bg-white px-4 py-2.5 text-black shadow-md'>
      <div className='flex items-start gap-3'>
        <div className={clsx('mb-1 text-left capitalize text-gray-500')}>
          <p className='text-xs font-bold'>Peak sales period</p>
          <p className='text-[8px]'>you made this amount</p>
        </div>
        <span className='w-[20px] h-[20px] flex items-center justify-center bg-[#357AF6] rounded-full'>
          <Bar />
        </span>
      </div>

      {handleSort({
        data: payload,
        sortBy: 'value',
      })?.map(({ name, value, payload }) => {
        const yAxisValue = payload[yAxisAccessor];

        return (
          <div key={`${name}${yAxisValue}`} className='mt-2'>
            <div className='flex gap-1'></div>
            <div className='text-[28px] font-medium text-[#5CC8BE]'>
              {formatter ? formatter(value) : value}
            </div>
          </div>
        );
      })}
    </div>
  );
};
