"use client";
import React from "react";
import { Car } from "@/lib/types";
import CarCard from "@/components/CarCard";
import { Badge } from "@/components/ui/badge";

interface LuxuryCarsProps {
  cars: Car[];
}

export default function LuxuryCars({ cars }: LuxuryCarsProps) {
  // تصفية السيارات الفخمة فقط
  const luxuryCars = cars.filter((car) => car.show_in_luxery_car);

  if (luxuryCars.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">אין רכבי יוקרה כרגע.</div>
    );
  }

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-6 text-right text-cyan-700 dark:text-cyan-300">
        רכבי יוקרה
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {luxuryCars.map((car) => (
          <div key={car.id} className="relative">
            <CarCard car={{ 
              ...car, 
              id: String(car.id), 
              title: car.title ?? car.name, // fallback to car.name if title is undefined
              images: car.images ?? [] // ensure images is always a string[]
            }} />
            <Badge className="absolute top-3 right-3 bg-purple-700 text-white">
              יוקרה
            </Badge>
          </div>
        ))}
      </div>
    </section>
  );
}
