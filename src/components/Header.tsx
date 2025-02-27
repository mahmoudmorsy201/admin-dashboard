import { useAuthStore } from 'store/store';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { LogOut, Mail, Menu, Phone } from 'lucide-react';

const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <header className='bg-gray-900 text-white p-4 flex items-center justify-between shadow-md'>
      <div className='flex items-center gap-4'>
        <button className='md:hidden text-white text-xl focus:outline-none' onClick={toggleSidebar}>
          <Menu />
        </button>

        {user && (
          <div className='flex flex-col md:flex-row items-start md:items-center gap-3 lg:gap-6'>
            <div className='text-lg font-semibold capitalize'>
              {user.name.firstname} {user.name.lastname}
            </div>
            <div className='flex items-center gap-2 text-sm text-gray-300'>
              <Mail className='text-blue-400' size={16}/>
              <span className='truncate max-w-[150px] sm:max-w-full'>{user.email}</span>
            </div>
            <div className='flex items-center gap-2 text-sm text-gray-300'>
              <Phone className='text-green-400' size={16}/>
              <span>{user.phone}</span>
            </div>
          </div>
        )}
      </div>

      <div className='mt-3 md:mt-0 flex justify-end'>
        <Button text='Logout' variant='red' onClick={handleLogout} icon={<LogOut size={16}/>}/>
      </div>
    </header>
  );
};

export default Header;
