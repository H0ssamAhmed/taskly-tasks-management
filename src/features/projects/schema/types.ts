import type { UserType } from "@/features/auth/schema/types";
import type { ProjectFormData } from "@/features/projects/schema/Project.schema";

export interface EditProjectPayLoad extends ProjectFormData {
  id: string;
}

export interface ProjectMemberType {
  metadata: UserType;
  email: string;
  member_id: string;
  project_id: string;
  role: string;
  user_id: string;
}
