import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { SetStateAction } from 'react';
import { Calender } from '../svg/activityLog/ActivityLog';
import { toast } from 'sonner';

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
  const handleStartDateChange = (date: Date | undefined) => {
    setStartDate(date);

    if (endDate && date && endDate < date) {
      setEndDate(undefined);
    }
  };

  const handleEndDateChange = (date: Date | undefined) => {
    if (startDate && date && date < startDate) {
      toast.warning('End date cannot be earlier than start date');
      return;
    }
    setEndDate(date);
  };
  return (
    <div className='flex flex-col 768:flex-row 768:items-center 768:justify-between gap-3 768:gap-8 mt-2.5 max-w-[760px]'>
      <div className='max-w-[350px] 768:max-w-[420px] w-full relative'>
        <DatePicker
          value={startDate ? dayjs(startDate) : null}
          onChange={(date) =>
            date
              ? handleStartDateChange(date.toDate())
              : setStartDate(undefined)
          }
          maxDate={dayjs()}
          placeholder='Start'
          format='DD-MM-YYYY'
          suffixIcon={<Calender />}
          allowClear={true}
        />
      </div>
      <div className='max-w-[350px] 768:max-w-[420px] w-full relative'>
        <DatePicker
          value={endDate ? dayjs(endDate) : null}
          onChange={(date) =>
            date ? handleEndDateChange(date.toDate()) : setEndDate(undefined)
          }
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
