import { Header } from '../../components/header';
import { AppLayout } from '../../components/layout/AppLayout';
import WelcomeMessage from '../../components/welcomeMessage';

function Surveys() {
  return (
    <AppLayout logo=''>
      <div className='app-container py-2 px-10'>
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

export default Surveys;
