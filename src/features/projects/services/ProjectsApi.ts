import { baseURL } from "@/lib/supabase";
import { reqHeader } from "@/utils/constants/Request";
import { getAccessToken } from "@/utils/cookies";

export const getProjects = async () => {
  const ACCESS_TOKEN = getAccessToken();
  try {
    const response = await fetch(baseURL + "/rest/v1/rpc/get_projects", {
      method: "GET",
      headers: { ...reqHeader, Authorization: `Bearer ${ACCESS_TOKEN}` },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("UNAUTHORIZED");
      }
      if (response.status >= 500) {
        throw new Error("SERVER_ERROR");
      }
      throw new Error("CLIENT_ERROR");
    }

    return await response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      console.error(error);
      // throw new Error("NETWORK_ERROR");
    }
    throw error;
  }
};
