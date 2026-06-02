import { supabase, baseURL, apikey } from "@/lib/supabase";
import type { SignUpPayload } from "../schema/types";

export const singUp = async (payload: SignUpPayload) => {
  const res = await fetch(baseURL + "/auth/v1/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: apikey,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) return res;
  return res;
};
