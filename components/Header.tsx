"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Sun, Moon, MapPin } from "lucide-react"
import { cn } from "../lib/utils"
import { useTheme } from "next-themes"
import Image from "next/image"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white dark:bg-gray-900 shadow-md" : "bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm"
      )}
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* عكس الترتيب في الجوال فقط */}
        <div className="flex flex-row-reverse md:flex-row items-center justify-between h-16">
          
          {/* الشعار (صورة) */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/WhatsApp Image 2025-06-10 at 4.35.26 PM.png"
                alt="اللوجو"
                width={65}
                height={40}
                priority
              />
            </Link>
          </div>

          {/* الموقع */}
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <span>באר שבע , ישראל</span>
            <MapPin className="h-4 w-4" />
          </div>

          {/* القائمة في الديسكتوب */}
          <nav className="hidden md:flex items-center space-x-reverse space-x-8">
            <Link href="/new-cars" className="text-foreground hover:text-[#00D1C1] transition-colors">רכבים חדשים</Link>
            <Link href="/used-cars" className="text-foreground hover:text-[#00D1C1] transition-colors">רכבים משומשים</Link>
            <Link href="/contact" className="text-foreground hover:text-[#00D1C1] transition-colors">צור קשר</Link>
            <Link href="/about" className="text-foreground hover:text-[#00D1C1] transition-colors">אודותינו</Link>
          </nav>

          {/* أدوات المستخدم (الوضع الليلي) في الديسكتوب */}
          <div className="hidden md:flex items-center space-x-reverse space-x-4">
            <button
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-foreground" />
              ) : (
                <Moon className="h-5 w-5 text-foreground" />
              )}
            </button>
          </div>

          {/* أزرار الجوال - القائمة أولاً ثم الوضع الليلي */}
          <div className="md:hidden flex flex-row-reverse items-center space-x-reverse space-x-2">
            
            {/* زر الوضع الليلي */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {theme === "dark" ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </button>
            {/* زر القائمة */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* القائمة الجانبية في الجوال */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/new-cars" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 text-right" onClick={() => setIsMobileMenuOpen(false)}>רכבים חדשים</Link>
            <Link href="/used-cars" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 text-right" onClick={() => setIsMobileMenuOpen(false)}>רכבים משומשים</Link>
            <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 text-right" onClick={() => setIsMobileMenuOpen(false)}>צור קשר</Link>
            <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 text-right" onClick={() => setIsMobileMenuOpen(false)}>אודותינו</Link>
          </div>
        </div>
      )}
    </header>
  )
}
