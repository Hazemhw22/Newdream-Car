export interface Car {
  id: string | number;
  name: string;
  brand: string;
  year: number;
  description?: string;
  title?: string;
  features?: string[];
  image?: string;
  images?: string[];
  sale_price: number;
  market_price?: number;
  value_price?: number;
  priceRange?: any;
  kilometers?: number;
  type?: string;
  status?: string;
  created_at?: string;
  provider?: string;
  providers?: {
    id?: string;
    name?: string;
    address?: string;
    phone?: string;
  };
  colors?: {
    color: string;
    images: string[];
  }[];
  show_in_sales?: boolean;
  show_in_featured?: boolean;
  show_in_new_car?: boolean;
  show_in_used_car?: boolean;
  show_in_luxery_car?: boolean;
}
