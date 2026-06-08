import { baseURL } from "@/lib/supabase";
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from "@/utils/constants/CookieStrings";
import { reqHeader } from "@/utils/constants/Request";
import {
  getAccessToken,
  getRefreshToken,
  removeTokens,
  setCookie,
} from "@/utils/cookies";

export const getCurrentUser = async () => {
  const access_token = getAccessToken();
  const res = await fetch(baseURL + "/auth/v1/user", {
    method: "GET",
    headers: { ...reqHeader, Authorization: `Bearer ${access_token}` },
  });
  const result = await res.json();
  if (result.code == 403 || result.error_code == "bad_jwt") {
    const newTokens = await refreshToken();
    setCookie(ACCESS_TOKEN_KEY, newTokens.access_token);
    setCookie(REFRESH_TOKEN_KEY, newTokens.refresh_token);
    return newTokens.user;
  }
  return result;
};
export const refreshToken = async () => {
  const refresh_token = getRefreshToken();
  const res = await fetch(baseURL + "/auth/v1/token?grant_type=refresh_token", {
    method: "POST",
    headers: { ...reqHeader },
    body: JSON.stringify({ refresh_token: refresh_token }),
  });
  if (!res.ok) {
    removeTokens();
    window.location.href = "/sign-in";
    return null;
  }
  const data = await res.json();

  return data;
};
