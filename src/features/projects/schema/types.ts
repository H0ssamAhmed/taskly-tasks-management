import type { ProjectFormData } from "@/features/projects/schema/Project.schema";

export interface EditProjectPayLoad extends ProjectFormData {
  id: string;
}
