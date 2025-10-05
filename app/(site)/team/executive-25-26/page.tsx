// app/(site)/team/executive-25-26/page.tsx
import { Section } from "@/components/Section"
import { TeamCarousel } from "@/components/TeamCarousel"
import { EXECUTIVE_25_26 } from "@/lib/team"

export default function ExecutiveTeamPage() {
  return (
    <>
      <Section className="pt-20 lg:pt-28">
        <div className="max-w-5xl mx-auto">
          <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">Meet the Team</p>
          <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4">Executive Team 25–26</h1>
          <p className="text-neutral-200 max-w-2xl">
            A multidisciplinary team leading SRI’s programming, partnerships, and student opportunities.
          </p>
        </div>
      </Section>

      <Section className="pt-8">
        <div className="max-w-6xl mx-auto">
          <TeamCarousel members={EXECUTIVE_25_26} />
        </div>
      </Section>
    </>
  )
}
