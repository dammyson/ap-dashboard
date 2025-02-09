import { Routes, Route } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import Login from '@/pages/auth/login/Login';
import ForgotPassword from '@/pages/auth/forgotpassword/ForgotPassword';
import ResetPassword from '@/pages/auth/resetpassword/ResetPassword';
import Dashboard from '@/pages/dashboard';
import Customer from '@/pages/customer';
import ViewCustomer from '@/pages/customer/viewCustomer';
import ActivityLog from '@/pages/activity-log';
import Surveys from '@/pages/surveys';
import EditSurvey from '@/pages/surveys/editSurvey';
import CreateSurvey from '@/pages/surveys/createSurvery';
import Settings from '@/pages/settings';
import { useUser } from '@/context/AppContext';
import ProtectedRoutes from './PrivateRoutes';
import ViewResult from '@/pages/surveys/viewResult';
import { Notfound } from '@/pages/not-found';

const AppRoutes = () => {
  const { token } = useUser();

  return (
    <Routes>
      <Route element={<PublicRoutes isAuthenticated={token ? true : false} />}>
        <Route path='/' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
      </Route>
      <Route
        element={<ProtectedRoutes isAuthenticated={token ? true : false} />}
      >
        <Route path='/dashboard' element={<Dashboard />} />

        <Route path='/customer' element={<Customer />} />
        <Route path='/customer-view/:id' element={<ViewCustomer />} />
        <Route path='/activity-log' element={<ActivityLog />} />
        <Route path='/surveys' element={<Surveys />} />
        <Route
          path='/surveys-view-result/:titleId/:surveyId'
          element={<ViewResult />}
        />
        <Route
          path='/surveys-edit/:titleId/:surveyId'
          element={<EditSurvey />}
        />
        <Route path='/surveys-create/:id' element={<CreateSurvey />} />
        <Route path='/settings' element={<Settings />} />
      </Route>
      <Route
        path='*'
        element={<Notfound isAuthenticated={token ? true : false} />}
      />
    </Routes>
  );
};

export default AppRoutes;
