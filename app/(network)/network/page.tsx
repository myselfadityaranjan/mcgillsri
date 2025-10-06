import Link from "next/link"
import { ArrowRight, BookOpenCheck, Compass, UserCircle } from "lucide-react"

import { NetworkCard } from "@/components/network/NetworkCard"
import { NetworkShell } from "@/components/network/NetworkShell"
import prisma from "@/lib/db"
import { getServerAuthSession } from "@/lib/auth"

const links = [
  {
    href: "/network/directory",
    title: "Browse Directory",
    description: "Find students, mentors, and labs aligned with your interests.",
    icon: Compass,
  },
  {
    href: "/network/profile",
    title: "My Profile",
    description: "Showcase your research interests, skills, and availability.",
    icon: UserCircle,
  },
  {
    href: "/network/jobs",
    title: "Job Board",
    description: "Explore professor postings and apply with a single click.",
    icon: BookOpenCheck,
  },
]

export default async function NetworkLandingPage() {
  const session = await getServerAuthSession()
  const role = session?.user.role

  const stats = await prisma.$transaction([
    prisma.profile.count(),
    prisma.job.count(),
  ])

  const cards = [...links]
  if (role === "ADMIN" || role === "PROFESSOR") {
    cards.push({
      href: "/network/admin",
      title: role === "ADMIN" ? "Admin Console" : "Faculty Dashboard",
      description: "Publish opportunities and manage postings in seconds.",
      icon: ArrowRight,
    })
  }

  return (
    <NetworkShell
      title="McGill Research Network"
      description="A dedicated hub for McGill students, professors, and administrators to collaborate on research, discover opportunities, and grow their academic impact."
      hero={
        <dl className="grid grid-cols-2 gap-6 text-sm text-white/70 sm:grid-cols-4">
          <div>
            <dt>Profiles live</dt>
            <dd className="text-2xl font-semibold text-white">{stats[0]}</dd>
          </div>
          <div>
            <dt>Active postings</dt>
            <dd className="text-2xl font-semibold text-white">{stats[1]}</dd>
          </div>
          <div>
            <dt>Supported roles</dt>
            <dd className="text-2xl font-semibold text-white">3</dd>
          </div>
          <div>
            <dt>Magic-link logins</dt>
            <dd className="text-2xl font-semibold text-white">Secure</dd>
          </div>
        </dl>
      }
    >
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <NetworkCard key={card.href} className="flex h-full flex-col gap-4 p-6">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
                <Icon className="h-6 w-6 text-white" />
              </span>
              <div className="space-y-1">
                <h3 className="text-xl font-semibold text-white">{card.title}</h3>
                <p className="text-sm text-white/70">{card.description}</p>
              </div>
              <Link
                href={card.href}
                className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white"
              >
                Enter <ArrowRight className="h-4 w-4" />
              </Link>
            </NetworkCard>
          )
        })}
      </section>
    </NetworkShell>
  )
}
