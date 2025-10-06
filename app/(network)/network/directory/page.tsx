import prisma from "@/lib/db"
import { getServerAuthSession } from "@/lib/auth"
import { NetworkShell } from "@/components/network/NetworkShell"
import { DirectoryClient } from "@/components/network/DirectoryClient"
import type { NetworkProfile } from "@/lib/types/network"

export default async function DirectoryPage() {
  const session = await getServerAuthSession()
  const role = session?.user.role ?? "STUDENT"

  const profilesRaw = await prisma.profile.findMany({
    include: {
      user: { select: { name: true, email: true, role: true } },
    },
    orderBy: { updatedAt: "desc" },
    take: 12,
  })
  const total = await prisma.profile.count()

  const profiles: NetworkProfile[] = profilesRaw.map((profile) => ({
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
    updatedAtISO: profile.updatedAt.toISOString(),
    user: {
      name: profile.user.name,
      email: profile.user.email,
      role: profile.user.role as NetworkProfile["user"]["role"],
    },
  }))

  return (
    <NetworkShell
      title="Student & Faculty Directory"
      description="Discover McGill students and faculty aligned with your interests. Filter by program, visibility, and skills to build your research network."
    >
      <DirectoryClient initialProfiles={profiles} initialTotal={total} pageSize={12} role={role} />
    </NetworkShell>
  )
}
