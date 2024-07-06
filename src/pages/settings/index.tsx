import { SettingsPanel } from '../../components/settingsPanel';
import { Header } from '../../components/header';
import { AppLayout } from '../../components/layout/AppLayout';

function Settings() {
  return (
    <AppLayout logo=''>
      <div className='app-container py-2 pl-14 pr-10'>
        <Header />
        <SettingsPanel />
      </div>
    </AppLayout>
  );
}

export default Settings;
