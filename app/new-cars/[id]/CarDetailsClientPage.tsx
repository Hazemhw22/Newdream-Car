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
      {/* Mobile-First Hero Section */}
      <div className="relative bg-white dark:bg-gray-800 pt-16">
        {/* Main Image - Mobile Optimized */}
        <div className="relative h-[40vh] sm:h-[45vh] md:h-[50vh] w-full">
          {/* Mobile Navigation */}
          <div className="absolute top-4 right-4 z-10">
            <Link href="/new-cars">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white/95 dark:bg-gray-800/95 h-12 w-12 shadow-lg border-2"
              >
                <ArrowLeft className="h-6 w-6 rotate-180" />
              </Button>
            </Link>
          </div>

          <div className="absolute top-4 left-4 z-10 flex gap-3">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/95 dark:bg-gray-800/95 h-12 w-12 shadow-lg border-2"
              onClick={() => {}}
            >
              <Share2 className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/95 dark:bg-gray-800/95 h-12 w-12 shadow-lg border-2"
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
          </div>

          {/* Large Mobile Image Navigation */}
          <button
            onClick={prevImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 dark:bg-gray-800/90 p-4 rounded-full shadow-lg active:scale-95 transition-transform"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 dark:bg-gray-800/90 p-4 rounded-full shadow-lg active:scale-95 transition-transform"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Mobile Image Counter */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 bg-black/70 text-white px-4 py-2 rounded-full text-base font-medium">
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

        {/* Mobile-Optimized Thumbnails */}
        <div className="overflow-x-auto py-4 px-4 bg-white dark:bg-gray-800">
          <div className="flex gap-3 pb-2">
            {carData.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative h-20 w-20 rounded-xl overflow-hidden border-3 transition-all flex-shrink-0 active:scale-95 ${
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

      {/* Mobile-First Content Layout */}
      <div className="px-4 py-6 space-y-8">
        {/* Car Title - Mobile Optimized */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-3 leading-tight">
            {carData.brand} {carData.name}
          </h1>
          <div className="text-gray-600 dark:text-gray-400 text-lg">קטגוריה: {carData.category}</div>
        </div>

        {/* Mobile Price Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border">
          <div className="text-center mb-4">
            <div className="text-3xl font-bold mb-2">{formatPrice(carData.price)}</div>
            {carData.originalPrice && (
              <div className="text-lg text-gray-500 line-through">{formatPrice(carData.originalPrice)}</div>
            )}
            <div className="text-sm text-gray-500">מחיר מחירון</div>
          </div>

          <div className="text-center py-4 border-t border-b">
            <div className="text-2xl font-bold mb-1">{formatPrice(monthlyPayment)}</div>
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
          <Button
            variant="outline"
            className="w-full h-14 text-lg font-semibold mt-3 rounded-xl border-2"
            onClick={() => setShowContactModal(true)}
          >
            פרטים נוספים
          </Button>
        </div>

        {/* Car Description */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-right">תיאור הרכב</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-right text-lg">{carData.description}</p>
        </div>

        {/* Color Picker - Mobile Optimized */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-6 text-center">באיזה צבע תרצו את ה{carData.name} שלכם?</h2>
          <CarColorPicker colorOptions={carData.colorOptions} onSelectColor={setSelectedColor} />
        </div>

        {/* Mobile-Optimized Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <Tabs defaultValue="specs" className="w-full">
            <TabsList className="w-full grid grid-cols-3 h-16 text-base bg-gray-100 dark:bg-gray-700 rounded-none">
              <TabsTrigger value="specs" className="text-sm font-semibold">
                מפרט טכני
              </TabsTrigger>
              <TabsTrigger value="features" className="text-sm font-semibold">
                תכונות
              </TabsTrigger>
              <TabsTrigger value="interior" className="text-sm font-semibold">
                עיצוב פנים
              </TabsTrigger>
            </TabsList>
            <TabsContent value="specs" className="p-6">
              <div className="space-y-4">
                {Object.entries(carData.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center border-b pb-3 text-base">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">{value}</span>
                    <span className="font-semibold">{key}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="features" className="p-6">
              <ul className="space-y-4 text-right">
                {carData.features.map((feature, index) => (
                  <li key={index} className="flex items-center justify-end gap-4 text-base">
                    <span className="font-medium">{feature}</span>
                    <span className="text-green-500 text-2xl">✓</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="interior" className="p-6">
              <div className="grid grid-cols-1 gap-4">
                {carData.interiorImages.map((image, index) => (
                  <div key={index} className="relative h-64 rounded-xl overflow-hidden">
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

        {/* Enhanced Mobile Financing Calculator */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-6 text-center">מחשבון מימון</h3>
          <div className="space-y-6">
            {/* Down Payment */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-lg">{formatPrice(downPayment)}</span>
                <span className="text-base font-medium">מקדמה</span>
              </div>
              <input
                type="range"
                min={0}
                max={carData.price * 0.5}
                step={1000}
                value={downPayment}
                onChange={(e) => setDownPayment(Number.parseInt(e.target.value))}
                className="w-full h-6 bg-gray-300 dark:bg-gray-600 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to left, #06b6d4 0%, #06b6d4 ${(downPayment / (carData.price * 0.5)) * 100}%, #d1d5db ${(downPayment / (carData.price * 0.5)) * 100}%, #d1d5db 100%)`,
                }}
              />
              <div className="flex justify-between text-sm mt-2 text-gray-500">
                <span>{formatPrice(carData.price * 0.5)}</span>
                <span>{formatPrice(0)}</span>
              </div>
            </div>

            {/* Final Payment */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-lg">{formatPrice(finalPayment)}</span>
                <span className="text-base font-medium">תשלום אחרון</span>
              </div>
              <input
                type="range"
                min={0}
                max={carData.price * 0.6}
                step={1000}
                value={finalPayment}
                onChange={(e) => setFinalPayment(Number.parseInt(e.target.value))}
                className="w-full h-6 bg-gray-300 dark:bg-gray-600 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to left, #06b6d4 0%, #06b6d4 ${(finalPayment / (carData.price * 0.6)) * 100}%, #d1d5db ${(finalPayment / (carData.price * 0.6)) * 100}%, #d1d5db 100%)`,
                }}
              />
              <div className="flex justify-between text-sm mt-2 text-gray-500">
                <span>{formatPrice(carData.price * 0.6)}</span>
                <span>{formatPrice(0)}</span>
              </div>
            </div>

            {/* Payment Period */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-lg">{selectedMonths} חודשים</span>
                <span className="text-base font-medium">תקופת תשלומים</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[24, 36, 48, 60, 72].map((month) => (
                  <button
                    key={month}
                    onClick={() => setSelectedMonths(month)}
                    className={`py-4 text-base font-semibold rounded-xl transition-all active:scale-95 ${
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
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-lg">{(interestRate * 100).toFixed(1)}%</span>
                <span className="text-base font-medium">ריבית שנתית</span>
              </div>
              <input
                type="range"
                min={0.01}
                max={0.1}
                step={0.005}
                value={interestRate}
                onChange={(e) => setInterestRate(Number.parseFloat(e.target.value))}
                className="w-full h-6 bg-gray-300 dark:bg-gray-600 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to left, #06b6d4 0%, #06b6d4 ${((interestRate - 0.01) / (0.1 - 0.01)) * 100}%, #d1d5db ${((interestRate - 0.01) / (0.1 - 0.01)) * 100}%, #d1d5db 100%)`,
                }}
              />
              <div className="flex justify-between text-sm mt-2 text-gray-500">
                <span>10%</span>
                <span>1%</span>
              </div>
            </div>

            {/* Monthly Payment Result */}
            <div className="text-center py-6 px-6 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl shadow-lg">
              <div className="text-3xl font-bold text-yellow-900 mb-2">{formatPrice(monthlyPayment)}</div>
              <div className="text-base font-semibold text-yellow-800">תשלום חודשי</div>
            </div>
          </div>
        </div>

        {/* Suggested Cars */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-6 text-center">מכוניות נוספות שחשבנו שתאהבו</h2>
          <SuggestedCarsSlider currentCarId={params.id} />
        </div>
      </div>

     
    </div>
  )
}
