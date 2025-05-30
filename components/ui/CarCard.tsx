import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface CarCardProps {
  name: string;
  brand: string;
  image: string;
  price: string;
  link: string;
}

export default function CarCard({ name, brand, image, price, link }: CarCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-[16/9] relative">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-sm text-gray-500 mb-2">{brand}</p>
        <p className="text-gray-700 mb-4">{price}</p>
        <div className="flex justify-between items-center">
          <Link 
            href={link}
            className="text-sm text-[#00D1C1] hover:text-[#0088F8] transition-colors flex items-center gap-1 group"
          >
            View Price Breakup
            <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}