import { Modal, SizeType } from '.';
import { BorderRadius, Button, ButtonSize } from '../button';
import { Cancel } from '../svg/modal/Modal';
import { Spinner } from '../svg/spinner/Spinner';
import { NoticeIcon } from '../svg/surveys/Surveys';

interface Props {
  setEndActiveSurvey: (value: React.SetStateAction<boolean>) => void;
  isDeactivating: boolean;
  handleDeactivate: () => Promise<void>;
}

export const DeactivateSurvey = ({
  setEndActiveSurvey,
  isDeactivating,
  handleDeactivate,
}: Props) => {
  return (
    <Modal
      isBackground
      isCentered
      cancelIcon={<Cancel />}
      size={SizeType.MEDIUM}
      onClick={() => setEndActiveSurvey(false)}
    >
      <NoticeIcon className='w-16 h-16 880:w-20 880:h-20 ' />
      <div className='pb-5 max-w-[460px] 880:max-w-[560px] text-lg 880:text-[22px] mb-2 mt-2 560:my-3 880:mt-5 text-light-primary-deep_black'>
        A survey is currently active would you like to deactivate and publish
        this survey?
      </div>
      <div className='w-full max-w-[300px] 880:max-w-[380px]'>
        <Button
          size={ButtonSize.Medium}
          radius={BorderRadius.Large}
          buttonText={
            isDeactivating ? (
              <Spinner className='text-white w-5 h-5 768:w-7 768:h-7' />
            ) : (
              'Deactivate and Publish'
            )
          }
          onClick={handleDeactivate}
          className='!font-semibold !text-[17px] mb-5'
        />
        <Button
          size={ButtonSize.Medium}
          radius={BorderRadius.Large}
          mode='outlined'
          buttonText='Cancel'
          onClick={() => setEndActiveSurvey(false)}
          className='!font-semibold !text-[17px]'
        />
      </div>
    </Modal>
  );
};
