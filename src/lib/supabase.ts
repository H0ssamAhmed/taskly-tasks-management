import { createClient } from "@supabase/supabase-js";
export const baseURL = import.meta.env.VITE_SUPABASE_URL;
export const apikey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(baseURL, apikey);
