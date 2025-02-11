export interface Product {
  id: number;
  name: string;
  category: Category;
  price: number;
  rating: number;
  images: string[];
  description: string;
}

export interface AddProductDTO {
  name: string;
  categoryId: number;
  price: number | string;
  rating?: number;
  images: string[];
  description: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface User {
  id: string;
  socialId: string;
  profileIcon: string;
  username: string;
  email: string;
  created_at: string;
  modified_at: string;
  refreshToken: string;
}

export type CheckoutSession = { sessionId: string }

export type OrderItem = {
  id: number;
  quantity: number;
  pricePerUnit: string;
  product: Product;
};
export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  PAID = 'paid',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export type Order = {
  id: number;
  status: OrderStatus;
  sessionId: string;
  items: OrderItem[];
  created_at: string
};