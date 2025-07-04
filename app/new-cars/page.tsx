"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import SearchFilters from "@/components/SearchFilters";
import CarCard from "@/components/CarCard";
import { getSupabaseBrowserClient } from "../../lib/supabaseClient";
import {
  Car as CarIcon,
  CarFront,
  Truck,
  Zap,
  CircleDot,
  Filter,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Car as CarType } from "../../lib/types";

const carTypes = [
  { name: "חשמלי", value: "ELECTRIC", icon: Zap },
  { name: "רכב פרטי", value: "SEDAN", icon: CarFront },
  { name: "רכב מסחרי", value: "VAN", icon: Truck },
  { name: "רכב שטח", value: "SUV", icon: CarIcon },
  { name: "היברידי", value: "HYBRID", icon: CircleDot },
];

export default function NewCarsPage() {
  const [cars, setCars] = useState<CarType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [brand, setBrand] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("price-low");
  const [displayedCars, setDisplayedCars] = useState(12);
  const [carType, setCarType] = useState<string | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [year, setYear] = useState<string>("all");

  const years = Array.from(
    new Set(cars.map((car) => car.year).filter((y) => typeof y === "number"))
  ).sort((a, b) => b - a);

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const supabase = getSupabaseBrowserClient();
        const { data, error } = await supabase
          .from("cars")
          .select("*")
          .eq("status", "new")
          .order("created_at", { ascending: false });

        if (error) {
          setError(error.message);
          setCars([]);
        } else {
          setCars(((data as unknown) as CarType[]) || []);
        }
      } catch (err: any) {
        setError(err.message || "שגיאה בטעינת הנתונים");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  useEffect(() => {
    setDisplayedCars(12);
  }, [searchTerm, brand, priceRange, sortBy, carType]);

  const filteredCars = cars
    .filter((car) => {
      if (
        searchTerm &&
        !(car.name || "").toLowerCase().includes(searchTerm.toLowerCase())
      )
        return false;
      if (brand !== "all" && car.brand?.toLowerCase() !== brand.toLowerCase())
        return false;
      if (year !== "all" && car.year?.toString() !== year) return false;
      if (priceRange !== "all") {
        const [min, max] = priceRange
          .split("-")
          .map((v) => parseInt(v.replace("+", "")) || Infinity);
        if (car.sale_price < min || (max !== Infinity && car.sale_price > max))
          return false;
      }
      if (carType && car.type?.toUpperCase() !== carType) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.sale_price - b.sale_price;
      if (sortBy === "price-high") return b.sale_price - a.sale_price;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "newest") return b.year - a.year;
      return 0;
    });

  const visibleCars = filteredCars.slice(0, displayedCars);
  const loadMore = () => setDisplayedCars((prev) => prev + 12);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="pt-20 px-4 sm:px-6 lg:px-8 flex-1">
        <div className="max-w-7xl mx-auto pb-10">
          <section className="relative bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-800 dark:to-cyan-700 rounded-xl overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <Image
                src="/BMW-electric-and-luxury-car-lineup-with-mountain-background.png"
                alt="Cars Background"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10 text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                רכבים חדשים
              </h1>
              <p className="text-lg md:text-2xl text-white opacity-90 max-w-2xl mx-auto">
                מצאו רכבים חדשים מהיבואנים המובילים עם אחריות יצרן מלאה
              </p>
            </div>
          </section>

          <div className="md:hidden sticky top-16 z-20 bg-gray-50 dark:bg-gray-900 py-3 -mx-4 px-4 shadow-sm">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <Filter className="h-4 w-4" /> סינון וחיפוש
            </Button>
          </div>

          <div
            className={`my-6 ${
              showMobileFilters ? "block" : "hidden md:block"
            }`}
          >
            <h2 className="text-lg font-semibold mb-3 text-right">סוג רכב</h2>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-4">
              {carTypes.map((type) => {
                const Icon = type.icon;
                const isActive = carType === type.value;
                return (
                  <button
                    key={type.value}
                    onClick={() =>
                      setCarType(carType === type.value ? null : type.value)
                    }
                    className={`flex flex-col items-center justify-center p-3 sm:p-6 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-cyan-100 dark:bg-cyan-800 shadow-md scale-105"
                        : "bg-white dark:bg-gray-800 hover:bg-cyan-50 dark:hover:bg-cyan-900"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-2 transition-colors duration-200 ${
                        isActive
                          ? "bg-cyan-200 dark:bg-cyan-700"
                          : "bg-gray-100 dark:bg-gray-700"
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 sm:w-7 sm:h-7 ${
                          isActive
                            ? "text-cyan-600 dark:text-cyan-400"
                            : "text-gray-600 dark:text-gray-400"
                        }`}
                      />
                    </div>
                    <span
                      className={`text-sm sm:text-base font-medium ${
                        isActive
                          ? "text-cyan-700 dark:text-cyan-300"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {type.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            className={`mt-6 ${
              showMobileFilters ? "block" : "hidden md:block"
            }`}
          >
            <SearchFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              brand={brand}
              setBrand={setBrand}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              sortBy={sortBy}
              setSortBy={setSortBy}
              year={year}
              setYear={setYear}
              years={years}
            />
          </div>

          <div className="mb-4 mt-6">
            <div className="flex justify-between items-center">
              <p className="text-gray-600 dark:text-gray-400">
                מציגים {visibleCars.length} מתוך {filteredCars.length} רכבים
              </p>
              {showMobileFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMobileFilters(false)}
                  className="md:hidden"
                >
                  סגור
                </Button>
              )}
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array(8)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow"
                  >
                    <Skeleton className="h-48 w-full" />
                    <div className="p-4">
                      <Skeleton className="h-4 w-1/3 mb-2" />
                      <Skeleton className="h-6 w-3/4 mb-4" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-2/3 mb-4" />
                      <div className="pt-4 border-t">
                        <Skeleton className="h-6 w-1/2 mb-2" />
                        <div className="flex gap-2 mt-4">
                          <Skeleton className="h-10 w-full" />
                          <Skeleton className="h-10 w-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {visibleCars.map((car) => (
                <CarCard
                  key={car.id}
                  car={{
                    id: car.id.toString(),
                    title: car.title || "CAR NAME",
                    brand: car.brand,
                    sale_price: car.sale_price,
                    originalPrice: car.market_price,
                    images: car.images || ["/placeholder-car.jpg"],
                    features: car.features || [],
                    isBestChoice: false,
                    year: car.year,
                    kilometers: car.kilometers,
                    award: car.year === 2025 ? "רכב השנה" : undefined,
                  }}
                />
              ))}
            </div>
          )}

          {!loading && visibleCars.length < filteredCars.length && (
            <div className="text-center mt-8 pb-8">
              <Button
                onClick={loadMore}
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-6 rounded-lg font-medium transition-colors"
              >
                טען עוד רכבים
              </Button>
            </div>
          )}

          {!loading && visibleCars.length === 0 && (
            <div className="text-center mt-10 text-gray-500 dark:text-gray-400">
              לא נמצאו רכבים התואמים לחיפוש
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
