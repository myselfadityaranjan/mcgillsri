import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { Role, Prisma } from "@prisma/client"

import prisma from "@/lib/db"
import { getServerAuthSession } from "@/lib/auth"
import { jobFiltersSchema, jobMutationSchema } from "@/lib/schemas/network"
import { assertRole } from "@/lib/rbac"
import { rateLimit, getRateLimitIdentifier } from "@/lib/rate-limit"
import type { NetworkJob } from "@/lib/types/network"

function error(message: string, status = 400, code = "BAD_REQUEST") {
  return NextResponse.json({ ok: false, error: { code, message } }, { status })
}

export async function GET(req: NextRequest) {
  const session = await getServerAuthSession()
  if (!session?.user) {
    return error("Sign in required", 401, "UNAUTHORIZED")
  }

  const searchParams = Object.fromEntries(req.nextUrl.searchParams.entries())

  const multi: Record<string, string[]> = {}
  req.nextUrl.searchParams.forEach((value, key) => {
    if (key.endsWith("[]")) {
      const normalized = key.slice(0, -2)
      if (!multi[normalized]) multi[normalized] = []
      multi[normalized].push(value)
    }
  })

  const params = { ...searchParams, ...multi }

  let filters
  try {
    filters = jobFiltersSchema.parse(params)
  } catch (err) {
    return error((err as Error).message)
  }

  const where: Prisma.JobWhereInput = {}

  if (filters.q) {
    const q = filters.q
    where.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { lab: { contains: q, mode: "insensitive" } },
      { department: { contains: q, mode: "insensitive" } },
      { description: { contains: q, mode: "insensitive" } },
      { tags: { has: q } },
    ]
  }

  if (filters.tags?.length) {
    where.tags = { hasSome: filters.tags }
  }

  if (typeof filters.paid === "boolean") {
    where.paid = filters.paid
  }

  if (filters.department) {
    where.department = { contains: filters.department, mode: "insensitive" }
  }

  const skip = (filters.page - 1) * filters.limit

  const [jobs, total] = await prisma.$transaction([
    prisma.job.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        postedBy: { select: { name: true, email: true, role: true } },
      },
      skip,
      take: filters.limit,
    }),
    prisma.job.count({ where }),
  ])

  const jobsPayload = jobs.map(mapJob)

  return NextResponse.json({
    ok: true,
    data: {
      jobs: jobsPayload,
      pagination: {
        total,
        page: filters.page,
        pages: Math.ceil(total / filters.limit),
        limit: filters.limit,
      },
    },
  })
}

export async function POST(req: NextRequest) {
  const session = await getServerAuthSession()
  if (!session?.user) {
    return error("Sign in required", 401, "UNAUTHORIZED")
  }

  assertRole(session.user.role, [Role.PROFESSOR, Role.ADMIN])

  const identifier = getRateLimitIdentifier(req.ip, session.user.id)
  const limit = await rateLimit(`${identifier}:job:create`, 10, 60_000)
  if (!limit.ok) {
    return error("Too many job postings", 429, "RATE_LIMITED")
  }

  let payload: unknown
  try {
    payload = await req.json()
  } catch {
    return error("Invalid JSON body")
  }

  let data
  try {
    data = jobMutationSchema.parse(payload)
  } catch (err) {
    return error((err as Error).message)
  }

  const job = await prisma.job.create({
    data: {
      title: data.title,
      lab: data.lab,
      department: data.department,
      description: data.description,
      tags: data.tags ?? [],
      location: data.location,
      commitment: data.commitment,
      paid: data.paid ?? false,
      applicationUrl: data.applicationUrl,
      contactEmail: data.contactEmail,
      postedById: session.user.id,
    },
    include: {
      postedBy: { select: { name: true, email: true, role: true } },
    },
  })

  return NextResponse.json({ ok: true, data: mapJob(job) }, { status: 201 })
}
const mapJob = (job: any): NetworkJob => ({
  id: job.id,
  title: job.title,
  lab: job.lab,
  department: job.department,
  description: job.description,
  tags: job.tags ?? [],
  location: job.location,
  commitment: job.commitment,
  paid: job.paid,
  applicationUrl: job.applicationUrl,
  contactEmail: job.contactEmail,
  createdAtISO: job.createdAt instanceof Date ? job.createdAt.toISOString() : job.createdAt,
  postedBy: {
    name: job.postedBy?.name,
    email: job.postedBy?.email,
    role: job.postedBy?.role as NetworkJob["postedBy"]["role"],
  },
})
