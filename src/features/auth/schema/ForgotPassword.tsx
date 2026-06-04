import { z } from "zod";

export const ForgotPasswordSchema = z.object({
    email: z.email("Please enter a valid email address").trim(),
});

export type SignUpFormData = z.infer<typeof ForgotPasswordSchema>;