import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { SetStateAction } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Calender } from '../svg/activityLog/ActivityLog';

interface DateProps {
  startDate: Date | undefined;
  setStartDate: React.Dispatch<SetStateAction<Date | undefined>>;
  endDate: Date | undefined;
  setEndDate: React.Dispatch<SetStateAction<Date | undefined>>;
}

export const CustomDatePicker = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: DateProps) => {
  return (
    <div className='flex flex-col 768:flex-row 768:items-center 768:justify-between gap-3 768:gap-8 mt-2.5 max-w-[760px]'>
      <div className='max-w-[350px] 768:max-w-[420px] w-full relative'>
        <DatePicker
          value={startDate ? dayjs(startDate) : undefined}
          onChange={(date) => (date ? setStartDate(date.toDate()) : undefined)}
          maxDate={dayjs()}
          placeholder='Start'
          format='DD-MM-YYYY'
          suffixIcon={<Calender />}
        />
      </div>
      <div className='max-w-[350px] 768:max-w-[420px] w-full relative'>
        <DatePicker
          value={endDate ? dayjs(endDate) : undefined}
          onChange={(date) => (date ? setEndDate(date.toDate()) : null)}
          minDate={startDate ? dayjs(startDate) : undefined}
          maxDate={dayjs()}
          placeholder='End'
          format='DD-MM-YYYY'
          suffixIcon={<Calender />}
        />
      </div>
    </div>
  );
};
