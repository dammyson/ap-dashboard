import clsx from 'clsx';
import { BorderRadius, Button, ButtonSize } from '../../../components/button';
import { useEffect, useRef } from 'react';

export enum SurveyButtonType {
  PUBLISH = 'publish',
  UNPUBLISH = 'unpublish',
  DELETE = 'delete',
}

interface SurveyModalProps {
  isBackground?: boolean;
  buttonType: SurveyButtonType;
  description?: string;
  subDescription?: string;
  onClick: () => void;
}
export const SurveryModal = ({
  isBackground,
  buttonType,
  description,
  subDescription,
  onClick,
}: SurveyModalProps) => {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeBackground = (e: MouseEvent) => {
      if (e.target === backgroundRef.current && isBackground) onClick();
    };

    document.addEventListener('click', closeBackground);

    return () => {
      document.removeEventListener('click', closeBackground);
    };
  });

  return (
    <div
      ref={backgroundRef}
      className={clsx(
        isBackground ? 'bg-[#00000033]' : '',
        'fixed z-10 inset-0 w-full h-lvh flex items-center justify-center',
      )}
    >
      <div className='w-full max-w-[717px] h-[354px] rounded-[20px] bg-primary-white flex flex-col items-center justify-center px-8 pt-7 text-center drop-shadow-2xl'>
        {description && (
          <p className='font-semibold text-[22px] mb-4'>{description}</p>
        )}
        {subDescription && (
          <p className='pb-11 text-[17px]'>{subDescription}</p>
        )}
        {buttonType === SurveyButtonType.PUBLISH ? (
          <div className='w-full max-w-[380px]'>
            <Button
              size={ButtonSize.Medium}
              radius={BorderRadius.Large}
              buttonText='Publish'
              onClick={() => {}}
              className='mb-5 !font-semibold !text-[17px]'
            />
          </div>
        ) : buttonType === SurveyButtonType.UNPUBLISH ? (
          <div className='w-full max-w-[380px]'>
            <Button
              size={ButtonSize.Medium}
              radius={BorderRadius.Large}
              buttonText='Unpublish'
              onClick={() => {}}
              className='mb-5 !font-semibold !text-[17px]'
            />
          </div>
        ) : buttonType === SurveyButtonType.DELETE ? (
          <div className='w-full max-w-[380px]'>
            <Button
              size={ButtonSize.Medium}
              radius={BorderRadius.Large}
              buttonText='Delete'
              onClick={() => {}}
              className='mb-5 !font-semibold !text-[17px]'
            />
          </div>
        ) : (
          <></>
        )}
        <div className='w-full max-w-[380px]'>
          <Button
            size={ButtonSize.Medium}
            radius={BorderRadius.Large}
            mode='outlined'
            buttonText='Cancel'
            onClick={onClick}
            className='!font-semibold !text-[17px] '
          />
        </div>
      </div>
    </div>
  );
};
