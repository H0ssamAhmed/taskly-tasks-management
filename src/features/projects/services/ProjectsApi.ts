import { baseURL } from "@/lib/supabase";
import { reqHeader } from "@/utils/constants/Request";
import { getAccessToken } from "@/utils/cookies";
export const pageLimit: number = 10;
export const getProjects = async ({ page = 1 }: { page?: number }) => {
  const limit: number = pageLimit;
  const offset = (page - 1 < 0 ? 0 : page - 1) * pageLimit;
  const ACCESS_TOKEN = getAccessToken();
  try {
    const response = await fetch(
      baseURL + `/rest/v1/rpc/get_projects?limit=${limit}&offset=${offset}`,
      {
        method: "GET",
        headers: {
          ...reqHeader,
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          Prefer: "count=exact",
        },
      },
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("UNAUTHORIZED");
      }
      if (response.status >= 500) {
        throw new Error("SERVER_ERROR");
      }
      throw new Error("CLIENT_ERROR");
    }

    const rangeHeader =
      (await response.headers.get("Content-Range")) || "0-9/0";
    const result = {
      data: await response.json(),
      pagination: rangeHeader,
    };
    return result;
  } catch (error) {
    if (error instanceof TypeError) {
      console.error(error);
      // throw new Error("NETWORK_ERROR");
    }
    throw error;
  }
};
