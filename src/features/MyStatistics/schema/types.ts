export type TaskStatusEnum =
  | "TO_DO"
  | "IN_PROGRESS"
  | "BLOCKED"
  | "IN_REVIEW"
  | "READY_FOR_QA"
  | "REOPENED"
  | "READY_FOR_PRODUCTION"
  | "DONE";

export interface CalendarStatsRequest {
  p_start_date: string;
  p_end_date: string;
  p_project_id: string | null;
  p_status: TaskStatusEnum | null;
}

export interface DailyStats {
  day: string;
  statuses: Partial<Record<TaskStatusEnum, number>>;
}

export interface CalendarStatsResponse {
  daily: DailyStats[];
  totals: Partial<Record<TaskStatusEnum, number>>;
  total_tasks: number;
  done_tasks: number;
  overdue_tasks: number;
}

export interface ProjectCountRequest {
  p_start_date: string;
  p_end_date: string;
}

export interface ProjectCountItem {
  project_id: string;
  project_name: string;
  tasks_count: number;
}

export interface StatisticsFilters {
  startDate: Date;
  endDate: Date;
  projectId: string | null;
  status: TaskStatusEnum | null;
}

export interface ProjectOption {
  id: string;
  name: string;
}
