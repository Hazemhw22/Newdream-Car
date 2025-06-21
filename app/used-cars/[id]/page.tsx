import { createServerSupabaseClient } from "../../../lib/supabaseClient";
import CarDetailsClientPage from "./UsedCarDetailsClientPage";
import { notFound } from "next/navigation";

export default async function CarPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createServerSupabaseClient();

  const { data: car, error } = await supabase.from("cars").select("*").eq("id", id).single();

  if (error || !car) {
    notFound();
  }

  return <CarDetailsClientPage car={car} />;
}
