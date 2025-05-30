// components/CarSlider.tsx
'use client';
import CarCard from "@/components/HeroCard";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";

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

  const handleSwipe = (direction: "LEFT" | "RIGHT") => {
    if (direction === "LEFT") {
      setActiveIndex((prev) => (prev + 1) % cars.length);
    } else {
      setActiveIndex((prev) => (prev - 1 + cars.length) % cars.length);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("LEFT"),
    onSwipedRight: () => handleSwipe("RIGHT"),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <section className="py-12 bg-gray-50 text-center px-4">
      <h2 className="text-2xl font-bold mb-6">🔥 Hot Car Deals</h2>

      <div {...swipeHandlers} className="flex justify-center">
        <div className="w-full max-w-md">
          {cars.map((car, idx) =>
            idx === activeIndex ? (
              <CarCard key={idx} {...car} isActive={true} />
            ) : null
          )}
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-4">Swipe left or right</p>
    </section>
  );
}