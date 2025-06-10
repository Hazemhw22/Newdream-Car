'use client';

import React, { useState } from 'react';
import { cn } from '../lib/utils';

const tabs = [
  { id: 'upcoming', label: 'רכבים בקרוב' },
  { id: 'launched', label: 'רכבים שיצאו לאחרונה' },
];

const upcomingCars = [
  {
    id: 'harrier-ev',
    name: 'טטה הארייר EV',
    image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: '24.00K - 28.00K ש"ח',
    launchDate: '3 ביוני 2025',
  },
  {
    id: 'majestor',
    name: 'MG מג׳סטור',
    image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: '40.00K - 45.00K ש"ח',
    launchDate: 'יוני 2025 (משוער)',
  },
  {
    id: 'cyberster',
    name: 'MG סייברסטר',
    image: 'https://images.pexels.com/photos/3589586/pexels-photo-3589586.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: '60.00K - 70.00K ש"ח',
    launchDate: 'יוני 2025 (משוער)',
  },
  {
    id: 'sierra',
    name: 'טטה סיירה',
    image: 'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: '20.00K - 25.00K ש"ח',
    launchDate: 'יולי 2025',
  },
];

const launchedCars = [
  {
    id: 'curvv',
    name: 'טטה קארב',
    image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: '15.00K - 20.00K ש"ח',
    launchDate: 'מאי 2025',
  },
  {
    id: 'creta-ev',
    name: 'יונדאי קרטה EV',
    image: 'https://images.pexels.com/photos/1719647/pexels-photo-1719647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: '18.00K - 22.00K ש"ח',
    launchDate: 'אפריל 2025',
  },
  {
    id: 'scorpio-n',
    name: 'מהינדרה סקופיו N',
    image: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: '13.00K - 18.00K ש"ח',
    launchDate: 'אפריל 2025',
  },
  {
    id: 'fronx',
    name: 'מרוטי פרונקס',
    image: 'https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: '7.50K - 13.00K ש"ח',
    launchDate: 'מרץ 2025',
  },
];

export default function NewArrivals() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const displayedCars = activeTab === 'upcoming' ? upcomingCars : launchedCars;

  return (
    <section className="py-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        רכבים בקרוב והרכבים שיצאו לאחרונה
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
          {activeTab === 'upcoming' ? 'מחירים משוערים' : 'המחירים הם Ex-showroom'}
        </p>
      </div>
    </section>
  );
}
