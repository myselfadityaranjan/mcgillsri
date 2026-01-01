// lib/team.ts
export type TeamMember = {
  name: string
  role: string
  program?: string
  image: string // path under /public
  linkedin?: string
}

const placeholder = "/placeholder-user.jpg"

export const EXECUTIVE_25_26: TeamMember[] = [
  { name: "Placeholder Exec", role: "Role", program: "Program", image: placeholder },
]
