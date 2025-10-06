import { redirect } from "next/navigation"

import prisma from "@/lib/db"
import { getServerAuthSession } from "@/lib/auth"
import { NetworkShell } from "@/components/network/NetworkShell"
import { AdminJobsClient } from "@/components/network/AdminJobsClient"

export default async function AdminPage() {
  const session = await getServerAuthSession()
  if (!session?.user) {
    redirect("/network")
  }

  const role = session.user.role
  if (role !== "ADMIN" && role !== "PROFESSOR") {
    redirect("/network")
  }

  const jobs = await prisma.job.findMany({
    include: {
      postedBy: { select: { name: true, email: true, role: true } },
    },
    where: role === "ADMIN" ? {} : { postedById: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 12,
  })

  return (
    <NetworkShell
      title={role === "ADMIN" ? "Network Administration" : "Faculty Dashboard"}
      description={
        role === "ADMIN"
          ? "Manage research postings across the network, moderate profiles, and support students."
          : "Publish opportunities for your lab and manage applicants from a single dashboard."
      }
    >
      <AdminJobsClient initialJobs={jobs} pageSize={12} role={role} />
    </NetworkShell>
  )
}
