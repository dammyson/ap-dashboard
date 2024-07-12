import { BorderRadius, Button, ButtonSize } from '@/components/button';
import { Card } from '@/components/card';
import { Input } from '@/components/input';
import { PanelNavigationItem } from '@/components/Panel';
import { RoleOption } from '@/components/profileForm';
import { SearchSelect } from '@/components/searchSelect';
import { CircledPlus, Photo, SmallBin } from '@/components/svg/surveys/Surveys';

function EditSurvey({}) {
  const SurveyQuestions: PanelNavigationItem[] = [
    { title: 'Question', id: 'question ' },
    { title: 'Option format', id: 'option format' },
  ];

  const OtherList: PanelNavigationItem[] = [
    { title: 'Duration of survey', id: 'duration of survey ' },
    { title: 'Points awarded (optional)', id: 'points awarded (optional)' },
  ];

  const Options: RoleOption[] = [
    { label: '5 Minutes', value: '5 Minutes' },
    { label: '10 Minutes', value: '10 Minutes' },
    { label: '15 Minutes', value: '15 Minutes' },
  ];

  const AwardOptions: RoleOption[] = [
    { label: '20 Points', value: '20 points' },
    { label: '30 Points', value: '30 points' },
    { label: '40 Points', value: '40 points' },
  ];

  return (
    <div className='grid'>
      <Card
        hasHeader
        hasBadge
        hasBorder
        className='!border-b-light-secondary-light_blue'
        title='Edit survey: In-flight experience'
      >
        <>
          <div className='max-w-[620px] mt-10 mb-2'>
            <p className='font-medium text-3xl text-light-grey-200 pb-2'>
              Title of the survey
            </p>
            <Input
              placeHolder='Enter title of the survey'
              isCurved
              hasBorder
              className='!border-light-blue-50 !drop-shadow-none placeholder:text-[#1C1C1E]'
            />
          </div>
        </>
      </Card>

      <Card
        hasHeader
        hasBadge
        hasBorder
        className='!border-b-light-secondary-light_blue'
        title='Add survey question'
      >
        <div className='relative grid grid-cols-[minmax(250px,480px)_minmax(250px,480px)] justify-between gap-5'>
          {SurveyQuestions.map((item) => (
            <>
              <div className='max-w-[620px] mt-10 mb-2'>
                <p className='font-medium text-3xl text-light-grey-200 pb-2'>
                  {item.title}
                </p>
                {item.id === 'option format' ? (
                  <Input
                    placeHolder='Check boxes'
                    isCurved
                    hasBorder
                    className='!border-light-blue-50 !drop-shadow-none placeholder:text-[#1C1C1E]'
                  />
                ) : (
                  <Input
                    placeHolder='Enter title of the survey'
                    isCurved
                    hasBorder
                    className='!border-light-blue-50 !drop-shadow-none placeholder:text-[#1C1C1E]'
                  />
                )}
              </div>
            </>
          ))}

          <div className='font-normal text-xl text-[#1C1C1E]'>
            <div className='flex items-center gap-3 pt-3 '>
              <input
                type='checkbox'
                className='w-8 h-8 border-2 border-[#C7C7CC] rounded-[4px]'
              />
              <span className=' w-full py-3 border-b border-b-[#C7C7CC] font-normal '>
                Excellent
              </span>
            </div>
            <div className='flex items-center gap-3 pt-3'>
              <input
                type='checkbox'
                className='w-8 h-8 border-2 border-[#C7C7CC] rounded-[4px]'
              />
              <span className=' w-full py-3 border-b border-b-[#C7C7CC]'>
                Option 2
              </span>
            </div>
          </div>

          <div className='flex items-start gap-3 font-semibold text-light-blue-main'>
            <div className='flex gap-2 items-center justify-start'>
              <CircledPlus />
              <span>Add option</span>
            </div>
            <div className='flex gap-2 items-center justify-start'>
              <SmallBin />
              <span>Remove option</span>
            </div>
          </div>

          <div
            className=' absolute bottom-0 right-0
          flex gap-2 items-center justify-start font-semibold text-[#B0B0B0]'
          >
            <CircledPlus color='#B0B0B0' />
            <span>Add option</span>
          </div>
        </div>
      </Card>

      <Card
        hasHeader
        hasBadge
        hasBorder
        className='!border-b-light-secondary-light_blue'
        title='Others'
      >
        <>
          <div className='grid grid-cols-[minmax(250px,480px)_minmax(250px,480px)] justify-between gap-5'>
            {OtherList.map((item) => (
              <>
                <div className='max-w-[620px] mt-10 mb-2'>
                  <p className='font-medium text-3xl text-light-grey-200 pb-2'>
                    {item.title}
                  </p>
                  {item.id === 'points awarded (optional)' ? (
                    <SearchSelect options={AwardOptions} />
                  ) : (
                    <SearchSelect options={Options} />
                  )}
                </div>
              </>
            ))}
          </div>
          <div className='w-full'>
            <div className='max-w-[620px] mt-10 mb-2'>
              <p className='font-medium text-3xl text-light-grey-200 pb-2'>
                Add image/banner
              </p>
            </div>
            <div className='w-full rounded-[50px] border border-light-blue-50 flex flex-col gap-2 items-center justify-center p-10'>
              <Photo />
              <div className=' w-full max-w-[159px] pb-4'>
                <Button
                  size={ButtonSize.Medium}
                  radius={BorderRadius.Large}
                  buttonText='Browse'
                  onClick={() => {}}
                />
              </div>
              <p className='text-[#8E8E93] text-xl font-normal'>
                Drag and drop a file here
              </p>
              <p className='text-[#1C1C1E] text-xl font-medium'>
                File supported .png, .jpg & .webp
              </p>
            </div>
          </div>
          <div className='flex items-center justify-center mt-16 mb-8'>
            <div className='grid w-full max-w-[400px] gap-4 '>
              <Button
                size={ButtonSize.Large}
                radius={BorderRadius.Large}
                buttonText='Schedule for later'
                onClick={() => {}}
              />
              <Button
                size={ButtonSize.Large}
                radius={BorderRadius.Large}
                mode='outlined'
                buttonText='Save and publish'
                onClick={() => {}}
              />
            </div>
          </div>
        </>
      </Card>
    </div>
  );
}
export default EditSurvey;
