import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/authPage/AuthPage';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
