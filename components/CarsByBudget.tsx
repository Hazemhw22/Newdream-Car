'use client';

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import CarPriceCard from '../components/cardbudget';
import ContactModal from '../components/ContactModal';
import { Button } from '../components/ui/button';
import { carsData, Car } from '../lib/data';

const budgetRanges = [
  { id: 'under10', label: 'מתחת ל-10,000 ש"ח' },
  { id: '10to20', label: '10,000 - 20,000 ש"ח' },
  { id: '20to30', label: '20,000 - 30,000 ש"ח' },
  { id: 'luxury', label: 'מכוניות יוקרה' },
];

// פונקציה להמרת מחירי K ל-ש"ח מלאים עם פסיקים
function formatPriceInILS(kPrice: number) {
  const fullPrice = Math.round(kPrice * 1000);
  return fullPrice.toLocaleString('he-IL');
}

export default function CarsByBudget() {
  const [activeRange, setActiveRange] = useState('under10');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

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

  const openInquiryModal = (car: Car) => {
    setSelectedCar(car);
    setModalOpen(true);
  };

  const closeInquiryModal = () => {
    setModalOpen(false);
    setSelectedCar(null);
  };

  return (
    <section className="py-10 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        רכבים לפי תקציב
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
          <CarPriceCard
            key={car.id}
            name={car.name}
            brand={car.brand}
            image={car.image}
            price={`${formatPriceInILS(car.priceRange.min)} - ${formatPriceInILS(car.priceRange.max)} ש"ח`}
            onInquiry={() => openInquiryModal(car)}
          />
        ))}
      </div>
      
      {/* View All Link */}
      <div className="mt-8 text-center">
        <Button variant="outline" className="group dark:border-gray-600 dark:text-white">
          הצג את כל ה-{activeRange === 'under10' ? 'רכבים מתחת ל-10,000 ש"ח' : 
            activeRange === '10to20' ? 'רכבים בין 10,000 ל-20,000 ש"ח' : 
            activeRange === '20to30' ? 'רכבים בין 20,000 ל-30,000 ש"ח' : 'מכוניות יוקרה'}
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>

      {/* Contact Modal */}
      {selectedCar && (
        <ContactModal
          isOpen={modalOpen}
          onClose={closeInquiryModal}
          carName={selectedCar.name}
          carImage={selectedCar.image}
          carPrice={selectedCar.priceRange.min * 1000} // מחיר מינימום בש"ח מלא
        />
      )}
    </section>
  );
}
