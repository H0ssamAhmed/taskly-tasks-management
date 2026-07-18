import { reqHeader } from "@/utils/constants/Request";
import { getAccessToken } from "@/utils/cookies";

export const apiRequest = async (url: string, options: RequestInit = {}) => {
  const ACCESS_TOKEN = getAccessToken();

  const response = await fetch(url, {
    ...options,
    headers: {
      ...reqHeader,
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("UNAUTHORIZED");
    }

    if (response.status >= 500) {
      throw new Error("SERVER_ERROR");
    }

    const error = await response.json().catch(() => null);

    throw new Error(error?.message || "CLIENT_ERROR");
  }

  const rangeHeader = (await response.headers.get("Content-Range")) || "0-9/0";

  const restOfResult = rangeHeader
    ? { data: await response.json(), pagination: rangeHeader }
    : response.json();

  return restOfResult;
};
