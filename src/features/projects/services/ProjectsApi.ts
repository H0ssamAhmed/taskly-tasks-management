import { baseURL } from "@/lib/supabase";
import { reqHeader } from "@/utils/constants/Request";
import { getAccessToken } from "@/utils/cookies";
import type { ProjectFormData } from "../schema/Project.schema";
import type {
  EpicPaginantion,
  EpicQuery,
  ProjectEpicType,
  ProjectPagination,
} from "../schema/types";

export const defaultLimit: number = 10;

export const getProjects = async ({
  page = 1,
  limit = defaultLimit,
}: ProjectPagination) => {
  const offset = (page - 1) * limit;
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

export const creatPrpject = async (payload: ProjectFormData) => {
  const ACCESS_TOKEN = getAccessToken();
  const res = await fetch(baseURL + "/rest/v1/projects", {
    method: "POST",
    headers: { ...reqHeader, Authorization: `Bearer ${ACCESS_TOKEN}` },

    body: JSON.stringify(payload),
  });
  if (!res.ok) return res;
  return res;
};
export const updatePrpject = async ({
  id,
  payload,
}: {
  id: string;
  payload: ProjectFormData;
}) => {
  const ACCESS_TOKEN = getAccessToken();
  const res = await fetch(baseURL + `/rest/v1/projects?id=eq.${id}`, {
    method: "PATCH",
    headers: { ...reqHeader, Authorization: `Bearer ${ACCESS_TOKEN}` },

    body: JSON.stringify(payload),
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

export const getProjectMemeber = async (id: string) => {
  const ACCESS_TOKEN = getAccessToken();
  const res = await fetch(
    baseURL + `/rest/v1/get_project_members?project_id=eq.${id}&select=*`,
    {
      method: "GET",
      headers: { ...reqHeader, Authorization: `Bearer ${ACCESS_TOKEN}` },
    },
  );
  if (!res.ok) return res;
  return res.json();
};

export const creatPrpjectEpic = async (payload: ProjectEpicType) => {
  const ACCESS_TOKEN = getAccessToken();
  const res = await fetch(baseURL + "/rest/v1/epics", {
    method: "POST",
    headers: { ...reqHeader, Authorization: `Bearer ${ACCESS_TOKEN}` },

    body: JSON.stringify(payload),
  });
  if (!res.ok) return res;
  return res;
};

export const getPrpjectEpics = async ({
  page = 1,
  limit = defaultLimit,
  id,
}: EpicPaginantion) => {
  const offset = (page - 1) * limit;
  const ACCESS_TOKEN = getAccessToken();
  try {
    const response = await fetch(
      baseURL +
        `/rest/v1/project_epics?project_id=eq.${id}&limit=${limit}&offset=${offset}`,
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

export const fetchEpicDetails = async ({ epicId, projectId }: EpicQuery) => {
  const ACCESS_TOKEN = getAccessToken();
  const res = await fetch(
    baseURL +
      `/rest/v1/project_epics?project_id=eq.${projectId}&id=eq.${epicId}`,
    {
      method: "GET",
      headers: { ...reqHeader, Authorization: `Bearer ${ACCESS_TOKEN}` },
    },
  );
  if (!res.ok) return res;
  return res.json();
};

export const getProjectTask = async () => {};
