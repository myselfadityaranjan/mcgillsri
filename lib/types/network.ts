export type VisibilityOption = "PUBLIC" | "AUTHENTICATED" | "PROFESSORS_ONLY"

export const VISIBILITY_DEFAULT: VisibilityOption = "AUTHENTICATED"

export const VISIBILITY_OPTIONS: { value: VisibilityOption; label: string }[] = [
  { value: "PUBLIC", label: "Public (all network members)" },
  { value: "AUTHENTICATED", label: "Authenticated students & faculty" },
  { value: "PROFESSORS_ONLY", label: "Faculty + Admin only" },
]
