import { Skeleton } from './skeleton';

export const SkeletonOverView = () => {
  return (
    <div className='relative bg-[#f2f2f2] py-5 px-4 rounded-[20px] w-[410px] max-h-[200px] overflow-hidden'>
      <div>
        <Skeleton type='title' className='!w-1/4' />
        <Skeleton type='text' className='!w-1/2' />
      </div>
      <div className='flex items-center justify-between gap-4'>
        <div className='!w-1/2'>
          <Skeleton type='title' className='!h-7 !w-1/4' />
          <Skeleton type='text' className='!w-9/12' />
        </div>
        <div>
          <Skeleton type='thumbnail' className='!w-[180px] !h-[90px] mt-0 ' />
        </div>
      </div>
    </div>
  );
};