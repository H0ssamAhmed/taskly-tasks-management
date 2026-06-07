import { apikey } from "@/lib/supabase";

export const reqHeader = {
  "Content-Type": "application/json",
  apikey: apikey,
};
