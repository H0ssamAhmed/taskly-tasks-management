import { baseURL } from "@/lib/supabase";
import { reqHeader } from "@/utils/constants/Request";

export const passwordReset = async (payload: { email: string }) => {
  const res = await fetch(baseURL + "/auth/v1/recover", {
    method: "POST",
    headers: { ...reqHeader },
    body: JSON.stringify(payload),
  });
  if (!res.ok) return res;
  return res;
};
