import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Calender } from '../svg/activityLog/ActivityLog';

export const CustomDatePicker = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  return (
    <div className='flex flex-col 768:flex-row 768:items-center 768:justify-between gap-3 768:gap-8 mt-2.5 max-w-[760px]'>
      <div className='max-w-[350px] 768:max-w-[420px] w-full relative'>
        <DatePicker
          value={startDate}
          onChange={(date) => (date ? setStartDate(date) : null)}
          maxDate={dayjs()}
          placeholder='Start'
          format='DD-MM-YYYY'
          suffixIcon={<Calender />}
        />
      </div>
      <div className='max-w-[350px] 768:max-w-[420px] w-full relative'>
        <DatePicker
          value={endDate}
          onChange={(date) => (date ? setEndDate(date) : null)}
          // minDate={startDate}
          maxDate={dayjs()}
          placeholder='End'
          format='DD-MM-YYYY'
          suffixIcon={<Calender />}
        />
      </div>
    </div>
  );
};
