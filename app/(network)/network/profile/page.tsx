import prisma from "@/lib/db"
import { getServerAuthSession } from "@/lib/auth"
import { NetworkShell } from "@/components/network/NetworkShell"
import { ProfileEditor } from "@/components/network/ProfileEditor"
import type { VisibilityOption } from "@/lib/types/network"

export default async function ProfilePage() {
  const session = await getServerAuthSession()
  const userId = session?.user.id

  const profileData = userId
    ? await prisma.profile.findUnique({
        where: { userId },
      })
    : null

  const profile = profileData
    ? {
        program: profileData.program ?? "",
        yearOfStudy: profileData.yearOfStudy ?? undefined,
        gpa: profileData.gpa ?? undefined,
        interests: profileData.interests ?? [],
        skills: profileData.skills ?? [],
        availability: profileData.availability ?? "",
        bio: profileData.bio ?? "",
        links: profileData.links ?? [],
        avatarUrl: profileData.avatarUrl ?? undefined,
        cvUrl: profileData.cvUrl ?? undefined,
        visibility: profileData.visibility as VisibilityOption,
      }
    : undefined

  return (
    <NetworkShell
      title="My Research Profile"
      description="Share your research goals, skills, and availability with McGill professors and peers. Keep your information up to date to appear in directory searches."
    >
      <ProfileEditor defaultValues={profile} />
    </NetworkShell>
  )
}
