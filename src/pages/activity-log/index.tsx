import { AppLayout } from '../../components/layout/AppLayout';
import { Header } from '../../components/header';
import WelcomeMessage from '../../components/welcomeMessage';

function ActivityLog() {
  return (
    <AppLayout logo=''>
      <div className='app-container py-2 pl-14 pr-10'>
        <Header />
        <div>
          <WelcomeMessage
            username='Ayo'
            description="Let's review today's insights"
          />
        </div>
      </div>
    </AppLayout>
  );
}

export default ActivityLog;
