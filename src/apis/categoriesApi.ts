import apiClient from 'utils/apiClient';

export const CategoriesApi = {
  getCategories: async () => {
    return await apiClient.get<string[]>('/products/categories');
  },
};
