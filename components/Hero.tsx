"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const carPromotions = [
	{
		id: 1,
		title: "BYD 🚗",
		subtitle: "רכבים חשמליים חדשים",
		description: "קרוסאובר היברידי",
		buttonText: "לפרטים",
		image: "/2022-Mercedes-Benz-C-Class-White.png?height=300&width=400",
		link: "/new-cars",
	},
	{
		id: 2,
		title: "לא את המבחר! 🔥",
		subtitle: "ליזינג פרטי ב-ניו דרים קאר",
		description: "עם מקדמה החל מ-₪3,900",
		buttonText: "לפרטים",
		image: "/427770636_1718097302720.png?height=300&width=400",
		link: "/new-cars",
	},
	{
		id: 3,
		title: "CHERY ⚡",
		subtitle: "אמרת פלאג-אין היברידי צ'רי",
		description: "אמרת צ'רי",
		buttonText: "לפרטים נוספים",
		image: "/pngimg.com - bmw_PNG99558.png?height=300&width=400",
		link: "/new-cars",
	},
	{
		id: 4,
		title: "CHERY 💎",
		subtitle: "פרו-אין במחיר מתחרה מיוחד",
		description: "מנועים מתקדמים ביותר",
		buttonText: "לפרטים נוספים",
		image: "/STAM-TOYOTA-LAND-CRUISER-2022.png?height=300&width=400",
		link: "/new-cars",
	},
	{
		id: 5,
		title: "NEW DACIA DUSTER 🚙",
		subtitle: "היברידי",
		description: "פיקאפ",
		buttonText: "לפרטים",
		image: "/used-cars-for-sale-in-bronx-11568883664utp7qwvdsg.png?height=300&width=400",
		link: "/new-cars",
	},
]

export default function Hero() {
	const [isMobile, setIsMobile] = useState(false)
	const [currentSlide, setCurrentSlide] = useState(0)
	const touchStartX = useRef<number | null>(null)
	const touchEndX = useRef<number | null>(null)

	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth < 768)
		handleResize()
		window.addEventListener("resize", handleResize)
		return () => window.removeEventListener("resize", handleResize)
	}, [])

	const cardsPerView = isMobile ? 1 : 3
	const maxSlide = carPromotions.length - cardsPerView

	// تصحيح الكبسات: اليمين = التالي، اليسار = السابق (مع dir=rtl)
	const nextSlide = () => {
		setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1))
	}
	const prevSlide = () => {
		setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1))
	}

	// لمس للجوال (تصحيح اتجاه السحب)
	const handleTouchStart = (e: React.TouchEvent) => {
		if (!isMobile) return
		touchStartX.current = e.touches[0].clientX
	}
	const handleTouchMove = (e: React.TouchEvent) => {
		if (!isMobile) return
		touchEndX.current = e.touches[0].clientX
	}
	const handleTouchEnd = () => {
		if (!isMobile || touchStartX.current === null || touchEndX.current === null) return
		const distance = touchStartX.current - touchEndX.current
		const minSwipeDistance = 50
		if (Math.abs(distance) > minSwipeDistance) {
			if (distance > 0) prevSlide() // ← اسحب لليسار: السابق
			else nextSlide()              // → اسحب لليمين: التالي
		}
		touchStartX.current = null
		touchEndX.current = null
	}

	// عرض الكروت الصحيحة فقط
	const visiblePromos = carPromotions.slice(currentSlide, currentSlide + cardsPerView)

	return (
		<section className="w-full bg-white dark:bg-gray-900 py-8 md:py-16 px-4 text-center" dir="rtl">
			<div className="max-w-6xl mx-auto">
				<h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900 dark:text-white">
					כל מה שרכב, רק תבחרו 🚘
				</h1>
				<p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
					היי, אנחנו אוטו שוקת ואצלנו יש הכל: רכבים חדשים, יד שנייה, ליסינג, השכרה
				</p>
				<p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
					איזה רכב מתאים לך?
				</p>

				{/* كروت السيارات مع سلايدر */}
				<div className="relative mt-10">
					{/* أزرار التنقل - ديسكتوب فقط (تصحيح الاتجاه) */}
					{!isMobile && (
						<>
							<button
								onClick={prevSlide} // ← السابق (يسار)
								className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 p-2 md:p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
								aria-label="הקודם"
							>
								<ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
							</button>
							<button
								onClick={nextSlide} // → التالي (يمين)
								className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 p-2 md:p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
								aria-label="הבא"
							>
								<ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
							</button>
						</>
					)}

					<div
						className="overflow-hidden"
						onTouchStart={handleTouchStart}
						onTouchMove={handleTouchMove}
						onTouchEnd={handleTouchEnd}
					>
						<div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-3"} gap-6`}>
							{visiblePromos.map((promo) => (
								<div
									key={promo.id}
									className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden p-0 border border-gray-100 dark:border-gray-700 h-full"
								>
									{/* الصورة بالأعلى */}
									<div className="w-full relative" style={{ height: 180 }}>
										<Image
											src={promo.image || "/placeholder.svg"}
											alt={promo.title}
											fill
											className="object-contain object-center"
											sizes="(max-width: 768px) 100vw, 33vw"
										/>
									</div>
									{/* الكتابة תחת الصورة */}
									<div className="w-full flex flex-col items-center px-4 pt-4 pb-2">
										<h3 className="text-xl md:text-2xl font-bold mb-1 text-center">{promo.title}</h3>
										<p className="text-sm md:text-base mb-1 text-center">{promo.subtitle}</p>
										<p className="text-xs md:text-sm opacity-90 mb-2 text-center">{promo.description}</p>
										{promo.buttonText && (
											<a href={promo.link} className="w-full mt-2">
												<Button
													variant="secondary"
													size="sm"
													className="w-full bg-cyan-500 hover:bg-cyan-600 text-white border-none font-semibold"
												>
													{promo.buttonText}
												</Button>
											</a>
										)}
									</div>
								</div>
							))}
						</div>
					</div>

					{/* مؤشرات الشرائح */}
					<div className="flex justify-center mt-6 space-x-2">
						{Array.from({ length: maxSlide + 1 }).map((_, idx) => (
							<button
								key={idx}
								onClick={() => setCurrentSlide(idx)}
								className={`w-3 h-3 rounded-full mx-2 transition-colors ${
									currentSlide === idx ? "bg-cyan-500" : "bg-gray-300 dark:bg-gray-600"
								}`}
								aria-label={`מעבר לשקופית ${idx + 1}`}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
