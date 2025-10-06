import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { Visibility, Role } from "@prisma/client"

import prisma from "@/lib/db"
import { getServerAuthSession } from "@/lib/auth"
import { profileMutationSchema } from "@/lib/schemas/network"
import { assertRole } from "@/lib/rbac"
import { rateLimit, getRateLimitIdentifier } from "@/lib/rate-limit"

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
  })

  return ok(profile)
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
      visibility: data.visibility ?? Visibility.AUTHENTICATED,
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
      visibility: data.visibility ?? Visibility.AUTHENTICATED,
    },
  })

  return ok(profile)
}
