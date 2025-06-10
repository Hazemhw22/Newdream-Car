"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Share2, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SuggestedCarsSlider } from "@/components/SuggestedCarsSlider"
import { CarColorPicker } from "@/components/CarColorPicker"
import ContactModal from "@/components/ContactModal"

// Mock data - in a real app, you would fetch this from an API
const carData = {
  id: "1",
  name: "DUSTER",
  brand: "Dacia",
  price: 139990,
  originalPrice: 149990,
  monthlyPayment: 1338,
  downPayment: 20998,
  finalPayment: 69995,
  phone: "+972-50-123-4567",
  whatsapp: "+972501234567",
  image: "/427770636_1718097302720.png",
  images: [
    "/427770636_1718097302720.png",
    "/427770636_1718097302720.png",
    "/427770636_1718097302720.png",
    "/427770636_1718097302720.png",
  ],
  interiorImages: ["/427770636_1718097302720.png", "/427770636_1718097302720.png", "/427770636_1718097302720.png"],
  features: ["טכנולוגיות בטיחות", "רכב מתאים", "צריך שימוש של שישה חודשים"],
  // Enhanced color data with images for each color
  colorOptions: [
    { color: "#00BCD4", name: "תכלת", image: "/427770636_1718097302720.png" },
    { color: "#455A64", name: "אפור כחול", image: "/car-blue-grey.png" },
    { color: "#607D8B", name: "אפור כחול בהיר", image: "/car-blue-grey-light.png" },
    { color: "#795548", name: "חום", image: "/car-brown.png" },
    { color: "#37474F", name: "אפור כהה", image: "/car-dark-grey.png" },
    { color: "#000000", name: "שחור", image: "/car-black.png" },
    { color: "#FFFFFF", name: "לבן", image: "/car-white.png" },
  ],
  year: 2025,
  mileage: 0,
  category: "רכב שטח",
  description:
    "הכירו את ה-DUSTER החדש, רכב השטח של דאצ'יה. הרכב בעל 5 מושבים במרכב קרוסאובר, תא מטען גדול מהמתחרים ויכולת עבירות טובה או 140 או 130 כוחות סוס בהתאמה.",
  specs: {
    מנוע: "1.5L טורבו",
    כוח: "130 כ״ס",
    "תיבת הילוכים": "אוטומטית",
    "סוג דלק": "בנזין",
    "צריכת דלק": "5.8L/100km",
    תאוצה: "10.2s (0-100 km/h)",
    "מהירות מרבית": "180 km/h",
    מידות: "4.3m x 1.8m x 1.6m",
    משקל: "1320 ק״ג",
    "נפח תא מטען": "478L",
  },
}

