'use client';
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import SearchFilters from '../../components/SearchFilters';
import CarCard from '../../components/CarCard';
import { Car, Truck, Zap, CircleDot } from 'lucide-react';
import Image from 'next/image';

const carTypes = [
  { name: 'חשמלי', icon: Zap },
  { name: 'רכב שטח', icon: Car },
  { name: 'משאית', icon: Truck },
  { name: 'סדאן', icon: Car },
  { name: 'היברידי', icon: CircleDot },
];

export default function NewCars() {
  const [searchTerm, setSearchTerm] = useState('');
  const [brand, setBrand] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('price-low');
  const [displayedCars, setDisplayedCars] = useState(12);
  const [carType, setCarType] = useState<string | null>(null); // new state

  const allCars = [
    {
      id: 1,
      name: 'TIGGO 8 PRO PHEV',
      brand: 'Chery',
      price: 199990,
      originalPrice: 211000,
      image: '/2022-Mercedes-Benz-C-Class-White.png',
      features: ['טכנולוגיות בטיחות', 'מסכי מולטימדיה כפולים'],
      isHybrid: true,
      isBestChoice: true,
      type: 'היברידי'
    },
    {
      id: 2,
      name: 'TIGGO 7 PRO PHEV',
      brand: 'Chery',
      price: 179990,
      originalPrice: 201720,
      image: '/427770636_1718097302720.png',
      features: ['שבעה מקומות עם מולטימדיה מלאה', 'טכנולוגיות בטיחות'],
      isHybrid: true,
      isBestChoice: true,
      year: 2022,
      mileage: 46000,
      type: 'רכב שטח'
    },
    {
      id: 3,
      name: 'DUSTER',
      brand: 'Dacia',
      price: 139990,
      image: '/pngimg.com - bmw_PNG99558.png',
      features: ['רכב מתאים', 'צריך שימוש של שישה חודשים'],
      award: 'רכב השנה NBC 2025',
      year: 2020,
      mileage: 72000,
      type: 'רכב שטח'
    },
    {
      id: 4,
      name: 'XPENG G6',
      brand: 'XPeng',
      price: 201990,
      originalPrice: 241930,
      image: '/STAM-TOYOTA-LAND-CRUISER-2022.png',
      features: ['רכב מתאים - צריך שימוש של שישה חודשים'],
      isBestChoice: true,
      year: 2021,
      mileage: 58000,
      type: 'חשמלי'
    },
    ...Array.from({ length: 20 }, (_, i) => ({
      id: i + 5,
      name: `דגם רכב ${i + 5}`,
      brand: ['Chery', 'Dacia', 'Toyota', 'Honda'][i % 4],
      price: Math.floor(Math.random() * 150000) + 100000,
      image: '/2022-Mercedes-Benz-C-Class-White.png',
      features: ['תכונה 1', 'תכונה 2'],
      isHybrid: Math.random() > 0.5,
      year: 2025,
      mileage: 6000,
      type: ['סדאן', 'משאית', 'רכב שטח', 'חשמלי'][i % 4],
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
            {/* Image background with opacity */}
            <div className="absolute inset-0 opacity-50">
              <Image
                src="/BMW-electric-and-luxury-car-lineup-with-mountain-background.png?height=300&width=1200"
                alt="Car background"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">רכבים חדשים</h1>
              <p className="text-xl md:text-2xl text-white opacity-90">
                גלו את קולקציית הרכבים החדשה שלנו
              </p>
            </div>  

            {/* Gradient transition at bottom to separate sections */}
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



          {/* Search and filters */}
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

          {/* Results count */}
          <div className="mb-4 mt-2">
            <p className="text-gray-600 dark:text-gray-400">
              Showing {visibleCars.length} of {filteredCars.length} cars
            </p>
          </div>

          {/* Cars grid */}
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

          {/* No results */}
          {filteredCars.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 dark:text-gray-300">No cars found matching the criteria.</p>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting filters or search terms.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
