import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { numberShortener } from '@/utils';
import { ArrowDown, ArrowUp, Fall, Rise } from '../svg/dashboard/Dashboard';
import clsx from 'clsx';

interface Props {
  isRegisteredUsersLoading: boolean;
  registeredUsers: number;
  registeredPercentChange: number;
}
export const RegisteredUsers = ({
  isRegisteredUsersLoading,
  registeredUsers,
  registeredPercentChange,
}: Props) => {
  return (
    <>
      {isRegisteredUsersLoading ? (
        <div className='text-black h-[50px] w-full flex justify-center items-center'>
          <Spin
            indicator={
              <LoadingOutlined className='!text-[38px] 640:!text-[55px]' spin />
            }
          />
        </div>
      ) : (
        <div className='flex items-center gap-3 justify-between text-light-grey-100'>
          <div>
            <h3 className='text-primary-black font-bold text-xl 560:text-2xl mb-4'>
              {numberShortener(registeredUsers)}
            </h3>
            <div className='flex items-center gap-1 text-light-grey-100'>
              {registeredPercentChange === 0 ? (
                '-'
              ) : registeredPercentChange < 0 ? (
                <ArrowDown />
              ) : (
                <ArrowUp />
              )}
              <p
                className={clsx(
                  registeredPercentChange === 0
                    ? 'text-light-grey-100'
                    : registeredPercentChange < 0
                      ? 'text-light-error-800'
                      : 'text-light-success-100',
                  'text-sm font-medium',
                )}
              >
                {registeredPercentChange}
              </p>
              <p className='text-light-grey-400 text-sm font-medium ml-2'>
                vs last 7 days
              </p>
            </div>
          </div>
          {registeredPercentChange === 0 ? (
            '---'
          ) : registeredPercentChange < 0 ? (
            <Fall />
          ) : (
            <Rise />
          )}
        </div>
      )}
    </>
  );
};
