import { z } from "zod";
const MAX_FILE_SIZE = 64000000;
export const EmailFormSchema = z.object({
  sender: z.string().email({ message: "Please enter valid email address" }),
  destination: z
    .string()
    .email({ message: "Please enter valid email address" }),
  subject: z.string().optional(),
  body: z.string().max(255).optional(),
  files: z.array(
    z
      .any()
      .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 64MB.`)
      
  ).optional(),
});
