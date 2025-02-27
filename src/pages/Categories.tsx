import { useState } from 'react';
import Button from '../components/Button';
import { useDashboardStore } from 'store/store';
import CategoryForm from 'components/CategoryForm';
import ConfirmDialog from 'components/ConfirmDialog';
import { Pencil, Plus, Trash2 } from 'lucide-react';

const Categories = () => {
  const { categories, addCategory, updateCategory, deleteCategory } = useDashboardStore();

  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSave = (newCategoryName: string) => {
    if (editingCategory && editingCategory !== newCategoryName) {
      updateCategory(editingCategory, newCategoryName);
    } else if (!editingCategory) {
      addCategory(newCategoryName);
    }
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  return (
    <div className='mx-auto p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Categories</h1>
        <Button
          text='Add Category'
          variant='blue'
          icon={<Plus className='text-white' size={24} />}
          onClick={() => {
            setEditingCategory(null);
            setIsModalOpen(true);
          }}
        />
      </div>

      <div className='grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {categories.map((category) => (
          <div
            key={category.name}
            className='flex flex-col justify-between h-full p-4 rounded shadow-md hover:shadow-lg transition'
          >
            <img src={category.image} alt={category.name} className='w-full h-40 object-contain rounded' />

            <div className='h-12 overflow-hidden mt-3'>
              <h2 className='text-lg font-semibold whitespace-nowrap overflow-hidden text-ellipsis text-center'>
                {category.name}
              </h2>
            </div>

            <div className='mt-auto flex gap-2'>
              <Button
                text='Edit'
                icon={<Pencil size={16} />}
                variant='yellow'
                hideTextOnMobile
                onClick={() => {
                  setEditingCategory(category.name);
                  setIsModalOpen(true);
                }}
                className='w-full'
              />
              <Button
                text='Delete'
                icon={<Trash2 size={16} />}
                variant='red'
                hideTextOnMobile
                onClick={() => {
                  setEditingCategory(category.name);
                  setIsDialogOpen(true);
                }}
                className='w-full'
              />
            </div>
          </div>
        ))}
      </div>

      <ConfirmDialog
        isOpen={isDialogOpen}
        message={`Are you sure you want to delete ${editingCategory}? This will delete all associated products.`}
        onConfirm={() => {
          deleteCategory(editingCategory);
          setIsDialogOpen(false);
        }}
        onCancel={() => setIsDialogOpen(false)}
      />

      {isModalOpen && (
        <CategoryForm initialCategory={editingCategory} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
      )}
    </div>
  );
};

export default Categories;
