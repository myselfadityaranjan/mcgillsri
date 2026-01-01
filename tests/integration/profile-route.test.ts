import { NextRequest } from "next/server"
import { describe, expect, it, vi, beforeEach } from "vitest"

const { mockProfile } = vi.hoisted(() => ({
  mockProfile: {
    upsert: vi.fn(),
    findUnique: vi.fn(),
  },
}))

vi.mock("@/lib/auth", () => ({
  getServerAuthSession: vi.fn(),
}))

vi.mock("@/lib/db", () => ({
  __esModule: true,
  default: { profile: mockProfile },
  prisma: { profile: mockProfile },
}))

import { getServerAuthSession } from "@/lib/auth"
import { GET, PATCH } from "@/app/api/network/profile/route"

describe("/api/network/profile", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("rejects unauthenticated requests", async () => {
    vi.mocked(getServerAuthSession).mockResolvedValue(null)
    const response = await GET()
    expect(response.status).toBe(401)
  })

  it("upserts profile for authenticated user", async () => {
    vi.mocked(getServerAuthSession).mockResolvedValue({
      user: { id: "user-1", role: "STUDENT" },
    } as any)

    mockProfile.upsert.mockResolvedValue({ id: "profile-1" })

    const request = new NextRequest("http://localhost/api/network/profile", {
      method: "PATCH",
      body: JSON.stringify({
        program: "BSc Neuroscience",
        interests: ["Neuroscience"],
        skills: ["Python"],
      }),
    })

    const response = await PATCH(request)
    expect(response.status).toBe(200)
    const json = await response.json()
    expect(json.ok).toBe(true)
    expect(mockProfile.upsert).toHaveBeenCalled()
  })
})
