"use client";

import React, { useEffect, useState } from "react";
import CarCard from "@/components/CarCard";
import { supabase } from "@/lib/supabaseClient";
import { Car, Truck, Zap, CircleDot } from "lucide-react";
import Image from "next/image";
import SearchFilters from "@/components/SearchFilters";
import Header from "@/components/Header";

const carTypes = [
  { name: "חשמלי", icon: Zap },
  { name: "רכב פרטי", icon: Car },
  { name: "רכב מסחרי", icon: Truck },
  { name: "רכב שטח", icon: Car },
  { name: "היברידי", icon: CircleDot },
];

export default function NewCarsPage() {
  const [cars, setCars] = useState<any[]>([]);
  const [filteredCars, setFilteredCars] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [brand, setBrand] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("price-low");
  const [carType, setCarType] = useState<string | null>(null);
  const [displayedCars, setDisplayedCars] = useState(12);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        setCars(data || []);
      }
    };

    fetchCars();
  }, []);

  useEffect(() => {
    let result = [...cars];

    // Filter by search
    result = result.filter((car) => {
      if (
        searchTerm &&
        !car.name?.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }
      if (brand !== "all" && car.brand?.toLowerCase() !== brand.toLowerCase()) {
        return false;
      }
      if (priceRange !== "all") {
        const [min, max] = priceRange
          .split("-")
          .map((p) => parseInt(p.replace("+", "")) || Infinity);
        if (
          car.sale_price < min ||
          (max !== Infinity && car.sale_price > max)
        ) {
          return false;
        }
      }
      if (carType && car.type?.toLowerCase() !== carType.toLowerCase()) {
        return false;
      }
      return true;
    });

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.sale_price - b.sale_price;
        case "price-high":
          return b.sale_price - a.sale_price;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredCars(result);
    setDisplayedCars(12); // Reset on filters change
  }, [cars, searchTerm, brand, priceRange, sortBy, carType]);

  const visibleCars = filteredCars.slice(0, displayedCars);

  const loadMore = () => setDisplayedCars((prev) => prev + 12);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Image and Title */}
          <section className="relative bg-gradient-to-b from-[#0088F8]/40 to-[#00D1C1]/40 dark:from-gray-800/30 dark:to-gray-900/30 text-white">
            <div className="absolute inset-0 opacity-50">
              <Image
                src="/poster_34f51998fbd34da2a132f940ea18d2b8.jpeg?height=300&width=400"
                alt="Cars Background"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                רכבים חדשים
              </h1>
              <p className="text-xl md:text-2xl text-white opacity-90">
                מצאו רכבים חדשים מהיבואנים המובילים
              </p>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent" />
          </section>

          {/* Car type filter */}
          <div className="my-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {carTypes.map((type) => {
                const Icon = type.icon;
                const isActive = carType === type.name;
                return (
                  <button
                    key={type.name}
                    onClick={() =>
                      setCarType(carType === type.name ? null : type.name)
                    }
                    className="flex flex-col items-center justify-center p-6 rounded-lg"
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors duration-200
                        ${
                          isActive
                            ? "bg-cyan-200 dark:bg-cyan-700"
                            : "hover:bg-cyan-100 dark:hover:bg-cyan-800"
                        }`}
                    >
                      <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-gray-900 dark:text-gray-100 font-medium">
                      {type.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filters */}
          <SearchFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            brand={brand}
            setBrand={setBrand}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          {/* Result Count */}
          <div className="mb-4 mt-2">
            <p className="text-gray-600 dark:text-gray-400">
              מציגים {visibleCars.length} מתוך {filteredCars.length} רכבים
            </p>
          </div>

          {/* Car Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-3">
            {visibleCars.map((car) => (
              <CarCard
                key={car.id}
                car={{
                  id: car.id.toString(),
                  name: car.name || car.title || "CAR NAME",
                  brand: car.brand,
                  sale_price: car.sale_price,
                  originalPrice: car.market_price,
                  image: car.images?.[0] || "/placeholder-car.jpg",
                  features: car.features,
                  isBestChoice: false,
                  year: car.year,
                  kilometers: car.kilometers,
                  award: undefined,
                }}
              />
            ))}
          </div>

          {/* Load More */}
          {visibleCars.length < filteredCars.length && (
            <div className="text-center mt-8 pb-8">
              <button
                onClick={loadMore}
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                טען עוד רכבים
              </button>
            </div>
          )}

          {/* Error or No Results */}
          {error && (
            <div className="text-red-600 text-center mt-4">שגיאה: {error}</div>
          )}
          {!error && filteredCars.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 dark:text-gray-300">
                לא נמצאו רכבים חדשים התואמים את הקריטריונים שלך.
              </p>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                נסה להתאים את המסננים או מונחי החיפוש.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
