'use client';

import React from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
  DialogClose,
} from '@/components/ui/dialog';
import { PhoneCall, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  carName: string;
  carImage: string;
  carPrice: number;
  year?: number;
  mileage?: number;
}

export default function ContactModal({
  isOpen,
  onClose,
  carName,
  carImage,
  carPrice,
  year,
  mileage,
}: ContactModalProps) {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS',
      minimumFractionDigits: 0,
    }).format(price);

  // إعداد البيانات
  const phoneNumber = '0501234567';
  const formattedPhone = `tel:${phoneNumber}`;
  const whatsappLink = `https://wa.me/972${phoneNumber.replace(/^0/, '')}?text=שלום, אני מעוניין בפרטים על הרכב ${carName}`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        {/* כותרת ושם הרכב */}
        <DialogHeader>
          <DialogTitle>צור קשר לגבי:</DialogTitle>
          <div className="text-lg font-bold text-gray-800 dark:text-gray-200">{carName}</div>
        </DialogHeader>

        <div className="space-y-4">
          {/* صورة السيارة */}
          <div className="relative w-full h-48 rounded overflow-hidden">
            <Image src={carImage} alt={carName} fill className="object-cover" />
          </div>

          {/* تفاصيل السعر */}
          <div className="text-gray-700 dark:text-gray-300 space-y-1">
            <p>
              <strong>מחיר:</strong> {formatPrice(carPrice)}
            </p>
            {year && (
              <p>
                <strong>שנה:</strong> {year}
              </p>
            )}
            {mileage && (
              <p>
                <strong>קילומטראז&apos;:</strong> {mileage.toLocaleString()} ק&quot;מ
              </p>
            )}
          </div>

          {/* כפתורי יצירת קשר */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
            <a href={formattedPhone} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="w-full flex gap-2 items-center justify-center">
                <PhoneCall className="w-4 h-4" />
                התקשרו אלינו
              </Button>
            </a>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white flex gap-2 items-center justify-center">
                <MessageCircle className="w-4 h-4" />
                וואטסאפ
              </Button>
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
