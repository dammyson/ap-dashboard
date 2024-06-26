import { AppLayout } from '../../components/layout/AppLayout';
import WelcomeMessage from '../../components/welcomeMessage';

function Customer() {
  return (
    <AppLayout logo=''>
      <div className='py-2 px-10'>
        <WelcomeMessage username='Ayo' />
      </div>
    </AppLayout>
  );
}

export default Customer;
