"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Share2, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SuggestedCarsSlider } from "@/components/SuggestedCarsSlider"

// Mock data - in a real app, you would fetch this from an API
const carData = {
  id: "1",
  name: "TIGGO 7 PRO PHEV",
  brand: "Chery",
  price: 179990,
  originalPrice: 201720,
  monthlyPayment: 1338,
  downPayment: 20998,
  finalPayment: 69995,
  phone: "+972-50-123-4567",
  whatsapp: "+972501234567",
  image: "/used-cars-for-sale-in-bronx-11568883664utp7qwvdsg.png?height=600&width=800",
  images: [
    "/used-cars-for-sale-in-bronx-11568883664utp7qwvdsg.png?height=600&width=800",
    "/used-cars-for-sale-in-bronx-11568883664utp7qwvdsg.png?height=600&width=600",
    "/used-cars-for-sale-in-bronx-11568883664utp7qwvdsg.png?height=600&width=800",
    "/used-cars-for-sale-in-bronx-11568883664utp7qwvdsg.png?height=600&width=800",
  ],
  interiorImages: [
    "/used-cars-for-sale-in-bronx-11568883664utp7qwvdsg.png?height=400&width=600",
    "/used-cars-for-sale-in-bronx-11568883664utp7qwvdsg.png?height=300&width=400",
    "/used-cars-for-sale-in-bronx-11568883664utp7qwvdsg.png?height=300&width=400",
  ],
  features: ["שבעה מושבים עם מולטימדיה מלאה", "טכנולוגיות בטיחות"],
  year: 2022,
  mileage: 46000,
  category: "רכב שטח",
  isHybrid: true,
  description:
    "רכב משומש מתוחזק היטב במצב מצוין עם קילומטראז' נמוך. רכב זה כולל 5 מושבים במרכב קרוסאובר, תא מטען גדול ויכולת נסיעה טובה בשטח.",
  specs: {
    מנוע: "1.5L טורבו היברידי",
    כוח: "150 כ״ס",
    "תיבת הילוכים": "אוטומטית",
    "סוג דלק": "היברידי",
    "צריכת דלק": "4.8L/100km",
    תאוצה: "9.8s (0-100 km/h)",
    "מהירות מרבית": "185 km/h",
    מידות: "4.5m x 1.8m x 1.7m",
    משקל: "1450 ק״ג",
    "נפח תא מטען": "525L",
  },
  seller: {
    name: "אוטו סנטר",
    location: "תל אביב",
    phone: "03-1234567",
    rating: 4.8,
  },
  condition: "מצוין",
  lastService: "01/2025",
  warranty: "עד 06/2026",
}

export default function UsedCarDetailsClientPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)

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
    console.log("Fetching used car with ID:", params.id)
  }, [params.id])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900" dir="rtl">
      {/* Mobile-First Hero Section */}
      <div className="relative bg-white dark:bg-gray-800 pt-16">
        {/* Main Image - Mobile Optimized */}
        <div className="relative h-[40vh] sm:h-[45vh] md:h-[50vh] w-full">
          <div className="absolute top-4 right-4 z-10">
            <Link href="/used-cars">
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

          {/* Tags */}
          <div className="absolute top-4 right-20 z-10 flex flex-col gap-2">
            {carData.isHybrid && (
              <div className="bg-green-500 text-white px-3 py-1 rounded-full font-bold w-fit text-sm">היברידי</div>
            )}
            <div className="bg-orange-500 text-white px-3 py-1 rounded-full font-bold w-fit text-sm">משומש</div>
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
            src={carData.images[selectedImage] || "/placeholder.svg"}
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
          <div className="flex items-center gap-4 justify-center text-lg text-gray-600 dark:text-gray-400">
            <span>
              {carData.year} | {carData.mileage.toLocaleString()} ק&quot;מ
            </span>
            <span>קטגוריה: {carData.category}</span>
          </div>
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
            שמור רכב
          </Button>
        </div>

        {/* Car Description */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-right">תיאור הרכב</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-right text-lg">{carData.description}</p>
        </div>

        {/* Car Condition Cards */}
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <div className="text-center">
              <div className="text-gray-500 text-base mb-2">מצב הרכב</div>
              <div className="font-bold text-2xl text-green-600">{carData.condition}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
              <div className="text-gray-500 text-sm mb-2">טיפול אחרון</div>
              <div className="font-bold text-lg">{carData.lastService}</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
              <div className="text-gray-500 text-sm mb-2">אחריות עד</div>
              <div className="font-bold text-lg">{carData.warranty}</div>
            </div>
          </div>
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

        {/* Seller Information */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-6 text-right">פרטי המוכר</h2>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-cyan-100 text-cyan-800 px-4 py-2 rounded-xl text-base font-bold">
                {carData.seller.rating} ★
              </div>
              <div className="text-base text-gray-500">דירוג</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-xl">{carData.seller.name}</div>
              <div className="text-gray-600 text-lg">{carData.seller.location}</div>
            </div>
          </div>
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

        {/* Trade-in Option */}
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-6 shadow-lg">
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold mb-2">יש לך רכב ישן?</h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg">טרייד-אין זמין!</p>
          </div>
          
        </div>

        {/* Suggested Cars */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-6 text-center">רכבים נוספים שאולי תאהב</h2>
          <SuggestedCarsSlider currentCarId={params.id} />
        </div>
      </div>

     
    </div>
  )
}
