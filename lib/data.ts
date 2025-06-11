export interface Car {
  id: string;
  name: string;
  brand: string;
  image: string;
  priceRange: {
    min: number;
    max: number;
  };
}

export const carsData: Car[] = [
  {
    id: 'tata-altroz',
    name: 'טאטא אלטרוז',
    brand: 'טאטא',
    image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    priceRange: {
      min: 6.89,
      max: 11.49,
    },
  },
  {
    id: 'tata-nexon',
    name: 'טאטא נקסון',
    brand: 'טאטא',
    image: 'https://images.pexels.com/photos/1719647/pexels-photo-1719647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    priceRange: {
      min: 8.00,
      max: 15.60,
    },
  },
  {
    id: 'maruti-fronx',
    name: 'מרוטי פרונקס',
    brand: 'מרוטי',
    image: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    priceRange: {
      min: 7.54,
      max: 13.06,
    },
  },
  {
    id: 'skoda-slavia',
    name: 'סקודה סלאביה',
    brand: 'סקודה',
    image: 'https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    priceRange: {
      min: 10.34,
      max: 18.25,
    },
  },
  {
    id: 'jeep-compass',
    name: 'ג\'יפ קומפאס',
    brand: 'ג\'יפ',
    image: 'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    priceRange: {
      min: 18.99,
      max: 28.50,
    },
  },
  {
    id: 'volkswagen-virtus',
    name: 'פולקסווגן וירטוס',
    brand: 'פולקסווגן',
    image: 'https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    priceRange: {
      min: 11.56,
      max: 19.41,
    },
  },
  {
    id: 'honda-city',
    name: 'הונדה סיטי',
    brand: 'הונדה',
    image: 'https://images.pexels.com/photos/3311574/pexels-photo-3311574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    priceRange: {
      min: 12.42,
      max: 17.86,
    },
  },
  {
    id: 'mercedes-benz-cla',
    name: 'מרצדס-בנץ CLA',
    brand: 'מרצדס-בנץ',
    image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    priceRange: {
      min: 45.50,
      max: 65.25,
    },
  },
  {
    id: 'audi-a4',
    name: 'אאודי A4',
    brand: 'אאודי',
    image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    priceRange: {
      min: 42.34,
      max: 56.50,
    },
  },
  {
    id: 'bmw-3-series',
    name: 'ב.מ.וו סדרה 3',
    brand: 'ב.מ.וו',
    image: 'https://images.pexels.com/photos/3589586/pexels-photo-3589586.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    priceRange: {
      min: 46.90,
      max: 68.75,
    },
  },
];
