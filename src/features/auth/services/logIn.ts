import { baseURL, apikey } from "@/lib/supabase";
import type { loginInPayload } from "../schema/types";

export const loginIn = async (payload: loginInPayload) => {
  const res = await fetch(baseURL + "/auth/v1/token?grant_type=password", {
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
