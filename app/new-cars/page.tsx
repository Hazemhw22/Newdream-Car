"use client"
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import SearchFilters from '../../components/SearchFilters';
import CarCard from '../../components/CarCard';

export default function NewCars() {
  const [searchTerm, setSearchTerm] = useState('');
  const [brand, setBrand] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('price-low');
  const [displayedCars, setDisplayedCars] = useState(12);

  // Mock data - in real app this would come from API
  const allCars = [
    {
      id: 1,
      name: 'TIGGO 8 PRO PHEV',
      brand: 'Chery',
      price: 199990,
      originalPrice: 211000,
      image: '/2022-Mercedes-Benz-C-Class-White.png',
      features: ['Safety technologies', 'Dual multimedia screens'],
      isHybrid: true,
      isBestChoice: true
    },
    {
      id: 2,
      name: 'TIGGO 7 PRO PHEV',
      brand: 'Chery',
      price: 179990,
      originalPrice: 201720,
      image: '/427770636_1718097302720.png',
      features: ['Seven seats with full multimedia', 'Safety technologies'],
      isHybrid: true,
      isBestChoice: true
    },
    {
      id: 3,
      name: 'DUSTER',
      brand: 'Dacia',
      price: 139990,
      image: '/pngimg.com - bmw_PNG99558.png',
      features: ['Suitable vehicle ', 'needs six months usage'],
      award: 'NBC Car of the Year 2025'
    },
    {
      id: 4,
      name: 'XPENG G6',
      brand: 'XPeng',
      price: 201990,
      originalPrice: 241930,
      image: '/STAM-TOYOTA-LAND-CRUISER-2022.png',
      features: ['Suitable vehicle - needs six months usage'],
      isBestChoice: true
    },
    // Add more mock cars
    ...Array.from({ length: 20 }, (_, i) => ({
      id: i + 5,
      name: `Car Model ${i + 5}`,
      brand: ['Chery', 'Dacia', 'Toyota', 'Honda'][i % 4],
      price: Math.floor(Math.random() * 150000) + 100000,
      image: '/2022-Mercedes-Benz-C-Class-White.png',
      features: ['Feature 1', 'Feature 2'],
      isHybrid: Math.random() > 0.5
    }))
  ];

  // Filter and sort cars
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
  }, [searchTerm, brand, priceRange, sortBy]);

 return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center py-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">New Cars</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">Discover our latest collection of vehicles</p>
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
          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-400">
              Showing {visibleCars.length} of {filteredCars.length} cars
            </p>
          </div>

          {/* Cars Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
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
                Load More Cars
              </button>
            </div>
          )}

          {/* No Results */}
          {filteredCars.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 dark:text-gray-300">No cars found matching your criteria.</p>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}