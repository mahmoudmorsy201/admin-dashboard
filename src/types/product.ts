export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate?: number;
    count?: number;
  };
};

export type ProductRequest = {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export type Category = {
  name: string;
  image: string;
}

export const categoryImages: { [key: string]: string } = {
  electronics: 'src/assets/electronics.webp',
  jewelery: 'src/assets/jewelry.jpeg',
  "men's clothing": 'src/assets/mens-clothing.jpg',
  "women's clothing": 'src/assets/womens-clothing.jpg',
  other: 'src/assets/fallback.png',
} as const;