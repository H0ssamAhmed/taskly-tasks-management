import { baseURL } from "@/lib/supabase";
import type { loginInPayload } from "../schema/types";
import { reqHeader } from "@/utils/constants/Request";

export const loginIn = async (payload: loginInPayload) => {
  const res = await fetch(baseURL + "/auth/v1/token?grant_type=password", {
    method: "POST",
    headers: { ...reqHeader },

    body: JSON.stringify(payload),
  });
  if (!res.ok) return res;
  return res;
};
