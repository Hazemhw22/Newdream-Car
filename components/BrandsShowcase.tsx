"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { Button } from "../components/ui/button";

const brands = [
  { name: "טאטה", logo: "/Mercedes-Logo.svg.png" },
  { name: "מרוטי סוזוקי", logo: "/Mercedes-Logo.svg.png" },
  { name: "מהינדרה", logo: "/Mercedes-Logo.svg.png" },
  { name: "יונדאי", logo: "/Mercedes-Logo.svg.png" },
  { name: "טויוטה", logo: "/Mercedes-Logo.svg.png" },
  { name: "קיה", logo: "/Mercedes-Logo.svg.png" },
  { name: "ב.מ.וו", logo: "/Mercedes-Logo.svg.png" },
  { name: "סקודה", logo: "/Mercedes-Logo.svg.png" },
  { name: "פולקסווגן", logo: "/Mercedes-Logo.svg.png" },
  { name: "מרצדס-בנץ", logo: "/Mercedes-Logo.svg.png" },
  { name: "לנד רובר", logo: "/Mercedes-Logo.svg.png" },
  { name: "הונדה", logo: "/Mercedes-Logo.svg.png" },
];

export default function BrandsShowcase() {
  const [showAll, setShowAll] = useState(false);
  const displayedBrands = showAll ? brands : brands.slice(0, 6);

  return (
    <section className="py-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        כל המותגים
      </h2>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mb-6">
        {displayedBrands.map((brand, index) => (
          <Link
            key={index}
            href={`/brands/${brand.name.toLowerCase().replace(/\s+/g, "-")}`}
            className="group flex flex-col items-center"
          >
            <div className="aspect-square rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700 hover:border-[#00D1C1] dark:hover:border-[#00D1C1] transition-colors w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center bg-white dark:bg-gray-900">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={96}
                height={96}
                className="w-3/4 h-3/4 object-contain transition-transform duration-300 group-hover:scale-110"
                unoptimized
              />
            </div>
            <span className="mt-4 text-gray-900 dark:text-gray-100 font-bold text-lg sm:text-xl text-center px-1">
              {brand.name}
            </span>
          </Link>
        ))}
      </div>

      {/* Toggle View More */}
      <div className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => setShowAll(!showAll)}
          className="text-gray-600 dark:text-gray-300 flex items-center gap-1"
        >
          {showAll ? "הצג פחות" : "הצג עוד מותגים"}
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              showAll ? "rotate-180" : ""
            }`}
          />
        </Button>
      </div>
    </section>
  );
}
