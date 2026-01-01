import { z } from "zod"

const visibilityEnum = z.enum(["PUBLIC", "AUTHENTICATED", "PROFESSORS_ONLY"] as const)
const roleEnum = z.enum(["STUDENT", "PROFESSOR", "ADMIN"] as const)

export const linkSchema = z.string().url({ message: "Invalid URL" }).max(300)

export const profileSchema = z.object({
  program: z.string().min(2).max(120).optional().or(z.literal("")),
  yearOfStudy: z.number().int().min(1).max(8).nullable().optional(),
  gpa: z.number().min(0).max(4).nullable().optional(),
  interests: z.array(z.string().min(1).max(64)).max(20).optional(),
  skills: z.array(z.string().min(1).max(64)).max(30).optional(),
  availability: z.string().max(120).optional().or(z.literal("")),
  bio: z.string().max(2000).optional().or(z.literal("")),
  links: z.array(linkSchema).max(10).optional(),
  avatarUrl: z.string().url().optional(),
  cvUrl: z.string().url().optional(),
  visibility: visibilityEnum.optional(),
})

export const profileMutationSchema = profileSchema.transform((data) => {
  const normalized = { ...data }
  if (normalized.program === "") normalized.program = undefined
  if (normalized.yearOfStudy === null) normalized.yearOfStudy = undefined
  if (normalized.gpa === null) normalized.gpa = undefined
  if (normalized.availability === "") normalized.availability = undefined
  if (normalized.bio === "") normalized.bio = undefined
  return normalized
})

export const profileFiltersSchema = z.object({
  q: z.string().max(120).optional(),
  interests: z.array(z.string()).optional(),
  skills: z.array(z.string()).optional(),
  program: z.string().optional(),
  year: z.coerce.number().int().optional(),
  availability: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(12),
})

export const jobSchema = z.object({
  title: z.string().min(4).max(140),
  lab: z.string().max(140).optional().or(z.literal("")),
  department: z.string().max(140).optional().or(z.literal("")),
  description: z.string().min(20).max(4000),
  tags: z.array(z.string().min(1).max(50)).max(15).optional(),
  location: z.string().max(120).optional().or(z.literal("")),
  commitment: z.string().max(120).optional().or(z.literal("")),
  paid: z.boolean().optional().default(false),
  applicationUrl: z.string().url().optional().or(z.literal("")),
  contactEmail: z.string().email().optional().or(z.literal("")),
})

export const jobMutationSchema = jobSchema.transform((data) => {
  const normalized = { ...data }
  const blankToUndefined: (keyof typeof normalized)[] = [
    "lab",
    "department",
    "location",
    "commitment",
    "applicationUrl",
    "contactEmail",
  ]
  for (const key of blankToUndefined) {
    if (normalized[key] === "") {
      normalized[key] = undefined
    }
  }
  return normalized
})

export const jobFiltersSchema = z.object({
  q: z.string().max(120).optional(),
  tags: z.array(z.string()).optional(),
  paid: z.coerce.boolean().optional(),
  department: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
})

export type ProfileInput = z.infer<typeof profileSchema>
export type ProfileMutationInput = z.infer<typeof profileMutationSchema>
export type ProfileFilters = z.infer<typeof profileFiltersSchema>

export type JobInput = z.infer<typeof jobSchema>
export type JobMutationInput = z.infer<typeof jobMutationSchema>
export type JobFilters = z.infer<typeof jobFiltersSchema>

export const roleGuardSchema = z.object({
  role: roleEnum,
})

export type VisibilityOption = z.infer<typeof visibilityEnum>
export type RoleOption = z.infer<typeof roleEnum>
