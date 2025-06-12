// app/new-cars/page.tsx
import React from "react";
import CarCard from "@/components/CarCard";
import { supabase } from "@/lib/supabaseClient";

export default async function NewCarsPage() {
  const { data: cars, error } = await supabase
    .from("cars")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <div>حدث خطأ أثناء جلب البيانات: {error.message}</div>;
  }

  if (!cars || cars.length === 0) {
    return <div>لا توجد سيارات حالياً</div>;
  }

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <CarCard
          key={car.id.toString()}
          car={{
            id: car.id.toString(),
            name: car.name || car.title || " CAR NAME ", 
            brand: car.brand,
            sale_price: car.sale_price,
            originalPrice: car.market_price,
            image:
              car.images && car.images.length > 0
                ? car.images[0]
                : "/placeholder-car.jpg",
            features: car.features,
            isBestChoice: false,
            year: car.year,
            kilometers: car.kilometers,
            award: undefined,
          }}
        />
      ))}
    </div>
  );
}
