import clsx from 'clsx';
import { useState } from 'react';
import { NotificationsType } from '@/types/types';
import bird from '@/assets/logos/colored_Bird_Logo.png';
import { Bin, Cancel } from '../svg/modal/Modal';
import { BorderRadius, Button, ButtonSize } from '../button';
import { Modal, SizeType } from '../modal';
import { Dot } from '../svg/dashboard/Dashboard';
import { useWindowSize } from '../hooks/useWindowSize';

interface Props {
  showUi: boolean;
  setShowUi: React.Dispatch<React.SetStateAction<boolean>>;
  message: NotificationsType[];
  setMessage: React.Dispatch<React.SetStateAction<NotificationsType[]>>;
}

const NotificationUi = ({ showUi, setShowUi, message, setMessage }: Props) => {
  const [selected, setSelected] = useState<NotificationsType | null>(null);
  const [viewMessage, setViewMessage] = useState(false);
  const isWindowSize = useWindowSize(640);
  const openModal = (record: NotificationsType) => {
    setSelected(record);
    setViewMessage(true);
  };
  const closeModal = () => {
    setSelected(null);
    setViewMessage(false);
  };

  const handleOpenMessage = (id: number, option: NotificationsType) => {
    setMessage((prevMessages) =>
      prevMessages.map((message) =>
        message.id === id + 1 ? { ...message, isRead: true } : message,
      ),
    );
    openModal(option);
  };
  return (
    <div>
      <div
        className={clsx(
          showUi ? 'active' : 'inactive',
          'fixed z-10 inset-0 w-full h-dvh bg-primary-white text-base 768:text-lg 960:text-xl  text-light-primary-black pt-5 cursor-default',
        )}
      >
        <div className='flex flex-col items-center justify-center'>
          <h3 className='text-light-primary-deep_black text-xl 768:text-2xl 960:text-[28px] 1240:text-[32px] font-semibold mb-4 768:mb-6 1400:mb-10 pt-5 960:pt-0'>
            Notifications
          </h3>
          <span
            onClick={(e) => {
              e.stopPropagation(), setShowUi(false);
            }}
            className={clsx(
              'right-8 top-5 960:right-11 960:top-11 absolute cursor-pointer z-10',
            )}
          >
            <Cancel />
          </span>
          <div className='h-full max-h-[75dvh] w-full  overflow-y-scroll custom-scrollbar hide-arrows pb-4 px-3 425:px-0 '>
            {message.map((option, i) => {
              return (
                <div className='flex items-center justify-center gap-2 1024:gap-4'>
                  <span className='w-3 h-3'>
                    <Dot
                      className={clsx(
                        option.isRead && 'hidden',
                        'text-light-secondary-bright_blue mt-4',
                      )}
                    />
                  </span>
                  <div
                    onClick={() => handleOpenMessage(i, option)}
                    className={clsx(
                      'mt-6 bg-primary-white shadow-default rounded-[20px] p-3 880:p-6 flex items-center justify-center gap-4 w-full max-w-[80%] hover:bg-[#f2f2f2] hover:transition-all hover:duration-500 cursor-pointer',
                    )}
                  >
                    <div className='w-14'>
                      <img src={bird} alt='' />
                    </div>
                    <p
                      key={i}
                      className={clsx(
                        option.isRead && 'font-normal',
                        ' text-light-primary-deep_black font-medium 640:p-4 hover:bg-[#f2f2f2] hover:transition-all hover:duration-500 w-full max-w-[90%]',
                      )}
                    >
                      {isWindowSize
                        ? `${option.key.trim().slice(0, 60)}...`
                        : `${option.key.trim().slice(0, 100)}...`}

                      <span
                        className={clsx(
                          option.isRead && 'font-normal',
                          'block 640:hidden pt-2 text-light-grey-100 font-medium italic text-nowrap',
                        )}
                      >
                        {option.time}
                      </span>
                    </p>

                    <p
                      className={clsx(
                        option.isRead && 'font-normal',
                        'hidden 640:block text-light-grey-100 font-medium italic text-nowrap',
                      )}
                    >
                      {option.time}
                    </p>
                  </div>

                  <span onClick={() => {}} className='p-2'>
                    <Bin
                      fill='#e03939'
                      className='!w-[28px] !h-[28px] cursor-pointer mt-6'
                    />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className='flex justify-center items-center mt-4 px-5 '>
          <div className='w-full max-w-[447px]'>
            <Button
              buttonText='Delete all'
              radius={BorderRadius.Large}
              size={ButtonSize.Large}
              className='text-light-blue-main !font-semibold 768:!text-xl !min-h-[50px] 1024:!min-h-[57px] 1300:!min-h-[66px]'
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
      {selected && viewMessage && (
        <Modal
          isCentered
          cancelIcon={<Cancel />}
          isBackground
          size={SizeType.MEDIUM}
          onClick={() => closeModal()}
        >
          <div className='font-normal text-lg 768:text-[22px] mt-2 768:mt-4 mb-5 768:mb-9 text-light-primary-deep_black'>
            <p className='text-base 768:text-lg font-medium'>{selected.key}</p>
          </div>
          <div className='w-full max-w-[300px] 880:max-w-[380px]'>
            <Button
              size={ButtonSize.Medium}
              radius={BorderRadius.Large}
              buttonText='Close'
              onClick={() => closeModal()}
              className='!font-semibold !text-[17px] 1240:!text-[20px] !min-h-[50px] 1024:!min-h-[57px] '
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default NotificationUi;
