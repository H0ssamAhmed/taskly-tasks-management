import { baseURL } from "@/lib/supabase";
import { apiRequestPOST } from "@/features/projects/services/RequestWrapper";
import type {
  CalendarStatsRequest,
  CalendarStatsResponse,
  ProjectCountItem,
  ProjectCountRequest,
} from "../schema/types";

export const getTasksCalendarStats = async (
  payload: CalendarStatsRequest,
): Promise<CalendarStatsResponse> => {
  const response = await apiRequestPOST(
    `${baseURL}/rest/v1/rpc/get_tasks_calendar_stats`,
    { body: JSON.stringify(payload) },
  );
  return response.json();
};

export const getTasksCountPerProject = async (
  payload: ProjectCountRequest,
): Promise<ProjectCountItem[]> => {
  const response = await apiRequestPOST(
    `${baseURL}/rest/v1/rpc/get_tasks_count_per_project`,
    { body: JSON.stringify(payload) },
  );
  return response.json();
};
