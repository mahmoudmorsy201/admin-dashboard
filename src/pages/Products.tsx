import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import Button from '../components/Button';
import { Product } from 'types/product';
import { useDashboardStore } from 'store/store';
import { ProductsApi } from 'apis/productsApi';
import { CategoriesApi } from 'apis/categoriesApi';
import { Plus } from 'lucide-react';
import ProductsList from 'components/ProductsList';

const ProductForm = lazy(() => import('../components/ProductForm'));

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

  const handleSaveProduct = async (productData: Product) => {
    const isDuplicate = filteredProducts.some(
      (product) => product.title.toLowerCase() === productData.title.toLowerCase() && product.id !== editingProduct?.id,
    );

    if (isDuplicate) {
      setFormError('A product with this title already exists.');
      return;
    }

    try {
      if (editingProduct) {
        await ProductsApi.updateProduct(editingProduct.id, productData);
        updateProduct({ ...editingProduct, ...productData });
      } else {
        const newProduct = { ...productData, id: filteredProducts.length + 1 };
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
          {selectedCategories.length > 0 ? `Products in "${selectedCategories.join(', ')}"` : 'All Products'}
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

      <ProductsList
        filteredProducts={filteredProducts}
        selectedCategories={selectedCategories}
        setEditingProduct={setEditingProduct}
        setIsModalOpen={setIsModalOpen}
        deleteProduct={deleteProduct}
      />

      {isModalOpen && (
        <Suspense fallback={<p>Loading form...</p>}>
          <ProductForm
            categories={categories.map((c) => c.name)}
            onClose={() => {
              setFormError(null);
              setIsModalOpen(false);
            }}
            onSave={handleSaveProduct}
            initialProduct={editingProduct}
            formError={formError}
          />
        </Suspense>
      )}
    </div>
  );
};

export default Products;
