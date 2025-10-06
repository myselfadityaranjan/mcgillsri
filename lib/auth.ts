import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { Role } from "@prisma/client"
import type { NextAuthOptions } from "next-auth"
import { getServerSession } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import nodemailer from "nodemailer"
import { Resend } from "resend"

import prisma from "@/lib/db"

function adminEmailSet() {
  return new Set(
    (process.env.ADMIN_EMAILS || "")
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean),
  )
}

function resolveRole(email?: string | null): Role | null {
  if (!email) return null
  const normalized = email.toLowerCase()
  if (adminEmailSet().has(normalized)) return Role.ADMIN

  const domain = normalized.split("@")[1]
  if (!domain) return null

  if (domain === "mcgill.ca") return Role.PROFESSOR
  if (domain === "mail.mcgill.ca") return Role.STUDENT

  return null
}

async function sendEmail({ identifier, url }: { identifier: string; url: string }) {
  const from = process.env.EMAIL_FROM || "SRI Network <no-reply@sri-network.test>"

  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from,
      to: identifier,
      subject: "Your SRI Network sign-in link",
      html: emailHtml(url),
    })
    return
  }

  const transporter = await getNodeMailerTransport()
  const info = await transporter.sendMail({
    to: identifier,
    from,
    subject: "Your SRI Network sign-in link",
    html: emailHtml(url),
  })

  if (process.env.NODE_ENV !== "production") {
    const preview = nodemailer.getTestMessageUrl(info)
    if (preview) {
      console.info(`Magic link sent to ${identifier}. Preview: ${preview}`)
    }
  }
}

let testAccountPromise: Promise<nodemailer.TestAccount> | null = null

async function getNodeMailerTransport() {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT || 587) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })
  }

  if (!testAccountPromise) {
    testAccountPromise = nodemailer.createTestAccount()
  }
  const account = await testAccountPromise
  return nodemailer.createTransport({
    host: account.smtp.host,
    port: account.smtp.port,
    secure: account.smtp.secure,
    auth: {
      user: account.user,
      pass: account.pass,
    },
  })
}

function emailHtml(url: string) {
  return `
    <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif">
      <h1 style="color:#c0162c">SRI McGill Research Network</h1>
      <p>Click the button below to sign in:</p>
      <p><a href="${url}" style="display:inline-block;padding:12px 20px;background:#c0162c;color:#ffffff;border-radius:8px;text-decoration:none">Sign in</a></p>
      <p>Link not working? Copy and paste this URL into your browser:</p>
      <p><a href="${url}">${url}</a></p>
    </div>
  `
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/network",
  },
  providers: [
    EmailProvider({
      async sendVerificationRequest(params) {
        await sendEmail({ identifier: params.identifier, url: params.url })
      },
      from: process.env.EMAIL_FROM || "SRI Network <no-reply@sri-network.test>",
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const role = resolveRole(user.email)
      if (!role) {
        return false
      }

      const adapterUser = user as typeof user & { role?: Role }

      if (adapterUser.role !== role) {
        await prisma.user.update({ where: { id: user.id }, data: { role } }).catch(() => undefined)
        adapterUser.role = role
      }

      return true
    },
    async jwt({ token, user }) {
      if (user) {
        const adapterUser = user as typeof user & { role?: Role }
        token.userId = user.id
        token.role = adapterUser.role ?? resolveRole(user.email) ?? token.role ?? Role.STUDENT
      } else if (!token.role && token.email) {
        const dbUser = await prisma.user.findUnique({ where: { email: token.email } })
        if (dbUser) {
          token.role = dbUser.role
          token.userId = dbUser.id
        }
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId as string
        session.user.role = (token.role as Role) ?? Role.STUDENT
        session.user.email = session.user.email ?? (token.email as string | undefined)
      }
      return session
    },
  },
}

export function getServerAuthSession() {
  return getServerSession(authOptions)
}

export { resolveRole }
