import { baseURL } from "@/lib/supabase";
import { reqHeader } from "@/utils/constants/Request";
import type { ResetPasswordPayload } from "../schema/ResetPassword";

export const resetPassword = async (payload: ResetPasswordPayload) => {
  const res = await fetch(baseURL + "/auth/v1/user", {
    method: "PUT",
    headers: { ...reqHeader, Authorization: `Bearer ${payload.access_token}` },

    body: JSON.stringify({
      password: payload.password,
    }),
  });
  if (!res.ok) return res;
  return res;
};
