"use client";

import React from "react";
import Image from "next/image";

const carTypes = [
  { name: "חשמלי", image: "/Electric-car.svg" },
  { name: "רכב פרטי", image: "/sedan-car.png" },
  { name: "רכב מסחרי", image: "/van-car.png" },
  { name: "רכב שטח", image: "/suv-car.svg" },
  { name: "היברידי", image: "/hybrid-car.svg" },
];

export default function CarTypes() {
  return (
    <div className="mb-4">
      <div className="overflow-x-auto scrollbar-none">
        <div className="flex gap-4 px-2 md:justify-center md:gap-6">
          {carTypes.map((type) => (
            <button
              key={type.name}
              className="flex flex-col items-center justify-center rounded-lg p-2 min-w-[80px] md:min-w-[100px]"
            >
              <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-1">
                <Image
                  src={type.image}
                  alt={type.name}
                  fill
                  sizes="(max-width: 768px) 96px, 112px"
                  className="object-contain"
                />
              </div>
              <span className="text-[13px] md:text-base text-gray-900 dark:text-gray-100 font-medium text-center">
                {type.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
