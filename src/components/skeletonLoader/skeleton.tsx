import clsx from 'clsx';
import { Shimmer } from './animatSkeleton';

interface SkeletonProps {
  type: string;
  className?: string;
}

export const Skeleton = ({ type, className }: SkeletonProps) => {
  return (
    <div
      className={clsx(
        type === 'text'
          ? 'h-3 w-full'
          : type === 'title'
            ? 'h-5 w-1/2 mb-4'
            : type === 'thumbnail'
              ? 'w-[120px] h-[120px]'
              : type === 'barChart'
                ? 'h-full w-5 rounded-b-none mr-3'
                : '',
        'bg-[#ddd] my-2 rounded relative overflow-hidden',
        className,
      )}
    >
      <Shimmer />
    </div>
  );
};
