export type CategoryId = "phones" | "beauty" | "fashion" | "home";
export interface Store {
  id: string;
  name: string;
  tagline: string;
  category: CategoryId;
  address: string;
  hours: string;
  logo: string;
  color: string;
}
export interface Product {
  id: string;
  name: string;
  storeId: string;
  category: CategoryId;
  price: number;
  oldPrice?: number;
  stock: number;
  images: string[];
  description: string;
  specs: Record<string, string>;
}
