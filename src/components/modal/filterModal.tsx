import React from 'react';
import { Modal, SizeType } from '.';
import { Cancel } from '../svg/modal/Modal';
import { CustomDatePicker } from '../datePicker';
import { BorderRadius, Button, ButtonSize } from '../button';

interface Props {
  onclick: () => void;
}

export const FilterModal = ({ onclick }: Props) => {
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
            Filter By Date
          </h3>
        </div>
        <div className='w-11/12 mt-2 560:mt-4 960:mt-8'>
          <p className='font-medium text-light-grey-600 text-base 560:text-lg 960:text-xl text-start'>
            Time period
          </p>
          <div>
            <CustomDatePicker />
          </div>
        </div>
        <div className='flex justify-center items-center mt-16 '>
          <div className='w-full max-w-[300px] pb-4 grid gap-4'>
            <Button
              buttonText='Confirm'
              radius={BorderRadius.Large}
              size={ButtonSize.Medium}
              className='text-light-blue-main !font-semibold'
              onClick={() => {}}
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
