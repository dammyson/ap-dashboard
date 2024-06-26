import WelcomeMessage from '../../components/welcomeMessage';
import { AppLayout } from '../../components/layout/AppLayout';

function Dashboard() {
  return (
    <AppLayout logo=''>
      <div className='py-2 px-10'>
        <WelcomeMessage username='Ayo' />
      </div>
    </AppLayout>
  );
}

export default Dashboard;
