import prisma from "@/lib/db"
import { getServerAuthSession } from "@/lib/auth"
import { NetworkShell } from "@/components/network/NetworkShell"
import { DirectoryClient } from "@/components/network/DirectoryClient"

export default async function DirectoryPage() {
  const session = await getServerAuthSession()
  const role = session?.user.role ?? "STUDENT"

  const profiles = await prisma.profile.findMany({
    include: {
      user: { select: { name: true, email: true, role: true } },
    },
    orderBy: { updatedAt: "desc" },
    take: 12,
  })
  const total = await prisma.profile.count()

  return (
    <NetworkShell
      title="Student & Faculty Directory"
      description="Discover McGill students and faculty aligned with your interests. Filter by program, visibility, and skills to build your research network."
    >
      <DirectoryClient initialProfiles={profiles} initialTotal={total} pageSize={12} role={role} />
    </NetworkShell>
  )
}
