import { Header } from '../../components/header';
import WelcomeMessage from '../../components/welcomeMessage';
import { AppLayout } from '../../components/layout/AppLayout';

function Dashboard() {
  return (
    <AppLayout logo=''>
      <div className='app-container pl-14 pr-10'>
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

export default Dashboard;
