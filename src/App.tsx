import { useState } from 'react';
import { Email, Padlock, SlashedEye } from './components/svg/auth/AuthIcons';
import { Input, InputState } from './components/input';
import { BorderRadius, Button, ButtonSize } from './components/button';

function App() {
  const [count, setCount] = useState(0);
  const [hasError, setHasError] = useState(false);

  return (
    <div className='grid p-10 border-2 place-items-center rounded-xl bg-light-primary-transparent'>
      <div className='max-w-[700px] mx-auto'>
        <Input
          state={hasError ? InputState.ERROR : InputState.Success}
          label='Email'
          placeHolder='Email Address'
          inputSize='large'
          leadingIcon={<Email />}
          isCurved
          helper={'Enter the correct email address.'}
        />

        <Input
          state={InputState.NORMAL}
          label='Email'
          placeHolder='Password'
          inputSize='large'
          leadingIcon={<Padlock />}
          trailingIcon={<SlashedEye />}
          isCurved
          type='password'
        />
        <Button
          buttonText='Log in'
          radius={BorderRadius.Large}
          className='mt-8 font-bold'
          size={ButtonSize.Large}
          mode='solid'
        />
      </div>
    </div>
  );
}

export default App;
