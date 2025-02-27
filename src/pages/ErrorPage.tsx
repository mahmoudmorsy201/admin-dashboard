import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className='flex h-screen items-center justify-center bg-gray-100 px-6'>
      <div className='max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center'>
        <AlertTriangle className='mx-auto text-red-500 w-16 h-16 mb-4' />

        <h1 className='text-3xl font-bold text-gray-800'>Unauthorized Access</h1>
        <p className='text-gray-600 mt-2'>You do not have permission to view this page. Please log in to continue.</p>

        <button
          onClick={() => navigate('/')}
          className='mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 cursor-pointer'
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
