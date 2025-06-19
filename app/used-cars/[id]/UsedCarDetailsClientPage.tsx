"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Share2, ArrowLeft, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SuggestedCarsSlider } from "@/components/SuggestedCarsSlider";
import { getSupabaseBrowserClient } from "../../../lib/supabaseClient";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import CarImages from "@/components/CarImages";
import CarColorPicker from "@/components/CarColorPicker";
import { FinancingCalculator } from "@/components/FinancingCalculator";
import type { Car } from "../../../lib/types";

export default function UsedCarDetailsClientPage({
  params,
}: {
  params: { id: string };
}) {
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    undefined
  );
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  const [isLiked, setIsLiked] = useState(false);
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Financing Calculator State
  const [selectedMonths, setSelectedMonths] = useState(60);
  const [downPayment, setDownPayment] = useState(0);
  const [finalPayment, setFinalPayment] = useState(0);
  const [interestRate, setInterestRate] = useState(0.05); // 5% annual interest rate

  useEffect(() => {
    const fetchCarData = async () => {
      setLoading(true);
      setError(null);
      try {
        const supabase = getSupabaseBrowserClient();
        const { data, error } = await supabase
          .from("cars")
          .select("*")
          .eq("id", params.id)
          .single();

        if (error) throw error;

        if (data) {
          const carData = data as unknown as Car;
          setCar(carData);

          setDownPayment(Math.round(carData.sale_price * 0.2));
          setFinalPayment(Math.round(carData.sale_price * 0.3));
          // תפעול צבע ותמונה
          if (carData.colors && carData.colors.length > 0) {
            setSelectedColor(carData.colors[0].color);
            setSelectedImage(carData.colors[0].images?.[0]);
          } else if (carData.images && carData.images.length > 0) {
            setSelectedImage(carData.images[0]);
          }
        } else {
          setError("הרכב לא נמצא");
        }
      } catch (err: any) {
        setError(err.message || "שגיאה בטעינת נתוני הרכב");
      } finally {
        setLoading(false);
      }
    };

    fetchCarData();
  }, [params.id]);

  // בעת בחירת צבע חדש
  const handleColorSelect = (colorValue: string) => {
    setSelectedColor(colorValue);
    const colorObj = car?.colors?.find((c) => c.color === colorValue);
    if (colorObj?.images?.length) {
      setSelectedImage(colorObj.images[0]);
    }
  };

  // חישוב תשלום חודשי
  const calculateMonthlyPayment = () => {
    if (!car) return 0;
    const loanAmount = car.sale_price - downPayment - finalPayment;
    const monthlyRate = interestRate / 12;
    const payment =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, selectedMonths)) /
      (Math.pow(1 + monthlyRate, selectedMonths) - 1);
    return Math.round(payment);
  };

  const monthlyPayment = calculateMonthlyPayment();

  const handlePhoneCall = () => {
    if (car?.providers?.phone) {
      window.open(`tel:${car.providers.phone}`, "_self");
    } else {
      window.open(`tel:+972-50-123-4567`, "_self");
    }
  };

  const handleWhatsAppContact = () => {
    const phone = "+972501234567";
    const message = encodeURIComponent(
      `שלום! אני מעוניין ב${car?.brand || ""} ${car?.name || ""} (${
        car?.year || ""
      }) במחיר ${formatPrice(car?.sale_price || 0)}. האם תוכל לספק מידע נוסף?`
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Skeleton className="h-96 w-full rounded-lg mb-4" />
        </div>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 flex items-center justify-center">
        <div className="text-center p-8 max-w-md mx-auto">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
            <Info className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            שגיאה בטעינת נתוני הרכב
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error || "לא ניתן למצוא את הרכב המבוקש"}
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => window.location.reload()}>נסה שוב</Button>
            <Link href="/used-cars">
              <Button variant="outline">חזרה לרכבים משומשים</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-20"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* עמודה שמאלית/מרכזית: פרטי הרכב */}
        <div className="lg:col-span-2 space-y-8">
          {/* כותרת */}
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">
              {car.brand} {car.name}
            </h1>
            <div className="flex items-center gap-4 text-base text-gray-600 dark:text-gray-400">
              <span>
                {car.year} | {car.kilometers?.toLocaleString() || "0"} ק״מ
              </span>
              <span>קטגוריה: {car.type || "פרטי"}</span>
            </div>
          </div>
          {/* תמונות הרכב */}
          <div className="relative">
            <CarImages car={{ name: car.name, images: car.images || [] }} />
            <div className="absolute top-2 right-2 z-10 flex gap-2">
              <Link href="/used-cars">
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
              {car.type === "היברידי" && (
                <Badge className="bg-green-500 hover:bg-green-600">
                  היברידי
                </Badge>
              )}
              {car.type === "חשמלי" && (
                <Badge className="bg-blue-500 hover:bg-blue-600">חשמלי</Badge>
              )}
              <Badge className="bg-orange-500 hover:bg-orange-600">משומש</Badge>
            </div>
          </div>

          {/* מחיר, תשלומים וכפתורי יצירת קשר - מוצג מתחת לתמונות במובייל בלבד */}
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

          {/* טאבים */}
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
            {/* טאב צבע */}
            <TabsContent value="color" className="p-4">
              {car.colors && car.colors.length > 0 ? (
                <div className="flex flex-col items-center gap-4">
                  <CarColorPicker
                    colorOptions={car.colors}
                    selectedColor={selectedColor}
                    onSelectColor={handleColorSelect}
                  />
                  <div className="w-full flex justify-center">
                    {(() => {
                      // מצא את הצבע הנבחר או הראשון כברירת מחדל
                      const selectedColorObj =
                        car.colors?.find((c) => c.color === selectedColor) ||
                        car.colors?.[0];

                      // אם יש תמונה לצבע הנבחר, הצג אותה, אחרת הצג ריבוע בצבע
                      const imageUrl = selectedColorObj?.images?.[0]
                        ? selectedColorObj.images[0].startsWith("http")
                          ? selectedColorObj.images[0]
                          : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/cars/${selectedColorObj.images[0]}`
                        : null;

                      return imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={selectedColorObj.color}
                          width={320}
                          height={180}
                          className="rounded-xl object-contain bg-white"
                          style={{ maxWidth: 320, maxHeight: 180 }}
                          unoptimized
                        />
                      ) : (
                        <div
                          className="rounded-xl"
                          style={{
                            width: 320,
                            height: 180,
                            background: selectedColorObj?.color || "#eee",
                            border: "2px solid #ccc",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#333",
                            fontWeight: "bold",
                            fontSize: 24,
                          }}
                        >
                          {selectedColorObj?.color}
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
            {/* טאב תמונות */}
            <TabsContent value="images" className="p-4">
              <CarImages car={{ name: car.name, images: car.images || [] }} />
            </TabsContent>
            {/* טאב מפרט */}
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
                    {car.kilometers?.toLocaleString() || "0"} ק״מ
                  </span>
                  <span className="font-medium">קילומטראז&apos;</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    {car.type || "פרטי"}
                  </span>
                  <span className="font-medium">סוג רכב</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    {car.brand}
                  </span>
                  <span className="font-medium">מותג</span>
                </div>
              </div>
            </TabsContent>
            {/* טאב תכונות */}
            <TabsContent value="features" className="p-4">
              <ul className="space-y-3 text-right">
                {car.features && car.features.length > 0 ? (
                  car.features.map((feature: string, index: number) => (
                    <li
                      key={index}
                      className="flex items-center justify-end gap-3 text-sm"
                    >
                      <span>{feature}</span>
                      <span className="text-green-500 text-lg">✓</span>
                    </li>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    אין תכונות זמינות לרכב זה
                  </div>
                )}
              </ul>
            </TabsContent>
          </Tabs>

          {/* תיאור הרכב */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-bold mb-4 text-right">תיאור הרכב</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-right">
              {car.description || "אין תיאור זמין לרכב זה."}
            </p>
          </div>

          {/* מידע על הספק */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-bold mb-4 text-right">
              פרטי הספק
            </h2>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-cyan-100 text-cyan-800 px-3 py-2 rounded-xl text-sm font-bold">
                  4.8 ★
                </div>
                <div className="text-sm text-gray-500">תמיכה</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-lg">
                  {car.provider || "אוטו סנטר"}
                </div>
                <div className="text-gray-600">
                  {car.providers?.address || "תל אביב"}
                </div>
              </div>
            </div>
          </div>

          {/* רכבים מומלצים */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-bold mb-4 text-center">
              רכבים מומלצים שאולי תאהב
            </h2>
            <SuggestedCarsSlider currentCarId={params.id} />
          </div>
        </div>

        {/* עמודה ימנית: מחיר, תשלומים וכפתורי יצירת קשר - מוצג רק בדסקטופ */}
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
