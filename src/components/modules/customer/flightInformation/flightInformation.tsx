import { Card } from '@/components/card';
import { Flight } from '@/components/svg/customer/Customer';
import { UserFlightDetails } from '@/pages/customer/viewCustomer/constants';
import { ICustomer } from '@/types/types';
import clsx from 'clsx';
import dayjs from 'dayjs';

export interface UsageProp {
  customer: ICustomer | null;
}

export const FlightInfo = ({ customer }: UsageProp) => {
  return (
    <>
      <Card>
        <div className='grid grid-cols-1 768:grid-cols-2 1024:flex 1024:items-start justify-items-center 1024:justify-between gap-3'>
          {UserFlightDetails.map((user, index) => (
            <div key={index}>
              <div className='text-center 1024:text-start'>
                <p className='text-light-grey-700 text-[16px] 768:text-xl 1240:text-lg 1400:text-x 1024:h-[56px] font-medium'>
                  {user.title}
                </p>
                <p className='text-light-primary-black font-bold text-xl 768:text-2xl 880:text-[26px] 1240:text-[28px] 1400:text-[30px]'>
                  {user.title === 'Travel preferences'
                    ? 'Window Seat'
                    : user.title === 'Last flight'
                      ? `${dayjs(customer?.last_flight.departure_time).format(
                          'YYYY-MM-DD',
                        )}`
                      : user?.title === 'Upcoming flight'
                        ? `${dayjs(
                            customer?.upcoming_flight.departure_time,
                          ).format('YYYY-MM-DD')}`
                        : dayjs(customer?.user_date_of_reg).format(
                            'YYYY-MM-DD',
                          )}
                </p>
              </div>
              {user.title.includes('flight') && (
                <div
                  className={clsx(
                    user.title.includes('Last')
                      ? 'text-light-blue-main flex items-center'
                      : user.title.includes('Upcoming')
                        ? 'text-light-secondary-orange'
                        : '',
                    'flex gap-1 360:gap-3',
                  )}
                >
                  <div>
                    <p className='font-medium text-xl 360:text-2xl 480:text-[26px] 1240:text-[26px] 1400:text-[30px] '>
                      {user.title === 'Last flight'
                        ? customer?.last_flight.origin_city != ''
                          ? customer?.last_flight.origin_city
                          : customer?.last_flight.origin
                        : customer?.upcoming_flight.origin_city != ''
                          ? customer?.upcoming_flight.origin_city
                          : customer?.upcoming_flight.origin}
                    </p>
                    <p className='text-[10px] 360:text-sm 480:text-[16px]'>
                      {user.title === 'Last flight'
                        ? customer?.last_flight.origin
                        : customer?.upcoming_flight.origin}
                    </p>
                  </div>
                  <div className='pt-[10px]'>
                    <Flight
                      color={clsx(
                        user.title.includes('Last')
                          ? '#23539F'
                          : user.title.includes('Upcoming')
                            ? '#F09436'
                            : '',
                      )}
                      className='max-w-[130px] w-full'
                    />
                  </div>
                  <div>
                    <p className='font-medium text-xl 360:text-2xl 480:text-[26px] 1240:text-[26px] 1400:text-[30px] '>
                      {user.title === 'Last flight'
                        ? customer?.last_flight.destination_city != ''
                          ? customer?.last_flight.destination_city
                          : customer?.last_flight.destination
                        : customer?.upcoming_flight.destination_city != ''
                          ? customer?.upcoming_flight.destination_city
                          : customer?.upcoming_flight.destination}
                    </p>
                    <p className='float-end text-[10px] 360:text-sm 480:text-[16px]'>
                      {user.title === 'Last flight'
                        ? customer?.last_flight.destination
                        : customer?.upcoming_flight.destination}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </>
  );
};
