import { Card } from '@/components/card';
import { Flight } from '@/components/svg/customer/Customer';
import { ICustomer } from '@/types/types';
import dayjs from 'dayjs';

export interface UsageProp {
  customer: ICustomer | null;
}

export const FlightInfo = ({ customer }: UsageProp) => {
  const UserFlightDetails = [
    {
      title: 'Date of registration',
      dateOfRegisteration: dayjs(customer?.user_date_of_reg).format(
        'YYYY-MM-DD',
      ),
    },
    { title: 'Travel preferences', preference: 'Window Seat' },
    {
      title: 'Last flight',
      lastFlight: {
        depatureTime: dayjs(customer?.last_flight?.departure_time).format(
          'YYYY-MM-DD',
        ),
        originCity: customer?.last_flight?.origin_city,
        origin: customer?.last_flight?.origin,
        destinationCity: customer?.last_flight?.destination_city,
        destination: customer?.last_flight?.destination,
      },
    },
    {
      title: 'Upcoming flight',
      upcomingFlight: {
        depatureTime: dayjs(customer?.upcoming_flight?.departure_time).format(
          'YYYY-MM-DD',
        ),
        originCity: customer?.upcoming_flight?.origin_city,
        origin: customer?.upcoming_flight?.origin,
        destinationCity: customer?.upcoming_flight?.destination_city,
        destination: customer?.upcoming_flight?.destination,
      },
    },
  ];
  return (
    <>
      <Card>
        <div className='grid grid-cols-1 768:grid-cols-2 1024:flex 1024:items-start justify-items-center 1024:justify-between gap-3'>
          {UserFlightDetails.map((user, i) => (
            <div key={i}>
              <div className='text-center 1024:text-start'>
                <p className='text-light-grey-700 text-[16px] 768:text-xl 1240:text-lg 1400:text-x 1024:h-[56px] font-medium'>
                  {user.title}
                </p>
                <p className='text-light-primary-black font-bold text-xl 768:text-2xl 880:text-[26px] 1240:text-[28px] 1400:text-[30px]'>
                  {user.title === 'Date of registration'
                    ? user.dateOfRegisteration
                    : user.title === 'Travel preferences'
                      ? user.preference
                      : user.title === 'Last flight' &&
                          customer?.last_flight !== null
                        ? user.lastFlight?.depatureTime
                        : user?.title === 'Upcoming flight' &&
                            customer?.upcoming_flight !== null
                          ? user.upcomingFlight?.depatureTime
                          : '---'}
                </p>
              </div>
              {user.title.includes('flight') && (
                <>
                  {user.title === 'Last flight' && (
                    <div className='text-light-blue-main flex gap-1 360:gap-3'>
                      <div>
                        <p className='font-medium text-xl 360:text-2xl 480:text-[26px] 1240:text-[26px] 1400:text-[30px] '>
                          {customer?.last_flight !== null
                            ? user.lastFlight?.originCity
                            : '---'}
                        </p>
                        <p className='text-[10px] 360:text-sm 480:text-[16px]'>
                          {customer?.last_flight !== null
                            ? user.lastFlight?.origin
                            : '---'}
                        </p>
                      </div>

                      <div className='pt-[10px]'>
                        <Flight
                          color='#23539F'
                          className='max-w-[130px] w-full'
                        />
                      </div>
                      <div>
                        <p className='font-medium text-xl 360:text-2xl 480:text-[26px] 1240:text-[26px] 1400:text-[30px] '>
                          {customer?.last_flight !== null
                            ? user.lastFlight?.destinationCity
                            : '---'}
                        </p>
                        <p className='text-[10px] 360:text-sm 480:text-[16px]'>
                          {customer?.last_flight !== null
                            ? user.lastFlight?.destination
                            : '---'}
                        </p>
                      </div>
                    </div>
                  )}
                  {user.title === 'Upcoming flight' && (
                    <div className='text-light-secondary-orange flex gap-1 360:gap-3'>
                      <div>
                        <p className='font-medium text-xl 360:text-2xl 480:text-[26px] 1240:text-[26px] 1400:text-[30px] '>
                          {customer?.upcoming_flight !== null
                            ? user.upcomingFlight?.originCity
                            : '---'}
                        </p>
                        <p className='text-[10px] 360:text-sm 480:text-[16px]'>
                          {customer?.upcoming_flight !== null
                            ? user.upcomingFlight?.origin
                            : '---'}
                        </p>
                      </div>

                      <div className='pt-[10px]'>
                        <Flight
                          color='#F09436'
                          className='max-w-[130px] w-full'
                        />
                      </div>
                      <div>
                        <p className='font-medium text-xl 360:text-2xl 480:text-[26px] 1240:text-[26px] 1400:text-[30px] '>
                          {customer?.upcoming_flight !== null
                            ? user.upcomingFlight?.destinationCity
                            : '---'}
                        </p>
                        <p className='text-[10px] 360:text-sm 480:text-[16px]'>
                          {customer?.upcoming_flight !== null
                            ? user.upcomingFlight?.destination
                            : '---'}
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </Card>
    </>
  );
};
