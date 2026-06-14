import type { UserType } from "@/features/auth/schema/types";
import type { ProjectFormData } from "@/features/projects/schema/Project.schema";
import type { EpicFormData } from "./EpicScehma";

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
  assignee_id?: string;
  project_id: string;
}
