"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ContactModal from "./ContactModal";

interface CarCardProps {
  car: {
    id: string;
    title: string;
    brand: string;
    sale_price: number;
    originalPrice?: number;
    images: string[];
    features?: string[];
    isBestChoice?: boolean;
    year?: number;
    kilometers?: number;
    award?: string;
    show_in_sales?: boolean;
    show_in_luxery_car?: boolean;
    show_in_new_car?: boolean;
    show_in_used_car?: boolean;
    show_in_featured?: boolean;
  };
  showMainTag?: boolean;
}

export default function CarCard({ car }: CarCardProps) {
  const [showContactModal, setShowContactModal] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("he-IL", {
      style: "currency",
      currency: "ILS",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      <div
        dir="rtl"
        className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative max-w-md sm:max-w-lg lg:max-w-4xl w-full mx-auto border border-gray-300 dark:border-gray-700"
      >
        {/* Header Tags */}
        {/* تمت إزالة جميع الأوسمة */}

        {/* Car Image */}
        <div className="relative h-40 sm:h-48 lg:h-64 bg-gray-100 dark:bg-gray-700">
          <Image
            src={
              process.env.NEXT_PUBLIC_SUPABASE_URL +
              "/storage/v1/object/public/cars/" +
              car.images[0]
            }
            alt={car.title || "תמונת רכב"}
            fill
            className="object-contain rounded-t-xl"
          />
        </div>

        {/* Card Content */}
        <div className="p-3 sm:p-4">
          <div className="flex items-center justify-between mb-2 text-xs sm:text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              {car.brand}
            </span>
            <span className="text-gray-500 dark:text-gray-400">
              {car.year} | {car.kilometers?.toLocaleString()} ק&quot;מ
            </span>
          </div>

          {/* Car Name */}
          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
            {car.title}
          </h3>

          {/* Features */}
          {car.features && car.features.length > 0 && (
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
          )}

          {/* Price Section */}
          <div className="border-t border-gray-300 dark:border-gray-700 pt-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 space-y-2 sm:space-y-0">
              <div>
                <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {formatPrice(car.sale_price)}
                </div>
                {car.originalPrice && (
                  <div className="text-xs text-gray-500 dark:text-gray-400 line-through">
                    {formatPrice(car.originalPrice)}
                  </div>
                )}
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  מחיר לפני הנחה
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  ₪{Math.round(car.sale_price / 60).toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  לחודש
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Link href={`/new-cars/${car.id.toString()}`}>
                <Button
                  variant="outline"
                  className="text-sm dark:border-gray-600 dark:text-gray-200 w-full"
                >
                  פרטי רכב
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

      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        carName={car.title}
        carImages={car.images}
        carPrice={car.sale_price}
        mileage={car.kilometers}
        year={car.year}
      />
    </>
  );
}
