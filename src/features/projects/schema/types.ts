import type { UserType } from "@/features/auth/schema/types";
import type { ProjectFormData } from "@/features/projects/schema/Project.schema";
import type { EpicFormData } from "./EpicScehma";
import type { TaskFormData } from "./TaskSchema";

export interface EditProjectPayLoad extends ProjectFormData {
  id: string;
}

export interface ProjectType {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  created_by: string;
}
export interface ProjectMemberType {
  metadata: UserType;
  email: string;
  member_id: string;
  project_id: string;
  role: string;
  user_id: string;
}
export interface ProjectEpicType extends EpicFormData {
  assignee_id?: string | null;
  project_id: string;
}

export interface UserProfile {
  sub: string;
  name: string;
  email: string;
  department: string;
}
export interface TaskData {
  id: string;
  title: string;
  description: string;
  deadline?: string | null;
  project_id: string;
  epic_id: string;
  created_at: string;
}

export interface AssigneeType {
  sub: string;
  name: string;
  email: string;
  department: string;
}
export interface ProjectEpicsType extends TaskData {
  assignee: AssigneeType;
  created_by: UserProfile;
}

export interface ProjectPagination {
  page?: number;
  limit?: number;
}

export interface EpicPaginantion extends ProjectPagination {
  id: string;
}

export interface EpicQuery {
  epicId: string;
  projectId: string;
}

export type TaskStatusType =
  | `TO_DO`
  | `IN_PROGRESS`
  | `BLOCKED`
  | `IN_REVIEW`
  | `READY_FOR_QA`
  | `REOPENED`
  | `READY_FOR_PRODUCTION`
  | `DONE`;

export interface TaskType extends TaskFormData {
  id: string;
  project_id?: string;
}
export interface CreateTaskPayload extends TaskFormData {
  project_id?: string;
}

export interface TaskUser {
  id: string | null;
  name: string | null;
  email: string | null;
  department: string | null;
}

export interface TaskEpic {
  id: string | null;
  title: string | null;
  epic_id: string | null;
}

export interface EpicTask {
  id: string;
  project_id: string;
  title: string;

  epic_id: string | null;
  description?: string | null;
  status: TaskStatusType | "TO_DO";
  created_at: string | null;
  due_date: string | null;
  task_id: string | null;

  epic: TaskEpic | null;
  created_by: TaskUser | null;
  assignee: TaskUser | null;
}
