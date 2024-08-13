import { PieChart } from 'react-minimal-pie-chart';
import { firstOptions, secondOptions, thirdOptions } from './constants';

export const SurveyResults = () => {
  return (
    <div>
      <div className='mt-8'>
        <h3 className='text-primary-black text-base 560:text-lg 880:text-xl 960:text-2xl 1300:text-[22px] font-medium'>
          Question 1 - How would you rate your experience?
        </h3>
        <div className='flex flex-col 640:flex-row 768:items-center justify-between gap-4 pb-10 640:pb-24 border-b border-b-light-secondary-light_blue '>
          <div className='768:w-1/2 pl-6'>
            {firstOptions.map((option, index) => {
              return (
                <div className='flex text-primary-black items-center justify-between my-5 pb-2.5 border-b border-b-light-secondary-light_blue min-w-[200px] '>
                  <p>
                    Option {index + 1} - {option.label}
                  </p>
                  <p className='font-semibold'>{option.value}%</p>
                </div>
              );
            })}
          </div>
          <div className='flex justify-center items-center 640:block'>
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
              className='max-w-[250px] 560:max-w-[300px]'
              label={({ dataEntry }) => `${dataEntry.value}%`}
            />
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <h3 className='text-primary-black text-base 560:text-lg 880:text-xl 960:text-2xl 1300:text-[22px] font-medium'>
          Question 2 - Would you recommend us?
        </h3>
        <div className='flex flex-col 640:flex-row 640:items-center justify-between gap-4 pb-10 640:pb-24 border-b border-b-light-secondary-light_blue'>
          <div className='768:w-1/2 pl-6'>
            {secondOptions.map((option, index) => {
              return (
                <div className='flex text-primary-black items-center justify-between my-5 pb-2.5 border-b border-b-light-secondary-light_blue min-w-[200px]'>
                  <p>
                    Option {index + 1} - {option.label}
                  </p>
                  <p className='font-semibold'>{option.value}%</p>
                </div>
              );
            })}
          </div>
          <div className='flex justify-center items-center 640:block'>
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
              className='max-w-[250px] 560:max-w-[300px]'
              label={({ dataEntry }) => `${dataEntry.value}%`}
            />
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <h3 className='text-primary-black text-base 560:text-lg 880:text-xl 960:text-2xl 1300:text-[22px] font-medium'>
          User by gender
        </h3>
        <div className='flex flex-col 640:flex-row 640:items-center justify-between gap-4 640:pb-10 '>
          <div className='768:w-1/2 pl-6'>
            {thirdOptions.map((option) => {
              return (
                <div className='min-w-[200px] '>
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
                </div>
              );
            })}
          </div>
          <div className='flex justify-center items-center 640:block'>
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
              className='max-w-[250px] 560:max-w-[300px]'
              label={({ dataEntry }) => `${dataEntry.value}%`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
