import { redirect } from "next/navigation"

import prisma from "@/lib/db"
import { getServerAuthSession } from "@/lib/auth"
import { NetworkShell } from "@/components/network/NetworkShell"
import { AdminJobsClient } from "@/components/network/AdminJobsClient"
import type { NetworkJob } from "@/lib/types/network"

export default async function AdminPage() {
  const session = await getServerAuthSession()
  if (!session?.user) {
    redirect("/network")
  }

  const role = session.user.role
  if (role !== "ADMIN" && role !== "PROFESSOR") {
    redirect("/network")
  }

  const jobsRaw = await prisma.job.findMany({
    include: {
      postedBy: { select: { name: true, email: true, role: true } },
    },
    where: role === "ADMIN" ? {} : { postedById: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 12,
  })

  const jobs: NetworkJob[] = jobsRaw.map((job) => ({
    id: job.id,
    title: job.title,
    lab: job.lab,
    department: job.department,
    description: job.description,
    tags: job.tags ?? [],
    location: job.location,
    commitment: job.commitment,
    paid: job.paid,
    applicationUrl: job.applicationUrl,
    contactEmail: job.contactEmail,
    createdAtISO: job.createdAt.toISOString(),
    postedBy: {
      name: job.postedBy.name,
      email: job.postedBy.email,
      role: job.postedBy.role as NetworkJob["postedBy"]["role"],
    },
  }))

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
