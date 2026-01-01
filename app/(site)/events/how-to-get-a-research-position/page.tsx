// app/(site)/events/how-to-get-a-research-position/page.tsx
"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Section } from "@/components/Section"
import { FancyButton } from "@/components/FancyButton"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, Sparkles, Wand2 } from "lucide-react"
import { fadeUp, staggerChildren } from "@/lib/motion"

const facebookUrl = "https://www.facebook.com/events/1035688297177151"
const slidesUrl = "https://drive.google.com/file/d/1VjqKkp064s1Borp0XAhsZsowKEJ0N7cF/view"
const recordedUrl = "https://drive.google.com/file/d/1WMSXDzVfojTIfvCmA4tMTXc2K_o0rx7-/view"

export default function HTGRPPage() {
  return (
    <>
      <Section className="pt-20 lg:pt-28">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mx-auto max-w-4xl">
          <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">Seminar</p>
          <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4">How to Get a Research Position</h1>
          <p className="text-neutral-200 text-lg">
            Everything you need to know to get started in undergraduate research.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <FancyButton asChild>
              <Link href={facebookUrl} target="_blank" rel="noopener noreferrer">
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
          className="mx-auto grid max-w-5xl gap-10"
        >
          <motion.div variants={staggerChildren(0.12, 0.1)} className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Q&A Seminar",
                body:
                  "Annual HTGRP seminar: emailing professors, funding, research-for-credit, and study-abroad strategy with real examples.",
              },
              {
                title: "For Students, By Students",
                body:
                  "Current/past McGill students share what actually worked: curated outreach scripts, timelines, and decision frameworks.",
              },
              {
                title: "Committed to Quality",
                body:
                  "Post-talk networking for tailored advice, validation, and next steps. Leave with a plan, not a to-do list.",
              },
            ].map(({ title, body }) => (
              <motion.div key={title} variants={fadeUp}>
                <Card className="surface-soft h-full overflow-hidden">
                  <CardContent className="space-y-4 p-6 text-neutral-200">
                    <div className="flex items-center gap-2">
                      <Wand2 className="h-5 w-5 text-accent" />
                      <h3 className="text-white font-semibold">{title}</h3>
                    </div>
                    <p>{body}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col gap-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-white">Past Presentations</h2>
            <div className="flex flex-wrap gap-3">
              <FancyButton asChild size="lg">
                <Link href={slidesUrl} target="_blank" rel="noopener noreferrer">
                  HTGRP 2025 <ExternalLink className="h-4 w-4 ml-2" />
                </Link>
              </FancyButton>
              <FancyButton asChild size="lg" variant="secondary">
                <Link href={recordedUrl} target="_blank" rel="noopener noreferrer">
                  Recorded Version <ExternalLink className="h-4 w-4 ml-2" />
                </Link>
              </FancyButton>
            </div>
            <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-primary-900/30 px-4 py-3 text-sm text-white/75">
              <Sparkles className="h-4 w-4 text-accent" />
              Grab the slides or watch the recording—both are updated for 2025.
            </div>
          </motion.div>
        </motion.div>
      </Section>
    </>
  )
}
