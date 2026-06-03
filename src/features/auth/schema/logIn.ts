import { z } from "zod";

export const logInSchema = z.object({
  email: z.email("Please enter a valid email address").trim(),
  password: z
    .string("password required")
    .nonempty("password required, Please enter password")
    .trim(),
});

export type SignUpFormData = z.infer<typeof logInSchema>;

export const PasswordRules = (passwordValue) => {
  return {
    length: passwordValue.length >= 8,
    mixed:
      /[A-Z]/.test(passwordValue) &&
      /[a-z]/.test(passwordValue) &&
      /\d/.test(passwordValue),
    special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(passwordValue),
  };
};
