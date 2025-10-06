import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { withAuth } from "next-auth/middleware"

const Roles = {
  STUDENT: "STUDENT",
  PROFESSOR: "PROFESSOR",
  ADMIN: "ADMIN",
} as const

type Role = (typeof Roles)[keyof typeof Roles]

function isAllowedForAdminPages(role: Role | undefined): boolean {
  return role === Roles.ADMIN || role === Roles.PROFESSOR
}

export default withAuth(
  function middleware(req: NextRequest) {
    const tokenRole = req.nextauth.token?.role as Role | undefined
    const { pathname } = req.nextUrl

    if (pathname.startsWith("/network/admin") && !isAllowedForAdminPages(tokenRole)) {
      const redirect = new URL("/network", req.url)
      redirect.searchParams.set("error", "forbidden")
      return NextResponse.redirect(redirect)
    }

    return NextResponse.next()
  },
  {
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      authorized: ({ token }) => !!token?.role,
    },
  },
)

export const config = {
  matcher: ["/network/:path*"],
}
