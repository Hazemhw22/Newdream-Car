"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

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
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)
  const [isPaused, setIsPaused] = useState(false)

  // اكتشاف اذا الجهاز موبايل حسب العرض
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768) // أقل من 768 بكسل = موبايل
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const cardsPerView = isMobile ? 1 : 3
  const maxSlides = Math.max(1, carPromotions.length - cardsPerView + 1)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % maxSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + maxSlides) % maxSlides)
  }

  // Auto Slide Every 4 Seconds (معلق مؤقتًا على الموبايل)
  useEffect(() => {
    if (isPaused || isMobile) return
    const interval = setInterval(nextSlide, 4000)
    return () => clearInterval(interval)
  }, [currentSlide, isPaused, isMobile])

  // Swipe Events فقط على الموبايل
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMobile) return
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!isMobile) return
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
      {/* الزينة الخلفية */}
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
              ליזינג פרטי
            </Button>
            <Button className="bg-yellow-400 text-black hover:bg-yellow-500 h-12 px-6 rounded-full font-semibold text-sm md:text-base">
              יד שנייה
            </Button>
            <Button className="bg-yellow-400 text-black hover:bg-yellow-500 h-12 px-6 rounded-full font-semibold text-sm md:text-base">
              רכב חדש
            </Button>
          </div>

          <p className="text-sm md:text-base text-cyan-600 underline cursor-pointer hover:text-cyan-700 transition-colors">
            מחפשים רכב להשכרה? »
          </p>
        </div>

        {/* القسم المتحرك 🔄 */}
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
            ref={containerRef}
          >
            {/* ازالة ازرار التنقل على الهاتف */}
            {!isMobile && (
              <>
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
              </>
            )}

            {/* الحاوية المتحركة */}
            <div className="overflow-hidden rounded-xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(${currentSlide * -100}%)` }}
              >
                {carPromotions.map((promo) => (
                  <div
                    key={promo.id}
                    className={`${isMobile ? "w-full" : "w-1/3"} flex-shrink-0 px-2`}
                  >
                    <div
                      className={`${promo.bgColor} ${promo.textColor} rounded-xl p-6 md:p-8 h-64 md:h-80 flex flex-col justify-between relative overflow-hidden group cursor-pointer hover:scale-105 transition-transform duration-300`}
                    >
                      <div className="absolute inset-0 opacity-20">
                        <Image
                          src={promo.image || "/placeholder.svg"}
                          alt={promo.title}
                          fill
                          className="object-contain object-center"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          priority
                        />
                      </div>
                      <div className="relative z-10">
                        <h3 className="text-lg md:text-xl font-bold">{promo.title}</h3>
                        <p className="text-sm md:text-base mb-2">{promo.subtitle}</p>
                        <p className="text-xs md:text-sm">{promo.description}</p>
                        {promo.buttonText && (
                          <Button className="mt-4 bg-white text-black px-4 py-2 rounded-full text-sm md:text-base hover:bg-gray-200 transition-colors">
                            {promo.buttonText}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ChevronLeft(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

function ChevronRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}
