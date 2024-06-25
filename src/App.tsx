import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/login/Login';
import ForgotPassword from './pages/auth/forgotpassword/ForgotPassword';
import ResetPassword from './pages/auth/resetpassword/ResetPassword';
import Overview from './pages/overview';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/overview' element={<Overview />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
