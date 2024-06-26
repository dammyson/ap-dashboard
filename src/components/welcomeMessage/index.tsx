interface welcomeMessageProps {
  username: string;
}

function WelcomeMessage({ username }: welcomeMessageProps) {
  return (
    <div className='max-w-[389px] max-h-[98px] flex flex-col gap-1'>
      <h1 className='text-primary-black font-medium text-2xl'>
        Welcome {username},
      </h1>
      <p className='text-lg font-medium text-light-grey-600'>
        Let’s review today’s insights
      </p>
    </div>
  );
}

export default WelcomeMessage;
