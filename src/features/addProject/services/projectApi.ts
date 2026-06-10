import { baseURL } from "@/lib/supabase";
import { reqHeader } from "@/utils/constants/Request";
import type { AddProjectFormData } from "../schema/AddProject";
import { getAccessToken } from "@/utils/cookies";

export const CreatPrpject = async (payload: AddProjectFormData) => {
  const ACCESS_TOKEN = getAccessToken();
  const res = await fetch(baseURL + "/rest/v1/projects", {
    method: "POST",
    headers: { ...reqHeader, Authorization: `Bearer ${ACCESS_TOKEN}` },

    body: JSON.stringify(payload),
  });
  if (!res.ok) return res;
  return res;
};
