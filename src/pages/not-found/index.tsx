import { BorderRadius, Button, ButtonSize } from '@/components/button';
import { useNavigate } from 'react-router';

interface props {
  isAuthenticated: boolean;
}

export const Notfound = ({ isAuthenticated }: props) => {
  const navigate = useNavigate();
  return (
    <div className=' w-[90%] mx-auto grid place-content-center h-svh'>
      <div className=' text-center w-full flex flex-col justify-center items-center'>
        <p className='text-gradient font-bold text-7xl 560:text-8xl 960:text-9xl 1240:text-[150px]'>
          Oops!
        </p>

        <h2 className='text-light-primary-deep_black text-center text-lg 560:text-xl 960:text-2xl 1240:text-3xl my-3 font-bold'>
          404 - PAGE NOT FOUND
        </h2>
        <p className=' w-full max-w-[400px] 560:max-w-[450px] 960:max-w-[500px] 1240:max-w-[640px] text-light-primary-deep_black font-medium text-base 960:text-lg 1240:text-[22px] '>
          Sorry, We couldn't find this page.
        </p>
        <div className='w-full max-w-[250px] grid items-center mt-8 960:mt-12 960:mb-[80px]'>
          <Button
            buttonText={isAuthenticated ? 'Back to dashboard' : 'Back to login'}
            size={ButtonSize.Medium}
            radius={BorderRadius.Large}
            className='960:!text-xl !min-h-[40px] 960:!min-h-[50px] font-semibold'
            onClick={() => {
              isAuthenticated ? navigate('/dashboard') : navigate('/');
            }}
          />
        </div>
      </div>
    </div>
  );
};
