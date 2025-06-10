'use client';

import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import SearchFilters from '../../components/SearchFilters';
import CarCard from '../../components/UsedCarCard';
import { Car, Truck, Zap, CircleDot } from 'lucide-react';
import Image from 'next/image';

const carTypes = [
  { name: 'רכב חשמלי', icon: Zap },         // EV
  { name: 'רכב שטח', icon: Car },            // SUV
  { name: 'משאית', icon: Truck },             // Truck
  { name: 'סדאן', icon: Car },                // Sedan
  { name: 'היברידי', icon: CircleDot },       // Hybrid
];

export default function UsedCars() {
  const [searchTerm, setSearchTerm] = useState('');
  const [brand, setBrand] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('price-low');
  const [displayedCars, setDisplayedCars] = useState(12);
  const [carType, setCarType] = useState<string | null>(null);

  const allCars = [
    {
      id: 101,
      name: 'Used TIGGO 8 PRO PHEV',
      brand: 'Chery',
      price: 149990,
      originalPrice: 170000,
      image: '/used-cars-for-sale-in-bronx-11568883664utp7qwvdsg.png',
      features: ['טכנולוגיות בטיחות', 'מסכי מולטימדיה כפולים'],   // Safety technologies, Dual multimedia screens
      isHybrid: true,
      isBestChoice: true,
      type: 'היברידי',
      year: 2021,
      mileage: 35000,
    },
    {
      id: 102,
      name: 'Used DUSTER',
      brand: 'Dacia',
      price: 89990,
      image: '/used-cars-for-sale-in-bronx-11568883664utp7qwvdsg.png',
      features: ['אמין וחסכוני בדלק', 'טוב לנהיגה בעיר'],           // Reliable and fuel efficient, Good for city driving
      year: 2018,
      mileage: 75000,
      type: 'רכב שטח',
    },
    {
      id: 103,
      name: 'Used XPENG G6',
      brand: 'XPeng',
      price: 159990,
      originalPrice: 190000,
      image: '/used-cars-for-sale-in-bronx-11568883664utp7qwvdsg.png',
      features: ['רכב חשמלי', 'נוחות וטכנולוגיה מתקדמת'],           // Electric vehicle, Comfort and tech packed
      isBestChoice: true,
      year: 2020,
      mileage: 42000,
      type: 'רכב חשמלי',
    },
    ...Array.from({ length: 20 }, (_, i) => ({
      id: i + 200,
      name: `Used Car Model ${i + 200}`,
      brand: ['Chery', 'Dacia', 'Toyota', 'Honda'][i % 4],
      price: Math.floor(Math.random() * 90000) + 40000,
      image: '/used-cars-for-sale-in-bronx-11568883664utp7qwvdsg.png',
      features: ['שמור היטב', 'בעל יחיד'],    // Well maintained, Single owner
      isHybrid: Math.random() > 0.5,
      year: 2015 + (i % 7),
      mileage: 20000 + i * 3000,
      type: ['סדאן', 'משאית', 'רכב שטח', 'רכב חשמלי'][i % 4],
    }))
  ];

  const filteredCars = allCars
    .filter(car => {
      if (searchTerm && !car.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      if (brand !== 'all' && car.brand.toLowerCase() !== brand.toLowerCase()) {
        return false;
      }
      if (priceRange !== 'all') {
        const [min, max] = priceRange.split('-').map(p => parseInt(p.replace('+', '')) || Infinity);
        if (car.price < min || (max !== Infinity && car.price > max)) {
          return false;
        }
      }
      if (carType && car.type?.toLowerCase() !== carType.toLowerCase()) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const visibleCars = filteredCars.slice(0, displayedCars);

  const loadMore = () => {
    setDisplayedCars(prev => prev + 12);
  };

  useEffect(() => {
    setDisplayedCars(12);
  }, [searchTerm, brand, priceRange, sortBy, carType]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <section className="relative bg-gradient-to-b from-cyan-600 to-cyan-800 text-white">
            {/* خلفية الصورة مع شفافية */}
            <div className="absolute inset-0 opacity-50">
              <Image
                src="/poster_34f51998fbd34da2a132f940ea18d2b8.jpeg?height=300&width=400"
                alt="Cars Background"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* المحتوى */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">רכבים משומשים</h1>
              <p className="text-xl md:text-2xl text-white opacity-90">
                מצאו רכבים משומשים איכותיים במחירים מעולים
              </p>
            </div>  

            {/* תدرג في الأسفل للفصل בין الأقسام */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent"></div>
          </section>

          {/* Car type filter */}
          <div className="mb-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {carTypes.map((type) => {
                const Icon = type.icon;
                const isActive = carType === type.name;
                return (
                  <button
                    key={type.name}
                    onClick={() => setCarType(carType === type.name ? null : type.name)}
                    className="flex flex-col items-center justify-center p-6 rounded-lg"
                  >
                    <div
                      className={`
                        w-12 h-12 rounded-full flex items-center justify-center mb-3
                        transition-colors duration-200
                        ${isActive ? 'bg-cyan-200 dark:bg-cyan-700' : 'hover:bg-cyan-100 dark:hover:bg-cyan-800'}
                      `}
                    >
                      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-gray-900 dark:text-gray-100 font-medium">{type.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search and Filters */}
          <SearchFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            brand={brand}
            setBrand={setBrand}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          {/* Results Count */}
          <div className="mb-4 mt-2">
            <p className="text-gray-600 dark:text-gray-400">
              מציגים {visibleCars.length} מתוך {filteredCars.length} רכבים
            </p>
          </div>

          {/* Cars Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-3">
            {visibleCars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>

          {/* Load More Button */}
          {visibleCars.length < filteredCars.length && (
            <div className="text-center mt-8 pb-8">
              <button
                onClick={loadMore}
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                טען עוד רכבים
              </button>
            </div>
          )}

          {/* No Results */}
          {filteredCars.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 dark:text-gray-300">לא נמצאו רכבים משומשים התואמים את הקריטריונים שלך.</p>
              <p className="text-gray-500 dark:text-gray-400 mt-2">נסה להתאים את המסננים או מונחי החיפוש.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
