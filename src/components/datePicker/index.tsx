import { forwardRef, useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { Calender } from '../svg/activityLog/ActivityLog';

interface CustomInputProps {
  value?: string;
  onClick?: () => void;
  onChange?: () => void;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ value, onClick, onChange }, ref) => (
    <div className='relative'>
      <input
        ref={ref}
        value={value}
        onChange={onChange}
        onClick={onClick}
        className='!rounded-full w-full !h-11 pr-14 border !border-light-grey-800 hover:!border-light-blue-50 focus:!border-light-blue-50 focus:ring-0 focus:outline-none text-light-grey-500 text-[16px]'
      />
      <span
        className='absolute right-6 cursor-pointer top-1/2 -translate-y-1/2 custom-icon-class'
        onClick={onClick}
      >
        <Calender />
      </span>
    </div>
  ),
);

export const CustomDatePicker = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  return (
    <div className='flex flex-col 768:flex-row 768:items-center 768:justify-between gap-3 768:gap-8 mt-2.5 '>
      <div className='max-w-[350px] 768:max-w-[420px] w-full relative'>
        <DatePicker
          placeholderText='start'
          isClearable={true}
          selected={startDate}
          onChange={(date) => (date ? setStartDate(date) : null)}
          selectsStart
          startDate={startDate}
          maxDate={new Date()}
          dateFormat='dd/MM/yyyy'
          customInput={<CustomInput />}
        />
      </div>
      <div className='max-w-[350px] 768:max-w-[420px] w-full relative'>
        <DatePicker
          placeholderText='start'
          isClearable={true}
          selected={endDate}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          maxDate={new Date()}
          dateFormat='dd/MM/yyyy'
          onChange={(date) => (date ? setEndDate(date) : null)}
          customInput={<CustomInput />}
        />
      </div>
    </div>
  );
};
