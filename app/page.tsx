"use client";
import React, { useEffect, useState } from "react";
import Head from "../components/Head";
import Hero from "../components/Hero";
import CarTypes from "../components/CarTypes";
import FeaturedCars from "../components/FeaturedCars";
import BrandsShowcase from "../components/BrandsShowcase";
import HotSales from "../components/HotSales";
import NewCars from "../components/NewCars";
import UsedCars from "../components/UsedCars";
import LuxuryCars from "../components/LuxuryCars";
import { createClient } from "@supabase/supabase-js";
import { Car } from "@/lib/types";

// إعداد supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Home() {
  const [hotSalesCars, setHotSalesCars] = useState<Car[]>([]);
  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);
  const [newCars, setNewCars] = useState<Car[]>([]);
  const [usedCars, setUsedCars] = useState<Car[]>([]);
  const [luxuryCars, setLuxuryCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      const { data: allCars, error: allCarsError } = await supabase
        .from("cars")
        .select("*")
        .eq("public", true)
        .order("created_at", { ascending: false });

      if (allCarsError) {
        setLoading(false);
        return;
      }

      setHotSalesCars((allCars || []).filter((car: Car) => car.show_in_sales));
      setFeaturedCars(
        (allCars || []).filter((car: Car) => car.show_in_featured)
      );
      setNewCars((allCars || []).filter((car: Car) => car.show_in_new_car));
      setUsedCars((allCars || []).filter((car: Car) => car.show_in_used_car));
      setLuxuryCars(
        (allCars || []).filter((car: Car) => car.show_in_luxery_car)
      );
      setLoading(false);
    };

    fetchCars();
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Head />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-4">
        <CarTypes />
        <Hero />
        <FeaturedCars cars={featuredCars} />
        <BrandsShowcase />
        <HotSales cars={hotSalesCars} />
        <NewCars cars={newCars} />
        <UsedCars cars={usedCars} />
        <LuxuryCars cars={luxuryCars} />
        {loading && (
          <div className="text-center text-gray-500 py-8">טוען רכבים...</div>
        )}
      </div>
    </main>
  );
}
