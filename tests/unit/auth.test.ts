import { describe, expect, it } from "vitest"

import { resolveRole } from "@/lib/auth"

describe("resolveRole", () => {
  it("assigns admin for allowlisted emails", () => {
    process.env.ADMIN_EMAILS = "admin@mcgill.ca"
    expect(resolveRole("admin@mcgill.ca")).toBe("ADMIN")
  })

  it("handles professor domain", () => {
    process.env.ADMIN_EMAILS = ""
    expect(resolveRole("prof@mcgill.ca")).toBe("PROFESSOR")
  })

  it("rejects external domains", () => {
    expect(resolveRole("user@gmail.com")).toBeNull()
  })
})
