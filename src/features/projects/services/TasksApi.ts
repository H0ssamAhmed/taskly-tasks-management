import { baseURL } from "@/lib/supabase";
import { reqHeader } from "@/utils/constants/Request";
import { getAccessToken } from "@/utils/cookies";
import type { CreateTaskPayload, FetchProjectTasksType } from "../schema/types";
import { apiRequest } from "./RequestWrapper";

export const createTask = async (payload: CreateTaskPayload) => {
  const ACCESS_TOKEN = getAccessToken();
  const res = await fetch(baseURL + "/rest/v1/tasks", {
    method: "POST",
    headers: { ...reqHeader, Authorization: `Bearer ${ACCESS_TOKEN}` },

    body: JSON.stringify(payload),
  });
  if (!res.ok) return res;
  return res;
};

export const getEpicTasks = async (id: string) => {
  return apiRequest(baseURL + `/rest/v1/project_tasks?epic_id=eq.${id}`, {
    method: "GET",
  });
};

export const getProjectTasksBoardView = async ({
  projectId,
  status,
  searchTerm = "",
}: FetchProjectTasksType) => {
  return apiRequest(
    baseURL +
      `/rest/v1/project_tasks?project_id=eq.${projectId}&status=eq.${status}&title=ilike.%25${searchTerm}%25`,
    {
      method: "GET",
      headers: {
        Prefer: "count=exact",
      },
    },
  );
};

export const getProjectTasksInListView = async ({
  projectId,
  searchTerm = "",
}: {
  projectId: string;
  searchTerm?: string;
}) => {
  const respone = await apiRequest(
    baseURL +
      `/rest/v1/project_tasks?project_id=eq.${projectId}&title=ilike.%25${searchTerm}%25`,
    {
      method: "GET",
      headers: {
        Prefer: "count=exact",
      },
    },
  );

  return respone;
};

export const getTaskDetails = async ({
  projectId,
  taskId,
}: {
  projectId: string;
  taskId: string;
}) => {
  const ACCESS_TOKEN = getAccessToken();
  const res = await fetch(
    baseURL +
      `/rest/v1/project_tasks?project_id=eq.${projectId}&id=eq.${taskId}`,
    {
      headers: { ...reqHeader, Authorization: `Bearer ${ACCESS_TOKEN}` },
    },
  );
  if (!res.ok) return res;
  return res.json();
};
