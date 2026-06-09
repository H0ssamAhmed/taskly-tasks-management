import { baseURL } from "@/lib/supabase";
import { reqHeader } from "@/utils/constants/Request";
import { getAccessToken } from "@/utils/cookies";

export const loginOut = async () => {
  const ACCESS_TOKEN = getAccessToken();
  const res = await fetch(baseURL + "/auth/v1/logout", {
    method: "POST",
    headers: { ...reqHeader, Authorization: `Bearer ${ACCESS_TOKEN}` },
  });
  if (!res.ok) {
    return res;
  }
  return res;
};
