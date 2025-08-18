"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Share2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SuggestedCarsSlider } from "@/components/SuggestedCarsSlider";
import { Badge } from "@/components/ui/badge";
import CarColorPicker from "@/components/CarColorPicker";
import { FinancingCalculator } from "@/components/FinancingCalculator";
import CarImages from "@/components/CarImages";
import { SellerInfoCard } from "@/components/SellerInfoCard";
import type { Car, Feature } from "../../../lib/types";

export default function CarDetailsClientPage({ car }: { car: Car }) {
  // عدل هنا: استخدم color وليس name/image/hex
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    car.colors && car.colors.length > 0 ? car.colors[0].color : undefined
  );
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    car.colors && car.colors.length > 0 && car.colors[0].images?.length > 0
      ? car.colors[0].images[0]
      : car.images && car.images.length > 0
      ? car.images[0]
      : undefined
  );

  // Financing Calculator State
  const [selectedMonths, setSelectedMonths] = useState(60);
  const [downPayment, setDownPayment] = useState(
    Math.round(car.sale_price * 0.2)
  );
  const [finalPayment, setFinalPayment] = useState(
    Math.round(car.sale_price * 0.3)
  );
  const [interestRate, setInterestRate] = useState(0.05);

  // حساب القسط الشهري
  const calculateMonthlyPayment = () => {
    const loanAmount = car.sale_price - downPayment - finalPayment;
    const monthlyRate = interestRate / 12;
    const payment =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, selectedMonths)) /
      (Math.pow(1 + monthlyRate, selectedMonths) - 1);
    return Math.round(payment);
  };

  const monthlyPayment = calculateMonthlyPayment();

  // عدل هنا: استخدم color بدلاً من name/image/hex
  const handleColorSelect = (colorValue: string) => {
    setSelectedColor(colorValue);
    const colorObj = car.colors?.find((c) => c.color === colorValue);
    if (colorObj?.images?.length) {
      setSelectedImage(colorObj.images[0]);
    }
  };

  const handlePhoneCall = () => {
    if (car.providers?.phone) {
      window.open(`tel:${car.providers.phone}`, "_self");
    } else {
      window.open(`tel:+972-50-123-4567`, "_self");
    }
  };

  const handleWhatsAppContact = () => {
    const phone = "+972501234567";
    const message = encodeURIComponent(
      `שלום! אני מעוניין ב${car.brand} ${car.name} (${
        car.year
      }) במחיר ${formatPrice(car.sale_price)}. האם תוכל לספק מידע נוסף?`
    );
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("he-IL", {
      style: "currency",
      currency: "ILS",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div
      className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-20"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* التفاصيل والصور */}
        <div className="lg:col-span-2 space-y-8">
          {/* العنوان */}
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">
              {car.brand} {car.name}
            </h1>
            <div className="flex items-center gap-4 text-base text-gray-600 dark:text-gray-400">
              <span>
                {car.year} | {car.kilometers?.toLocaleString("he-IL") || "0"}{" "}
                ק&quot;מ
              </span>
              <span>קטגוריה: {car.type || "רכב פרטי"}</span>
            </div>
          </div>
          
          {/* صور السيارة */}
          <div className="relative">
            <CarImages car={{ name: car.name, images: car.images || [] }} />
            <div className="absolute top-2 right-2 z-10 flex gap-2">
              <Link href="/new-cars">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-white/95 dark:bg-gray-800/95 h-10 w-10 shadow-lg"
                >
                  <ArrowLeft className="h-5 w-5 rotate-180" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white/95 dark:bg-gray-800/95 h-10 w-10 shadow-lg"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: `${car.brand} ${car.name}`,
                      text: `בדוק את הרכב הזה: ${car.brand} ${car.name} שנת ${car.year}`,
                      url: window.location.href,
                    });
                  }
                }}
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
              {car.year === 2025 && (
                <Badge className="bg-green-500 hover:bg-green-600">חדש</Badge>
              )}
              {car.type === "חשמלי" && (
                <Badge className="bg-blue-500 hover:bg-blue-600">חשמלי</Badge>
              )}
              {car.type === "היברידי" && (
                <Badge className="bg-teal-500 hover:bg-teal-600">היברידי</Badge>
              )}
            </div>
          </div>

          {/* السعر والدفعات وأزرار التواصل - يظهر أسفل الصور في الجوال فقط */}
          <div className="block lg:hidden">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mt-4">
              <div className="mb-4 text-right">
                <div className="text-2xl font-bold">
                  {formatPrice(car.sale_price)}
                </div>
                {car.market_price && car.market_price > car.sale_price && (
                  <div className="text-sm text-gray-500 line-through">
                    {formatPrice(car.market_price)}
                  </div>
                )}
                <div className="text-sm text-gray-500">מחיר מחירון</div>
              </div>
              <div className="mb-4 border-t border-b py-3 text-right">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xl font-bold">
                    {formatPrice(monthlyPayment)}
                  </div>
                  <div className="text-sm text-gray-500">תשלום חודשי</div>
                </div>
                <div className="text-xs text-gray-500">
                  אפשרות למימון הרכב בתשלום חודשי נמוך לפי המסלולים הבאים:
                </div>
              </div>
              <div className="space-y-3 mt-6">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    className="bg-green-500 hover:bg-green-600 text-white h-12 text-base font-semibold"
                    onClick={handleWhatsAppContact}
                  >
                    וואטסאפ
                  </Button>
                  <Button
                    className="bg-blue-500 hover:bg-blue-600 text-white h-12 text-base font-semibold"
                    onClick={handlePhoneCall}
                  >
                    התקשר עכשיו
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* وصف السيارة */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-bold mb-4 text-right">תיאור הרכב</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-right">
              {car.description || "אין תיאור זמין לרכב זה."}
            </p>
          </div>

          {/* Tabs: اللون - الصور - المواصفات - السمات */}
          <Tabs defaultValue="color" className="w-full">
            <TabsList className="w-full grid grid-cols-4 h-14 text-sm bg-gray-100 dark:bg-gray-700 rounded-none">
              <TabsTrigger value="color" className="font-semibold">
                צבע
              </TabsTrigger>
              <TabsTrigger value="images" className="font-semibold">
                תמונות
              </TabsTrigger>
              <TabsTrigger value="specs" className="font-semibold">
                מפרט
              </TabsTrigger>
              <TabsTrigger value="features" className="font-semibold">
                תכונות
              </TabsTrigger>
            </TabsList>
            {/* تبويب اللون */}
            <TabsContent value="color" className="p-4">
              {car.colors && car.colors.length > 0 ? (
                <div className="flex flex-col items-center gap-2">
                  <CarColorPicker
                    colorOptions={car.colors}
                    selectedColor={selectedColor}
                    onSelectColor={handleColorSelect}
                  />
                  <div className="w-full flex justify-center mt-2">
                    {(() => {
                      // ابحث عن اللون المختار أو الأول كافترتي
                      const selected =
                        car.colors.find((c) => c.color === selectedColor) ||
                        car.colors[0];
                      const imageUrl =
                        selected.images && selected.images.length > 0
                          ? selected.images[0].startsWith("http")
                            ? selected.images[0]
                            : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/cars/${selected.images[0]}`
                          : null;
                      return imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={selected.color}
                          width={320}
                          height={180}
                          className="rounded-xl object-contain bg-white"
                          style={{ maxWidth: 320, maxHeight: 180 }}
                        />
                      ) : (
                        <div
                          className="rounded-xl"
                          style={{
                            width: 320,
                            height: 180,
                            background: selected.color || "#eee",
                            border: "2px solid #ccc",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#333",
                            fontWeight: "bold",
                            fontSize: 24,
                          }}
                        >
                          {selected.color}
                        </div>
                      );
                    })()}
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  אין צבעים זמינים
                </div>
              )}
            </TabsContent>
            {/* تبويب الصور */}
            <TabsContent value="images" className="p-4">
              <CarImages car={{ name: car.name, images: car.images || [] }} />
            </TabsContent>
            {/* تبويب المواصفات */}
            <TabsContent value="specs" className="p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b pb-2 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    {car.year}
                  </span>
                  <span className="font-medium">שנת ייצור</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    {car.kilometers?.toLocaleString() || "0"} ק&quot;מ
                  </span>
                  <span className="font-medium">קילומטראז&apos;</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    {car.type || "רכב פרטי"}
                  </span>
                  <span className="font-medium">סוג רכב</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    {car.brand}
                  </span>
                  <span className="font-medium">יצרן</span>
                </div>
              </div>
            </TabsContent>
            {/* تبويب السمات */}
            <TabsContent value="features" className="p-4">
              <ul className="space-y-3 text-right">
                {car.features && car.features.length > 0 ? (
                  car.features.map((feature: string | Feature, index: number) => {
                    const label =
                      typeof feature === "string"
                        ? feature
                        : feature.value
                        ? `${feature.name}: ${feature.value}`
                        : feature.name;
                    return (
                      <li
                        key={index}
                        className="flex items-center justify-end gap-3 text-sm"
                      >
                        <span>{label}</span>
                        <span className="text-green-500 text-lg">✓</span>
                      </li>
                    );
                  })
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    אין תכונות זמינות לרכב זה
                  </div>
                )}
              </ul>
            </TabsContent>
          </Tabs>

          {/* السيارات المقترحة */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-bold mb-4 text-center">
              רכבים נוספים שאולי תאהב
            </h2>
            <SuggestedCarsSlider currentCarId={car.id?.toString() || ""} />
          </div>
        </div>

        {/* السعر والدفعات وأزرار التواصل - يظهر فقط في الديسكتופ */}
        <div className="space-y-6 hidden lg:block">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-8">
            <div className="mb-4 text-right">
              <div className="text-2xl font-bold">
                {formatPrice(car.sale_price)}
              </div>
              {car.market_price && car.market_price > car.sale_price && (
                <div className="text-sm text-gray-500 line-through">
                  {formatPrice(car.market_price)}
                </div>
              )}
              <div className="text-sm text-gray-500">מחיר מחירון</div>
            </div>
            <div className="mb-4 border-t border-b py-3 text-right">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xl font-bold">
                  {formatPrice(monthlyPayment)}
                </div>
                <div className="text-sm text-gray-500">תשלום חודשי</div>
              </div>
              <div className="text-xs text-gray-500">
                אפשרות למימון הרכב בתשלום חודשי נמוך לפי המסלולים הבאים:
              </div>
            </div>
            <div className="space-y-3 mt-6">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  className="bg-green-500 hover:bg-green-600 text-white h-12 text-base font-semibold"
                  onClick={handleWhatsAppContact}
                >
                  וואטסאפ
                </Button>
                <Button
                  className="bg-blue-500 hover:bg-blue-600 text-white h-12 text-base font-semibold"
                  onClick={handlePhoneCall}
                >
                  התקשר עכשיו
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
