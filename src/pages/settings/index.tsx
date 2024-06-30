import CatergoryHeader from '../../components/settings-catergory-header';
import { Header } from '../../components/header';
import { AppLayout } from '../../components/layout/AppLayout';

function Settings() {
  return (
    <AppLayout logo=''>
      <div className='app-container py-2 px-10'>
        <Header />
        <CatergoryHeader title='Profile' />
      </div>
    </AppLayout>
  );
}

export default Settings;
