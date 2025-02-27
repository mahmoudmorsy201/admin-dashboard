import { Product, ProductRequest } from 'types/product';
import apiClient from 'utils/apiClient';

export const ProductsApi = {
  getAllProducts: async () => {
    return await apiClient.get<Product[]>('/products');
  },

  getProductById: async (id: number) => {
    return await apiClient.get<Product>(`/products/${id}`);
  },

  getProductsByCategory: async (category: string) => {
    return await apiClient.get<Product[]>(`/products/category/${category}`);
  },

  sortProducts: async (sort?: 'desc') => {
    return await apiClient.get<Product[]>(`/products?sort=${sort}`);
  },

  addProduct: async (product: ProductRequest) => {
    return await apiClient.post<ProductRequest, Product>('/products', product);
  },

  updateProduct: async (id: number, product: ProductRequest) => {
    return await apiClient.put<ProductRequest, Product>(`/products/${id}`, product);
  },

  deleteProduct: async (id: number) => {
    return await apiClient.delete<Product>(`/products/${id}`);
  },
};
