interface welcomeMessageProps {
  username: string;
  description?: string;
}

function WelcomeMessage({ username, description }: welcomeMessageProps) {
  return (
    <div className='max-w-[389px] max-h-[98px] flex flex-col gap-1'>
      <h1 className='text-primary-black font-medium text-xl 560:text-2xl'>
        Welcome {username},
      </h1>
      <p className='text-[16px] 560:text-lg font-medium text-light-grey-600'>
        {description}
      </p>
    </div>
  );
}

export default WelcomeMessage;
