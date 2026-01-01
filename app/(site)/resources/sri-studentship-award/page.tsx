"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Award, CalendarClock, FileText, Sparkles } from "lucide-react"
import { Section } from "@/components/Section"
import { FancyButton } from "@/components/FancyButton"
import ResourcesNav from "@/components/ResourcesNav"
import { Card, CardContent } from "@/components/ui/card"
import { fadeUp, staggerChildren } from "@/lib/motion"

export default function SRIStudentshipAwardPage() {
  return (
    <>
      <Section className="pt-20 lg:pt-28 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute -top-24 left-8 h-72 w-72 rounded-full bg-amber-300/15 blur-3xl" />
          <div className="absolute top-12 right-10 h-80 w-80 rounded-full bg-fuchsia-400/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="relative mx-auto max-w-6xl"
        >
          <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">Funding</p>
          <h1 className="text-4xl md:text-5xl font-semibold text-white mb-2">SRI Studentship Award</h1>
          <ResourcesNav className="mt-4" />

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr,380px] lg:items-center">
            <div className="space-y-4">
              <p className="text-neutral-300 text-lg">($1000)</p>
              <p className="text-neutral-200">
                One of the main goals of the Student Research Initiative is to help students become involved in research.
                Each year, we sponsor a student researcher under the SRI Award over the summer, allowing the student to
                gain research experience while decreasing the financial burden on the supervisor.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <FancyButton asChild>
                  <Link href="#" target="_blank" rel="noopener noreferrer">
                    Application (coming soon)
                  </Link>
                </FancyButton>
                <FancyButton asChild variant="secondary">
                  <Link href="#" target="_blank" rel="noopener noreferrer">
                    Past Winners
                  </Link>
                </FancyButton>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-primary-900/25 p-7 glass">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-300/15 via-transparent to-fuchsia-400/10" />
              <div className="relative space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
                  <Sparkles className="h-4 w-4 text-accent" />
                  2026 cycle
                </div>
                <div className="grid gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-start gap-3">
                      <Award className="mt-0.5 h-5 w-5 text-accent" />
                      <div>
                        <p className="font-semibold text-white">Award</p>
                        <p className="text-sm text-white/70">$1000 support for summer research.</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-start gap-3">
                      <CalendarClock className="mt-0.5 h-5 w-5 text-accent" />
                      <div>
                        <p className="font-semibold text-white">Timeline</p>
                        <p className="text-sm text-white/70">Opens soon — check back for dates.</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-start gap-3">
                      <FileText className="mt-0.5 h-5 w-5 text-accent" />
                      <div>
                        <p className="font-semibold text-white">What you submit</p>
                        <p className="text-sm text-white/70">Application + supervisor sign-off.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Section>

      <Section className="pt-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren()}
          className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2"
        >
          <motion.div variants={fadeUp}>
            <Card className="surface-soft">
              <CardContent className="space-y-4 p-6">
                <h3 className="text-white font-semibold">Eligibility</h3>
                <p className="text-neutral-200">
                  To be eligible for the award, you must be an undergraduate student currently registered at McGill
                  University. After you find a research position, either in academia or in industry, your supervisor
                  must sign your application. We have no restrictions in terms of program or year of study, meaning the
                  $1000 SRI Award is open to engineering or arts research in addition to science.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Card className="surface-soft">
              <CardContent className="space-y-4 p-6">
                <h3 className="text-white font-semibold">Selection Criteria</h3>
                <p className="text-neutral-200">
                  Our selection criteria are not based on grades or research experience. Instead, we will look at your
                  passion for research as indicated in your personal statement. The application and contents of the
                  personal statement will be released soon.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeUp} className="md:col-span-2">
            <Card className="surface-soft">
              <CardContent className="space-y-4 p-6">
                <h3 className="text-white font-semibold">Application</h3>
                <p className="text-neutral-200">
                  The application for the 2026 SRI Award will open soon. Please check the application form for more
                  details.
                </p>
                <div className="mt-1 flex flex-wrap gap-3">
                  <FancyButton asChild>
                    <Link href="#" target="_blank" rel="noopener noreferrer">
                      Application (coming soon)
                    </Link>
                  </FancyButton>
                  <FancyButton asChild variant="secondary">
                    <Link href="#" target="_blank" rel="noopener noreferrer">
                      Past Winners
                    </Link>
                  </FancyButton>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </Section>
    </>
  )
}
