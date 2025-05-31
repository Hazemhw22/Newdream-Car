'use client';

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import CarCard from '../components/ui/CarCard';
import { Button } from '../components/ui/button';
import { carsData } from '../lib/data';

const budgetRanges = [
  { id: 'under10', label: 'Under 10K IL' },
  { id: '10to20', label: '10K - 20K IL' },
  { id: '20to30', label: '20K - 30K IL' },
  { id: 'luxury', label: 'Luxury Cars' },
];

export default function CarsByBudget() {
  const [activeRange, setActiveRange] = useState('under10');
  
  const filteredCars = carsData.filter(car => {
    switch (activeRange) {
      case 'under10':
        return car.priceRange.min < 10;
      case '10to20':
        return car.priceRange.min >= 10 && car.priceRange.max <= 20;
      case '20to30':
        return car.priceRange.min >= 20 && car.priceRange.max <= 30;
      case 'luxury':
        return car.priceRange.min > 30;
      default:
        return true;
    }
  }).slice(0, 4);

  return (
    <section className="py-10 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Cars by Budget
      </h2>
      
      {/* Budget Range Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
        {budgetRanges.map((range) => (
          <button
            key={range.id}
            className={cn(
              "px-4 py-2 text-sm md:text-base font-medium transition-colors relative",
              activeRange === range.id 
                ? "text-[#00D1C1] border-b-2 border-[#00D1C1]" 
                : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
            )}
            onClick={() => setActiveRange(range.id)}
          >
            {range.label}
          </button>
        ))}
      </div>
      
      {/* Car Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredCars.map((car) => (
          <CarCard
            key={car.id}
            name={car.name}
            brand={car.brand}
            image={car.image}
            price={`${car.priceRange.min.toFixed(2)}K - ${car.priceRange.max.toFixed(2)}K IL`}
            link={`/cars/${car.id}`}
          />
        ))}
      </div>
      
      {/* View All Link */}
      <div className="mt-8 text-center">
        <Button variant="outline" className="group dark:border-gray-600 dark:text-white">
          View All {activeRange === 'under10' ? 'Cars Under 10 IL' : 
            activeRange === '10to20' ? 'Cars Between 10-20 IL' : 
            activeRange === '20to30' ? 'Cars Between 20-30 IL' : 'Luxury Cars'}
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </section>
  );
}
