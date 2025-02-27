import { useState } from 'react';
import { categoryImages, ProductRequest } from 'types/product';

interface ProductFormProps {
  categories: string[];
  initialProduct?: ProductRequest;
  formError?: string;
  onClose: () => void;
  onSave: (productData: ProductRequest) => void;
}

const ProductForm = ({ categories, initialProduct, onClose, onSave, formError }: ProductFormProps) => {
  const [title, setTitle] = useState(initialProduct?.title || '');
  const [price, setPrice] = useState(initialProduct?.price?.toString() || '');
  const [description, setDescription] = useState(initialProduct?.description || '');
  const [category, setCategory] = useState(initialProduct?.category || '');
  const [image, setImage] = useState(initialProduct?.image || '');

  const [errors, setErrors] = useState<{ title?: string; price?: string; category?: string }>({});

  const validateForm = () => {
    const newErrors: { title?: string; price?: string; category?: string } = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!price || parseFloat(price) <= 0) newErrors.price = 'Price must be greater than 0';
    if (!category) newErrors.category = 'Category is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const productImage = image.trim() || categoryImages[category] || categoryImages['other'];

    onSave({ title, price: parseFloat(price), description, category, image: productImage });
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-6 rounded-lg shadow-xl w-full max-w-lg'>
        <h2 className='text-xl font-bold mb-4'>{initialProduct ? 'Edit Product' : 'Add Product'}</h2>

        {formError && <p className='text-red-500 text-sm mb-4'>{formError}</p>}

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <input
              type='text'
              placeholder='Title *'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full p-3 border rounded focus:ring focus:ring-blue-300 ${errors.title ? 'border-red-500' : ''}`}
            />
            {errors.title && <p className='text-red-500 text-sm mt-1'>{errors.title}</p>}
          </div>

          <div>
            <input
              type='number'
              placeholder='Price *'
              value={price}
              onChange={(e) => {
                const value = e.target.value;
                if (parseFloat(value) >= 0 || value === '') {
                  setPrice(value);
                }
              }}
              min='0'
              step='any'
              className={`w-full p-3 border rounded focus:ring focus:ring-blue-300 ${errors.price ? 'border-red-500' : ''}`}
            />

            {errors.price && <p className='text-red-500 text-sm mt-1'>{errors.price}</p>}
          </div>

          <textarea
            placeholder='Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='w-full p-3 border rounded resize-none h-24 focus:ring focus:ring-blue-300'
          />

          <div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`w-full p-3 border rounded focus:ring focus:ring-blue-300 ${errors.category ? 'border-red-500' : ''}`}
            >
              <option value='' disabled>
                Select Category *
              </option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && <p className='text-red-500 text-sm mt-1'>{errors.category}</p>}
          </div>

          <input
            type='text'
            placeholder='Image URL'
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className='w-full p-3 border rounded focus:ring focus:ring-blue-300'
          />

          <div className='mt-4 flex justify-end gap-3'>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition'
            >
              Cancel
            </button>
            <button type='submit' className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition'>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
