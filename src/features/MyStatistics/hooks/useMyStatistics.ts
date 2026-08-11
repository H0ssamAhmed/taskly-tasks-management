import { useCallback, useEffect, useState } from "react";
import type {
  CalendarStatsResponse,
  ProjectCountItem,
  StatisticsFilters,
  TaskStatusEnum,
} from "../schema/types";
import {
  getTasksCalendarStats,
  getTasksCountPerProject,
} from "../services/StatisticsApi";
import { formatDateForAPI, getCurrentWeekRange } from "../utils/dateUtils";
import { useProject } from "@/features/projects/hooks/useProject";

const defaultRange = getCurrentWeekRange();

export const useMyStatistics = () => {
  const [filters, setFilters] = useState<StatisticsFilters>({
    startDate: defaultRange.start,
    endDate: defaultRange.end,
    projectId: null,
    status: null,
  });
  const { projects } = useProject();
  const [calendarStats, setCalendarStats] =
    useState<CalendarStatsResponse | null>(null);
  const [projectCounts, setProjectCounts] = useState<ProjectCountItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [dateRangeError, setDateRangeError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setIsLoading(true);
    setError(false);
    try {
      const payload = {
        p_start_date: formatDateForAPI(filters.startDate),
        p_end_date: formatDateForAPI(filters.endDate),
        p_project_id: filters.projectId,
        p_status: filters.status,
      };

      const [calendar, projectsData] = await Promise.all([
        getTasksCalendarStats(payload),
        getTasksCountPerProject({
          p_start_date: payload.p_start_date,
          p_end_date: payload.p_end_date,
        }),
      ]);

      setCalendarStats(calendar);
      setProjectCounts(projectsData);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const updateDateRange = (start: Date, end: Date) => {
    const diff =
      Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    if (diff > 7) {
      setDateRangeError("Date range cannot exceed 7 days");
      return;
    }
    if (start > end) {
      setDateRangeError("Start date must be before end date");
      return;
    }
    setDateRangeError(null);
    setFilters((prev) => ({ ...prev, startDate: start, endDate: end }));
  };

  const updateProject = (projectId: string | null) => {
    setFilters((prev) => ({ ...prev, projectId }));
  };

  const updateStatus = (status: TaskStatusEnum | null) => {
    setFilters((prev) => ({ ...prev, status }));
  };

  return {
    filters,
    calendarStats,
    projectCounts,
    projects,
    isLoading,
    error,
    dateRangeError,
    updateDateRange,
    updateProject,
    updateStatus,
    refetch: fetchStats,
  };
};
