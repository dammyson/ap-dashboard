import { PieChart } from 'react-minimal-pie-chart';
import { thirdOptions } from './constants';
import { ViewResult } from '@/types/types';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface props {
  results: ViewResult[];
  isloading: boolean;
}

export const SurveyResults = ({ results, isloading }: props) => {
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  return (
    <>
      {isloading ? (
        <div className='flex items-center justify-center py-6 '>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />
        </div>
      ) : (
        <div>
          {results?.map((result, i) => (
            <div key={i} className='mt-8'>
              <h3 className='text-primary-black text-base 560:text-lg 880:text-xl 960:text-2xl 1300:text-[22px] font-medium'>
                {result.question_text}
              </h3>
              <div className='flex flex-col 640:flex-row 768:items-center justify-between gap-4 pb-10 640:pb-24 border-b border-b-light-secondary-light_blue '>
                <div className='768:w-1/2 560:pl-6'>
                  {result.options.map((option, index) => {
                    return (
                      <div
                        key={index}
                        className='flex text-primary-black items-center justify-between my-5 pb-2.5 border-b border-b-light-secondary-light_blue min-w-[200px] '
                      >
                        <p>
                          Option {index + 1} - {option.option_text}
                        </p>
                        <p className='font-semibold'>{option.percentage}%</p>
                      </div>
                    );
                  })}
                </div>
                <div className='flex justify-center items-center 640:block'>
                  <PieChart
                    lineWidth={53}
                    radius={40}
                    data={result.options.map((opt) => ({
                      value: opt.percentage,
                      color: getRandomColor(),
                    }))}
                    segmentsStyle={{ cursor: 'pointer' }}
                    animate
                    startAngle={90}
                    labelStyle={{ fontSize: 5, fill: '#fff', fontWeight: 600 }}
                    labelPosition={70}
                    className='max-w-[250px] 560:max-w-[300px]'
                    label={({ dataEntry }) => `${dataEntry.value}%`}
                  >
                    <text
                      x='50%'
                      y='50%'
                      textAnchor='middle'
                      dominantBaseline='middle'
                      style={{
                        fontSize: '12px',
                        fill: '#010101',
                        fontWeight: '500',
                      }}
                    >
                      30%
                    </text>
                  </PieChart>
                </div>
              </div>
            </div>
          ))}
          <div className='mt-8'>
            <h3 className='text-primary-black text-base 560:text-lg 880:text-xl 960:text-2xl 1300:text-[22px] font-medium'>
              User by gender
            </h3>
            <div className='flex flex-col 640:flex-row 640:items-center justify-between gap-4 640:pb-10 '>
              <div className='768:w-1/2 560:pl-6'>
                {thirdOptions.map((option) => {
                  return (
                    <div className='min-w-[200px]'>
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
      )}
    </>
  );
};
