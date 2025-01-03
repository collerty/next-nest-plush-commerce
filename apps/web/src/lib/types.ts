export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  rating: number;
  images: string[];
  description: string;
}
interface Category {
  id: string;
  name: string;
}