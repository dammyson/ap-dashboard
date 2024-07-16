import { PieChart } from 'react-minimal-pie-chart';
import { useNavigate } from 'react-router';
import { firstOptions, secondOptions, thirdOptions } from './constants';

export const SurveyResults = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className='mt-8'>
        <h3 className='text-primary-black text-[22px] font-medium'>
          Question 1 - How would you rate your experience?
        </h3>
        <div className='flex items-center justify-between pb-24 border-b border-b-light-secondary-light_blue'>
          <div className='w-1/2 pl-6'>
            {firstOptions.map((option, index) => {
              return (
                <div className='flex text-primary-black items-center justify-between my-5 pb-2.5 border-b border-b-light-secondary-light_blue'>
                  <p>
                    Option {index + 1} - {option.label}
                  </p>
                  <p className='font-semibold'>{option.value}%</p>
                </div>
              );
            })}
          </div>
          <div>
            <PieChart
              lineWidth={53}
              radius={40}
              data={firstOptions}
              segmentsStyle={{ cursor: 'pointer' }}
              animate
              startAngle={90}
              labelStyle={{ fontSize: 5, fill: '#fff', fontWeight: 600 }}
              labelPosition={70}
              totalValue={100}
              label={({ dataEntry }) => `${dataEntry.value}%`}
            />
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <h3 className='text-primary-black text-[22px] font-medium'>
          Question 2 - Would you recommend us?
        </h3>
        <div className='flex items-center justify-between pb-24 border-b border-b-light-secondary-light_blue'>
          <div className='w-1/2 pl-6'>
            {secondOptions.map((option, index) => {
              return (
                <div className='flex text-primary-black items-center justify-between my-5 pb-2.5 border-b border-b-light-secondary-light_blue'>
                  <p>
                    Option {index + 1} - {option.label}
                  </p>
                  <p className='font-semibold'>{option.value}%</p>
                </div>
              );
            })}
          </div>
          <div>
            <PieChart
              lineWidth={60}
              radius={40}
              segmentsShift={0.2}
              data={secondOptions}
              segmentsStyle={(index) => ({
                strokeWidth: index == 1 ? '28' : '',
                cursor: 'pointer',
              })}
              animate
              startAngle={77}
              labelStyle={{ fontSize: 8, fill: '#fff', fontWeight: 600 }}
              labelPosition={70}
              totalValue={100}
              label={({ dataEntry }) => `${dataEntry.value}%`}
            />
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <h3 className='text-primary-black text-[22px] font-medium'>
          User by gender
        </h3>
        <div className='flex items-center justify-between pb-10'>
          <div className='w-1/2 pl-6'>
            {thirdOptions.map((option, index) => {
              return (
                <>
                  <div className='flex text-primary-black items-center justify-between my-5 pb-2.5 border-b border-b-light-secondary-light_blue'>
                    <p className='font-semibold'>{option.label}</p>
                    <p className='font-semibold'>{option.value}%</p>
                  </div>
                  <p className='font-semibold pb-2.5 text-primary-black'>
                    {option.age.label}
                  </p>
                  <div>
                    {option.age.ranges.map((range) => (
                      <div className='flex items-center text-[#8E8E93] justify-between pb-2.5 border-b border-b-light-secondary-light_blue'>
                        <p>{range.label}</p>
                        <p className='font-semibold text-primary-black'>
                          {range.value}%
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              );
            })}
          </div>
          <div>
            <PieChart
              lineWidth={60}
              radius={40}
              segmentsShift={0.2}
              data={thirdOptions}
              segmentsStyle={(index) => ({
                strokeWidth: index == 1 ? '28' : '',
                cursor: 'pointer',
              })}
              animate
              startAngle={77}
              labelStyle={{ fontSize: 8, fill: '#fff', fontWeight: 600 }}
              labelPosition={70}
              totalValue={100}
              label={({ dataEntry }) => `${dataEntry.value}%`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
