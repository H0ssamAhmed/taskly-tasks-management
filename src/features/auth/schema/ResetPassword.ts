import { z } from "zod";

export const resetPasswordSchema = z
  .object({
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
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type ResetPassword = z.infer<typeof resetPasswordSchema>;

export const PasswordRules = (passwordValue: string) => {
  return {
    length: passwordValue.length >= 2 && passwordValue.length <= 64,

    uppercase: /[A-Z]/.test(passwordValue),

    lowercase: /[a-z]/.test(passwordValue),

    digit: /\d/.test(passwordValue),

    special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(passwordValue),
  };
};
