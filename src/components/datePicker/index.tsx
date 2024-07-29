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
        className='!rounded-full w-full !h-11 pr-14 border !border-light-grey-800 hover:!border-light-blue-50 focus:!border-light-blue-50 focus:ring-0 focus:outline-none text-light-grey-500 text-[14px]'
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

export enum PickerType {
  START = 'start',
  END = 'end',
}

interface Props {
  type: PickerType;
}

export const CustomDatePicker = ({ type }: Props) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  return (
    <div className='relative'>
      {type == PickerType.START ? (
        <DatePicker
          selectsStart
          selected={startDate}
          startDate={startDate!}
          endDate={endDate!}
          dateFormat='dd/MM/yyyy'
          onChange={(date) => setStartDate(date)}
          customInput={<CustomInput />}
        />
      ) : type == PickerType.END ? (
        <DatePicker
          selectsEnd
          selected={endDate}
          startDate={startDate!}
          endDate={endDate!}
          minDate={startDate!}
          dateFormat='dd/MM/yyyy'
          onChange={(date) => setEndDate(date)}
          customInput={<CustomInput />}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
