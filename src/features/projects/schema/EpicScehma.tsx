import { z } from "zod";
export const epicSchema = z.object({
    title: z
        .string()
        .min(3, "Title is required minimum 3 characters.")
        .max(100, "Project name max length 100 characters")
        .transform((val) => val.replace(/\s+/g, " ").trim()),

    description: z
        .string()
        .max(500, "Description should not exceed 500 characters"),

    assignee_id: z
        .string()
        .nullable()
        .optional(),

    deadline: z.
        string()
        .nullable()
        .optional()
});

export type EpicFormData = z.infer<typeof epicSchema>;
