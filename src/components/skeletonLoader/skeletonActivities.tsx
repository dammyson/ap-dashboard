import { Skeleton } from './skeleton';

export const SkeletonActivities = () => {
  const activities = new Array(5).fill(0);
  return (
    <div className='bg-[#f2f2f2] py-[10px] px-4 mt-8 rounded-[20px] h-[548px] p-5 560:p-7 1240:p-9'>
      <Skeleton type='title' className='mb-8' />
      <div className=' h-[300px] mt-10 w-full'>
        {activities.map((activitiy) => (
          <Skeleton key={activitiy} type='thubmnail' className='h-[67px]' />
        ))}
      </div>
    </div>
  );
};
