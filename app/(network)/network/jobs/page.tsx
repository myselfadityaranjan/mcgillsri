import prisma from "@/lib/db"
import { getServerAuthSession } from "@/lib/auth"
import { NetworkShell } from "@/components/network/NetworkShell"
import { JobsClient } from "@/components/network/JobsClient"

export default async function JobsPage() {
  const session = await getServerAuthSession()
  void session

  const jobs = await prisma.job.findMany({
    include: {
      postedBy: { select: { name: true, email: true, role: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 10,
  })
  const total = await prisma.job.count()

  return (
    <NetworkShell
      title="Research Opportunities"
      description="Browse postings from McGill professors and administrators. Filter by department, tags, and compensation to find your next role."
    >
      <JobsClient initialJobs={jobs} initialTotal={total} pageSize={10} />
    </NetworkShell>
  )
}
