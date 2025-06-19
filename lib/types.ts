export interface Car {
  description: string;
  features: string[];
  image: string;
  images: string[];
  name: string;
  title: string;
  id: string | number;
  created_at: string;
  year: number;
  status: string;
  type?: string;
  sale_price: number;
  market_price: number;
  value_price: number;
  priceRange: any;
  kilometers: number;
  provider: string;
  brand: string;
  providers?: {
    id: string;
    name: string;
    address: string;
    phone: string;
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
