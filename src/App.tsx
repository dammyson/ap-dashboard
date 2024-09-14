import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/AppContext';
import { Toaster } from 'sonner';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  return (
    <div>
      <UserProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </UserProvider>
      <Toaster richColors duration={3000} position='top-right' />
    </div>
  );
};

export default App;
