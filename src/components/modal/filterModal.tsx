import React, { SetStateAction } from 'react';
import { Modal, SizeType } from '.';
import { Cancel } from '../svg/modal/Modal';
import { CustomDatePicker } from '../datePicker';
import { BorderRadius, Button, ButtonSize } from '../button';
import { Input } from '../input';
import { Spinner } from '../svg/spinner/Spinner';

interface Props {
  loading: boolean;
  header: string;
  byInput?: boolean;
  byDate?: boolean;
  value?: string;
  startDate: Date | undefined;
  setStartDate: React.Dispatch<SetStateAction<Date | undefined>>;
  endDate: Date | undefined;
  setEndDate: React.Dispatch<SetStateAction<Date | undefined>>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFilter: () => Promise<void>;
  onclick: () => void;
}

export const FilterModal = ({
  loading,
  header,
  byInput,
  byDate,
  value,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onChange,
  handleFilter,
  onclick,
}: Props) => {
  return (
    <Modal
      isBackground
      size={SizeType.SMALL}
      cancelIcon={<Cancel />}
      onClick={onclick}
    >
      <div className='max-w-[890px] w-full grid it'>
        <div className='flex items-center justify-center'>
          <h3 className='text-light-primary-deep_black text-lg 560:text-xl 768:text-2xl 960:text-[28px] 1240:text-[32px] font-medium text-center w-[85%] 960:w-3/4 pt-4 880:pt-0'>
            Filter {header}
          </h3>
        </div>
        {byInput && (
          <div className='w-11/12 mt-2 560:mt-4 960:mt-8'>
            <p className='font-medium text-light-grey-600 text-base 560:text-lg 960:text-xl text-start mb-2'>
              Survey Title
            </p>
            <div>
              <Input
                isCurved
                hasBorder
                inputSize='small'
                value={value}
                onChange={onChange}
              />
            </div>
          </div>
        )}
        {byDate && (
          <div className='w-11/12 mt-2 560:mt-4 960:mt-8'>
            <p className='font-medium text-light-grey-600 text-base 560:text-lg 960:text-xl text-start'>
              Time period
            </p>
            <div>
              <CustomDatePicker
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
              />
            </div>
          </div>
        )}

        <div className='flex justify-center items-center mt-16 '>
          <div className='w-full max-w-[300px] pb-4 grid gap-4'>
            <Button
              buttonText={
                loading ? (
                  <Spinner className='text-white w-5 h-5 768:w-7 768:h-7' />
                ) : (
                  'Confirm'
                )
              }
              radius={BorderRadius.Large}
              size={ButtonSize.Medium}
              className='text-light-blue-main !font-semibold'
              onClick={handleFilter}
            />
            <Button
              buttonText='Cancel'
              radius={BorderRadius.Large}
              size={ButtonSize.Medium}
              mode='outlined'
              className='text-light-blue-main !font-semibold '
              onClick={onclick}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
