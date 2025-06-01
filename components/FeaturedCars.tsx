'use client';

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { cn } from '../lib/utils';

export default function FeaturedCars() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -current.offsetWidth : current.offsetWidth;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section dir="rtl" className="py-10 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="flex justify-between items-center mb-6 px-4 sm:px-0">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">רכבים נבחרים</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => scroll('right')} // لأننا في RTL
            className="rounded-full dark:border-gray-600 dark:text-white dark:hover:bg-gray-800"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => scroll('left')} // لأننا في RTL
            className="rounded-full dark:border-gray-600 dark:text-white dark:hover:bg-gray-800"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide md:scrollbar-none"
      >
        <FeaturedCard 
          title="צ'רי"
          subtitle="חווית יוקרה חדשה"
          image="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          color="bg-red-600"
        />
        <FeaturedCard 
          title="מבצעים בלעדיים"
          subtitle="החל מ-₪3,900 לחודש"
          image="https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          color="bg-cyan-500"
        />
        <FeaturedCard 
          title="מהפכה חשמלית"
          subtitle="רכב ירוק לדור הבא"
          image="https://images.pexels.com/photos/3589586/pexels-photo-3589586.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          color="bg-green-600"
        />
        <FeaturedCard 
          title="אוסף יוקרה"
          subtitle="רכבים למביני עניין"
          image="https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          color="bg-purple-600"
        />
      </div>
    </section>
  );
}

interface FeaturedCardProps {
  title: string;
  subtitle: string;
  image: string;
  color: string;
}

function FeaturedCard({ title, subtitle, image, color }: FeaturedCardProps) {
  return (
    <div className="flex-shrink-0 w-full sm:w-[350px] md:w-[400px] h-[240px] rounded-xl overflow-hidden relative group shadow-md dark:shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/40 to-transparent z-10"></div>
      
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}></div>
      
      {/* Colored Overlay - Only visible on hover */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-300",
        color
      )}></div>
      
      {/* Content */}
      <div className="absolute bottom-0 right-0 p-6 z-20 w-full text-right">
        <h3 className="text-white text-2xl font-bold mb-1">{title}</h3>
        <p className="text-white/80 mb-4">{subtitle}</p>
        <Button 
          className="bg-white text-gray-800 hover:bg-white/90 dark:bg-gray-200 dark:text-black dark:hover:bg-gray-300 transition-transform group-hover:-translate-x-2"
        >
          לצפייה
        </Button>
      </div>
    </div>
  );
}
