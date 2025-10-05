// app/(site)/events/mock-interviews/page.tsx
"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Section } from "@/components/Section"
import { FancyButton } from "@/components/FancyButton"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, Mic, Users, Laptop, ShieldAlert } from "lucide-react"
import { fadeUp, staggerChildren } from "@/lib/motion"

export default function MockInterviewsPage() {
  return (
    <>
      <Section className="pt-20 lg:pt-28">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mx-auto max-w-4xl">
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
        </motion.div>
      </Section>

      <Section className="pt-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren()}
          className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3"
        >
          <motion.div variants={fadeUp}>
            <Card className="surface-soft h-full">
              <CardContent className="p-6 text-neutral-200">
                <h3 className="text-white font-semibold mb-2">What you’ll practice</h3>
                <ul className="space-y-1 pl-5 list-disc">
                  <li>Pharmaceutical companies</li>
                  <li>Bioinformatics</li>
                  <li>General academic research</li>
                  <li>Public Health</li>
                  <li>Arts</li>
                  <li>Genetics</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Card className="surface-soft h-full">
              <CardContent className="p-6 text-neutral-200 space-y-2">
                <h3 className="text-white font-semibold">Format</h3>
                <p>
                  <Mic className="mr-2 inline h-4 w-4 text-accent" /> 10–15 minute interviews on Zoom
                </p>
                <p>
                  <Users className="mr-2 inline h-4 w-4 text-accent" /> Choose your category in advance
                </p>
                <p>
                  <Laptop className="mr-2 inline h-4 w-4 text-accent" /> Background briefs posted closer to the date
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Card className="surface-soft h-full">
              <CardContent className="space-y-4 p-6 text-neutral-200">
                <div>
                  <h3 className="text-white font-semibold mb-2">Perfect prep</h3>
                  <p>
                    Great practice for our Faculty-Student Speed Networking event or to get a feel for industry-type
                    interviews. Hope to see you there!
                  </p>
                </div>
                <div className="rounded-lg border border-white/12 bg-primary-900/40 p-3 text-neutral-300 text-sm">
                  <ShieldAlert className="mr-2 inline h-4 w-4 text-accent" />
                  <strong>Disclaimer:</strong> This is a mock interview event. All questions are prepared by the SRI Exec
                  Team and interviews are <em>not</em> for real positions.
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </Section>
    </>
  )
}
