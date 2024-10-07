import { z } from "zod";

export const EmailFormSchema = z.object({
  sender: z.string().email({ message: "Please enter valid email address" }),
  destination: z
    .string()
    .email({ message: "Please enter valid email address" }),
  subject: z.string().optional(),
  body: z.string().max(255).optional(),
});
