export interface Car {
  description: string;
  features: string[]; // بدل never[] عشان تمثل ميزات السيارة
  image: string; // أضف هذه الخاصية
  images: string[];
  name: string;
  title: string;
  id: string | number; // بدل string فقط
  created_at: string;
  year: number;
  status: string;
  type?: string;
  sale_price: number;
  market_price: number;
  value_price: number;
  priceRange: any; // ممكن تخصص النوع لو تعرف شكله
  kilometers: number;
  provider: string;
  brand: string;
  providers?: {
    id: string;
    name: string;
    address: string;
    phone: string;
  };
}
