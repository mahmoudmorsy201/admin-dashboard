import { AuthApi } from 'apis/authApi';
import { jwtDecode } from 'jwt-decode';
import { User } from 'types/login';
import { Category, categoryImages, Product } from 'types/product';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  user: User | null;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: sessionStorage.getItem('authToken'),
  user: null,

  setToken: (token) => {
    if (token) {
      sessionStorage.setItem('authToken', token);
      set({ token });
      get().fetchUser();
    } else {
      sessionStorage.removeItem('authToken');
      set({ token: null });
    }
  },

  setUser: (user) => {
    set({ user });
  },

  logout: () => {
    sessionStorage.removeItem('authToken');
    set({ token: null, user: null });
  },

  fetchUser: async () => {
    const token = get().token;
    if (!token) return;

    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken?.sub;

      if (!userId) {
        throw new Error('User ID not found in token');
      }

      const userData = await AuthApi.getUserInfo(userId);
      get().setUser(userData);
    } catch (error) {
      console.error('Failed to fetch user', error);
      set({ user: null });
    }
  },
}));

type DashboardState = {
  step: string;
  setStep: (step: string) => void;

  // Products State
  products: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (updatedProduct: Product) => void;
  deleteProduct: (id: number) => void;

  // Categories State
  categories: Category[];
  setCategories: (categories: string[]) => void;
  addCategory: (category: string) => void;
  updateCategory: (oldCategory: string, newCategory: string) => void;
  deleteCategory: (category: string) => void;

  // Multi-Select Categories for Filtering
  selectedCategories: string[];
  toggleCategory: (category: string) => void;

  // Computed Filtered Products
  filteredProducts: Product[];
  updateFilteredProducts: () => void;

  // Search Query
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Selected product
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
};

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set, get) => ({
      step: 'products',
      setStep: (step) => set({ step }),

      // Products
      products: [],
      setProducts: (products) => {
        set({ products });
        get().updateFilteredProducts();
      },
      addProduct: (product) => {
        set((state) => ({ products: [...state.products, product] }));
        get().updateFilteredProducts();
      },
      updateProduct: (updatedProduct) => {
        set((state) => ({
          products: state.products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)),
        }));
        get().updateFilteredProducts();
      },
      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }));
        get().updateFilteredProducts();
      },

      // Categories
      categories: [],
      setCategories: (categoryNames: string[]) => {
        const categories = categoryNames.map((name) => ({
          name,
          image: categoryImages[name] || categoryImages.other,
        }));
        set({ categories });
      },
      addCategory: (category) => {
        set((state) => ({
          categories: [
            ...state.categories,
            { name: category, image: categoryImages[category] || categoryImages.other },
          ],
        }));
      },
      updateCategory: (oldCategory, newCategory) => {
        set((state) => ({
          categories: state.categories.map((category) =>
            category.name === oldCategory
              ? {
                  name: newCategory,
                  image: categoryImages[newCategory] || categoryImages.other,
                }
              : category,
          ),
          products: state.filteredProducts.map((product) =>
            product.category === oldCategory ? { ...product, category: newCategory } : product,
          ),
        }));
        get().updateFilteredProducts();
      },
      deleteCategory: (category) => {
        set((state) => ({
          categories: state.categories.filter((c) => c.name !== category),
          products: state.products.filter((p) => p.category !== category),
          selectedCategories: state.selectedCategories.filter((c) => c !== category),
        }));
        get().updateFilteredProducts();
      },

      // Multi-Select Categories for Filtering
      selectedCategories: [],
      toggleCategory: (category) => {
        set((state) => {
          const newSelected = state.selectedCategories.includes(category)
            ? state.selectedCategories.filter((c) => c !== category)
            : [...state.selectedCategories, category];
          return { selectedCategories: newSelected };
        });
        get().updateFilteredProducts();
      },

      // Search Query
      searchQuery: '',
      setSearchQuery: (query) => {
        set({ searchQuery: query });
        get().updateFilteredProducts();
      },

      // Computed Filtered Products
      filteredProducts: [],
      updateFilteredProducts: () => {
        const { products, selectedCategories, searchQuery } = get();

        let filtered = products;

        // Filter by category
        if (selectedCategories.length > 0) {
          filtered = filtered.filter((p) => selectedCategories.includes(p.category));
        }

        // Filter by search query (case insensitive)
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          filtered = filtered.filter(
            (p) => p.title.toLowerCase().includes(query) || p.category.toLowerCase().includes(query),
          );
        }

        set({ filteredProducts: filtered });
      },

      // For selected product details
      selectedProduct: null,
      setSelectedProduct: (product) => {
        const existingProduct = get().filteredProducts.find((p) => p.id === product.id);
        set({ selectedProduct: existingProduct || product });
      },
    }),
    {
      name: 'dashboard-store',
    },
  ),
);
