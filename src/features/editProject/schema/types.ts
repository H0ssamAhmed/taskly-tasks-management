import type { AddProjectFormData } from "@/features/addProject/schema/AddProject";

export interface EditProjectPayLoad extends AddProjectFormData {
  id: string;
}
