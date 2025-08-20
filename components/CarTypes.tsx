"use client";

import React from "react";
import Image from "next/image";

type CarTypeItem = { name: string; value: string; image: string };

const defaultCarTypes: CarTypeItem[] = [
  { name: "חשמלי", value: "ELECTRIC", image: "/Electric-car.svg" },
  { name: "רכב פרטי", value: "SEDAN", image: "/sedan-car.png" },
  { name: "רכב מסחרי", value: "VAN", image: "/van-car.png" },
  { name: "רכב שטח", value: "SUV", image: "/suv-car.svg" },
  { name: "היברידי", value: "HYBRID", image: "/hybrid-car.svg" },
];

interface CarTypesProps {
  selectedType?: string | null;
  onSelect?: (value: string) => void;
  types?: CarTypeItem[];
}

export default function CarTypes({ selectedType, onSelect, types = defaultCarTypes }: CarTypesProps) {
  return (
    <div className="mb-4">
      <div className="overflow-x-auto scrollbar-none">
        <div className="flex gap-4 px-2 md:justify-center md:gap-6">
          {types.map((type) => (
            <button
              key={type.name}
              onClick={() => onSelect?.(type.value)}
              aria-pressed={selectedType === type.value}
              className={`flex flex-col items-center justify-center rounded-lg p-2 min-w-[96px] md:min-w-[112px]`}
            >
              <div className={`relative w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center mb-1 ${
                selectedType === type.value
                  ? "bg-cyan-100 dark:bg-cyan-900 ring-2 ring-cyan-500 ring-offset-2"
                  : "bg-blue-100 dark:bg-blue-900"
              }`}>
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
