import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { Visibility, Role } from "@prisma/client"

import prisma from "@/lib/db"
import { getServerAuthSession } from "@/lib/auth"
import { profileMutationSchema, type VisibilityOption } from "@/lib/schemas/network"
import { assertRole } from "@/lib/rbac"
import { rateLimit, getRateLimitIdentifier } from "@/lib/rate-limit"
import type { NetworkProfile } from "@/lib/types/network"

function ok(data: unknown, init?: number) {
  return NextResponse.json({ ok: true, data }, { status: init ?? 200 })
}

function err(message: string, status = 400, code = "BAD_REQUEST") {
  return NextResponse.json({ ok: false, error: { code, message } }, { status })
}

export async function GET() {
  const session = await getServerAuthSession()
  if (!session?.user) {
    return err("Sign in required", 401, "UNAUTHORIZED")
  }

  const profile = await prisma.profile.findUnique({
    where: { userId: session.user.id },
    include: {
      user: { select: { id: true, name: true, email: true, role: true } },
    },
  })

  if (!profile) {
    return ok(null)
  }

  return ok(mapProfile(profile))
}

export async function POST(req: NextRequest) {
  return mutate(req)
}

export async function PATCH(req: NextRequest) {
  return mutate(req)
}

async function mutate(req: NextRequest) {
  const session = await getServerAuthSession()
  if (!session?.user) {
    return err("Sign in required", 401, "UNAUTHORIZED")
  }

  assertRole(session.user.role, [Role.STUDENT, Role.PROFESSOR, Role.ADMIN])

  const identifier = getRateLimitIdentifier(req.ip, session.user.id)
  const limit = await rateLimit(`${identifier}:profile`, 10, 60_000)
  if (!limit.ok) {
    return err("Too many profile updates", 429, "RATE_LIMITED")
  }

  let payload: unknown
  try {
    payload = await req.json()
  } catch {
    return err("Invalid JSON body")
  }

  let data
  try {
    data = profileMutationSchema.parse(payload)
  } catch (error) {
    return err((error as Error).message)
  }

  const profile = await prisma.profile.upsert({
    where: { userId: session.user.id },
    create: {
      userId: session.user.id,
      program: data.program,
      yearOfStudy: data.yearOfStudy ?? undefined,
      gpa: data.gpa ?? undefined,
      interests: data.interests ?? [],
      skills: data.skills ?? [],
      availability: data.availability,
      bio: data.bio,
      links: data.links ?? [],
      avatarUrl: data.avatarUrl,
      cvUrl: data.cvUrl,
      visibility: toVisibilityEnum(data.visibility),
    },
    update: {
      program: data.program,
      yearOfStudy: data.yearOfStudy ?? undefined,
      gpa: data.gpa ?? undefined,
      interests: data.interests ?? [],
      skills: data.skills ?? [],
      availability: data.availability,
      bio: data.bio,
      links: data.links ?? [],
      avatarUrl: data.avatarUrl,
      cvUrl: data.cvUrl,
      visibility: toVisibilityEnum(data.visibility),
    },
    include: {
      user: { select: { id: true, name: true, email: true, role: true } },
    },
  })

  return ok(mapProfile(profile))
}
const toVisibilityEnum = (value?: VisibilityOption) => (value ?? "AUTHENTICATED") as Visibility

const mapProfile = (profile: any): NetworkProfile => ({
  id: profile.id,
  program: profile.program,
  yearOfStudy: profile.yearOfStudy,
  gpa: profile.gpa,
  interests: profile.interests ?? [],
  skills: profile.skills ?? [],
  availability: profile.availability,
  bio: profile.bio,
  links: profile.links ?? [],
  avatarUrl: profile.avatarUrl,
  cvUrl: profile.cvUrl,
  visibility: profile.visibility as NetworkProfile["visibility"],
  updatedAtISO: profile.updatedAt instanceof Date ? profile.updatedAt.toISOString() : profile.updatedAt,
  user: {
    id: profile.user?.id,
    email: profile.user?.email ?? "",
    name: profile.user?.name,
    role: profile.user?.role as NetworkProfile["user"]["role"],
  },
})
