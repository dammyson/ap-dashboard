import { Skeleton } from './skeleton';

export const SkeletonBarChart = () => {
  const bars = Array.from({ length: 10 }, (_, index) => index);

  return (
    <div className='bg-[#f2f2f2] py-[10px] px-4 mt-8 rounded-[20px] h-[513px] p-5 560:p-7 1240:p-9'>
      <Skeleton type='title' className='mb-8' />
      <div className='mb-6'>
        <Skeleton type='title' className='!w-1/4' />
        <Skeleton type='text' className='!w-1/3' />
      </div>
      <div className='flex items-center justify-between pl-7 h-[300px] mt-10 overflow-hidden'>
        {bars.map((bar) => (
          <>
            {[3, 4, 5, 6].includes(bar) ? (
              <Skeleton key={bar} type='barChart' className='mt-44' />
            ) : (
              <Skeleton key={bar} type='barChart' />
            )}
          </>
        ))}
      </div>
    </div>
  );
};
