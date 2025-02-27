import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ErrorPage from './pages/ErrorPage';
import ProtectedRoute from './routes/ProtectedRoute';
import Main from 'pages/Main';
import { useAuthStore } from 'store/store';
import { useEffect } from 'react';

const App = () => {
  const fetchUser = useAuthStore((state) => state.fetchUser);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (token) fetchUser();
  }, [token, fetchUser]);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/error' element={<ErrorPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<Main />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
