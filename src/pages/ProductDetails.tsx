import Button from 'components/Button';
import ConfirmDialog from 'components/ConfirmDialog';
import ProductForm from 'components/ProductForm';
import { useState } from 'react';
import { useDashboardStore } from 'store/store';
import { Product } from 'types/product';

const ProductDetails = () => {
  const { selectedProduct, setSelectedProduct, updateProduct, deleteProduct, setStep, categories } =
    useDashboardStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!selectedProduct) {
    return <div className='text-center text-gray-500 mt-10'>Product not found</div>;
  }

  const { id, title, price, description, category, image, rating } = selectedProduct;

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    deleteProduct(id);
    setSelectedProduct(null);
    setStep('products');
  };

  const handleSave = async (updatedProduct: Product) => {
    updateProduct({ ...selectedProduct, ...updatedProduct });
    setSelectedProduct(updatedProduct);
    setIsModalOpen(false);
  };

  return (
    <div className='max-w-3xl mx-auto p-6 bg-white rounded-lg'>
      {image && <img src={image} alt={title} className='w-full h-80 object-contain rounded-lg shadow-md' />}

      {title && <h1 className='text-2xl font-bold mt-4'>{title}</h1>}

      {!!price && <p className='text-xl text-gray-700 font-semibold'>${price}</p>}

      {description && <p className='text-gray-600 mt-2'>{description}</p>}

      {category && (
        <p className='text-sm text-gray-500 mt-2'>
          <strong>Category:</strong> {category}
        </p>
      )}

      {rating?.rate !== undefined && rating?.count !== undefined && (
        <div className='flex items-center gap-2 mt-3'>
          <span className='text-yellow-500 text-lg'>⭐ {rating.rate}</span>
          <span className='text-gray-600 text-sm'>({rating.count} reviews)</span>
        </div>
      )}

      <div className='flex gap-2 mt-4'>
        <Button text='Edit' icon='✏️' variant='yellow' onClick={handleEdit} className='w-full' />
        <Button text='Delete' icon='🗑️' variant='red' onClick={() => setIsDialogOpen(true)} className='w-full' />
      </div>

      <ConfirmDialog
        isOpen={isDialogOpen}
        message={`Are you sure you want to delete "${title}"?`}
        onConfirm={handleDelete}
        onCancel={() => setIsDialogOpen(false)}
      />

      {isModalOpen && (
        <ProductForm
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          initialProduct={selectedProduct}
          categories={categories.map((c) => c.name)}
        />
      )}
    </div>
  );
};

export default ProductDetails;
