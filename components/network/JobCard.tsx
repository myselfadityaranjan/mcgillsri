import type { Job, Role, User } from "@prisma/client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { NetworkCard } from "@/components/network/NetworkCard"
import { ExternalLink, Mail, MapPin, Timer } from "lucide-react"
import Link from "next/link"

export type JobWithAuthor = Job & {
  postedBy: Pick<User, "name" | "email" | "role">
}

interface JobCardProps {
  job: JobWithAuthor
  footer?: React.ReactNode
}

export function JobCard({ job, footer }: JobCardProps) {
  return (
    <NetworkCard className="flex h-full flex-col gap-5 p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-2xl font-semibold text-white">{job.title}</h3>
            <Badge className={`rounded-full border ${job.paid ? "border-emerald-400/50 bg-emerald-500/15 text-emerald-100" : "border-white/20 bg-white/10 text-white"}`}>
              {job.paid ? "Paid" : "Volunteer"}
            </Badge>
          </div>
          <p className="text-sm text-white/70">
            {job.lab ?? "Independent"}
            {job.department ? ` • ${job.department}` : ""}
          </p>
          {job.description && (
            <p className="text-sm leading-relaxed text-white/80 line-clamp-4">{job.description}</p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 text-sm text-white/70">
        {job.location && (
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4" /> {job.location}
          </span>
        )}
        {job.commitment && (
          <span className="inline-flex items-center gap-2">
            <Timer className="h-4 w-4" /> {job.commitment}
          </span>
        )}
      </div>

      {job.tags?.length ? (
        <div className="flex flex-wrap gap-2">
          {job.tags.slice(0, 10).map((tag) => (
            <Badge key={tag} className="border border-white/20 bg-white/10 text-xs text-white">
              {tag}
            </Badge>
          ))}
        </div>
      ) : null}

      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 text-sm text-white/70">
        <span>
          Posted by <strong className="text-white">{job.postedBy.name ?? job.postedBy.email}</strong>
        </span>
        <div className="flex flex-wrap gap-3">
          {job.applicationUrl && (
            <Button asChild variant="outline" size="sm" className="border-white/30 bg-white/10 text-white hover:bg-white/15">
              <Link href={job.applicationUrl} target="_blank" rel="noopener noreferrer">
                Apply <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
          {job.contactEmail && (
            <Button asChild variant="ghost" size="sm" className="text-white/80 hover:text-white">
              <Link href={`mailto:${job.contactEmail}`}>
                Email <Mail className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>

      {footer && <div className="border-t border-white/10 pt-4">{footer}</div>}
    </NetworkCard>
  )
}
