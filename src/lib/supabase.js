import { createClient } from "@supabase/supabase-js";
const baseURL = import.meta.env.VITE_SUPABASE_URL;
const pubKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(baseURL, pubKey);
