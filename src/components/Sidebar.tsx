import { useDashboardStore } from 'store/store';
import Button from './Button';
import { useWindowSize } from 'utils/useWindowSize';
import { memo } from 'react';

const Sidebar = ({ isOpen, closeSidebar }: { isOpen: boolean; closeSidebar: () => void }) => {
  const { step, setStep, categories, selectedCategories, toggleCategory } = useDashboardStore();
  const { isMobile } = useWindowSize();
  return (
    <>
      {isOpen && <button className='fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden' onClick={closeSidebar} />}

      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-white p-4 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-50 md:z-auto`}
      >
        <nav>
          <ul>
            <li className='mb-2'>
              <button
                onClick={() => {
                  setStep('products');
                  closeSidebar();
                }}
                className={`block w-full text-left py-2 px-4 rounded cursor-pointer ${
                  step === 'products' ? 'bg-gray-700' : 'hover:bg-gray-700'
                }`}
              >
                Products
              </button>
            </li>
            <li className='mb-2'>
              <button
                onClick={() => {
                  setStep('categories');
                  closeSidebar();
                }}
                className={`block w-full text-left py-2 px-4 rounded cursor-pointer ${
                  step === 'categories' ? 'bg-gray-700' : 'hover:bg-gray-700'
                }`}
              >
                Categories
              </button>
            </li>
          </ul>
        </nav>

        {step === 'products' && categories.length > 0 && (
          <div className='mt-4'>
            <h3 className='text-lg font-semibold mb-2'>Filter by Category</h3>
            <div className='space-y-2'>
              {categories.map((category) => (
                <label key={category.name} className='flex items-center space-x-2'>
                  <input
                    type='checkbox'
                    checked={selectedCategories.includes(category.name)}
                    onChange={() => toggleCategory(category.name)}
                    className='w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500'
                  />
                  <span>{category.name}</span>
                </label>
              ))}
              {isMobile && (
                <Button text='Apply Filters' variant='blue' onClick={closeSidebar} className='mt-24 ml-auto' />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default memo(Sidebar);
