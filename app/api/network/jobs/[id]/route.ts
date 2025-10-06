import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { Role } from "@prisma/client"

import prisma from "@/lib/db"
import { getServerAuthSession } from "@/lib/auth"
import { jobMutationSchema } from "@/lib/schemas/network"
import { rateLimit, getRateLimitIdentifier } from "@/lib/rate-limit"

function error(message: string, status = 400, code = "BAD_REQUEST") {
  return NextResponse.json({ ok: false, error: { code, message } }, { status })
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerAuthSession()
  if (!session?.user) {
    return error("Sign in required", 401, "UNAUTHORIZED")
  }

  const job = await prisma.job.findUnique({
    where: { id: params.id },
    include: {
      postedBy: { select: { name: true, email: true, role: true } },
    },
  })

  if (!job) {
    return error("Job not found", 404, "NOT_FOUND")
  }

  return NextResponse.json({ ok: true, data: job })
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerAuthSession()
  if (!session?.user) {
    return error("Sign in required", 401, "UNAUTHORIZED")
  }

  const job = await prisma.job.findUnique({ where: { id: params.id } })
  if (!job) {
    return error("Job not found", 404, "NOT_FOUND")
  }

  if (job.postedById !== session.user.id && session.user.role !== Role.ADMIN) {
    return error("Forbidden", 403, "FORBIDDEN")
  }

  const identifier = getRateLimitIdentifier(req.ip, session.user.id)
  const limit = await rateLimit(`${identifier}:job:update`, 20, 60_000)
  if (!limit.ok) {
    return error("Too many updates", 429, "RATE_LIMITED")
  }

  let payload: unknown
  try {
    payload = await req.json()
  } catch {
    return error("Invalid JSON body")
  }

  let data
  try {
    data = jobMutationSchema.partial().parse(payload)
  } catch (err) {
    return error((err as Error).message)
  }

  const updated = await prisma.job.update({
    where: { id: job.id },
    data: {
      title: data.title ?? job.title,
      lab: data.lab ?? job.lab,
      department: data.department ?? job.department,
      description: data.description ?? job.description,
      tags: data.tags ?? job.tags,
      location: data.location ?? job.location,
      commitment: data.commitment ?? job.commitment,
      paid: data.paid ?? job.paid,
      applicationUrl: data.applicationUrl ?? job.applicationUrl,
      contactEmail: data.contactEmail ?? job.contactEmail,
    },
    include: {
      postedBy: { select: { name: true, email: true, role: true } },
    },
  })

  return NextResponse.json({ ok: true, data: updated })
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerAuthSession()
  if (!session?.user) {
    return error("Sign in required", 401, "UNAUTHORIZED")
  }

  const job = await prisma.job.findUnique({ where: { id: params.id } })
  if (!job) {
    return error("Job not found", 404, "NOT_FOUND")
  }

  if (job.postedById !== session.user.id && session.user.role !== Role.ADMIN) {
    return error("Forbidden", 403, "FORBIDDEN")
  }

  const identifier = getRateLimitIdentifier(req.ip, session.user.id)
  const limit = await rateLimit(`${identifier}:job:delete`, 10, 60_000)
  if (!limit.ok) {
    return error("Too many deletions", 429, "RATE_LIMITED")
  }

  await prisma.job.delete({ where: { id: job.id } })
  return NextResponse.json({ ok: true, data: { id: job.id } })
}
