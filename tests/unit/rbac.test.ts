import { describe, expect, it } from "vitest"
import { Role } from "@prisma/client"

import { assertRole, hasRole } from "@/lib/rbac"

describe("rbac helpers", () => {
  it("allows when current role has sufficient priority", () => {
    expect(hasRole(Role.ADMIN, [Role.PROFESSOR])).toBe(true)
    expect(hasRole(Role.PROFESSOR, Role.STUDENT)).toBe(true)
  })

  it("denies when current role missing", () => {
    expect(hasRole(Role.STUDENT, Role.ADMIN)).toBe(false)
  })

  it("assertRole throws for insufficient roles", () => {
    expect(() => assertRole(Role.STUDENT, Role.ADMIN)).toThrowError(/Requires role/)
  })

  it("assertRole allows acceptable roles", () => {
    expect(() => assertRole(Role.ADMIN, [Role.PROFESSOR, Role.ADMIN])).not.toThrow()
  })
})
