import { Product } from 'types/product';
import Button from 'components/Button';
import { memo, useState } from 'react';
import ConfirmDialog from './ConfirmDialog';
import { useDashboardStore } from 'store/store';
import { Pencil, Trash2 } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

const ProductCard = ({ product, onEdit, onDelete }: ProductCardProps) => {
  const { setSelectedProduct, setStep } = useDashboardStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSelectProduct = () => {
    setSelectedProduct(product);
    setStep('productDetails');
  };

  return (
    <div className='flex flex-col justify-between h-full p-4 rounded shadow-md hover:shadow-lg transition '>
      <img
        src={product.image}
        alt={product.title}
        className='w-full h-40 object-contain rounded cursor-pointer'
        onClick={() => handleSelectProduct()}
      />

      <div className='h-12 overflow-hidden'>
        <h2 className='text-lg font-semibold whitespace-nowrap overflow-hidden text-ellipsis'>{product.title}</h2>
      </div>

      <div className='mt-auto'>
        <p className='text-gray-600 text-lg font-bold'>${product.price}</p>
        <p className='text-sm text-gray-500'>{product.category}</p>

        <div className='flex gap-2 mt-3'>
          <Button
            text='Edit'
            icon={<Pencil size={16}/>}
            variant='yellow'
            hideTextOnMobile
            onClick={() => onEdit(product)}
            className='w-full'
          />
          <Button
            text='Delete'
            icon={<Trash2 size={16}/>}
            variant='red'
            hideTextOnMobile
            onClick={() => {
              setIsDialogOpen(true);
            }}
            className='w-full'
          />
        </div>
      </div>

      <ConfirmDialog
        isOpen={isDialogOpen}
        message={`Are you sure you want to delete "${product.title}"?`}
        onConfirm={() => {
          onDelete(product.id);
          setIsDialogOpen(false);
        }}
        onCancel={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

export default memo(ProductCard);
