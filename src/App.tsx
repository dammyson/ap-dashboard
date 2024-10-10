import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/AppContext';
import { Toaster } from 'sonner';
import AppRoutes from './routes/AppRoutes';
import { useEffect, useState } from 'react';
import { NoConnection } from './components/noConnection/noConnection';

const App = () => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (!isOnline) {
      interval = setInterval(() => {
        setIsOnline(navigator.onLine);
      }, 30000);
    }

    return () => clearInterval(interval);
  }, [isOnline]);

  return (
    <div>
      {!isOnline ? (
        <NoConnection onClick={() => {}} />
      ) : (
        <>
          <UserProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </UserProvider>
          <Toaster richColors duration={3000} position='top-right' />
        </>
      )}
    </div>
  );
};

export default App;
