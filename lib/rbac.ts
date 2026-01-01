import { Role } from "@prisma/client"

export type SessionRole = Role

export const rolePriority: Record<Role, number> = {
  [Role.STUDENT]: 0,
  [Role.PROFESSOR]: 1,
  [Role.ADMIN]: 2,
}

export function hasRole(current: Role | undefined | null, required: Role | Role[]): boolean {
  if (!current) return false
  const roles = Array.isArray(required) ? required : [required]
  return roles.some((role) => rolePriority[current] >= rolePriority[role])
}

export function isRole(current: Role | undefined | null, role: Role): current is Role {
  return current === role
}

export function assertRole(current: Role | undefined | null, allowed: Role | Role[]): void {
  if (!hasRole(current, allowed)) {
    const want = Array.isArray(allowed) ? allowed.join(", ") : allowed
    throw Object.assign(new Error(`Requires role: ${want}`), { statusCode: 403 })
  }
}

export function ensureAuthenticated<T>(value: T | undefined | null, errorMessage = "Unauthorized"): T {
  if (!value) {
    throw Object.assign(new Error(errorMessage), { statusCode: 401 })
  }
  return value
}
