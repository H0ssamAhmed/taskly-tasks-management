import { z } from "zod";
export const AddProjectSchema = z.object({
  name: z
    .string()
    .min(3, "Project name must be at least 3 characters.")
    .max(100, "Project name max length 100 characters")
    .transform((val) => val.replace(/\s+/g, " ").trim()),

  description: z
    .string()
    .max(500, "Description should not exceed 500 characters"),
});

export type AddProjectFormData = z.infer<typeof AddProjectSchema>;
