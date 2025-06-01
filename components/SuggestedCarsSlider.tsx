"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface SuggestedCarsSliderProps {
  currentCarId?: string
}

const cars = [
  { id: "1", name: "Toyota CHR", image: "/2022-Mercedes-Benz-C-Class-White.png?height=200&width=300", path: "/new-cars/1" },
  { id: "2", name: "Kia Sportage", image: "/pngimg.com - bmw_PNG99558.png?height=200&width=300", path: "/new-cars/2" },
  { id: "3", name: "Hyundai Tucson", image: "/STAM-TOYOTA-LAND-CRUISER-2022.png?height=200&width=300", path: "/new-cars/3" },
  { id: "4", name: "Mazda CX-5", image: "/STAM-TOYOTA-LAND-CRUISER-2022.png?height=200&width=300", path: "/new-cars/4" },
  { id: "5", name: "Honda CR-V", image: "/pngimg.com - bmw_PNG99558.png?height=200&width=300", path: "/new-cars/5" },
  { id: "6", name: "Nissan Qashqai", image: "/2022-Mercedes-Benz-C-Class-White.png?height=200&width=300", path: "/new-cars/6" },
]

export function SuggestedCarsSlider({ currentCarId }: SuggestedCarsSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return
    sliderRef.current.scrollBy({
      left: direction === "left" ? -250 : 250,
      behavior: "smooth",
    })
  }

  // Filter out the current car
  const filteredCars = cars.filter((car) => car.id !== currentCarId)

  return (
    <div className="relative">
      {/* Desktop Navigation Buttons */}
      <button
        onClick={() => scroll("left")}
        className="hidden md:flex absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-blue-600 p-3 rounded-full shadow-xl hover:bg-blue-700 hover:shadow-2xl transition-colors"
        aria-label="Scroll left"
        >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={() => scroll("right")}
        className="hidden md:flex absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-blue-600 p-3 rounded-full shadow-xl hover:bg-blue-700 hover:shadow-2xl transition-colors"
        aria-label="Scroll right"
          >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>


      {/* Mobile Optimized Slider */}
      <div
        ref={sliderRef}
        className="flex gap-3 md:gap-4 overflow-x-auto no-scrollbar py-4 px-2 snap-x snap-mandatory touch-pan-x"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {filteredCars.map((car) => (
          <Link
            key={car.id}
            href={car.path}
            className="min-w-[200px] md:min-w-[220px] bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 snap-start touch-manipulation active:scale-95"
          >
            <div className="relative h-32 md:h-40 rounded-t-xl overflow-hidden">
              <Image
                src={car.image || "/placeholder.svg"}
                alt={car.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 200px, 220px"
              />
            </div>
            <div className="p-3">
              <p className="text-center font-semibold text-gray-800 dark:text-white text-sm md:text-base">{car.name}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Mobile Scroll Indicator */}
        <div className="flex justify-center mt-2 md:hidden">
          <div className="flex space-x-2">
            {Array.from({ length: Math.ceil(filteredCars.length / 2) }).map((_, index) => (
              <div key={index} className="w-2 h-2 bg-gray-300 rounded-full" />
            ))}
          </div>
        </div>
    </div>
  )
}
