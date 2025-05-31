import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  brand: string;
  setBrand: (brand: string) => void;
  priceRange: string;
  setPriceRange: (range: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

export default function SearchFilters({
  searchTerm,
  setSearchTerm,
  brand,
  setBrand,
  priceRange,
  setPriceRange,
  sortBy,
  setSortBy
}: SearchFiltersProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search cars..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600"
          />
        </div>

        {/* Brand Filter */}
        <Select value={brand} onValueChange={setBrand}>
          <SelectTrigger className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600">
            <SelectValue placeholder="Select Brand" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <SelectItem value="all">All Brands</SelectItem>
            <SelectItem value="chery">Chery</SelectItem>
            <SelectItem value="dacia">Dacia</SelectItem>
            <SelectItem value="toyota">Toyota</SelectItem>
            <SelectItem value="honda">Honda</SelectItem>
            <SelectItem value="nissan">Nissan</SelectItem>
          </SelectContent>
        </Select>

        {/* Price Range Filter */}
        <Select value={priceRange} onValueChange={setPriceRange}>
          <SelectTrigger className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600">
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="0-100000">₪0 - ₪100,000</SelectItem>
            <SelectItem value="100000-150000">₪100,000 - ₪150,000</SelectItem>
            <SelectItem value="150000-200000">₪150,000 - ₪200,000</SelectItem>
            <SelectItem value="200000+">₪200,000+</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort By */}
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="name">Name A-Z</SelectItem>
            <SelectItem value="newest">Newest First</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
