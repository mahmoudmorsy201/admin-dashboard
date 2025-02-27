import Sidebar from 'components/Sidebar';
import Header from 'components/Header';
import Products from './Products';
import Categories from './Categories';
import { useAuthStore, useDashboardStore } from 'store/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductDetails from './ProductDetails';

const dashboardStepConfig: { [key: string]: React.ReactNode } = {
  products: <Products />,
  categories: <Categories />,
  productDetails: <ProductDetails />,
} as const;

const Main = () => {
  const { step } = useDashboardStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleBackNavigation = () => {
      if (location.pathname === '/dashboard') {
        logout();
        navigate('/', { replace: true });
      }
    };

    window.addEventListener('popstate', handleBackNavigation);
    return () => window.removeEventListener('popstate', handleBackNavigation);
  }, [location, navigate, logout]);

  return (
    <div className='flex min-h-screen'>
      <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />

      <div className='flex-1'>
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className='flex-1'>{dashboardStepConfig[step]}</div>
      </div>
    </div>
  );
};

export default Main;
