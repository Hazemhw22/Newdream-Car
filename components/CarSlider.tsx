// components/CarSlider.tsx
'use client';
import CarCard from "@/components/HeroCard";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
const cars = [
  {
    title: "Chery FX EV",
    description: "Electric SUV with 3+ months bonus insurance",
    imageUrl: "/IMAGE 1.jpg",
  },
  {
    title: "Chery Tiggo 7 Pro",
    description: "Hybrid comfort and performance for city life",
    imageUrl: "/IMAGE 2.jpg",
  },
  {
    title: "Dacia Duster Hybrid",
    description: "A reliable hybrid for your adventures",
    imageUrl: "/image 3.jpg",
  },
  {
    title: "Toyota Corolla",
    description: "Great value with advanced safety features",
    imageUrl: "/images.jpg",
  },
];

export default function CarSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + cars.length) % cars.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % cars.length);
  };

  return (
    <section className="py-12 bg-gray-50 text-center">
      <h2 className="text-2xl font-bold mb-6">🔥 Hot Car Deals</h2>
      <div className="flex items-center justify-center gap-4">
        <Button variant="ghost" onClick={handlePrev}>
          <ChevronLeft className="w-6 h-6" />
        </Button>

        <div className="flex gap-6 transition-all duration-300">
          {cars.map((car, idx) => (
            <CarCard key={idx} {...car} isActive={idx === activeIndex} />
          ))}
        </div>

        <Button variant="ghost" onClick={handleNext}>
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>
    </section>
  );
}