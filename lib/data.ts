import { Car } from './types';

export const carsData: Car[] = [
  {
    id: 'tata-altroz',
    created_at: '2025-06-01T00:00:00Z',
    title: 'טאטא אלטרוז',
    name: 'טאטא אלטרוז',
    year: 2024,
    status: 'available',
    market_price: 7.5,
    value_price: 6.9,
    sale_price: 6.89,
    kilometers: 15000,
    provider: 'Tata Motors',
    brand: 'טאטא',
    image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg',
    images: [
      'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg',
      'https://images.pexels.com/photos/116676/pexels-photo-116676.jpeg',
    ],
    priceRange: {
      min: 6.89,
      max: 11.49,
    },
    features: []
  },
  {
    id: 'tata-nexon',
    created_at: '2025-06-01T00:00:00Z',
    title: 'טאטא נקסון',
    name: 'טאטא נקסון',
    year: 2023,
    status: 'available',
    market_price: 10.2,
    value_price: 9.4,
    sale_price: 8.0,
    kilometers: 18000,
    provider: 'Tata Motors',
    brand: 'טאטא',
    image: 'https://images.pexels.com/photos/1719647/pexels-photo-1719647.jpeg',
    images: [
      'https://images.pexels.com/photos/1719647/pexels-photo-1719647.jpeg',
      'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg',
    ],
    priceRange: {
      min: 8.0,
      max: 15.6,
    },
    features: []
  },
  {
    id: 'maruti-fronx',
    created_at: '2025-06-01T00:00:00Z',
    title: 'מרוטי פרונקס',
    name: 'מרוטי פרונקס',
    year: 2024,
    status: 'available',
    market_price: 9.5,
    value_price: 8.8,
    sale_price: 7.54,
    kilometers: 12000,
    provider: 'Maruti Suzuki',
    brand: 'מרוטי',
    image: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg',
    images: [
      'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg',
      'https://images.pexels.com/photos/210020/pexels-photo-210020.jpeg',
    ],
    priceRange: {
      min: 7.54,
      max: 13.06,
    },
    features: []
  },
  // يمكنك إضافة المزيد من السيارات بنفس النمط...
];
