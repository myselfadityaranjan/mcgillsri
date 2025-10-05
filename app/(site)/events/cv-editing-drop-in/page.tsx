// app/(site)/events/cv-editing-drop-in/page.tsx
"use client"

import Link from "next/link"
import { Section } from "@/components/Section"
import { FancyButton } from "@/components/FancyButton"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, CheckCircle2 } from "lucide-react"

export default function CVEditingPage() {
  return (
    <>
      <Section className="pt-20 lg:pt-28">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">Support</p>
          <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4">CV Editing Drop-in</h1>
          <p className="text-neutral-200 text-lg">
            Free, pragmatic feedback from execs who actually write research CVs and get results.
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
              <h3 className="text-white font-semibold mb-2">Pragmatic advice</h3>
              <p>
                Run by SRI execs with research CV experience. We share the exact tactics and patterns we use—
                you’ll leave with actionable edits, not theory.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-primary-700/40 border-white/10 rounded-2xl">
            <CardContent className="p-6 text-neutral-200">
              <h3 className="text-white font-semibold mb-2">More than just CVs</h3>
              <p>
                Need help with professor emails, proofreading applications, or cover letters? We’ve got you.
                All disciplines welcome—this is not limited to research.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-primary-700/40 border-white/10 rounded-2xl">
            <CardContent className="p-6 text-neutral-200">
              <h3 className="text-white font-semibold mb-2">Free & accessible</h3>
              <p>
                The event is completely free-of-charge. Dates are announced on our socials—follow to stay updated.
              </p>
              <div className="mt-3 flex items-center gap-2 text-accent">
                <CheckCircle2 className="h-4 w-4" /><span>Drop-in, first-come-first-served</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  )
}
