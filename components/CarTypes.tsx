"use client";

import React from "react";
import { Car, Truck, Zap, CircleDot, CarFront } from "lucide-react";

const carTypes = [
  { name: "רכב שטח", icon: Car }, // SUV
  { name: "היברידי", icon: CircleDot }, // Hybrid
  { name: "חשמלי", icon: Zap }, // Electric
  { name: "מסחרי", icon: Truck }, // Van
  { name: "רכב פרטי", icon: CarFront }, // Sedan
];

export default function CarTypes() {
  return (
    <div className="mb-4">
      <div className="overflow-x-auto scrollbar-none">
        <div className="flex gap-4 px-2 md:justify-center md:gap-6">
          {carTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.name}
                className="flex flex-col items-center justify-center rounded-lg p-2 min-w-[80px] md:min-w-[100px]"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-1">
                  <Icon className="w-9 h-9 md:w-12 md:h-12 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-[13px] md:text-base text-gray-900 dark:text-gray-100 font-medium text-center">
                  {type.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
