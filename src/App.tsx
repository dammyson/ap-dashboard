import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/login/Login';
import ForgotPassword from './pages/auth/forgotpassword/ForgotPassword';
import ResetPassword from './pages/auth/resetpassword/ResetPassword';
import Dashboard from './pages/dashboard';
import Customer from './pages/customer';
import ActivityLog from './pages/activity-log';
import Surveys from './pages/surveys';
import Settings from './pages/settings';
import Profile from './pages/settings/profile';
import TeamMembers from './pages/settings/teamMembers';
import ChangePassword from './pages/settings/changePassword';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/customer' element={<Customer />} />
          <Route path='/activity-log' element={<ActivityLog />} />
          <Route path='/surveys' element={<Surveys />} />
          <Route path='/settings' element={<Settings />}>
            {/* Nested Routes */}
            <Route path='/settings/profile' element={<Profile />} />
            <Route path='/settings/team-members' element={<TeamMembers />} />
            <Route
              path='/settings/change-password'
              element={<ChangePassword />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
