import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/authPage/LoginPage';
import ForgotPassword from './pages/authPage/ForgotPassword';
import ResetPassword from './pages/authPage/ResetPassword';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/forgotPassword' element={<ForgotPassword />} />
          <Route path='/resetPassword' element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
