import {
  SurveryModal,
  SurveyButtonType,
} from '../../components/modals/surveyModal';
import { Header } from '../../components/header';
import { AppLayout } from '../../components/layout/AppLayout';
import WelcomeMessage from '../../components/welcomeMessage';
import { useState } from 'react';

function Surveys() {
  const [publishModalOpen, setPublishModalOpen] = useState<boolean>(true);
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
      {publishModalOpen && (
        <SurveryModal
          isBackground
          buttonType={SurveyButtonType.PUBLISH}
          description='Are you sure you want to publish this survey?'
          subDescription='This will make the survey available for participants'
          onClick={() => setPublishModalOpen(false)}
        />
      )}
    </AppLayout>
  );
}

export default Surveys;
