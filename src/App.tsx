import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/login/Login';
import ForgotPassword from './pages/auth/forgotpassword/ForgotPassword';
import ResetPassword from './pages/auth/resetpassword/ResetPassword';
import Dashboard from './pages/dashboard';
import Customer from './pages/customer';
import ActivityLog from './pages/activity-log';
import Surveys from './pages/surveys';
import Settings from './pages/settings';
import CustomerFeedback from './pages/surveys/customerFeedback';
import EditSurvey from './pages/surveys/editSurvey';
import CreateSurvey from './pages/surveys/createSurvery';
import ViewCustomer from './pages/customer/viewCustomer';

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
          <Route
            path='/customer-view/:titleId/:nameId'
            element={<ViewCustomer />}
          />
          <Route path='/activity-log' element={<ActivityLog />} />
          <Route path='/surveys' element={<Surveys />} />
          <Route path='/surveys-feedback/:id' element={<CustomerFeedback />} />
          <Route path='/surveys-edit/:id' element={<EditSurvey />} />
          <Route path='/surveys-create/:id' element={<CreateSurvey />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
