import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/store';
import { AuthApi } from '../apis/authApi';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setToken } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await AuthApi.login({ username, password });

      if (!response.token) {
        throw new Error('Token not received');
      }

      setToken(response.token);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Invalid credentials');
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4'>
      <div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-sm w-full text-center'>
        <h2 className='text-2xl font-semibold text-gray-900 dark:text-white'>Welcome Back</h2>
        <p className='text-gray-600 dark:text-gray-400 mb-4'>Please enter your credentials</p>

        {error && <p className='text-red-500 text-sm'>{error}</p>}

        <div className='mt-4'>
          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white'
          />
        </div>

        <div className='mt-4'>
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white'
          />
        </div>

        <button
          onClick={handleLogin}
          className='mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition-all cursor-pointer'
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
