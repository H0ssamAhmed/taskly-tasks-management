import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must not exceed 50 characters")
      .regex(
        /^(?!.*\s{2,})[\p{L}]+(?: [\p{L}]+)*$/u,
        "Name can only contain letters and single spaces",
      ),

    email: z.string().trim().email("Please enter a valid email address"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(64, "Password must not exceed 64 characters")
      .regex(/^\S+$/, "Password must not contain spaces")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(
        /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
        "Password must contain at least one special character",
      ),

    confirmPassword: z.string(),
    jobTitle: z
      .string()
      .trim()
      .max(100, "Job title must not exceed 100 characters")
      .optional()
      .or(z.literal("")),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;
