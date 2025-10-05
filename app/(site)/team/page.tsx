// app/(site)/team/page.tsx
import Link from "next/link"
import { Section } from "@/components/Section"
import { FancyButton } from "@/components/FancyButton"

export default function TeamLandingPage() {
  return (
    <>
      <Section className="pt-20 lg:pt-28">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-accent font-medium text-sm uppercase tracking-wider mb-4">Our People</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6">Meet the Team</h1>
          <p className="text-neutral-200 text-lg">
            The Student Research Initiative is powered by dedicated students and mentors. Explore our current
            executive team and celebrate past contributors in the SRI Hall of Fame.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <FancyButton asChild>
              <Link href="/team/executive-25-26">Executive Team 25–26</Link>
            </FancyButton>
            <FancyButton asChild variant="secondary">
              <Link href="/team/hall-of-fame">SRI Hall of Fame</Link>
            </FancyButton>
          </div>
        </div>
      </Section>
    </>
  )
}
