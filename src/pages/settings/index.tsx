<<<<<<< HEAD
import CatergoryHeader from '../../components/settings-catergory-header';
=======
import { SettingsPanelContent } from '../../components/settingsPanel';
>>>>>>> main
import { Header } from '../../components/header';
import { AppLayout } from '../../components/layout/AppLayout';

function Settings() {
  return (
    <AppLayout logo=''>
      <div className='app-container py-2 px-10'>
        <Header />
<<<<<<< HEAD
        <CatergoryHeader title='Profile' />
=======
        <SettingsPanelContent />
>>>>>>> main
      </div>
    </AppLayout>
  );
}

export default Settings;
