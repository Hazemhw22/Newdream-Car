"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ContactModal from "@/components/ContactModal";
import Link from "next/link";

interface UsedCarCardProps {
  car: {
    id: number | string;
    name: string;
    brand: string;
    price: number;
    originalPrice?: number;
    images: string[];
    features: string[];
    year?: number;
    mileage?: number;
    isBestChoice?: boolean;
    type?: string; // ← تم إضافته هنا
  };
}

export default function UsedCarCard({ car }: UsedCarCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const resolveImageUrl = (img?: string) => {
    if (!img) return "/placeholder-car.svg";
    if (img.startsWith("/") || img.startsWith("http")) return img;
    return (
      (process.env.NEXT_PUBLIC_SUPABASE_URL || "") +
      "/storage/v1/object/public/cars/" +
      img
    );
  };
  const [imageSrc, setImageSrc] = useState<string>(resolveImageUrl(car.images?.[0]));

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatPrice = (price: number) => {
    if (!mounted) return String(price);
    return new Intl.NumberFormat("he-IL", {
      style: "currency",
      currency: "ILS",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatNumber = (value: number) => {
    if (!mounted) return String(value);
    return value.toLocaleString();
  };

  return (
    <>
      <div
        dir="rtl"
        className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative max-w-md sm:max-w-lg lg:max-w-4xl w-full mx-auto border border-gray-300 dark:border-gray-700"
      >
        {/* Used Tag + Best Choice */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 text-xs sm:text-sm">
          <div className="bg-yellow-500 text-white px-2 py-0.5 rounded-full font-bold w-fit">
            יד שנייה
          </div>
          {car.isBestChoice && (
            <div className="bg-rose-600 text-white px-2 py-0.5 rounded-full font-bold w-fit">
              הבחירה שלנו
            </div>
          )}
        </div>

        {/* Car Image */}
        <div className="relative h-40 sm:h-48 lg:h-64 bg-gray-100 dark:bg-gray-700">
          <Image
            src={imageSrc}
            alt={car.name}
            fill
            className="object-contain rounded-t-xl"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => setImageSrc("/placeholder-car.svg")}
          />
        </div>

        {/* Card Content */}
        <div className="p-3 sm:p-4">
          <div className="flex items-center justify-between mb-2 text-xs sm:text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              {car.brand}
            </span>
            <span className="text-gray-500 dark:text-gray-400">
              {car.year} | {car.mileage ? formatNumber(car.mileage) : undefined} ק״מ
            </span>
          </div>

          {/* Car Name */}
          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
            {car.name}
          </h3>

          {/* Features */}
          <div className="space-y-1 mb-4 text-xs sm:text-sm">
            {car.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center text-gray-600 dark:text-gray-400"
              >
                <span className="text-green-500 dark:text-green-400 ml-2">
                  ✓
                </span>
                {feature}
              </div>
            ))}
          </div>

          {/* Price Section */}
          <div className="border-t border-gray-300 dark:border-gray-700 pt-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 space-y-2 sm:space-y-0">
              <div>
                <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {formatPrice(car.price)}
                </div>
                {car.originalPrice && (
                  <div className="text-sm text-gray-500 dark:text-gray-400 line-through">
                    {formatPrice(car.originalPrice)}
                  </div>
                )}
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  מחיר לרכב יד שנייה
                </div>
              </div>
              <div className="text-left">
                <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  ₪ {formatNumber(Math.round(car.price / 60))}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  לחודש
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Link href={`/used-cars/${car.id}`}>
                <Button
                  variant="outline"
                  className="text-sm dark:border-gray-600 dark:text-gray-200 w-full"
                >
                  פרטי הרכב
                </Button>
              </Link>
              <Button
                onClick={() => setShowContactModal(true)}
                className="bg-cyan-500 hover:bg-cyan-600 text-white text-sm w-full"
              >
                צור קשר
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        carName={car.name}
        carImages={car.images}
        carPrice={car.price}
        mileage={car.mileage}
        year={car.year}
      />
    </>
  );
}
