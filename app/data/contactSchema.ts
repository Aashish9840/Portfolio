import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, { message: "Enter your name." }).max(100),
  email: z
    .string()
    .trim()
    .min(1, { message: "Enter your email so I can reply." })
    .email({ message: "Enter an email like name@example.com." }),
  message: z
    .string()
    .trim()
    .min(10, { message: "Write at least a sentence about what you need." })
    .max(5000),
});

export type ContactInput = z.infer<typeof contactSchema>;
