"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Share2,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Check,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SuggestedCarsSlider } from "@/components/SuggestedCarsSlider";
import { getSupabaseBrowserClient } from "../../../lib/supabaseClient";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Car } from "../../../lib/types";

export default function UsedCarDetailsClientPage({
  params,
}: {
  params: { id: string };
}) {
  const [selectedImage, setSelectedImage] = useState(0);
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
        } else {
          setError("רכב לא נמצא");
        }
      } catch (err: any) {
        console.error("Error fetching car:", err);
        setError(err.message || "שגיאה בטעינת נתוני הרכב");
      } finally {
        setLoading(false);
      }
    };

    fetchCarData();
  }, [params.id]);
  

  // Calculate monthly payment based on selected months
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
    const phone = "+972501234567"; // Default WhatsApp number
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

  // Mobile image navigation
  const nextImage = () => {
    if (!car?.images || car.images.length === 0) return;
    setSelectedImage((prev) => (prev + 1) % car.images.length);
  };

  const prevImage = () => {
    if (!car?.images || car.images.length === 0) return;
    setSelectedImage(
      (prev) => (prev - 1 + car.images.length) % car.images.length
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="relative h-[40vh] sm:h-[45vh] md:h-[50vh] w-full bg-gray-200 dark:bg-gray-800 rounded-lg mb-4">
            <Skeleton className="h-full w-full rounded-lg" />
          </div>
          <div className="flex gap-2 overflow-x-auto py-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton
                key={i}
                className="h-16 w-16 md:h-20 md:w-20 rounded-lg flex-shrink-0"
              />
            ))}
          </div>
          <div className="mt-6">
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-6 w-1/2 mb-6" />
            <Skeleton className="h-24 w-full mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    );
  }

  // Error state
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900" dir="rtl">
      {/* Hero Section - Responsive */}
      <div className="relative bg-white dark:bg-gray-800 pt-16">
        {/* Main Image - Responsive Height */}
        <div className="relative h-[40vh] sm:h-[45vh] md:h-[50vh] w-full">
          <div className="absolute top-2 md:top-4 right-2 md:right-4 z-10">
            <Link href="/used-cars">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white/95 dark:bg-gray-800/95 h-10 w-10 md:h-12 md:w-12 shadow-lg"
              >
                <ArrowLeft className="h-5 w-5 md:h-6 md:w-6 rotate-180" />
              </Button>
            </Link>
          </div>

          <div className="absolute top-2 md:top-4 left-2 md:left-4 z-10 flex gap-2 md:gap-3">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/95 dark:bg-gray-800/95 h-10 w-10 md:h-12 md:w-12 shadow-lg"
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
              <Share2 className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/95 dark:bg-gray-800/95 h-10 w-10 md:h-12 md:w-12 shadow-lg"
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart
                className={`h-4 w-4 md:h-5 md:w-5 ${
                  isLiked ? "fill-red-500 text-red-500" : ""
                }`}
              />
            </Button>
          </div>

          {/* Tags */}
          <div className="absolute top-2 md:top-4 right-16 md:right-20 z-10 flex flex-col gap-2">
            {car.type === "היברידי" && (
              <Badge className="bg-green-500 hover:bg-green-600">היברידי</Badge>
            )}
            {car.type === "חשמלי" && (
              <Badge className="bg-blue-500 hover:bg-blue-600">חשמלי</Badge>
            )}
            <Badge className="bg-orange-500 hover:bg-orange-600">משומש</Badge>
          </div>

          {/* Mobile Image Navigation - Hidden on Desktop */}
          <button
            onClick={prevImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 dark:bg-gray-800/90 p-3 md:p-4 rounded-full shadow-lg active:scale-95 transition-transform md:hidden"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 dark:bg-gray-800/90 p-3 md:p-4 rounded-full shadow-lg active:scale-95 transition-transform md:hidden"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>

          {/* Mobile Image Counter - Hidden on Desktop */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium md:hidden">
            {selectedImage + 1} / {car.images?.length || 1}
          </div>

          <Image
            src={
              process.env.NEXT_PUBLIC_SUPABASE_URL +
                "/storage/v1/object/public/cars/" +
                car.images[0] || ""
            }
            alt={car.name}
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Thumbnails - Responsive */}
        <div className="overflow-x-auto py-3 px-3 md:py-4 md:px-4 bg-white dark:bg-gray-800">
          <div className="flex justify-center gap-2 md:gap-3 pb-2 md:pb-0">
            {car.images?.map((image: string, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 rounded-lg md:rounded-xl overflow-hidden border-2 md:border-3 transition-all flex-shrink-0 active:scale-95 ${
                  selectedImage === index
                    ? "border-cyan-500 scale-105 shadow-lg"
                    : "border-gray-300"
                }`}
              >
                <Image
                  src={
                    process.env.NEXT_PUBLIC_SUPABASE_URL +
                      "/storage/v1/object/public/cars/" +
                      car.images[1] || ""
                  }
                  alt={`${car.name} תצוגה ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Layout - Mobile: Single Column, Desktop: Two Columns */}
      <div className="lg:max-w-7xl lg:mx-auto lg:px-4 lg:py-8">
        {/* Mobile Layout */}
        <div className="lg:hidden px-4 py-6 space-y-6">
          {/* Car Title - Mobile */}
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2 leading-tight">
              {car.brand} {car.name}
            </h1>
            <div className="flex items-center gap-4 justify-center text-base text-gray-600 dark:text-gray-400">
              <span>
                {car.year} | {car.kilometers?.toLocaleString() || "0"} ק&quot;מ
              </span>
              <span>קטגוריה: {car.type || "רכב פרטי"}</span>
            </div>
          </div>

          {/* Mobile Price Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border">
            <div className="text-center mb-4">
              <div className="text-2xl font-bold mb-2">
                {formatPrice(car.sale_price)}
              </div>
              {car.market_price && car.market_price > car.sale_price && (
                <div className="text-base text-gray-500 line-through">
                  {formatPrice(car.market_price)}
                </div>
              )}
              <div className="text-sm text-gray-500">מחיר מחירון</div>
            </div>

            <div className="text-center py-3 border-t border-b">
              <div className="text-xl font-bold mb-1">
                {formatPrice(monthlyPayment)}
              </div>
              <div className="text-sm text-gray-500">תשלום חודשי משוער</div>
            </div>

            {/* Mobile Action Buttons */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <Button
                className="bg-green-500 hover:bg-green-600 text-white h-14 text-lg font-semibold rounded-xl"
                onClick={handleWhatsAppContact}
              >
                וואטסאפ
              </Button>
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white h-14 text-lg font-semibold rounded-xl"
                onClick={handlePhoneCall}
              >
                התקשר
              </Button>
            </div>
          </div>

          {/* Car Description - Mobile */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-bold mb-4 text-right">תיאור הרכב</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-right">
              {car.description || "אין תיאור זמין לרכב זה."}
            </p>
          </div>

          {/* Car Condition Cards - Mobile */}
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
              <div className="text-center">
                <div className="text-gray-500 text-base mb-2">מצב הרכב</div>
                <div className="font-bold text-2xl text-green-600">מצוין</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
                <div className="text-gray-500 text-sm mb-2">טיפול אחרון</div>
                <div className="font-bold text-lg">01/2025</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
                <div className="text-gray-500 text-sm mb-2">אחריות עד</div>
                <div className="font-bold text-lg">06/2026</div>
              </div>
            </div>
          </div>

          {/* Mobile Tabs */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
            <Tabs defaultValue="specs" className="w-full">
              <TabsList className="w-full grid grid-cols-3 h-14 text-sm bg-gray-100 dark:bg-gray-700 rounded-none">
                <TabsTrigger value="specs" className="font-semibold">
                  מפרט טכני
                </TabsTrigger>
                <TabsTrigger value="features" className="font-semibold">
                  תכונות
                </TabsTrigger>
                <TabsTrigger value="interior" className="font-semibold">
                  עיצוב פנים
                </TabsTrigger>
              </TabsList>
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
              <TabsContent value="interior" className="p-4">
                <div className="grid grid-cols-1 gap-3">
                  {car.images && car.images.length > 0 ? (
                    car.images
                      .slice(0, 2)
                      .map((image: string, index: number) => (
                        <div
                          key={index}
                          className="relative h-48 rounded-xl overflow-hidden"
                        >
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`${car.name} עיצוב פנים ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))
                  ) : (
                    <div className="text-center py-4 text-gray-500">
                      אין תמונות פנים זמינות לרכב זה
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Seller Information - Mobile */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-bold mb-4 text-right">פרטי המוכר</h2>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-cyan-100 text-cyan-800 px-3 py-2 rounded-xl text-sm font-bold">
                  4.8 ★
                </div>
                <div className="text-sm text-gray-500">דירוג</div>
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

          {/* Mobile Financing Calculator */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold mb-4 text-center">מחשבון מימון</h3>
            <div className="space-y-4">
              {/* Down Payment */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-base">
                    {formatPrice(downPayment)}
                  </span>
                  <span className="text-sm font-medium">מקדמה</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={car.sale_price * 0.5}
                  step={1000}
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full h-4 bg-gray-300 dark:bg-gray-600 rounded-full appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs mt-2 text-gray-500">
                  <span>{formatPrice(car.sale_price * 0.5)}</span>
                  <span>{formatPrice(0)}</span>
                </div>
              </div>

              {/* Final Payment */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-base">
                    {formatPrice(finalPayment)}
                  </span>
                  <span className="text-sm font-medium">תשלום אחרון</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={car.sale_price * 0.6}
                  step={1000}
                  value={finalPayment}
                  onChange={(e) => setFinalPayment(Number(e.target.value))}
                  className="w-full h-4 bg-gray-300 dark:bg-gray-600 rounded-full appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs mt-2 text-gray-500">
                  <span>{formatPrice(car.sale_price * 0.6)}</span>
                  <span>{formatPrice(0)}</span>
                </div>
              </div>

              {/* Payment Period */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-base">
                    {selectedMonths} חודשים
                  </span>
                  <span className="text-sm font-medium">תקופת תשלומים</span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {[12, 24, 36, 48, 60].map((month) => (
                    <button
                      key={month}
                      onClick={() => setSelectedMonths(month)}
                      className={`py-3 text-sm font-semibold rounded-lg transition-all active:scale-95 ${
                        selectedMonths === month
                          ? "bg-cyan-500 text-white shadow-lg"
                          : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {month}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interest Rate */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-base">
                    {(interestRate * 100).toFixed(1)}%
                  </span>
                  <span className="text-sm font-medium">ריבית שנתית</span>
                </div>
                <input
                  type="range"
                  min={0.01}
                  max={0.1}
                  step={0.005}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-4 bg-gray-300 dark:bg-gray-600 rounded-full appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs mt-2 text-gray-500">
                  <span>10%</span>
                  <span>1%</span>
                </div>
              </div>

              {/* Monthly Payment Result */}
              <div className="text-center py-4 px-4 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl shadow-lg">
                <div className="text-2xl font-bold text-yellow-900 mb-1">
                  {formatPrice(monthlyPayment)}
                </div>
                <div className="text-sm font-semibold text-yellow-800">
                  תשלום חודשי
                </div>
              </div>
            </div>
          </div>

          {/* Trade-in Option - Mobile */}
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-6 shadow-lg">
            <div className="text-center mb-4">
              <h3 className="text-lg font-bold mb-2">יש לך רכב ישן?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                טרייד-אין זמין!
              </p>
            </div>
            <Button className="w-full bg-cyan-500 hover:bg-cyan-600 h-12 text-base font-semibold rounded-xl">
              תאם ושמור
            </Button>
          </div>

          {/* Suggested Cars - Mobile */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-bold mb-4 text-center">
              רכבים נוספים שאולי תאהב
            </h2>
            <SuggestedCarsSlider currentCarId={params.id} />
          </div>
        </div>

        {/* Desktop Layout - Original Design */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          {/* Left Column - Car Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Breadcrumbs */}
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 overflow-x-auto">
              <Link href="/" className="hover:text-cyan-500 whitespace-nowrap">
                דף הבית
              </Link>
              <span className="mx-2">/</span>
              <Link
                href="/used-cars"
                className="hover:text-cyan-500 whitespace-nowrap"
              >
                רכבים משומשים
              </Link>
              <span className="mx-2">/</span>
              <Link
                href={`/used-cars?brand=${car.brand}`}
                className="hover:text-cyan-500 whitespace-nowrap"
              >
                {car.brand}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900 dark:text-gray-100 whitespace-nowrap">
                {car.name}
              </span>
            </div>

            {/* Car Title */}
            <div className="text-right">
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                {car.brand} {car.name}
              </h1>

              {/* Car Category and Year */}
              <div className="flex items-center gap-4 mb-2 justify-end">
                <span className="text-gray-600 dark:text-gray-400">
                  {car.year} | {car.kilometers?.toLocaleString() || "0"}{" "}
                  ק&quot;מ
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  קטגוריה: {car.type || "רכב פרטי"}
                </span>
              </div>
            </div>

            {/* Car Description */}
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-right">
              {car.description || "אין תיאור זמין לרכב זה."}
            </p>

            {/* Car Condition */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <div className="text-gray-500 text-sm">מצב הרכב</div>
                <div className="font-bold text-lg">מצוין</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <div className="text-gray-500 text-sm">טיפול אחרון</div>
                <div className="font-bold text-lg">01/2025</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <div className="text-gray-500 text-sm">אחריות עד</div>
                <div className="font-bold text-lg">06/2026</div>
              </div>
            </div>

            {/* Tabs for Specs, Features, etc. */}
            <div>
              <Tabs defaultValue="specs" className="w-full">
                <TabsList className="w-full grid grid-cols-3 h-12 text-sm">
                  <TabsTrigger value="specs">מפרט טכני</TabsTrigger>
                  <TabsTrigger value="features">תכונות</TabsTrigger>
                  <TabsTrigger value="interior">עיצוב פנים</TabsTrigger>
                </TabsList>
                <TabsContent
                  value="specs"
                  className="p-4 border rounded-md mt-2"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex justify-between border-b pb-2 text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        {car.year}
                      </span>
                      <span className="font-medium">שנת ייצור</span>
                    </div>
                    <div className="flex justify-between border-b pb-2 text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        {car.kilometers?.toLocaleString() || "0"} ק&quot;מ
                      </span>
                      <span className="font-medium">קילומטראז&apos;</span>
                    </div>
                    <div className="flex justify-between border-b pb-2 text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        {car.type || "רכב פרטי"}
                      </span>
                      <span className="font-medium">סוג רכב</span>
                    </div>
                    <div className="flex justify-between border-b pb-2 text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        {car.brand}
                      </span>
                      <span className="font-medium">יצרן</span>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent
                  value="features"
                  className="p-4 border rounded-md mt-2"
                >
                  <ul className="space-y-3 text-right">
                    {car.features && car.features.length > 0 ? (
                      car.features.map((feature: string, index: number) => (
                        <li
                          key={index}
                          className="flex items-center justify-end gap-3 text-sm"
                        >
                          <span>{feature}</span>
                          <Check className="h-5 w-5 text-green-500" />
                        </li>
                      ))
                    ) : (
                      <div className="text-center py-4 text-gray-500">
                        אין תכונות זמינות לרכב זה
                      </div>
                    )}
                  </ul>
                </TabsContent>
                <TabsContent
                  value="interior"
                  className="p-4 border rounded-md mt-2"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {car.images && car.images.length > 0 ? (
                      car.images
                        .slice(0, 4)
                        .map((image: string, index: number) => (
                          <div
                            key={index}
                            className="relative h-40 md:h-48 rounded-md overflow-hidden"
                          >
                            <Image
                              src={image || "/placeholder.svg"}
                              alt={`${car.name} עיצוב פנים ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))
                    ) : (
                      <div className="text-center py-4 text-gray-500 col-span-2">
                        אין תמונות פנים זמינות לרכב זה
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Seller Information */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4 text-right">פרטי המוכר</h2>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <div className="bg-cyan-100 text-cyan-800 px-2 py-1 rounded text-sm font-bold">
                          4.8 ★
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>דירוג המוכר על סמך חוות דעת לקוחות</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <div className="text-sm text-gray-500">דירוג</div>
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

            {/* Trade-in Option */}
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <Button className="bg-cyan-500 hover:bg-cyan-600">
                  תאם ושמור
                </Button>
                <div className="text-right">
                  <h3 className="text-lg font-bold">יש לך רכב ישן?</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    טרייד-אין זמין!
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="text-yellow-600 text-xl">★</span>
                  </div>
                  <div className="h-12 w-12 bg-cyan-100 rounded-full flex items-center justify-center -mr-4">
                    <span className="text-cyan-600 text-xl">↻</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Suggested Cars */}
            <div>
              <h2 className="text-xl font-bold mb-4 text-right">
                רכבים נוספים שאולי תאהב
              </h2>
              <SuggestedCarsSlider currentCarId={params.id} />
            </div>
          </div>

          {/* Right Column - Price and Actions - Desktop Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-20">
              {/* Price */}
              <div className="mb-4 text-right">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-2xl font-bold">
                    {formatPrice(car.sale_price)}
                  </div>
                  <div className="text-sm text-gray-500">מחיר מחירון</div>
                </div>
                {car.market_price && car.market_price > car.sale_price && (
                  <div className="text-sm text-gray-500 line-through">
                    {formatPrice(car.market_price)}
                  </div>
                )}
              </div>

              {/* Monthly Payment */}
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

              {/* Enhanced Financing Calculator */}
              <div className="mb-4">
                <h3 className="text-lg font-bold mb-3 text-right">
                  מחשבון מימון
                </h3>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 space-y-4">
                  {/* Down Payment */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-sm">
                        {formatPrice(downPayment)}
                      </span>
                      <span className="text-xs">מקדמה</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={car.sale_price * 0.5}
                      step={1000}
                      value={downPayment}
                      onChange={(e) =>
                        setDownPayment(Number.parseInt(e.target.value))
                      }
                      className="w-full h-3 bg-gray-300 dark:bg-gray-600 rounded-full appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs mt-1">
                      <span>{formatPrice(car.sale_price * 0.5)}</span>
                      <span>{formatPrice(0)}</span>
                    </div>
                  </div>

                  {/* Final Payment */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-sm">
                        {formatPrice(finalPayment)}
                      </span>
                      <span className="text-xs">תשלום אחרון</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={car.sale_price * 0.6}
                      step={1000}
                      value={finalPayment}
                      onChange={(e) =>
                        setFinalPayment(Number.parseInt(e.target.value))
                      }
                      className="w-full h-3 bg-gray-300 dark:bg-gray-600 rounded-full appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs mt-1">
                      <span>{formatPrice(car.sale_price * 0.6)}</span>
                      <span>{formatPrice(0)}</span>
                    </div>
                  </div>

                  {/* Payment Period */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-sm">
                        {selectedMonths} חודשים
                      </span>
                      <span className="text-xs">תקופת תשלומים</span>
                    </div>
                    <div className="flex gap-1">
                      {[24, 36, 48, 60, 72].map((month) => (
                        <button
                          key={month}
                          onClick={() => setSelectedMonths(month)}
                          className={`flex-1 py-2 text-xs rounded-md transition-colors ${
                            selectedMonths === month
                              ? "bg-cyan-500 text-white"
                              : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {month}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Interest Rate */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-sm">
                        {(interestRate * 100).toFixed(1)}%
                      </span>
                      <span className="text-xs">ריבית שנתית</span>
                    </div>
                    <input
                      type="range"
                      min={0.01}
                      max={0.1}
                      step={0.005}
                      value={interestRate}
                      onChange={(e) =>
                        setInterestRate(Number.parseFloat(e.target.value))
                      }
                      className="w-full h-3 bg-gray-300 dark:bg-gray-600 rounded-full appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs mt-1">
                      <span>10%</span>
                      <span>1%</span>
                    </div>
                  </div>

                  {/* Loan Amount */}
                  <div className="bg-gray-200 dark:bg-gray-600 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm">
                        {formatPrice(
                          car.sale_price - downPayment - finalPayment
                        )}
                      </span>
                      <span className="text-xs">סכום הלוואה</span>
                    </div>
                  </div>

                  {/* Monthly Payment Result */}
                  <div className="text-center py-3 px-4 bg-yellow-100 rounded-full font-bold text-yellow-800 border-2 border-yellow-400">
                    {formatPrice(monthlyPayment)}
                  </div>
                  <div className="text-center text-xs text-gray-600">
                    תשלום חודשי
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
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
                <Button className="w-full bg-cyan-500 hover:bg-cyan-600 h-12">
                  תיאום נסיעת מבחן
                </Button>
              </div>

              {/* Provider Info */}
              <div className="mt-6 pt-6 border-t">
                <div className="text-right">
                  <h3 className="font-bold text-lg">
                    {car.provider || "אוטו סנטר"}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {car.providers?.address || "תל אביב"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
