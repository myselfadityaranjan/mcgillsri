"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { BookOpen, Layers, Monitor, Sparkles } from "lucide-react"
import { Section } from "@/components/Section"
import { FancyButton } from "@/components/FancyButton"
import ResourcesNav from "@/components/ResourcesNav"
import { Card, CardContent } from "@/components/ui/card"
import { fadeUp, staggerChildren } from "@/lib/motion"

const handbookLinks = {
  en: "https://60846cd3-b9b9-45d4-a46c-4c714d928965.filesusr.com/ugd/1918e5_11c09c705789496185f751e24e984e79.pdf",
  fr: "https://60846cd3-b9b9-45d4-a46c-4c714d928965.filesusr.com/ugd/1918e5_8a9b6843fd534aba98fe7eb9fa96a6ea.pdf",
  slides:
    "https://drive.google.com/file/d/1VjqKkp064s1Borp0XAhsZsowKEJ0N7cF/view",
}

export default function StudentHandbookPage() {
  return (
    <>
      <Section className="pt-20 lg:pt-28 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-indigo-400/15 blur-3xl" />
          <div className="absolute top-16 right-10 h-72 w-72 rounded-full bg-emerald-300/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
        </div>

        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="relative mx-auto max-w-5xl">
          <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">Guides</p>
          <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4">SRI Student Handbook</h1>
          <ResourcesNav className="mt-4" />
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr,360px] lg:items-center">
            <p className="text-neutral-200 text-lg">
              A concise handbook for getting started in research—policies, best practices, and practical steps.
            </p>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-primary-900/25 p-6 glass">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-400/15 via-transparent to-emerald-300/10" />
              <div className="relative space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
                  <Sparkles className="h-4 w-4 text-accent" />
                  Quick picks
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <BookOpen className="h-5 w-5 text-accent" />
                    <span className="text-sm text-white/80">Handbook (EN/FR)</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <Layers className="h-5 w-5 text-accent" />
                    <span className="text-sm text-white/80">Slides (2025 Edition)</span>
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
          variants={staggerChildren(0.12, 0.1)}
          className="mx-auto grid max-w-5xl gap-6"
        >
          <motion.div variants={fadeUp}>
            <Card className="surface-soft overflow-hidden">
              <CardContent className="space-y-4 p-7">
                <div className="flex items-start gap-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                    <Monitor className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">
                      View our Slides for How to Get a Research Position (2025 Edition)
                    </h3>
                    <p className="text-neutral-200">
                      A quick, high-signal deck covering outreach, timelines, and what actually works.
                    </p>
                    <div className="mt-4">
                      <FancyButton asChild>
                        <Link href={handbookLinks.slides} target="_blank" rel="noopener noreferrer">
                          Open Slides
                        </Link>
                      </FancyButton>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                title: "Handbook (EN)",
                body: "English edition in PDF/online format.",
                variant: "primary" as const,
                cta: "Open EN",
                href: handbookLinks.en,
              },
              {
                title: "Handbook (FR)",
                body: "Version française en PDF/format en ligne.",
                variant: "secondary" as const,
                cta: "Ouvrir FR",
                href: handbookLinks.fr,
              },
            ].map(({ title, body, variant, cta, href }) => (
              <motion.div key={title} variants={fadeUp}>
                <Card className="surface-soft">
                  <CardContent className="space-y-4 p-7">
                    <h3 className="text-white font-semibold">{title}</h3>
                    <p className="text-neutral-200">{body}</p>
                    <div>
                      <FancyButton asChild variant={variant}>
                        <Link href={href} target="_blank" rel="noopener noreferrer">
                          {cta}
                        </Link>
                      </FancyButton>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>
    </>
  )
}
