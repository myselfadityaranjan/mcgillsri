"use client"

import Link from "next/link"
import { Section } from "@/components/Section"
import { FancyButton } from "@/components/FancyButton"
import ResourcesNav from "@/components/ResourcesNav"
import { Card, CardContent } from "@/components/ui/card"

export default function MentorProgramPage() {
  return (
    <>
      <Section className="pt-20 lg:pt-28">
        <div className="max-w-5xl mx-auto">
          <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">Mentorship</p>
          <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4">SRI Mentor Program</h1>
          <ResourcesNav />
          <p className="text-neutral-200 text-lg mt-4">
            The mentor program connects McGill undergrads with senior students or graduate mentors to understand what
            research is really like and how to break in.
          </p>
        </div>
      </Section>

      <Section className="pt-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <Card className="bg-primary-700/40 border-white/10 rounded-2xl">
            <CardContent className="p-6">
              <h3 className="text-white font-semibold mb-2">All about learning</h3>
              <p className="text-neutral-200">
                The mentor program is intended to connect McGill undergards with seniors or graduate students at McGill
                to get a better understanding of what research is about.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-primary-700/40 border-white/10 rounded-2xl">
            <CardContent className="p-6">
              <h3 className="text-white font-semibold mb-2">1 on 1 mentorship</h3>
              <p className="text-neutral-200">
                Students will be matched for one semester with a successful and experienced mentor who can provide
                advice on finding a research position, share experiences, and discuss careers in research.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-primary-700/40 border-white/10 rounded-2xl">
            <CardContent className="p-6">
              <h3 className="text-white font-semibold mb-2">Commitment matters</h3>
              <p className="text-neutral-200">
                Interactions are flexible—email or casual meetings—but depend on commitment from both sides. The program
                is not a research placement; it’s a learning opportunity.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-5xl mx-auto mt-8 flex flex-wrap gap-3">
          <FancyButton asChild>
            <Link href="#" target="_blank" rel="noopener noreferrer">Become a Mentor</Link>
          </FancyButton>
          <FancyButton asChild variant="secondary">
            <Link href="#" target="_blank" rel="noopener noreferrer">Become a Mentee</Link>
          </FancyButton>
        </div>
      </Section>
    </>
  )
}
