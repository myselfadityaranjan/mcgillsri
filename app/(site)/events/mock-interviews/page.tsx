// app/(site)/events/mock-interviews/page.tsx
"use client"

import Link from "next/link"
import { Section } from "@/components/Section"
import { FancyButton } from "@/components/FancyButton"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, Mic, Users, Laptop, ShieldAlert } from "lucide-react"

export default function MockInterviewsPage() {
  return (
    <>
      <Section className="pt-20 lg:pt-28">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">Practice</p>
          <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4">SRI Mock Interviews</h1>
          <p className="text-neutral-200 text-lg">
            Practice for perfection—free 10–15 minute Zoom mock interviews across six categories.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <FancyButton asChild>
              <Link href="#" target="_blank" rel="noopener noreferrer">
                Facebook Page <ExternalLink className="h-4 w-4 ml-1" />
              </Link>
            </FancyButton>
          </div>
        </div>
      </Section>

      <Section className="pt-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          <Card className="bg-primary-700/40 border-white/10 rounded-2xl">
            <CardContent className="p-6 text-neutral-200">
              <h3 className="text-white font-semibold mb-2">What you’ll practice</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Pharmaceutical companies</li>
                <li>Bioinformatics</li>
                <li>General academic research</li>
                <li>Public Health</li>
                <li>Arts</li>
                <li>Genetics</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-primary-700/40 border-white/10 rounded-2xl">
            <CardContent className="p-6 text-neutral-200">
              <h3 className="text-white font-semibold mb-2">Format</h3>
              <p className="mb-2"><Mic className="inline h-4 w-4 mr-1 text-accent" /> 10–15 minute interviews on Zoom</p>
              <p className="mb-2"><Users className="inline h-4 w-4 mr-1 text-accent" /> Choose your category in advance</p>
              <p><Laptop className="inline h-4 w-4 mr-1 text-accent" /> Background briefs posted closer to the date</p>
            </CardContent>
          </Card>

          <Card className="bg-primary-700/40 border-white/10 rounded-2xl">
            <CardContent className="p-6 text-neutral-200">
              <h3 className="text-white font-semibold mb-2">Perfect prep</h3>
              <p>
                Great practice for our Faculty-Student Speed Networking event or to get a feel for industry-type interviews.
                Hope to see you there!
              </p>
              <div className="mt-4 rounded-lg border border-white/10 bg-primary-900/40 p-3 text-neutral-300 text-sm">
                <ShieldAlert className="inline h-4 w-4 mr-2 text-accent" />
                <strong>Disclaimer:</strong> This is a mock interview event. All questions are prepared by the SRI Exec Team and interviews are <em>not</em> for real positions.
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  )
}
