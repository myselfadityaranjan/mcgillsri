// app/(site)/team/hall-of-fame/page.tsx
import { Section } from "@/components/Section"
import { TeamCarousel } from "@/components/TeamCarousel"
import { HALL_OF_FAME } from "@/lib/team"

export default function HallOfFamePage() {
  return (
    <>
      <Section className="pt-20 lg:pt-28">
        <div className="max-w-5xl mx-auto">
          <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">Legacy</p>
          <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4">SRI Hall of Fame</h1>
          <p className="text-neutral-200 max-w-2xl">
            Recognizing exceptional students whose leadership and initiative shaped SRI and expanded research
            opportunities for undergraduates at McGill.
          </p>
        </div>
      </Section>

      <Section className="pt-8">
        <div className="max-w-6xl mx-auto">
          <TeamCarousel members={HALL_OF_FAME} />
        </div>
      </Section>
    </>
  )
}
