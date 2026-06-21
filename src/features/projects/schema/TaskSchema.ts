import { z } from "zod";
import { taskStatus } from "@/utils/constants/TaskStatus";
export const taskSchema = z.object({
  title: z
    .string()
    .min(3, "task title must be at least 3 characters.")
    .max(500, "Project name max length 500 characters")
    .transform((val) => val.replace(/\s+/g, " ").trim()),
  description: z
    .string()
    .max(500, "Description should not exceed 500 characters")
    .nullable()
    .optional(),

  assignee_id: z.string().nullable().optional(),

  epic_id: z.string().nullable().optional(),

  due_date: z.string().nullable().optional(),

  status: z.enum(taskStatus).optional(),
});

export type TaskFormData = z.infer<typeof taskSchema>;
