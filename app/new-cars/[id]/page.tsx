import { createServerSupabaseClient } from "../../../lib/supabaseClient";
import CarDetailsClientPage from "./CarDetailsClientPage";
import { notFound } from "next/navigation";

export default async function CarPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const supabase = createServerSupabaseClient();

  const { data: car, error } = await supabase
    .from("cars")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !car) {
    notFound();
  }

  return <CarDetailsClientPage car={car} />;
}
