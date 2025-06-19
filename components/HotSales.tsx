"use client";
import React from "react";
import { Car } from "@/lib/types";
import CarCard from "@/components/CarCard";

interface HotSalesProps {
  cars: Car[];
}

export default function HotSales({ cars }: HotSalesProps) {
  // تصفية السيارات التي عليها عروض ساخنة فقط
  const hotSalesCars = cars.filter((car) => car.show_in_sales);

  if (hotSalesCars.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        אין רכבים במבצע חם כרגע.
      </div>
    );
  }

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-6 text-right text-cyan-700 dark:text-cyan-300">
        מבצעים חמים
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {hotSalesCars.map((car) => (
          <CarCard
            key={String(car.id)}
            car={{
              ...car,
              id: String(car.id),
              title: car.title ?? car.name ?? "רכב ללא שם",
              images: car.images ?? (car.image ? [car.image] : []),
            }}
          />
        ))}
      </div>
    </section>
  );
}
