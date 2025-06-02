'use client';
    import Image from "next/image";
import React, { useState } from 'react';
import { Search } from 'lucide-react';

export default function Head() {
  const [searchQuery, setSearchQuery] = useState('');

  return (

<div className="relative h-[500px] md:h-[600px] overflow-hidden">
  {/* صورة الخلفية */}
  <div className="absolute inset-0 z-0">
    <Image
      src="/Used-Cars-Feature1024x301.jpg" // غيّر هذا حسب مسار الصورة
      alt="Car showroom"
      fill
      className="object-cover"
      priority
    />
    {/* تدرج لوني شفاف فوق الصورة */}
    <div className="absolute inset-0 bg-gradient-to-r from-[#0088F8]/80 to-[#00D1C1]/80 dark:from-gray-800/90 dark:to-gray-900/90" />
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
      className="fill-white dark:bg-black"
      fillOpacity="1"
      d="M0,224L80,213.3C160,203,320,181,480,181.3C640,181,800,203,960,197.3C1120,192,1280,160,1360,144L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
    />
    </svg>
  </div>

  {/* المحتوى فوق الخلفية */}
  <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col items-center justify-center text-white">
    <h1 className="text-4xl md:text-6xl font-bold text-center mb-6 animate-fadeIn">
      Let&apos;s find your perfect car
    </h1>

    {/* Search Bar */}
    <div
      dir="rtl"
      className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-full shadow-xl overflow-hidden flex items-center p-1"
    >
      <div className="flex-shrink-0 pr-4">
        <Search className="h-5 w-5 text-gray-400 dark:text-gray-300" />
      </div>
      <input
        type="text"
        placeholder="תאר את מה שאתה מחפש"
        className="w-full px-4 py-3 text-gray-700 dark:text-gray-200 dark:placeholder-gray-400 bg-transparent focus:outline-none"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className="flex-shrink-0 bg-gradient-to-r from-[#00D1C1] to-[#0088F8] text-white font-medium py-3 px-6 rounded-full hover:shadow-lg transition-shadow">
        חפש
      </button>
    </div>

    {/* روابط سريعة */}
    <div className="mt-8 flex flex-wrap justify-center gap-4">
      <QuickLink href="/new-cars" label="New Cars" />
      <QuickLink href="/used-cars" label="Used Cars" />
      <QuickLink href="/electric" label="Electric Vehicles" />
      <QuickLink href="/compare" label="Compare Models" />
    </div>
  </div>
</div>

  );
}

function QuickLink({ href, label }: { href: string; label: string }) {
  return (
    <a 
      href={href}
      className="px-5 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 dark:bg-white/10 dark:hover:bg-white/20 rounded-full text-white backdrop-blur-sm transition-all hover:scale-105"
    >
      {label}
    </a>
  );
}
