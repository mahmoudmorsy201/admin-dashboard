import { useState, useEffect } from 'react';
import Button from '../components/Button';
import { useDashboardStore } from 'store/store';

interface CategoryFormProps {
  initialCategory?: string;
  onClose: () => void;
  onSave: (categoryName: string) => void;
}

const CategoryForm = ({ initialCategory = '', onClose, onSave }: CategoryFormProps) => {
  const { categories } = useDashboardStore();
  const [categoryName, setCategoryName] = useState(initialCategory || '');
  const [error, setError] = useState('');

  useEffect(() => {
    setCategoryName(initialCategory || '');
    setError('');
  }, [initialCategory]);

  const handleSave = () => {
    const trimmedName = categoryName.trim();

    if (!trimmedName) {
      setError('Category name cannot be empty.');
      return;
    }

    const categoriesNames = categories.map((category) => category.name);

    const isDuplicate = categoriesNames.some(
      (category) => category.toLowerCase() === trimmedName.toLowerCase() && category !== initialCategory,
    );

    if (isDuplicate) {
      setError('A category with this name already exists.');
      return;
    }

    onSave(trimmedName);
    onClose();
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-6 rounded shadow-md min-w-[300px]'>
        <h2 className='text-xl font-semibold mb-4'>{initialCategory ? 'Edit Category' : 'Add Category'}</h2>

        <input
          type='text'
          value={categoryName}
          onChange={(e) => {
            setCategoryName(e.target.value);
            if (error) setError('');
          }}
          placeholder='Enter category name'
          className={`w-full p-2 border rounded mb-2 ${error ? 'border-red-500' : 'border-gray-300'}`}
        />
        {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}

        <div className='flex justify-between'>
          <Button text='Cancel' variant='gray' onClick={onClose} />
          <Button text={initialCategory ? 'Update' : 'Add'} variant='blue' onClick={handleSave} />
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
