"use client";
import React from "react";
import { Car } from "@/lib/types";
import CarCard from "@/components/CarCard";
import { Badge } from "@/components/ui/badge";

interface FeaturedCarsProps {
  cars: Car[];
}

export default function FeaturedCars({ cars }: FeaturedCarsProps) {
  const featuredCars = cars.filter((car) => car.show_in_featured);

  if (featuredCars.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        אין רכבים מומלצים כרגע.
      </div>
    );
  }

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-6 text-right text-cyan-700 dark:text-cyan-300">
        רכבים מומלצים
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {featuredCars.map((car) => (
          <div key={car.id.toString()} className="relative">
            <CarCard
              car={{ ...car, id: car.id.toString() }}
              showMainTag={false}
            />
            <Badge className="absolute top-3 right-3 bg-cyan-700 text-white">
              מומלץ
            </Badge>
          </div>
        ))}
      </div>
    </section>
  );
}
