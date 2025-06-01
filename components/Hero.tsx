"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react"

const carPromotions = [
  {
    id: 1,
    title: "BYD 🚗",
    subtitle: "רכבים חשמליים חדשים",
    description: "קרוסאובר היברידי",
    image: "/pngimg.com - bmw_PNG99558.png",
    bgColor: "bg-slate-700",
    textColor: "text-white",
  },
  {
    id: 2,
    title: "לא את המבחר! 🔥",
    subtitle: "ליזינג פרטי ב-ניו דרים קאר",
    description: "עם מקדמה החל מ-₪3,900",
    buttonText: "לפרטים",
    image: "/2022-Mercedes-Benz-C-Class-White.png",
    bgColor: "bg-cyan-400",
    textColor: "text-black",
  },
  {
    id: 3,
    title: "CHERY ⚡",
    subtitle: "אמרת פלאג-אין היברידי צ'רי",
    description: "אמרת צ'רי",
    buttonText: "לפרטים נוספים",
    image: "/427770636_1718097302720.png",
    bgColor: "bg-blue-600",
    textColor: "text-white",
  },
  {
    id: 4,
    title: "CHERY 💎",
    subtitle: "פרו-אין במחיר מתחרה מיוחד",
    description: "מנועים מתקדמים ביותר",
    buttonText: "לפרטים נוספים",
    image: "/STAM-TOYOTA-LAND-CRUISER-2022.png",
    bgColor: "bg-green-700",
    textColor: "text-white",
  },
  {
    id: 5,
    title: "NEW DACIA DUSTER 🚙",
    subtitle: "היברידי",
    description: "פיקאפ",
    image: "/used-cars-for-sale-in-bronx-11568883664utp7qwvdsg.png",
    bgColor: "bg-gray-600",
    textColor: "text-white",
  },
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)
  const [isPaused, setIsPaused] = useState(false)

  // عدد البطاقات المعروضة في كل مرة
  const cardsPerView = 3

  // حساب عدد الشرائح (كل شريحة تظهر 3 بطاقات)
  const maxSlides = Math.max(1, carPromotions.length - cardsPerView + 1)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % maxSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + maxSlides) % maxSlides)
  }

  // التمرير التلقائي كل 4 ثواني
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(nextSlide, 4000)
    return () => clearInterval(interval)
  }, [currentSlide, isPaused])

  // التعامل مع اللمس للسحب
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return
    const distance = touchStartX.current - touchEndX.current

    if (Math.abs(distance) > 50) {
      if (distance > 0) nextSlide()
      else prevSlide()
    }

    touchStartX.current = null
    touchEndX.current = null
  }

  return (
    <section
      className="w-full bg-white dark:bg-gray-900 py-8 md:py-16 px-4 text-center relative overflow-hidden"
      dir="rtl"
    >
      {/* الخلفية الزخرفية */}
      <div className="absolute left-0 top-0 w-full h-full pointer-events-none">
        <svg className="absolute -left-20 top-0 w-96 h-full" viewBox="0 0 400 800" fill="none">
          <path d="M0 0 Q200 400 0 800" stroke="#00BCD4" strokeWidth="8" fill="none" opacity="0.6" />
        </svg>
        <svg className="absolute -right-20 top-0 w-96 h-full" viewBox="0 0 400 800" fill="none">
          <path d="M400 0 Q200 400 400 800" stroke="#00BCD4" strokeWidth="8" fill="none" opacity="0.6" />
          <path
            d="M350 100 Q150 300 350 500 Q150 700 350 900"
            stroke="#00BCD4"
            strokeWidth="6"
            fill="none"
            opacity="0.4"
          />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto z-10 relative">
        {/* عنوان الهيرو */}
        <div className="mb-12 md:mb-16">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900 dark:text-white">
            כל מה שרכב, רק תבחרו 🚘
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            היי, אנחנו freesbe ואצלנו יש הכל: רכבים חדשים, יד שנייה, ליזינג, השכרה, ביטוח וחיי. אז איזה רכב מתאים לך?
          </p>

          <div className="flex flex-wrap gap-3 md:gap-4 justify-center mb-6">
            <Button className="bg-yellow-400 text-black hover:bg-yellow-500 h-12 px-6 rounded-full font-semibold text-sm md:text-base">
              <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              ליזינג פרטי
            </Button>
            <Button className="bg-yellow-400 text-black hover:bg-yellow-500 h-12 px-6 rounded-full font-semibold text-sm md:text-base">
              <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              יד שנייה
            </Button>
            <Button className="bg-yellow-400 text-black hover:bg-yellow-500 h-12 px-6 rounded-full font-semibold text-sm md:text-base">
              <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              רכב חדש
            </Button>
          </div>

          <p className="text-sm md:text-base text-cyan-600 underline cursor-pointer hover:text-cyan-700 transition-colors">
            מחפשים רכב להשכרה? »
          </p>
        </div>

        {/* القسم المتحرك */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
            חם ב-<span className="text-cyan-500">ניו דרים קאר</span> 🔥
          </h2>

          <div
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <button
              onClick={prevSlide}
              className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 p-2 md:p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
              aria-label="Previous slide"
            >
              <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 p-2 md:p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
              aria-label="Next slide"
            >
              <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
            </button>

            {/* الحاوية المتحركة */}
            <div className="overflow-hidden rounded-xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(${currentSlide * -100 / cardsPerView}%)` }}
              >
                {carPromotions.map((promo) => (
                  <div key={promo.id} className="w-1/3 flex-shrink-0 px-2">
                    <div
                      className={`${promo.bgColor} ${promo.textColor} rounded-xl p-6 md:p-8 h-64 md:h-80 flex flex-col justify-between relative overflow-hidden group cursor-pointer hover:scale-105 transition-transform duration-300`}
                    >
                      <div className="absolute inset-0 opacity-20">
                        <Image
                          src={promo.image || "/placeholder.svg"}
                          alt={promo.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="relative z-10 text-right">
                        <h3 className="text-xl md:text-2xl font-bold mb-2">{promo.title}</h3>
                        <p className="text-sm md:text-base mb-2">{promo.subtitle}</p>
                        <p className="text-xs md:text-sm opacity-90">{promo.description}</p>
                      </div>
                      {promo.buttonText && (
                        <div className="relative z-10 text-right">
                          <Button
                            variant="secondary"
                            size="sm"
                            className="bg-cyan-500 hover:bg-cyan-600 text-white border-none"
                          >
                            {promo.buttonText}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* مؤشرات الشرائح */}
            <div className="flex justify-center mt-6 space-x-2 rtl:space-x-reverse">
              {Array.from({ length: maxSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentSlide === index ? "bg-cyan-500" : "bg-gray-300 dark:bg-gray-600"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
