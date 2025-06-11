'use client';

import Image from 'next/image';
import { Button } from './ui/button';

interface CarPriceCardProps {
  name: string;
  brand: string;
  image: string;
  price: string;
  onInquiry: () => void;
}

export default function CarPriceCard({ name, brand, image, price, onInquiry }: CarPriceCardProps) {
  return (
    <div className="rounded-xl shadow-md overflow-hidden bg-white dark:bg-gray-800">
      <div className="relative w-full h-[240px]">
        <Image 
          src={image} 
          alt={name} 
          fill 
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, 400px"
          priority={false} // أو true لو تريد تحميل مسبق
        />
      </div>
      <div className="p-4 text-right">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{brand}</p>
        <p className="text-base font-bold text-[#00D1C1]">{price}</p>
        <Button onClick={onInquiry} className="mt-4 w-full">
        שאל עכשיו        
        </Button>
      </div>
    </div>
    
  );
}
