import { AirplaneMode } from '../svg/noConnection';
import { BorderRadius, Button, ButtonSize } from '../button';
interface props {
  onClick: () => void;
}

export const NoConnection = ({ onClick }: props) => {
  return (
    <div className=' w-[90%] mx-auto grid place-content-center h-svh'>
      <div className=' text-center w-full flex flex-col justify-center items-center'>
        <div className='grid place-content-center'>
          <AirplaneMode className='w-[130px] h-[130px] 560:w-[160px] 560:h-[160px]  960:w-[180px] 960:h-[180px] 1240:w-[200px] 1240:h-[200px] ' />
        </div>

        <h2 className='text-light-primary-deep_black text-center text-xl 560:text-2xl 960:text-3xl 1240:text-4xl my-5'>
          <span className='text-gradient font-bold'>Uh-oh!</span>
          <span className='font-bold'> You are offline</span>
        </h2>
        <p className=' w-full max-w-[400px] 560:max-w-[450px] 960:max-w-[500px]  1240:max-w-[640px] text-light-primary-deep_black font-medium text-[16px] 560:text-lg 960:text-xl 1240:text-2xl '>
          It looks like your connection is down, please check your internet
        </p>
        <div className='w-full max-w-[250px] grid items-center mt-16 960:mt-20 960:mb-[80px]'>
          <Button
            buttonText='Refresh'
            size={ButtonSize.Medium}
            radius={BorderRadius.Large}
            className='960:!text-xl 1240:!text-2xl !min-h-[40px] 960:!min-h-[50px] font-semibold'
            onClick={onClick}
          />
        </div>
      </div>
    </div>
  );
};
