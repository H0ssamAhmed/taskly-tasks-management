import { baseURL } from "@/lib/supabase";
import { reqHeader } from "@/utils/constants/Request";
import { getAccessToken } from "@/utils/cookies";

export const getProjects = async () => {
  const ACCESS_TOKEN = getAccessToken();
  const res = await fetch(baseURL + "/rest/v1/rpc/get_projects", {
    method: "GET",
    headers: { ...reqHeader, Authorization: `Bearer ${ACCESS_TOKEN}` },
  });
  if (!res.ok) return res;
  return res.json();
};
