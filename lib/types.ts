export interface Car {
  id: string | number;
  name: string;
  brand: string;
  year: number;
  description?: string;
  title?: string;
  features?: Array<string | Feature>;
  image?: string;
  images?: string[];
  sale_price: number;
  market_price?: number;
  buy_price?: number;
  value_price?: number;
  priceRange?: any;
  kilometers?: number;
  type?: string;
  status?: string;
  created_at?: string;
  provider?: string;
  providers?: Provider;
  customers?: Customer;
  colors?: {
    color: string;
    images: string[];
  }[];
  show_in_sales?: boolean;
  show_in_featured?: boolean;
  show_in_new_car?: boolean;
  show_in_used_car?: boolean;
  show_in_luxery_car?: boolean;
  source_type?: 'provider' | 'customer';
  source_customer_id?: string;
  car_number?: string;
  desc?: string;
  public?: boolean;
  contract_image?: string;
}

export interface Feature {
  id?: string | number;
  name: string;
  value?: string;
}

export interface Provider {
  id: string;
  name: string;
  address: string;
  phone: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  age: number;
  id_number?: string;
}
