import { NextRequest } from "next/server"
import { beforeEach, describe, expect, it, vi } from "vitest"

const { mockJob } = vi.hoisted(() => ({
  mockJob: {
    findMany: vi.fn(),
    count: vi.fn(),
    create: vi.fn(),
  },
}))

vi.mock("@/lib/auth", () => ({
  getServerAuthSession: vi.fn(),
}))

vi.mock("@/lib/db", () => ({
  __esModule: true,
  default: { job: mockJob },
  prisma: { job: mockJob },
}))

import { getServerAuthSession } from "@/lib/auth"
import { GET, POST } from "@/app/api/network/jobs/route"

describe("/api/network/jobs", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockJob.findMany.mockResolvedValue([])
    mockJob.count.mockResolvedValue(0)
  })

  it("requires auth for GET", async () => {
    vi.mocked(getServerAuthSession).mockResolvedValue(null)
    const response = await GET(new NextRequest("http://localhost/api/network/jobs"))
    expect(response.status).toBe(401)
  })

  it("allows professors to create postings", async () => {
    vi.mocked(getServerAuthSession).mockResolvedValue({
      user: { id: "prof-1", role: "PROFESSOR" },
    } as any)

    mockJob.create.mockResolvedValue({ id: "job-1" })

    const request = new NextRequest("http://localhost/api/network/jobs", {
      method: "POST",
      body: JSON.stringify({
        title: "Research Assistant",
        description: "Assist in lab with experiments, data collection, and weekly analysis meetings.",
        tags: ["Lab"],
      }),
    })

    const response = await POST(request)
    expect(response.status).toBe(201)
    expect(mockJob.create).toHaveBeenCalled()
  })
})
