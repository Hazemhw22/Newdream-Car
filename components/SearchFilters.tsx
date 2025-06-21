import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  brand: string;
  setBrand: (brand: string) => void;
  priceRange: string;
  setPriceRange: (range: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  year: string;
  setYear: (year: string) => void;
  years: number[];
}

export default function SearchFilters({
  searchTerm,
  setSearchTerm,
  brand,
  setBrand,
  priceRange,
  setPriceRange,
  sortBy,
  setSortBy,
  year,
  setYear,
  years,
}: SearchFiltersProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-400 h-4 w-4" />
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="חפש רכב..."
            className="pr-10 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600"
          />
        </div>

        {/* Brand Filter */}
        <Select value={brand} onValueChange={setBrand}>
          <SelectTrigger className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600">
            <SelectValue placeholder="בחר מותג" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <SelectItem value="all">כל המותגים</SelectItem>
            <SelectItem value="chery">צ&apos;רי</SelectItem>
            <SelectItem value="dacia">דאצ&apos;יה</SelectItem>
            <SelectItem value="toyota">טויוטה</SelectItem>
            <SelectItem value="honda">הונדה</SelectItem>
            <SelectItem value="nissan">ניסן</SelectItem>
          </SelectContent>
        </Select>

        {/* Year Filter */}
        <Select value={year} onValueChange={setYear}>
          <SelectTrigger className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600">
            <SelectValue placeholder="בחר שנה" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <SelectItem value="all">כל השנים</SelectItem>
            {years.map((y) => (
              <SelectItem key={y} value={y.toString()}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Price Range Filter */}
        <Select value={priceRange} onValueChange={setPriceRange}>
          <SelectTrigger className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600">
            <SelectValue placeholder="טווח מחירים" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <SelectItem value="all">כל המחירים</SelectItem>
            <SelectItem value="0-100000">₪0 - ₪100,000</SelectItem>
            <SelectItem value="100000-150000">₪100,000 - ₪150,000</SelectItem>
            <SelectItem value="150000-200000">₪150,000 - ₪200,000</SelectItem>
            <SelectItem value="200000+">₪200,000+</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort By */}
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600">
            <SelectValue placeholder="מיין לפי" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <SelectItem value="price-low">מחיר: מהנמוך לגבוה</SelectItem>
            <SelectItem value="price-high">מחיר: מהגבוה לנמוך</SelectItem>
            <SelectItem value="name">שם: א-ת</SelectItem>
            <SelectItem value="newest">החדשים קודם</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
