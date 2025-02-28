import { useState, useEffect, memo } from 'react';
import Button from '../components/Button';
import { useDashboardStore } from 'store/store';
import { Category } from 'types/product';

interface CategoryFormProps {
  initialCategory?: Category;
  onClose: () => void;
  onSave: (category: Category) => void;
}

const CategoryForm = ({ initialCategory, onClose, onSave }: CategoryFormProps) => {
  const { categories } = useDashboardStore();
  const [categoryName, setCategoryName] = useState(initialCategory?.name || '');
  const [image, setImage] = useState(initialCategory?.image || '');
  const [error, setError] = useState('');

  useEffect(() => {
    setCategoryName(initialCategory?.name || '');
    setImage(initialCategory?.image || '');
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
      (name) => name.toLowerCase() === trimmedName.toLowerCase() && name !== initialCategory?.name,
    );

    if (isDuplicate) {
      setError('A category with this name already exists.');
      return;
    }

    onSave({
      name: trimmedName,
      image: image.trim(),
    });

    onClose();
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-md'>
      <div className='bg-white p-6 border rounded-lg shadow-lg min-w-[300px]'>
        <h2 className='text-xl font-semibold mb-4'>{initialCategory ? 'Edit Category' : 'Add Category'}</h2>
        <span className='text-gray-700'>Category title</span>
        <input
          type='text'
          value={categoryName}
          onChange={(e) => {
            setCategoryName(e.target.value);
            if (error) setError('');
          }}
          placeholder='Enter category name'
          className={`w-full p-2 mt-1 rounded bg-gray-200 border-gray-300 text-gray-900 ${
            error ? 'border-red-500 bg-red-50' : ''
          } focus:ring focus:ring-blue-300 focus:outline-none`}
        />
        {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}

        <label className='block mt-4'>
          <span className='text-gray-700'>Image URL</span>
          <input
            type='text'
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder='Enter image URL (optional)'
            className='w-full p-2 mt-1 rounded bg-gray-200 border-gray-300 text-gray-900 focus:ring focus:ring-blue-300 focus:outline-none'
          />
        </label>

        <div className='flex justify-end gap-2 mt-4'>
          <Button text='Cancel' variant='gray' onClick={onClose} />
          <Button text={initialCategory ? 'Update' : 'Add'} variant='blue' onClick={handleSave} />
        </div>
      </div>
    </div>
  );
};

export default memo(CategoryForm);
