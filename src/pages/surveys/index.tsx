import { Header } from '../../components/header';
import { AppLayout } from '../../components/layout/AppLayout';
import WelcomeMessage from '../../components/welcomeMessage';

function Surveys() {
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

export default Surveys;
