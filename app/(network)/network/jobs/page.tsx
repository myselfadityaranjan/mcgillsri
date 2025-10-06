import prisma from "@/lib/db"
import { getServerAuthSession } from "@/lib/auth"
import { NetworkShell } from "@/components/network/NetworkShell"
import { JobsClient } from "@/components/network/JobsClient"
import type { NetworkJob } from "@/lib/types/network"

export default async function JobsPage() {
  const session = await getServerAuthSession()
  void session

  const jobsRaw = await prisma.job.findMany({
    include: {
      postedBy: { select: { name: true, email: true, role: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 10,
  })
  const total = await prisma.job.count()

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
      title="Research Opportunities"
      description="Browse postings from McGill professors and administrators. Filter by department, tags, and compensation to find your next role."
    >
      <JobsClient initialJobs={jobs} initialTotal={total} pageSize={10} />
    </NetworkShell>
  )
}
