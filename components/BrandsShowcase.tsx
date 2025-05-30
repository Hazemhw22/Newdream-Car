'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { Button } from '../components/ui/button';

const brands = [
  { name: 'Tata', logo: 'https://images.pexels.com/photos/39501/lamborghini-brno-racing-car-39501.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { name: 'Maruti Suzuki', logo: 'https://images.pexels.com/photos/39501/lamborghini-brno-racing-car-39501.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { name: 'Mahindra', logo: 'https://images.pexels.com/photos/39501/lamborghini-brno-racing-car-39501.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { name: 'Hyundai', logo: 'https://images.pexels.com/photos/39501/lamborghini-brno-racing-car-39501.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { name: 'Toyota', logo: 'https://images.pexels.com/photos/39501/lamborghini-brno-racing-car-39501.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { name: 'Kia', logo: 'https://images.pexels.com/photos/39501/lamborghini-brno-racing-car-39501.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { name: 'BMW', logo: 'https://images.pexels.com/photos/39501/lamborghini-brno-racing-car-39501.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { name: 'Skoda', logo: 'https://images.pexels.com/photos/39501/lamborghini-brno-racing-car-39501.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { name: 'Volkswagen', logo: 'https://images.pexels.com/photos/39501/lamborghini-brno-racing-car-39501.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { name: 'Mercedes-Benz', logo: 'https://images.pexels.com/photos/39501/lamborghini-brno-racing-car-39501.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { name: 'Land Rover', logo: 'https://images.pexels.com/photos/39501/lamborghini-brno-racing-car-39501.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { name: 'Honda', logo: 'https://images.pexels.com/photos/39501/lamborghini-brno-racing-car-39501.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
];

export default function BrandsShowcase() {
  return (
    <section className="py-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">All Brands</h2>
      
      {/* Brands Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mb-6">
        {brands.map((brand, index) => (
          <Link 
            key={index} 
            href={`/brands/${brand.name.toLowerCase()}`}
            className="group"
          >
            <div className="aspect-square rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700 hover:border-[#00D1C1] dark:hover:border-[#00D1C1] transition-colors">
              <div 
                className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundImage: `url(${brand.logo})` }}
              >
                <div className="w-full h-full flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition-colors">
                  <span className="text-white font-bold">{brand.name}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {/* View More Button */}
      <div className="flex justify-center">
        <Button variant="ghost" className="text-gray-600 dark:text-gray-300 flex items-center gap-1">
          View More Brands
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}