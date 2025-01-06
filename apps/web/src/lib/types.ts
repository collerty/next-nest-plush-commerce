export interface Product {
  id: string;
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
  price: number;
  rating?:number;
  images: string[];
  description:string;
}
export interface Category {
  id: string;
  name: string;
}

export interface User {
  id: string;
  socialId: string;
  profileIcon:string;
  username: string;
  email: string;
  created_at: string;
  modified_at: string;
  refreshToken: string;
}