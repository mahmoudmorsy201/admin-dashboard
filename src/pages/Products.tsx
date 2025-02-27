import { useState, useEffect, useCallback } from 'react';
import ProductCard from '../components/ProductCard';
import ProductForm from '../components/ProductForm';
import Button from '../components/Button';
import { Product } from 'types/product';
import { useDashboardStore } from 'store/store';
import { ProductsApi } from 'apis/productsApi';
import { CategoriesApi } from 'apis/categoriesApi';
import { Plus } from 'lucide-react';

const Products = () => {
  const {
    filteredProducts,
    setProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    categories,
    setCategories,
    selectedCategories,
    searchQuery,
    setSearchQuery,
  } = useDashboardStore();

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await ProductsApi.getAllProducts();
      setProducts(response);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }, [setProducts]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await CategoriesApi.getCategories();
      setCategories(response);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, [setCategories]);

  useEffect(() => {
    if (filteredProducts.length === 0) fetchProducts();
    if (categories.length === 0) fetchCategories();
  }, [categories.length, fetchCategories, fetchProducts, filteredProducts.length]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const handleSave = async (productData: Product) => {
    try {
      const isDuplicate = filteredProducts.some(
        (product) =>
          product.title.toLowerCase() === productData.title.toLowerCase() && product.id !== editingProduct?.id,
      );

      if (isDuplicate) {
        setFormError('A product with this title already exists.');
        return;
      }

      if (editingProduct) {
        await ProductsApi.updateProduct(editingProduct.id, productData);
        updateProduct({ ...editingProduct, ...productData });
      } else {
        const lastId = filteredProducts.reduce((maxId, p) => Math.max(maxId, p.id), 0);
        const newProduct = { ...productData, id: lastId + 1 };
        addProduct(newProduct);
      }

      setIsModalOpen(false);
      setEditingProduct(null);
      setFormError(null);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <div className='mx-auto p-4'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-xl md:text-2xl font-bold'>
          {selectedCategories.length > 0 ? `Products in "${selectedCategories.map((c) => c)}"` : 'All Products'}
        </h1>
        <Button
          text='Add Product'
          variant='blue'
          icon={<Plus className='text-white' size={24} />}
          hideTextOnMobile
          onClick={() => {
            setEditingProduct(null);
            setIsModalOpen(true);
          }}
        />
      </div>

      <input
        type='text'
        placeholder='Search products...'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className='border p-2 rounded w-full mb-4'
      />

      {filteredProducts.length > 0 ? (
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
      ) : (
        <p className='text-gray-500 text-center mt-4'>
          {selectedCategories.length > 0
            ? `No products found in "${selectedCategories.map((c) => c)}".`
            : 'No products available.'}
        </p>
      )}

      {isModalOpen && (
        <ProductForm
          categories={categories.map((c) => c.name)}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          initialProduct={editingProduct}
          formError={formError}
        />
      )}
    </div>
  );
};

export default Products;
