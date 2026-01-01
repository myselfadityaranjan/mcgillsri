"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Section } from "@/components/Section"
import { FancyButton } from "@/components/FancyButton"
import ResourcesNav from "@/components/ResourcesNav"
import { Card, CardContent } from "@/components/ui/card"
import { Building2, ExternalLink, FileText, Sparkles } from "lucide-react"
import { fadeUp } from "@/lib/motion"

const ircmLinks = {
  pdf: "https://60846cd3-b9b9-45d4-a46c-4c714d928965.filesusr.com/ugd/f51caa_86048d826fc94cb8b7b4046854ed704b.pdf",
  site: "https://www.ircm.qc.ca/en",
}

export default function OpportunitiesIRCMPage() {
  return (
    <>
      <Section className="pt-20 lg:pt-28 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-sky-400/12 blur-3xl" />
          <div className="absolute top-16 right-10 h-72 w-72 rounded-full bg-emerald-300/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
        </div>

        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="relative mx-auto max-w-6xl">
          <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">Institutes & Labs</p>
          <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4">Opportunities at IRCM</h1>
          <ResourcesNav className="mt-4" />

          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr,380px] lg:items-start">
            <div className="space-y-6">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-primary-900/25 p-8 glass">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-400/10 via-transparent to-emerald-300/10" />
                <div className="relative space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
                    <Building2 className="h-4 w-4 text-accent" />
                    Institut de recherches cliniques de Montréal
                  </div>
                  <p className="text-neutral-200 text-lg">
                    The IRCM hosts researchers from different departments from both the University of Montreal and
                    McGill University. Academic life at the IRCM includes conferences, research days, and various
                    student associations. Opportunities to become involved are available at both the undergraduate and
                    graduate levels.
                  </p>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                      <p className="text-sm font-semibold text-white">Why it matters</p>
                      <p className="mt-1 text-sm text-white/70">
                        A dense research hub where opportunities cluster—labs, seminars, and student groups.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                      <p className="text-sm font-semibold text-white">How to use this page</p>
                      <p className="mt-1 text-sm text-white/70">
                        Read the PDF overview, then jump to the IRCM site to explore programs and labs.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <FancyButton asChild>
                      <Link href={ircmLinks.pdf} target="_blank" rel="noopener noreferrer">
                        IRCM Announcements <ExternalLink className="ml-1 h-4 w-4" />
                      </Link>
                    </FancyButton>
                    <FancyButton asChild variant="secondary">
                      <Link href={ircmLinks.site} target="_blank" rel="noopener noreferrer">
                        IRCM Website <ExternalLink className="ml-1 h-4 w-4" />
                      </Link>
                    </FancyButton>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-24 space-y-6">
              <Card className="surface-soft overflow-hidden">
                <CardContent className="space-y-4 p-7">
                  <div className="flex items-start gap-3">
                    <FileText className="h-6 w-6 text-accent shrink-0 mt-1" />
                    <div>
                      <h3 className="text-white font-semibold">IRCM Opportunities Overview</h3>
                      <p className="text-neutral-300 text-sm">
                        Download the detailed overview of programs, labs, and student involvement at IRCM.
                      </p>
                      <div className="mt-4">
                        <FancyButton asChild>
                          <Link href={ircmLinks.pdf} target="_blank" rel="noopener noreferrer">
                            View / Download
                          </Link>
                        </FancyButton>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-primary-900/25 p-7 glass">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-300/10 via-transparent to-sky-400/10" />
                <div className="relative space-y-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
                    <Sparkles className="h-4 w-4 text-accent" />
                    Tip
                  </div>
                  <p className="text-sm text-white/75">
                    Skim the PDF first, then open the IRCM site and search by keywords that match your interests.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Section>
    </>
  )
}
