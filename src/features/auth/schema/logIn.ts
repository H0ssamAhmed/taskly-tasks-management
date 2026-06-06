import { z } from "zod";

export const logInSchema = z.object({
  email: z.email("Please enter a valid email address").trim(),
  password: z
    .string("password required")
    .nonempty("password required, Please enter password")
    .trim(),
});

export type SignUpFormData = z.infer<typeof logInSchema>;
