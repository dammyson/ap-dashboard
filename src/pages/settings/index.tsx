import { SettingsPanelContent } from '../../components/settingsPanel';
import { Header } from '../../components/header';
import { AppLayout } from '../../components/layout/AppLayout';

function Settings() {
  return (
    <AppLayout logo=''>
      <div className='app-container py-2 px-10'>
        <Header />
        <SettingsPanelContent />
      </div>
    </AppLayout>
  );
}

export default Settings;
