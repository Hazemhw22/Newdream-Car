import React from 'react';
import Head from '../components/Head';
import Hero from '../components/Hero';
import CarSlider from '../components/CarSlider';
import CarTypes from '../components/CarTypes';
import FeaturedCars from '../components/FeaturedCars';
import CarsByBudget from '../components/CarsByBudget';
import BrandsShowcase from '../components/BrandsShowcase';
import NewArrivals from '../components/NewArrivals';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Head/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <CarTypes/>
        <Hero />
        <CarSlider />
        <FeaturedCars />
        <CarsByBudget />
        <BrandsShowcase />
        <NewArrivals />
      </div>
    </main>
  );
}