import React from 'react';
import { BorderRadius, Button, ButtonSize } from '../button';
import { Photo } from '../svg/surveys/Surveys';
import { CircleCancel } from '../svg/settings/Settings';

interface props {
  setImagePreview: React.Dispatch<React.SetStateAction<string>>;
  imagePreview: string;
  setSurveyBanner: React.Dispatch<React.SetStateAction<File | null>>;
}

export const DragAndDrop = ({
  imagePreview,
  setImagePreview,
  setSurveyBanner,
}: props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      setSurveyBanner(selectedFile);
      const imageURL = URL.createObjectURL(selectedFile);

      setImagePreview(imageURL);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setSurveyBanner(droppedFile);

      const imageURL = URL.createObjectURL(droppedFile);
      setImagePreview(imageURL);
    }
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleRemoveImage = () => {
    setSurveyBanner(null);
    setImagePreview('');
  };

  return (
    <div onDrop={handleDrop} onDragOver={handleDragOver} className='w-full'>
      <div className='max-w-[620px] mt-10 mb-2'>
        <p className='font-medium text-xl 960:text-[26px] 1024:text-3xl text-light-grey-200 pb-2'>
          Add image/banner
        </p>
      </div>
      <div className='w-full rounded-[50px] border border-light-blue-50 flex flex-col gap-2 items-center justify-center p-10'>
        {imagePreview &&
        imagePreview !== 'https://srv575046.hstgr.cloud/storage/' ? (
          <div className='relative'>
            <div className=' w-[120px] 560:w-[200px] aspect-square 880:w-[350px] 880:h-[220px] 1240:w-[420px] 1240:h-[260px]  rounded-lg overflow-hidden'>
              <img
                src={imagePreview}
                alt='banner Image  Preview'
                className='w-full h-full object-cover'
              />
            </div>
            <div
              onClick={handleRemoveImage}
              className='absolute cursor-pointer right-[-8px] top-[-8px]  560:right-[-10px] 560:top-[-10px] 880:right-[-15px] 880:top-[-15px]'
            >
              <CircleCancel className='w-5 h-5 560:w-6 560:h-6  880:w-8 880:h-8' />
            </div>
          </div>
        ) : (
          <Photo className='w-12 h-12 640:w-14 640:h-14 960:w-16 960:h-16 1400:w-20 1400:h-20' />
        )}
        <div className='relative w-full max-w-[139px] 768:max-w-[159px] pb-4flex justify-center items-center '>
          <>
            <label
              htmlFor='bannerImage'
              className='absolute z-10 w-full h-full opacity-0 cursor-pointer'
            >
              <input
                onChange={handleChange}
                type='file'
                id='bannerImage'
                name='image'
                className='hidden'
                accept='.jpg, .png, .webp'
              />
            </label>
            <Button
              size={ButtonSize.Medium}
              radius={BorderRadius.Large}
              buttonText='Browse'
              className='!min-h-[30px] max-h-[35px] !text-[14px] 768:!text-base 768:!min-h-[40px] 960:!min-h-[44px]'
              onClick={() => {}}
            />
          </>
        </div>
        <p className='text-[#8E8E93] text-center 560:text-start text-base 768:text-lg 1240:text-xl font-normal'>
          Drag and drop a file here
        </p>
        <p className='text-light-primary-deep_black text-base text-center 560:text-start 768:text-lg 1240:text-xl font-medium'>
          File supported .png, .jpg & .webp
        </p>
      </div>
    </div>
  );
};
