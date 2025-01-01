import { EmptyPieChart } from '@/components/svg/dashboard/Dashboard';

export const NoPieData = () => {
  return (
    <div className='h-3/4 min-h-[300px] flex items-center justify-center flex-col'>
      <div className=' 1240:max-h-inherit '>
        <EmptyPieChart />
      </div>
      <p className='text-light-grey-300 text-lg font-semibold text-center w-full min-w-[60px] mt-5'>
        No data to display
      </p>
    </div>
  );
};
