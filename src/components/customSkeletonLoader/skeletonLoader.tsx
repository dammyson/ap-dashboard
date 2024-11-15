import clsx from 'clsx';
import { Skeleton } from './skeleton';

interface Props {
  hasOverview?: boolean;
  hasChartData?: boolean;
  hasByScreen?: boolean;
  hasByDevice?: boolean;
  hasByActivities?: boolean;
}

export const SkeletonLoader = ({
  hasByActivities,
  hasByDevice,
  hasByScreen,
  hasChartData,
  hasOverview,
}: Props) => {
  const activities = new Array(5).fill(0);
  return (
    <div
      className={clsx(
        hasOverview
          ? 'py-5 px-4 w-[410px] max-h-[200px] '
          : 'py-[10px] px-4 mt-8 560:p-7 1240:p-9',
        hasChartData && 'h-[513px]',
        hasByScreen && 'h-[548px]',
        hasByDevice && '1240:h-full max-h-[513px]',
        hasByActivities && 'h-[548px]',
        'relative bg-[#f2f2f2] rounded-[20px] ',
      )}
    >
      {hasOverview && (
        <>
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
              <Skeleton
                type='thumbnail'
                className='!w-[180px] !h-[90px] mt-0 '
              />
            </div>
          </div>
        </>
      )}
      {hasChartData && (
        <>
          <Skeleton type='title' className='mb-8' />
          <div className='mb-6'>
            <Skeleton type='title' className='!w-1/4' />
            <Skeleton type='text' className='!w-1/3' />
          </div>
          <div className=' h-[300px] mt-10 w-full'>
            <Skeleton type='thubmnail' className='h-full' />
          </div>
        </>
      )}
      {hasByDevice && (
        <>
          <Skeleton
            type='title'
            className='max-w-[100px] w-full 1240:!max-w-[25%] 1240:!w-full'
          />
          <Skeleton
            type='text'
            className='max-w-[150px] w-full 1240:!max-w-[50%] 1240:!w-full'
          />
          <div className=' px-5 py-5 h-[300px]  1240:max-h-inherit flex justify-center items-center mb-4'>
            <Skeleton
              type='thumbnail'
              className='!h-full w-full max-w-[300px]'
            />
          </div>
          <Skeleton
            type='text'
            className='max-w-[180px] w-full 1240:!max-w-[35%] 1240:!w-full'
          />
          <Skeleton
            type='text'
            className='max-w-[180px] w-full 1240:!max-w-[35%] 1240:!w-full'
          />
        </>
      )}
      {hasByScreen && (
        <>
          <Skeleton type='title' className='mb-8' />
          <div className=' h-[300px] mt-10 w-full'>
            <Skeleton type='thubmnail' className='h-full' />
          </div>
          <div className='my-10'>
            <Skeleton type='text' className='!w-1/3' />
            <Skeleton type='text' className='!w-1/3' />
          </div>
        </>
      )}
      {hasByActivities && (
        <>
          <Skeleton type='title' className='mb-8' />
          <div className=' h-[300px] mt-10 w-full'>
            {activities.map((activitiy) => (
              <Skeleton key={activitiy} type='thubmnail' className='h-[67px]' />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
