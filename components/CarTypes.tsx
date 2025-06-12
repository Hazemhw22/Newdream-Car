'use client';

import React from 'react';
import { Car, Truck, Zap, CircleDot } from 'lucide-react';

const carTypes = [
  { name: 'חשמלי', icon: Zap },        // EV - 1
  { name: 'רכב פרטי', icon: Car },     // Sedan - 2
  { name: 'רכב מסחרי', icon: Truck }, // Truck - 3
  { name: 'רכב שטח', icon: Car },      // SUV - 4
  { name: 'היברידי', icon: CircleDot }, // Hybrid - 5
];

export default function CarTypes() {
  const Icon1 = carTypes[0].icon;
  const Icon2 = carTypes[1].icon;
  const Icon3 = carTypes[2].icon;
  const Icon4 = carTypes[3].icon;
  const Icon5 = carTypes[4].icon;

  return (
    <div className="mb-2">
      <div className="
        grid gap-4 justify-items-center items-center
        md:grid-cols-5 md:grid-rows-1
        grid-rows-[auto_auto_auto] 
        grid-cols-[repeat(3,1fr)]
        md:gap-6
        "
        style={{
          // ترتيب خاص للموبايل
          gridTemplateAreas: `
            "a . c"
            ". b ."
            "d . e"
          `,
        }}
      >
        <button
          className="flex flex-col items-center justify-center rounded-lg p-4"
          style={{ gridArea: 'a' }}
        >
          <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-2">
            <Icon1 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <span className="text-gray-900 dark:text-gray-100 font-medium text-sm">{carTypes[0].name}</span>
        </button>

        <button
          className="flex flex-col items-center justify-center rounded-lg p-4"
          style={{ gridArea: 'b' }}
        >
          <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-2">
            <Icon5 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <span className="text-gray-900 dark:text-gray-100 font-medium text-sm">{carTypes[4].name}</span>
        </button>

        <button
          className="flex flex-col items-center justify-center rounded-lg p-4"
          style={{ gridArea: 'c' }}
        >
          <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-2">
            <Icon3 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <span className="text-gray-900 dark:text-gray-100 font-medium text-sm">{carTypes[2].name}</span>
        </button>

        <button
          className="flex flex-col items-center justify-center rounded-lg p-4"
          style={{ gridArea: 'd' }}
        >
          <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-2">
            <Icon2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <span className="text-gray-900 dark:text-gray-100 font-medium text-sm">{carTypes[1].name}</span>
        </button>

        <button
          className="flex flex-col items-center justify-center rounded-lg p-4"
          style={{ gridArea: 'e' }}
        >
          <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-2">
            <Icon4 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <span className="text-gray-900 dark:text-gray-100 font-medium text-sm">{carTypes[3].name}</span>
        </button>
      </div>
    </div>
  );
}
