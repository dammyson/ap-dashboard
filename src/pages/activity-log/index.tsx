import { AppLayout } from '../../components/layout/AppLayout';
import WelcomeMessage from '../../components/welcomeMessage';

function ActivityLog() {
  return (
    <AppLayout logo=''>
      <div className='py-2 px-10'>
        <WelcomeMessage
          username='Ayo'
          description='Let’s review today’s insights'
        />
      </div>
    </AppLayout>
  );
}

export default ActivityLog;
