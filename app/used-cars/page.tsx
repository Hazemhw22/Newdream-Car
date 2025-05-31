"use client";
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import SearchFilters from '../../components/SearchFilters';
import UsedCarCard from '../../components/UsedCarCard';

export default function UsedCars() {
  const [searchTerm, setSearchTerm] = useState('');
  const [brand, setBrand] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('price-low');
  const [displayedCars, setDisplayedCars] = useState(12);

  const allUsedCars = [
    {
      id: 1,
      name: 'Corolla 2018',
      brand: 'Toyota',
      price: 58900,
      originalPrice: 62000,
      image: '/used-cars-for-sale-in-bronx-11568883664utp7qwvdsg.png',
      features: ['Well-maintained', 'Low mileage'],
      year: 2018,
      mileage: 67000,
    },
    {
      id: 2,
      name: 'Civic 2019',
      brand: 'Honda',
      price: 64900,
      image: '/used-cars-for-sale-in-bronx-11568883664utp7qwvdsg.png',
      features: ['Reliable', 'Sporty'],
      year: 2019,
      mileage: 52000,
    },
    {
      id: 3,
      name: 'Accent 2020',
      brand: 'Hyundai',
      price: 51900,
      image: '/used-cars-for-sale-in-bronx-11568883664utp7qwvdsg.png',
      features: ['Fuel efficient', 'Compact design'],
      year: 2020,
      mileage: 39000,
    },
    {
      id: 4,
      name: 'Golf 2017',
      brand: 'Volkswagen',
      price: 48900,
      image: '/used-cars-for-sale-in-bronx-11568883664utp7qwvdsg.png',
      features: ['European quality', 'Turbocharged'],
      year: 2017,
      mileage: 82000,
    },
    ...Array.from({ length: 20 }, (_, i) => ({
      id: i + 5,
      name: `Used Car ${i + 5}`,
      brand: ['Toyota', 'Honda', 'Hyundai', 'Ford'][i % 4],
      price: Math.floor(Math.random() * 30000) + 35000,
      image: '/used-cars-for-sale-in-bronx-11568883664utp7qwvdsg.png',
      features: ['Feature A', 'Feature B'],
      year: 2015 + (i % 8),
      mileage: 40000 + i * 2000,
    }))
  ];

  const filteredCars = allUsedCars
    .filter(car => {
      if (searchTerm && !car.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      if (brand !== 'all' && car.brand.toLowerCase() !== brand.toLowerCase()) return false;
      if (priceRange !== 'all') {
        const [min, max] = priceRange.split('-').map(p => parseInt(p.replace('+', '')) || Infinity);
        if (car.price < min || (max !== Infinity && car.price > max)) return false;
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

  const loadMore = () => setDisplayedCars(prev => prev + 12);

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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Used Cars</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">Explore our collection of certified used vehicles</p>
          </div>

          {/* Filters */}
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
              Showing {visibleCars.length} of {filteredCars.length} used cars
            </p>
          </div>

          {/* Car Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-3">
            {visibleCars.map(car => (
              <UsedCarCard key={car.id} car={car} />
            ))}
          </div>

          {/* Load More Button */}
          {visibleCars.length < filteredCars.length && (
            <div className="text-center mt-8 pb-8">
              <button
                onClick={loadMore}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Load More Used Cars
              </button>
            </div>
          )}

          {/* No Results */}
          {filteredCars.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 dark:text-gray-300">No used cars found matching your criteria.</p>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
