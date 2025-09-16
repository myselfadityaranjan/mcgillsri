import { z } from "zod"

export const contactSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Please enter a valid email address").optional().or(z.literal("")),
  message: z.string().min(10, "Message must be at least 10 characters long"),
  website: z.string().optional(), // honeypot field
  page: z.string().optional(),
  timestamp: z.string().optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>
