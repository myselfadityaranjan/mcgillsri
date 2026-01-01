// app/(site)/events/cv-editing-drop-in/page.tsx
"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Section } from "@/components/Section"
import { FancyButton } from "@/components/FancyButton"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, CheckCircle2, Sparkles, Wand2 } from "lucide-react"
import { fadeUp, staggerChildren } from "@/lib/motion"

export default function CVEditingPage() {
  return (
    <>
      <Section className="pt-20 lg:pt-28 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
          <div className="absolute top-12 right-12 h-72 w-72 rounded-full bg-emerald-300/12 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        </div>

        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="relative mx-auto max-w-5xl">
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
          {[
            {
              title: "Pragmatic advice",
              body:
                "Run by SRI execs with research CV experience. We share the exact tactics and patterns we use—you’ll leave with actionable edits, not theory.",
            },
            {
              title: "More than just CVs",
              body:
                "Need help with professor emails, proofreading applications, or cover letters? We’ve got you. All disciplines welcome—this is not limited to research.",
            },
            {
              title: "Free & accessible",
              body:
                "The event is completely free-of-charge. Dates are announced on our socials—follow to stay updated.",
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
                  {title === "Free & accessible" && (
                    <div className="flex items-center gap-2 text-accent">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Drop-in, first-come-first-served</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mx-auto mt-10 max-w-4xl"
        >
          <div className="rounded-3xl border border-white/10 bg-primary-900/25 p-6 glass flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-accent" />
              <div>
                <p className="text-sm font-semibold text-white">Bring your draft</p>
                <p className="text-sm text-white/70">Email snippets, statements, CV—come with real material.</p>
              </div>
            </div>
            <FancyButton asChild>
              <Link href="#" target="_blank" rel="noopener noreferrer">
                RSVP on Facebook <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </FancyButton>
          </div>
        </motion.div>
      </Section>
    </>
  )
}
