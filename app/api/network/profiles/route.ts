import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { Visibility, Role, Prisma } from "@prisma/client"

import prisma from "@/lib/db"
import { getServerAuthSession } from "@/lib/auth"
import { profileFiltersSchema } from "@/lib/schemas/network"

function error(message: string, status = 400, code = "BAD_REQUEST") {
  return NextResponse.json({ ok: false, error: { code, message } }, { status })
}

export async function GET(req: NextRequest) {
  const session = await getServerAuthSession()
  if (!session?.user) {
    return error("Sign in required", 401, "UNAUTHORIZED")
  }

  const searchParams = Object.fromEntries(req.nextUrl.searchParams.entries())
  const multiParams: Record<string, string[]> = {}
  req.nextUrl.searchParams.forEach((value, key) => {
    if (key.endsWith("[]")) {
      const normalized = key.slice(0, -2)
      if (!multiParams[normalized]) multiParams[normalized] = []
      multiParams[normalized].push(value)
    }
  })

  const params = { ...searchParams, ...multiParams }

  let filters
  try {
    filters = profileFiltersSchema.parse(params)
  } catch (err) {
    return error((err as Error).message)
  }

  const allowedVisibilities = [Visibility.PUBLIC, Visibility.AUTHENTICATED]
  if (session.user.role === Role.PROFESSOR || session.user.role === Role.ADMIN) {
    allowedVisibilities.push(Visibility.PROFESSORS_ONLY)
  }

  const where: Prisma.ProfileWhereInput = {
    visibility: { in: allowedVisibilities },
  }

  if (filters.q) {
    const q = filters.q
    where.OR = [
      { bio: { contains: q, mode: "insensitive" } },
      { interests: { has: q } },
      { skills: { has: q } },
      { user: { name: { contains: q, mode: "insensitive" } } },
      { availability: { contains: q, mode: "insensitive" } },
    ]
  }

  if (filters.interests?.length) {
    where.interests = { hasSome: filters.interests }
  }

  if (filters.skills?.length) {
    where.skills = { hasSome: filters.skills }
  }

  if (filters.program) {
    where.program = { contains: filters.program, mode: "insensitive" }
  }

  if (filters.year) {
    where.yearOfStudy = filters.year
  }

  if (filters.availability) {
    where.availability = { contains: filters.availability, mode: "insensitive" }
  }

  const skip = (filters.page - 1) * filters.limit

  const [profiles, total] = await prisma.$transaction([
    prisma.profile.findMany({
      where,
      include: {
        user: { select: { name: true, email: true, role: true } },
      },
      orderBy: { updatedAt: "desc" },
      skip,
      take: filters.limit,
    }),
    prisma.profile.count({ where }),
  ])

  return NextResponse.json({
    ok: true,
    data: {
      profiles,
      pagination: {
        total,
        page: filters.page,
        limit: filters.limit,
        pages: Math.ceil(total / filters.limit),
      },
    },
  })
}
