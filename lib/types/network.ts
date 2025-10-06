import type { VisibilityOption as SchemaVisibilityOption, RoleOption as SchemaRoleOption } from "@/lib/schemas/network"

export type VisibilityOption = SchemaVisibilityOption
export type RoleOption = SchemaRoleOption

export const VISIBILITY_DEFAULT: VisibilityOption = "AUTHENTICATED"

export const VISIBILITY_OPTIONS: { value: VisibilityOption; label: string }[] = [
  { value: "PUBLIC", label: "Public (all network members)" },
  { value: "AUTHENTICATED", label: "Authenticated students & faculty" },
  { value: "PROFESSORS_ONLY", label: "Faculty + Admin only" },
]

export interface NetworkUser {
  id?: string
  name?: string | null
  email: string
  role: RoleOption
}

export interface NetworkProfile {
  id: string
  program?: string | null
  yearOfStudy?: number | null
  gpa?: number | null
  interests: string[]
  skills: string[]
  availability?: string | null
  bio?: string | null
  links: string[]
  avatarUrl?: string | null
  cvUrl?: string | null
  visibility: VisibilityOption
  user: NetworkUser
  updatedAtISO?: string
}

export interface NetworkJob {
  id: string
  title: string
  lab?: string | null
  department?: string | null
  description: string
  tags: string[]
  location?: string | null
  commitment?: string | null
  paid: boolean
  applicationUrl?: string | null
  contactEmail?: string | null
  createdAtISO?: string
  postedBy: NetworkUser
}
