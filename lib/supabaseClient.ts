import { createClient } from "@supabase/supabase-js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Car } from "../lib/types";

// For server components
export const createServerSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(supabaseUrl, supabaseKey);
};

// For client components
export const createBrowserSupabaseClient = () => {
  return createClientComponentClient();
};

// Singleton pattern for client-side
let browserClient: ReturnType<typeof createClientComponentClient> | null = null;

export const getSupabaseBrowserClient = () => {
  if (!browserClient) {
    browserClient = createClientComponentClient();
  }
  return browserClient;
};

// Helper functions for common data fetching
export const fetchCars = async (type: "new" | "used" | null = null) => {
  const supabase = createServerSupabaseClient();
  let query = supabase.from("cars").select("*");

  if (type) {
    query = query.eq("status", type);
  }

  const { data, error } = await query.order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data as Car[];
};

export const fetchCarById = async (id: string) => {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Car;
};