export default function CarDetailsClientPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  const [selectedColor, setSelectedColor] = useState(carData.colorOptions[0])

  // Financing Calculator State
  const [selectedMonths, setSelectedMonths] = useState(60)
  const [downPayment, setDownPayment] = useState(carData.downPayment)
  const [finalPayment, setFinalPayment] = useState(carData.finalPayment)
  const [interestRate, setInterestRate] = useState(0.05) // 5% annual interest rate

  // Calculate monthly payment based on selected months
  const calculateMonthlyPayment = () => {
    const loanAmount = carData.price - downPayment - finalPayment
    const monthlyRate = interestRate / 12
    const payment =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, selectedMonths)) /
      (Math.pow(1 + monthlyRate, selectedMonths) - 1)
    return Math.round(payment)
  }

  const monthlyPayment = calculateMonthlyPayment()

  const handlePhoneCall = () => {
    window.open(`tel:${carData.phone}`, "_self")
  }

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(
      `שלום! אני מעוניין ב${carData.brand} ${carData.name} (${carData.year}) במחיר ${formatPrice(carData.price)}. האם תוכל לספק מידע נוסף?`,
    )
    window.open(`https://wa.me/${carData.whatsapp}?text=${message}`, "_blank")
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("he-IL", {
      style: "currency",
      currency: "ILS",
      minimumFractionDigits: 0,
    }).format(price)
  }

  // Mobile image navigation
  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % carData.images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + carData.images.length) % carData.images.length)
  }

  // In a real app, you would fetch car data based on the ID
  useEffect(() => {
    // Fetch car data here
    console.log("Fetching car with ID:", params.id)
  }, [params.id])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900" dir="rtl">
      {/* Hero Section - Responsive */}
      <div className="relative bg-white dark:bg-gray-800 pt-16">
        {/* Main Image - Responsive Height */}
        <div className="relative h-[40vh] sm:h-[45vh] md:h-[35vh] w-full">
          {/* Navigation Buttons */}
          <div className="absolute top-2 md:top-4 right-2 md:right-4 z-10">
            <Link href="/new-cars">
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
              onClick={() => {}}
            >
              <Share2 className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/95 dark:bg-gray-800/95 h-10 w-10 md:h-12 md:w-12 shadow-lg"
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={`h-4 w-4 md:h-5 md:w-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
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
            {selectedImage + 1} / {carData.images.length}
          </div>

          <Image
            src={selectedColor.image || carData.images[selectedImage] || "/placeholder.svg"}
            alt={carData.name}
            fill
            className="object-contain"
            priority
          />
        </div>

       {/* Thumbnails - Responsive */}
          <div className="overflow-x-auto py-3 px-3 md:py-4 md:px-4 bg-white dark:bg-gray-800">
            <div className="flex justify-center gap-2 md:gap-3 pb-2 md:pb-0">
              {carData.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 rounded-lg md:rounded-xl overflow-hidden border-2 md:border-3 transition-all flex-shrink-0 active:scale-95 ${
                    selectedImage === index ? "border-cyan-500 scale-105 shadow-lg" : "border-gray-300"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${carData.name} תצוגה ${index + 1}`}
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
              {carData.brand} {carData.name}
            </h1>
            <div className="text-gray-600 dark:text-gray-400 text-base">קטגוריה: {carData.category}</div>
          </div>

          {/* Mobile Price Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border">
            <div className="text-center mb-4">
              <div className="text-2xl font-bold mb-2">{formatPrice(carData.price)}</div>
              {carData.originalPrice && (
                <div className="text-base text-gray-500 line-through">{formatPrice(carData.originalPrice)}</div>
              )}
              <div className="text-sm text-gray-500">מחיר מחירון</div>
            </div>

            <div className="text-center py-3 border-t border-b">
              <div className="text-xl font-bold mb-1">{formatPrice(monthlyPayment)}</div>
              <div className="text-sm text-gray-500">תשלום חודשי משוער</div>
            </div>

          

          {/* Car Description - Mobile */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-bold mb-4 text-right">תיאור הרכב</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-right">{carData.description}</p>
          </div>

          {/* Color Picker - Mobile */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-bold mb-4 text-center">באיזה צבע תרצו את ה{carData.name} שלכם?</h2>
            <CarColorPicker colorOptions={carData.colorOptions} onSelectColor={setSelectedColor} />
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
                  {Object.entries(carData.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center border-b pb-2 text-sm">
                      <span className="text-gray-600 dark:text-gray-400">{value}</span>
                      <span className="font-medium">{key}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="features" className="p-4">
                <ul className="space-y-3 text-right">
                  {carData.features.map((feature, index) => (
                    <li key={index} className="flex items-center justify-end gap-3 text-sm">
                      <span>{feature}</span>
                      <span className="text-green-500 text-lg">✓</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="interior" className="p-4">
                <div className="grid grid-cols-1 gap-3">
                  {carData.interiorImages.map((image, index) => (
                    <div key={index} className="relative h-48 rounded-xl overflow-hidden">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${carData.name} עיצוב פנים ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Mobile Financing Calculator */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold mb-4 text-center">מחשבון מימון</h3>
            <div className="space-y-4">
              {/* Down Payment */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-base">{formatPrice(downPayment)}</span>
                  <span className="text-sm font-medium">מקדמה</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={carData.price * 0.5}
                  step={1000}
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number.parseInt(e.target.value))}
                  className="w-full h-4 bg-gray-300 dark:bg-gray-600 rounded-full appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs mt-2 text-gray-500">
                  <span>{formatPrice(carData.price * 0.5)}</span>
                  <span>{formatPrice(0)}</span>
                </div>
              </div>

              {/* Final Payment */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-base">{formatPrice(finalPayment)}</span>
                  <span className="text-sm font-medium">תשלום אחרון</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={carData.price * 0.6}
                  step={1000}
                  value={finalPayment}
                  onChange={(e) => setFinalPayment(Number.parseInt(e.target.value))}
                  className="w-full h-4 bg-gray-300 dark:bg-gray-600 rounded-full appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs mt-2 text-gray-500">
                  <span>{formatPrice(carData.price * 0.6)}</span>
                  <span>{formatPrice(0)}</span>
                </div>
              </div>

              {/* Payment Period */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-base">{selectedMonths} חודשים</span>
                  <span className="text-sm font-medium">תקופת תשלומים</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[24, 36, 48, 60, 72].map((month) => (
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
                  <span className="font-bold text-base">{(interestRate * 100).toFixed(1)}%</span>
                  <span className="text-sm font-medium">ריבית שנתית</span>
                </div>
                <input
                  type="range"
                  min={0.01}
                  max={0.1}
                  step={0.005}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number.parseFloat(e.target.value))}
                  className="w-full h-4 bg-gray-300 dark:bg-gray-600 rounded-full appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs mt-2 text-gray-500">
                  <span>10%</span>
                  <span>1%</span>
                </div>
              </div>

              {/* Monthly Payment Result */}
              <div className="text-center py-4 px-4 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl shadow-lg">
                <div className="text-2xl font-bold text-yellow-900 mb-1">{formatPrice(monthlyPayment)}</div>
                <div className="text-sm font-semibold text-yellow-800">תשלום חודשי</div>
              </div>
            </div>
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

          {/* Suggested Cars - Mobile */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-bold mb-4 text-center">מכוניות נוספות שחשבנו שתאהבו</h2>
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
              <Link href="/new-cars" className="hover:text-cyan-500 whitespace-nowrap">
                רכבים חדשים
              </Link>
              <span className="mx-2">/</span>
              <Link href={`/new-cars?brand=${carData.brand}`} className="hover:text-cyan-500 whitespace-nowrap">
                {carData.brand}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900 dark:text-gray-100 whitespace-nowrap">{carData.name}</span>
            </div>

            {/* Car Title */}
            <div className="text-right">
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                {carData.brand} {carData.name}
              </h1>
              <div className="text-gray-600 dark:text-gray-400 text-base">קטגוריה: {carData.category}</div>
            </div>

            {/* Car Description */}
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-right">{carData.description}</p>

            {/* Color Picker */}
            <div>
              <h2 className="text-xl font-bold mb-4 text-right">באיזה צבע תרצו את ה{carData.name} שלכם?</h2>
              <CarColorPicker colorOptions={carData.colorOptions} onSelectColor={setSelectedColor} />
            </div>

            {/* Tabs for Specs, Features, etc. */}
            <div>
              <Tabs defaultValue="specs" className="w-full">
                <TabsList className="w-full grid grid-cols-3 h-12 text-sm">
                  <TabsTrigger value="specs">מפרט טכני</TabsTrigger>
                  <TabsTrigger value="features">תכונות</TabsTrigger>
                  <TabsTrigger value="interior">עיצוב פנים</TabsTrigger>
                </TabsList>
                <TabsContent value="specs" className="p-4 border rounded-md mt-2">
                  <div className="grid grid-cols-1 gap-3">
                    {Object.entries(carData.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center border-b pb-2 text-sm">
                        <span className="text-gray-600 dark:text-gray-400">{value}</span>
                        <span className="font-medium">{key}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="features" className="p-4 border rounded-md mt-2">
                  <ul className="space-y-3 text-right">
                    {carData.features.map((feature, index) => (
                      <li key={index} className="flex items-center justify-end gap-3 text-sm">
                        <span>{feature}</span>
                        <span className="text-green-500 text-lg">✓</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="interior" className="p-4 border rounded-md mt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {carData.interiorImages.map((image, index) => (
                      <div key={index} className="relative h-40 md:h-48 rounded-md overflow-hidden">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${carData.name} עיצוב פנים ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Suggested Cars */}
            <div>
              <h2 className="text-xl font-bold mb-4 text-right">מכוניות נוספות שחשבנו שתאהבו</h2>
              <SuggestedCarsSlider currentCarId={params.id} />
            </div>
          </div>

          {/* Right Column - Price and Actions - Desktop Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-20">
              {/* Price */}
              <div className="mb-4 text-right">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-2xl font-bold">{formatPrice(carData.price)}</div>
                  <div className="text-sm text-gray-500">מחיר מחירון</div>
                </div>
                {carData.originalPrice && (
                  <div className="text-sm text-gray-500 line-through">{formatPrice(carData.originalPrice)}</div>
                )}
              </div>

              {/* Monthly Payment */}
              <div className="mb-4 border-t border-b py-3 text-right">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xl font-bold">{formatPrice(monthlyPayment)}</div>
                  <div className="text-sm text-gray-500">תשלום חודשי</div>
                </div>
                <div className="text-xs text-gray-500">אפשרות למימון הרכב בתשלום חודשי נמוך</div>
              </div>

              {/* Enhanced Financing Calculator */}
              <div className="mb-4">
                <h3 className="text-lg font-bold mb-3 text-right">מחשבון מימון</h3>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 space-y-4">
                  {/* Down Payment */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-sm">{formatPrice(downPayment)}</span>
                      <span className="text-xs">מקדמה</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={carData.price * 0.5}
                      step={1000}
                      value={downPayment}
                      onChange={(e) => setDownPayment(Number.parseInt(e.target.value))}
                      className="w-full h-3 bg-gray-300 dark:bg-gray-600 rounded-full appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs mt-1">
                      <span>{formatPrice(carData.price * 0.5)}</span>
                      <span>{formatPrice(0)}</span>
                    </div>
                  </div>

                  {/* Final Payment */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-sm">{formatPrice(finalPayment)}</span>
                      <span className="text-xs">תשלום אחרון</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={carData.price * 0.6}
                      step={1000}
                      value={finalPayment}
                      onChange={(e) => setFinalPayment(Number.parseInt(e.target.value))}
                      className="w-full h-3 bg-gray-300 dark:bg-gray-600 rounded-full appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs mt-1">
                      <span>{formatPrice(carData.price * 0.6)}</span>
                      <span>{formatPrice(0)}</span>
                    </div>
                  </div>

                  {/* Payment Period */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-sm">{selectedMonths} חודשים</span>
                      <span className="text-xs">תקופת תשלומים</span>
                    </div>
                    <div className="flex gap-1">
                     {[12, 24, 36, 48, 60].map((month) => (
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
                      <span className="font-bold text-sm">{(interestRate * 100).toFixed(1)}%</span>
                      <span className="text-xs">ריבית שנתית</span>
                    </div>
                    <input
                      type="range"
                      min={0.01}
                      max={0.1}
                      step={0.005}
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number.parseFloat(e.target.value))}
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
                        {formatPrice(carData.price - downPayment - finalPayment)}
                      </span>
                      <span className="text-xs">סכום הלוואה</span>
                    </div>
                  </div>

                  {/* Monthly Payment Result */}
                  <div className="text-center py-3 px-4 bg-yellow-100 rounded-full font-bold text-yellow-800 border-2 border-yellow-400">
                    {formatPrice(monthlyPayment)}
                  </div>
                  <div className="text-center text-xs text-gray-600">תשלום חודשי</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  className="w-full bg-green-500 hover:bg-green-600 text-white h-12 text-base font-semibold"
                  onClick={handleWhatsAppContact}
                >
                  שלח הודעה בווצאפ
                </Button>
                <Button variant="outline" className="w-full h-12 text-base font-semibold text-white bg-blue-500 hover:bg-blue-600" onClick={handlePhoneCall}>
                  התקשר עכשיו
                </Button>
               
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  )
}
