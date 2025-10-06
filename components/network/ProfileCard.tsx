import { Building2, GraduationCap, Mail, MapPin } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { NetworkCard } from "@/components/network/NetworkCard"
import type { NetworkProfile } from "@/lib/types/network"

export interface ProfileCardProps {
  profile: NetworkProfile
}

export function ProfileCard({ profile }: ProfileCardProps) {
  const { user } = profile
  const hasInterests = profile.interests?.length
  const hasSkills = profile.skills?.length

  return (
    <NetworkCard className="flex h-full flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold text-white">
              {user.name ?? user.email.split("@")[0]}
            </h3>
            <p className="text-sm text-white/60">{user.email}</p>
          </div>
          <Badge className="rounded-full border border-white/20 bg-white/10 text-white">
            {user.role}
          </Badge>
        </div>

        {profile.program && (
          <div className="flex items-center gap-2 text-sm text-white/70">
            <GraduationCap className="h-4 w-4 text-white/60" />
            <span>{profile.program}</span>
            {profile.yearOfStudy ? <span>• Year {profile.yearOfStudy}</span> : null}
            {typeof profile.gpa === "number" ? <span>• GPA {profile.gpa.toFixed(2)}</span> : null}
          </div>
        )}

        {profile.availability && (
          <div className="flex items-center gap-2 text-sm text-white/70">
            <MapPin className="h-4 w-4 text-white/60" />
            <span>{profile.availability}</span>
          </div>
        )}
      </div>

      {profile.bio && <p className="text-sm text-white/80">{profile.bio}</p>}

      <div className="flex flex-wrap gap-2">
        {hasInterests && (
          <Badge className="network-pill">{profile.interests[0]}</Badge>
        )}
        {hasInterests && profile.interests.slice(1, 4).map((interest) => (
          <Badge key={interest} className="network-pill">
            {interest}
          </Badge>
        ))}
      </div>

      {hasSkills && (
        <div className="flex flex-wrap gap-2">
          {profile.skills.slice(0, 5).map((skill) => (
            <Badge key={skill} className="border border-white/15 bg-white/5 text-xs text-white">
              {skill}
            </Badge>
          ))}
        </div>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-3 pt-4 text-sm text-white/70">
        <Link href={`mailto:${user.email}`} className="inline-flex items-center gap-2 text-white/80 hover:text-white">
          <Mail className="h-4 w-4" />
          Contact
        </Link>
        {profile.links?.map((link) => (
          <Link
            key={link}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/70 underline decoration-white/30 decoration-dotted underline-offset-4 hover:text-white"
          >
            <Building2 className="h-4 w-4" />
            {truncateLink(link)}
          </Link>
        ))}
      </div>
    </NetworkCard>
  )
}

function truncateLink(link: string) {
  try {
    const url = new URL(link)
    if (url.hostname) return url.hostname.replace("www.", "")
    return link
  } catch {
    return link
  }
}
