'use client';

import React, { useState } from 'react';
import { cn } from '../lib/utils';


const tabs = [
  { id: 'upcoming', label: 'Upcoming Cars' },
  { id: 'launched', label: 'Just Launched Cars' },
];

const upcomingCars = [
  {
    id: 'harrier-ev',
    name: 'Tata Harrier EV',
    image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 'Rs. 24.00 - 28.00 Lakh',
    launchDate: '3rd Jun 2025',
  },
  {
    id: 'majestor',
    name: 'MG Majestor',
    image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 'Rs. 40.00 - 45.00 Lakh',
    launchDate: 'Jun 2025 (Tentative)',
  },
  {
    id: 'cyberster',
    name: 'MG Cyberster',
    image: 'https://images.pexels.com/photos/3589586/pexels-photo-3589586.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 'Rs. 60.00 - 70.00 Lakh',
    launchDate: 'Jun 2025 (Tentative)',
  },
  {
    id: 'sierra',
    name: 'Tata Sierra',
    image: 'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 'Rs. 20.00 - 25.00 Lakh',
    launchDate: 'Jul 2025',
  },
];

const launchedCars = [
  {
    id: 'curvv',
    name: 'Tata Curvv',
    image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 'Rs. 15.00 - 20.00 Lakh',
    launchDate: 'May 2025',
  },
  {
    id: 'creta-ev',
    name: 'Hyundai Creta EV',
    image: 'https://images.pexels.com/photos/1719647/pexels-photo-1719647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 'Rs. 18.00 - 22.00 Lakh',
    launchDate: 'Apr 2025',
  },
  {
    id: 'scorpio-n',
    name: 'Mahindra Scorpio N',
    image: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 'Rs. 13.00 - 18.00 Lakh',
    launchDate: 'Apr 2025',
  },
  {
    id: 'fronx',
    name: 'Maruti Fronx',
    image: 'https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 'Rs. 7.50 - 13.00 Lakh',
    launchDate: 'Mar 2025',
  },
];

export default function NewArrivals() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const displayedCars = activeTab === 'upcoming' ? upcomingCars : launchedCars;

  return (
    <section className="py-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Upcoming and Recently Launched Cars
      </h2>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-300 dark:border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={cn(
              "px-4 py-2 text-sm md:text-base font-medium transition-colors relative",
              activeTab === tab.id
                ? "text-[#00D1C1] border-b-2 border-[#00D1C1]"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
            )}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Car Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedCars.map((car) => (
          <div
            key={car.id}
            className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="aspect-[16/9] relative">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${car.image})` }}
              ></div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1 text-gray-900 dark:text-gray-100">{car.name}</h3>
              <p className="text-gray-700 dark:text-gray-200 mb-2">{car.price}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{car.launchDate}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          {activeTab === 'upcoming' ? 'Showing Estimated Prices' : 'Prices are Ex-showroom'}
        </p>
      </div>
    </section>
  );
}