import { Header } from '../../components/header';
import WelcomeMessage from '../../components/welcomeMessage';
import { AppLayout } from '../../components/layout/AppLayout';

function Dashboard() {
  return (
    <AppLayout logo=''>
      <Header />
      <div className='py-2 px-10'>
        <WelcomeMessage
          username='Ayo'
          description='Let’s review today’s insights'
        />
      </div>
    </AppLayout>
  );
}

export default Dashboard;
