"use client";
import React from "react";
import { Car } from "@/lib/types";
import CarCard from "@/components/CarCard";
import { Badge } from "@/components/ui/badge";
// t
interface NewCarsProps {
  cars: Car[];
}

export default function NewCars({ cars }: NewCarsProps) {
  // تصفية السيارات الجديدة فقط
  const newCars = cars.filter((car) => car.show_in_new_car);

  if (newCars.length === 0) {
    return <div className="text-center text-gray-500 py-8">אין רכבים חדשים כרגע.</div>;
  }

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-6 text-right text-cyan-700 dark:text-cyan-300">
        רכבים חדשים
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {newCars.map((car) => (
          <div key={car.id} className="relative">
            <CarCard
              car={{
                ...car,
                id: String(car.id),
                title: car.title || car.name || "רכב",
                images: car.images || [],
              }}
            />
            <Badge className="absolute top-3 right-3 bg-green-500 text-white">חדש</Badge>
          </div>
        ))}
      </div>
    </section>
  );
}
