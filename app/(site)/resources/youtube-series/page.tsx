"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { AudioLines, PlayCircle, Sparkles, Youtube } from "lucide-react"
import { Section } from "@/components/Section"
import { FancyButton } from "@/components/FancyButton"
import ResourcesNav from "@/components/ResourcesNav"
import { Card, CardContent } from "@/components/ui/card"
import { fadeUp, staggerChildren } from "@/lib/motion"

const topics = [
  "Emailing Tips",
  "Research Courses, Funding, and Summer Internships",
  "Engineering Research",
  "Global Health Research",
  "International Research",
  "Q&A Session",
]

export default function YouTubeSeriesPage() {
  return (
    <>
      <Section className="pt-20 lg:pt-28 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-fuchsia-400/12 blur-3xl" />
          <div className="absolute top-16 right-10 h-72 w-72 rounded-full bg-sky-400/12 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
        </div>

        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="relative mx-auto max-w-6xl">
          <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">Video Series</p>
          <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4">
            SRI YouTube Series: How to Get a Research Position
          </h1>
          <ResourcesNav className="mt-4" />

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr,420px] lg:items-center">
            <div className="space-y-4">
              <p className="text-neutral-200 text-lg">
                SRI invites a group of brilliant researchers to share practical tips and opportunities for getting
                involved in research.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <FancyButton asChild>
                  <Link
                    href="https://www.youtube.com/channel/UC_OlFtnhSxlNW0dVTHObHig"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Youtube Channel
                  </Link>
                </FancyButton>
                <FancyButton asChild variant="secondary">
                  <Link href="/events/how-to-get-a-research-position">See the seminar page</Link>
                </FancyButton>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-primary-900/25 p-7 glass">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-fuchsia-400/12 via-transparent to-sky-400/12" />
              <div className="relative space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
                  <Sparkles className="h-4 w-4 text-accent" />
                  What you’ll learn
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Pill icon={Youtube} label="Short, pragmatic talks" />
                  <Pill icon={AudioLines} label="Q&A + mental models" />
                  <Pill icon={PlayCircle} label="Watch anytime" />
                  <Pill icon={Sparkles} label="Student-first advice" />
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
          variants={staggerChildren(0.08, 0.08)}
          className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 md:grid-cols-3"
        >
          {topics.map((topic) => (
            <motion.div key={topic} variants={fadeUp}>
              <Card className="surface-soft overflow-hidden transition-transform duration-300 hover:-translate-y-1">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <PlayCircle className="mt-1 h-6 w-6 text-accent" />
                    <div>
                      <p className="text-white font-medium">{topic}</p>
                      <p className="text-neutral-300 text-sm">Watch on our channel</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Section>
    </>
  )
}

function Pill({ icon: Icon, label }: { icon: typeof Youtube; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-3">
        <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5">
          <Icon className="h-5 w-5 text-accent" />
        </div>
        <p className="text-sm text-white/80">{label}</p>
      </div>
    </div>
  )
}
