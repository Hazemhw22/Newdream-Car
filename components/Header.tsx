"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Sun,
  Moon,
  MapPin,
  Car,
  PlusCircle,
  BadgeDollarSign,
  Phone,
  Info,
} from "lucide-react";
import { cn } from "../lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white dark:bg-gray-900 shadow-md"
          : "bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm"
      )}
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-row-reverse md:flex-row items-center justify-between h-16">
          {/* الشعار */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/WhatsApp Image 2025-06-10 at 4.35.26 PM.png"
                alt="הלוגו"
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
            <Link
              href="/cars"
              className="flex items-center gap-1 text-foreground hover:text-[#00D1C1] transition-colors"
            >
              <Car className="w-5 h-5" />
              כל המכוניות
            </Link>
            <Link
              href="/new-cars"
              className="flex items-center gap-1 text-foreground hover:text-[#00D1C1] transition-colors"
            >
              <PlusCircle className="w-5 h-5" />
              רכבים חדשים
            </Link>
            <Link
              href="/used-cars"
              className="flex items-center gap-1 text-foreground hover:text-[#00D1C1] transition-colors"
            >
              <BadgeDollarSign className="w-5 h-5" />
              רכבים משומשים
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-1 text-foreground hover:text-[#00D1C1] transition-colors"
            >
              <Phone className="w-5 h-5" />
              צור קשר
            </Link>
            <Link
              href="/about"
              className="flex items-center gap-1 text-foreground hover:text-[#00D1C1] transition-colors"
            >
              <Info className="w-5 h-5" />
              אודותינו
            </Link>
          </nav>

          {/* أدوات المستخدم (الوضع الليلي) في الديسكتوب */}
          <div className="hidden md:flex items-center space-x-reverse space-x-4">
            <button
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={toggleTheme}
            >
              {mounted && theme === "dark" ? (
                <Sun className="h-5 w-5 text-foreground" />
              ) : mounted ? (
                <Moon className="h-5 w-5 text-foreground" />
              ) : null}
            </button>
          </div>

          {/* أدوات الموبايل */}
          <div className="md:hidden flex flex-row-reverse items-center space-x-reverse space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {theme === "dark" ? (
                <Sun className="h-6 w-6" />
              ) : (
                <Moon className="h-6 w-6" />
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* القائمة الجانبية في الموبايل بتصميم كروت */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg px-4 py-6">
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/cars"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="לכל המכוניות"
              className="flex flex-col items-center bg-gray-50 dark:bg-gray-800 rounded-xl shadow p-4"
            >
              <Car className="w-10 h-10 mb-2 text-cyan-600" />
              <span className="font-bold mb-2 text-sm">כל המכוניות</span>
            </Link>

            <Link
              href="/new-cars"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="לרכבים חדשים"
              className="flex flex-col items-center bg-gray-50 dark:bg-gray-800 rounded-xl shadow p-4"
            >
              <PlusCircle className="w-10 h-10 mb-2 text-cyan-600" />
              <span className="font-bold mb-2 text-sm">רכבים חדשים</span>
            </Link>

            <Link
              href="/used-cars"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="לרכבים משומשים"
              className="flex flex-col items-center bg-gray-50 dark:bg-gray-800 rounded-xl shadow p-4"
            >
              <BadgeDollarSign className="w-10 h-10 mb-2 text-cyan-600" />
              <span className="font-bold mb-2 text-sm">רכבים משומשים</span>
            </Link>

            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="לצור קשר"
              className="flex flex-col items-center bg-gray-50 dark:bg-gray-800 rounded-xl shadow p-4"
            >
              <Phone className="w-10 h-10 mb-2 text-cyan-600" />
              <span className="font-bold mb-2 text-sm">צור קשר</span>
            </Link>

            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="לאודותינו"
              className="flex flex-col items-center bg-gray-50 dark:bg-gray-800 rounded-xl shadow p-4 col-span-2"
            >
              <Info className="w-10 h-10 mb-2 text-cyan-600" />
              <span className="font-bold mb-2 text-sm">אודותינו</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
