import { Role } from "@prisma/client"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { getServerAuthSession } from "@/lib/auth"
import { rateLimit, getRateLimitIdentifier } from "@/lib/rate-limit"
import { assertRole } from "@/lib/rbac"
import { saveFileLocally, type UploadKind } from "@/lib/upload"

const allowedKinds: UploadKind[] = ["avatar", "cv"]

export async function POST(req: NextRequest) {
  const session = await getServerAuthSession()
  if (!session?.user) {
    return NextResponse.json({ ok: false, error: { code: "UNAUTHORIZED", message: "Sign in required" } }, { status: 401 })
  }

  const url = new URL(req.url)
  const kind = url.searchParams.get("kind") as UploadKind | null
  if (!kind || !allowedKinds.includes(kind)) {
    return NextResponse.json({ ok: false, error: { code: "BAD_REQUEST", message: "Invalid upload kind" } }, { status: 400 })
  }

  if (kind === "cv") {
    assertRole(session.user.role, [Role.STUDENT, Role.PROFESSOR, Role.ADMIN])
  }

  const formData = await req.formData()
  const file = formData.get("file")
  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: { code: "BAD_REQUEST", message: "Missing file" } }, { status: 400 })
  }

  const identifier = getRateLimitIdentifier(req.ip, session.user.id)
  const limit = await rateLimit(`${identifier}:upload:${kind}`, 5, 60_000)
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: { code: "RATE_LIMITED", message: "Too many uploads" } },
      { status: 429 },
    )
  }

  try {
    const saved = await saveFileLocally(file, kind)
    return NextResponse.json({ ok: true, data: saved })
  } catch (error) {
    console.error("Upload failed", error)
    return NextResponse.json(
      { ok: false, error: { code: "UPLOAD_ERROR", message: (error as Error).message } },
      { status: 400 },
    )
  }
}

export const runtime = "nodejs"
