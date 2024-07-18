import { ActiveUsers } from '@/types/types';
import { formatNumber } from '@/utils';
import { ColumnType } from 'antd/es/table';
import { useMemo } from 'react';

export const UseActiveUsers = () => {
  const tableColumns = useMemo(() => {
    return [
      {
        title: 'MONTH/YR',
        dataIndex: 'monthYear',
        key: 'monthYear',
        render: (_, { monthYear }) => {
          return <div className='font-semibold'>{monthYear}</div>;
        },
      },
      {
        title: 'TOTAL ACTIVE USERS',
        dataIndex: 'totalActiveUsers',
        key: 'totalActiveUsers',
        render: (_, { totalActiveUsers }) => {
          return (
            <div className='font-semibold'>
              {formatNumber(totalActiveUsers)}
            </div>
          );
        },
      },
      {
        title: 'NEW REGISTRATIONS',
        dataIndex: 'newRegistration',
        key: 'newRegistration',
        render: (_, { newRegistration }) => {
          return <div>{formatNumber(newRegistration)}</div>;
        },
      },
      {
        title: 'RETURNING USERS',
        dataIndex: 'returningUsers',
        key: 'returningUsers',
        render: (_, { returningUsers }) => {
          return <div>{formatNumber(returningUsers)}</div>;
        },
      },
      {
        title: 'CHURN RATE',
        dataIndex: 'churnRate',
        key: 'churnRate',
        render: (_, { churnRate }) => {
          return <div className='text-[#595959]'>{`${churnRate}%`}</div>;
        },
      },
      {
        title: 'TOTAL SESSIONS',
        dataIndex: 'totalSessions',
        key: 'totalSessions',
        render: (_, { totalSessions }) => {
          return (
            <div className='font-semibold text-[#595959]'>
              {formatNumber(totalSessions)}
            </div>
          );
        },
      },
      {
        title: 'AVERAGE SESSION DURATION',
        dataIndex: 'averageSessionDuration',
        key: 'averageSessionDuration',
      },
      {
        title: 'GEOGRAPHICAL DISTRIBUTION',
        dataIndex: 'geographicalDistribution',
        key: 'geographicalDistribution',

        render: (_, { geographicalDistribution }) => {
          return (
            <>
              {geographicalDistribution.map((geoDistribution) => (
                <div>
                  <span className='font-medium text-[#595959]'>
                    {`${geoDistribution.country}: `}
                  </span>
                  <span className=' text-[#595959]'>
                    {formatNumber(geoDistribution.population)}
                  </span>
                </div>
              ))}
            </>
          );
        },
      },
      {
        title: 'DEVICE DISTRIBUTION',
        dataIndex: 'deviceDistribution',
        key: 'deviceDistribution',
        render: (_, { deviceDistribution }) => {
          return (
            <>
              {deviceDistribution.map((device) => (
                <div>
                  <span className='font-medium text-[#595959]'>
                    {`${device.deviceType}: `}
                    {formatNumber(device.count)}
                  </span>
                </div>
              ))}
            </>
          );
        },
      },
    ] as ColumnType<ActiveUsers>[];
  }, []);
  return { tableColumns };
};
