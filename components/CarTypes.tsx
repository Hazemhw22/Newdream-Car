'use client';

import React from 'react';
import { Car, Truck, Zap, CircleDot } from 'lucide-react';

const carTypes = [
  { name: 'חשמלית', icon: Zap },        // EV
  { name: 'רכב שטח', icon: Car },       // SUV
  { name: 'משאית', icon: Truck },       // Truck
  { name: 'סדאן', icon: Car },           // Sedan
  { name: 'היברידית', icon: CircleDot }, // Hybrid
];

export default function CarTypes() {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">חיפוש לפי סוג</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {carTypes.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.name}
              className="flex flex-col items-center justify-center p-6 rounded-lg"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-3">
                <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-gray-900 dark:text-gray-100 font-medium">{type.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
