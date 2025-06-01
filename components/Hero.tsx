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
  {
    id: 6,
    title: "NISSAN ⚡",
    subtitle: "חדשני וחסכוני בדלק",
    description: "טכנולוגיה מתקדמת",
    buttonText: "למידע נוסף",
    image: "/2022-Mercedes-Benz-C-Class-White.png",
    bgColor: "bg-red-600",
    textColor: "text-white",
  },
  {
    id: 7,
    title: "TOYOTA 🚘",
    subtitle: "רכבים ידועים ואמינים",
    description: "עיצוב מודרני",
    buttonText: "לפרטים",
    image: "/STAM-TOYOTA-LAND-CRUISER-2022.png",
    bgColor: "bg-yellow-500",
    textColor: "text-black",
  },
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)
  const [isPaused, setIsPaused] = useState(false)

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // نعرض 2 شرائح في الهاتف، 4 في الديسكتوب
  const cardsPerView = isMobile ? 2 : 4

  // حساب الحد الأعلى للشرائح الممكن التنقل بينها
  const maxSlides = Math.max(0, carPromotions.length - cardsPerView)

  // في RTL، السحب لليسار = السابق، سحب لليمين = التالي
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev < maxSlides ? prev + 1 : 0))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : maxSlides))
  }

  // سحب
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

    // اتجاه السحب معكوس بسبب RTL
    if (Math.abs(distance) > 50) {
      if (distance > 0) {
        // المستخدم سحب لليسار => السابق
        prevSlide()
      } else {
        // المستخدم سحب لليمين => التالي
        nextSlide()
      }
    }

    touchStartX.current = null
    touchEndX.current = null
  }

  return (
    <section
      className="w-full bg-white dark:bg-gray-900 py-8 md:py-16 px-4 text-center relative overflow-hidden"
      dir="rtl"
    >
      {/* الخلفية */}
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
        <div className="mb-12 md:mb-16">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900 dark:text-white">
            כל מה שרכב, רק תבחרו 🚘
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            היי, אנחנו ניו דרים קאר ואצלנו יש הכל: רכבים חדשים, יד שנייה, ליזינג, השכרה, ביטוח וחיי. אז איזה רכב מתאים לך?
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

          <p className="text-sm md:text-base text-gray-700 dark:text-gray-400">
            עד 30,000 ₪ מתנה על הלוואת רכב. אנו מציעים את השירות המהיר והאמין ביותר בישראל.
          </p>
        </div>

        {/* السلايدر */}
        <div
          ref={containerRef}
          className="flex overflow-hidden relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          role="region"
          aria-label="קידומי רכבים"
        >
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              width: `${(carPromotions.length * 100) / cardsPerView}%`,
              transform: `translateX(-${(currentSlide * 100) / carPromotions.length}%)`,
            }}
          >
            {carPromotions.map(({ id, title, subtitle, description, image, bgColor, textColor, buttonText }) => (
              <div
                key={id}
                className={`flex-shrink-0 p-4 md:p-6 rounded-xl flex flex-col justify-between ${bgColor} ${textColor}`}
                style={{ width: `${100 / carPromotions.length}%`, minWidth: `${100 / cardsPerView}%` }}
              >
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-2">{title}</h3>
                  <h4 className="text-md md:text-lg font-semibold mb-2">{subtitle}</h4>
                  <p className="text-sm md:text-base mb-4">{description}</p>
                  {buttonText && (
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-yellow-300 hover:bg-yellow-400 text-black rounded-full"
                    >
                      {buttonText}
                    </Button>
                  )}
                </div>
                <div className="mt-4 flex justify-center">
                  <Image
                    src={image}
                    alt={title}
                    width={180}
                    height={110}
                    className="object-contain rounded-md"
                    priority
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* أزرار التنقل */}
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={prevSlide}
            aria-label="החלק שמאלה"
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            aria-label="החלק ימינה"
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            →
          </button>
        </div>
      </div>
    </section>
  )
}
