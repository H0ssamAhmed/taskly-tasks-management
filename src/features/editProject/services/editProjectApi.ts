import { baseURL } from "@/lib/supabase";
import { reqHeader } from "@/utils/constants/Request";

import { getAccessToken } from "@/utils/cookies";
import type { EditProjectPayLoad } from "../schema/types";

export const updatePrpject = async ({
  id,
  name,
  description,
}: EditProjectPayLoad) => {
  const ACCESS_TOKEN = getAccessToken();
  const res = await fetch(baseURL + `/rest/v1/projects?id=eq.${id}`, {
    method: "PATCH",
    headers: { ...reqHeader, Authorization: `Bearer ${ACCESS_TOKEN}` },

    body: JSON.stringify({ name, description }),
  });
  if (!res.ok) return res;
  return res;
};
export const getProjectById = async (id: string) => {
  const ACCESS_TOKEN = getAccessToken();
  const res = await fetch(baseURL + `/rest/v1/projects?id=eq.${id}&select=*`, {
    method: "GET",
    headers: { ...reqHeader, Authorization: `Bearer ${ACCESS_TOKEN}` },
  });
  if (!res.ok) return res;
  return res;
};
