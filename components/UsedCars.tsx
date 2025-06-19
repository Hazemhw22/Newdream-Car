"use client";
import React from "react";
import { Car } from "@/lib/types";
import CarCard from "@/components/CarCard";
import { Badge } from "@/components/ui/badge";

interface UsedCarsProps {
  cars: Car[];
}

export default function UsedCars({ cars }: UsedCarsProps) {
  // تصفية السيارات المستعملة فقط
  const usedCars = cars.filter((car) => car.show_in_used_car);

  if (usedCars.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        אין רכבים משומשים כרגע.
      </div>
    );
  }

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-6 text-right text-cyan-700 dark:text-cyan-300">
        רכבים משומשים
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {usedCars.map((car) => (
          <div key={car.id?.toString()} className="relative">
            <CarCard car={{ ...car, id: car.id.toString() }} />
            <Badge className="absolute top-3 right-3 bg-yellow-500 text-white">
              משומש
            </Badge>
          </div>
        ))}
      </div>
    </section>
  );
}
