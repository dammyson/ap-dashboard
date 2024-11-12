import { Skeleton } from './skeleton';

export const SkeletonByDevices = () => {
  return (
    <div className='1240:h-full max-h-[513px] bg-[#f2f2f2]  py-[10px] px-4 mt-8 rounded-[20px]'>
      <Skeleton
        type='title'
        className='max-w-[100px] w-full 1240:!max-w-[25%] 1240:!w-full'
      />
      <Skeleton
        type='text'
        className='max-w-[150px] w-full 1240:!max-w-[50%] 1240:!w-full'
      />
      <div className=' px-5 py-5 h-[300px]  1240:max-h-inherit flex justify-center items-center mb-4'>
        <Skeleton type='thumbnail' className='!h-full w-full max-w-[300px]' />
      </div>
      <Skeleton
        type='text'
        className='max-w-[180px] w-full 1240:!max-w-[35%] 1240:!w-full'
      />
      <Skeleton
        type='text'
        className='max-w-[180px] w-full 1240:!max-w-[35%] 1240:!w-full'
      />
    </div>
  );
};
