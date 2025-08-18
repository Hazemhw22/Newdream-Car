'use client';
import Image from "next/image";
import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown } from 'lucide-react';

// جلب بعض السيارات الموجودة (مثال: 5 سيارات فقط)
async function fetchCars() {
  const res = await fetch("/api/cars?limit=5"); // غيّر المسار حسب API عندك
  if (!res.ok) return [];
  return res.json();
}

// الصفحات الثابتة
const staticPages = [
  { label: " כל המכוניות", value: "/cars", type: "page" },
  { label: "רכבים חדשים", value: "/new-cars", type: "page" },
  { label: "רכבים יד שנייה", value: "/used-cars", type: "page" },
  { label: "אודותינו", value: "/about", type: "page" },
  { label: "צור קשר", value: "/contact", type: "page" },
];

export default function Head() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [cars, setCars] = useState<{ label: string; value: string; type: string }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchCars().then((data) => {
      setCars(
        data.map((car: any) => ({
          label: car.name,
          value: `/new-cars/${car.id}`,
          type: "car",
        }))
      );
    });
  }, []);

  // دمج السيارات مع الصفحات
  const searchOptions = [...staticPages, ...cars];

  // تصفية النتائج حسب البحث
  const filteredOptions = searchOptions.filter(opt =>
    opt.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (href: string) => {
    window.location.href = href;
  };

  // إغلاق القائمة عند الضغط خارجها
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden">
      {/* صورة الخلفية */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/BMW-electric-and-luxury-car-lineup-with-mountain-background.png"
          alt="Car showroom"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0088F8]/20 to-[#00D1C1]/20 dark:from-gray-800/30 dark:to-gray-900/30" />
      </div>

      {/* شكل زخرفي SVG */}
      <div className="absolute bottom-0 left-0 right-0 h-64 w-full z-10">
        <svg
          viewBox="0 0 1440 320"
          className="absolute bottom-0 left-0 w-full"
          preserveAspectRatio="none"
          style={{ height: "15vw", minHeight: "100px" }}
        >
          <path
            className="fill-white dark:fill-black"
            fillOpacity="1"
            d="M0,224L80,213.3C160,203,320,181,480,181.3C640,181,800,203,960,197.3C1120,192,1280,160,1360,144L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          />
        </svg>
      </div>

      {/* المحتوى فوق الخلفية */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col items-center justify-center text-white">
        <h1 className="text-2xl md:text-6xl font-bold text-center mb-6 animate-fadeIn">
          בוא נמצא את רכב החלומות שלך!
        </h1>

        {/* Search Bar مع قائمة منسدلة تظهر عند الضغط */}
        <div
          dir="rtl"
          className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-full shadow-xl overflow-visible flex items-center p-1 relative"
          onClick={() => setShowDropdown((v) => !v)}
          tabIndex={0}
        >
          <div className="flex-shrink-0 pr-4">
            <Search className="h-5 w-5 text-gray-400 dark:text-gray-300" />
          </div>
          <input
            ref={inputRef}
            type="text"
            placeholder="חפש רכב או דף..."
            className="w-full px-4 py-3 text-gray-700 dark:text-gray-200 dark:placeholder-gray-400 bg-transparent focus:outline-none"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            readOnly={false}
          />
          <button
            className="flex-shrink-0 bg-gradient-to-r from-[#00D1C1] to-[#0088F8] text-white font-medium py-3 px-6 rounded-full hover:shadow-lg transition-shadow flex items-center gap-1"
            onClick={() => {
              if (filteredOptions.length === 1)
                handleSelect(filteredOptions[0].value);
            }}
            type="button"
            tabIndex={-1}
          >
            <ChevronDown className="w-4 h-4" />
            חפש
          </button>
          {/* القائمة المنسدلة */}
          {showDropdown && (
            <div
              ref={dropdownRef}
              className="absolute top-full right-0 left-0 bg-white dark:bg-gray-800 rounded-b-xl shadow-lg mt-1 max-h-60 overflow-y-auto z-50"
            >
              {filteredOptions.length > 0 ? (
                filteredOptions.map((opt) => (
                  <div
                    key={opt.value}
                    className="px-5 py-3 cursor-pointer hover:bg-cyan-100 dark:hover:bg-cyan-900 text-gray-800 dark:text-white flex items-center gap-2"
                    onMouseDown={() => handleSelect(opt.value)}
                  >
                    <span
                      className="text-xs px-2 py-1 rounded bg-cyan-500 text-white"
                      style={{ minWidth: 48, textAlign: "center" }}
                    >
                      {opt.type === "car" ? "רכב" : "דף"}
                    </span>
                    <span>{opt.label}</span>
                  </div>
                ))
              ) : (
                <div className="px-5 py-3 text-gray-400 text-center">
                  לא נמצאו תוצאות
                </div>
              )}
            </div>
          )}
        </div>

        {/* روابط سريعة */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <QuickLink href="/cars" label="כל המכוניות" />
          <QuickLink href="/new-cars" label="רכבים חדשים" />
          <QuickLink href="/used-cars" label="רכבים יד שנייה" />
          <QuickLink href="/about" label="אודותינו" />
          <QuickLink href="/contact" label="צור קשר" />
        </div>
      </div>
    </div>
  );
}

function QuickLink({ href, label }: { href: string; label: string }) {
  return (
    <a 
      href={href}
      className="px-5 py-2 bg-white bg-opacity-40 hover:bg-opacity-30 dark:bg-white/30 dark:hover:bg-white/20 rounded-full text-white backdrop-blur-sm transition-all hover:scale-105"
    >
      {label}
    </a>
  );
}
