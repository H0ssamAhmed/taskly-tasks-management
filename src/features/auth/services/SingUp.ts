import { baseURL } from "@/lib/supabase";
import type { SignUpPayload } from "../schema/types";
import { reqHeader } from "@/utils/constants/Request";

export const singUp = async (payload: SignUpPayload) => {
  const res = await fetch(baseURL + "/auth/v1/signup", {
    method: "POST",
    headers: { ...reqHeader },

    body: JSON.stringify(payload),
  });
  if (!res.ok) return res;
  return res;
};
