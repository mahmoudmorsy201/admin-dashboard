import React, { memo } from 'react';
import ProductCard from './ProductCard';
import { Product } from 'types/product';

interface ProductsListProps {
  filteredProducts: Product[];
  selectedCategories: string[];
  setEditingProduct: (product: Product | null) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  deleteProduct: (id: number) => void;
}

const ProductsList = ({
  filteredProducts,
  selectedCategories,
  setEditingProduct,
  setIsModalOpen,
  deleteProduct,
}: ProductsListProps) => {
  if (filteredProducts.length === 0) {
    return (
      <p className='text-gray-500 text-center mt-4'>
        {selectedCategories.length > 0
          ? `No products found in "${selectedCategories.join(', ')}".`
          : 'No products available.'}
      </p>
    );
  }

  return (
    <div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
      {filteredProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={() => {
            setEditingProduct(product);
            setIsModalOpen(true);
          }}
          onDelete={() => deleteProduct(product.id)}
        />
      ))}
    </div>
  );
};

export default memo(ProductsList);
