// app/(site)/events/cv-editing-drop-in/page.tsx
"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Section } from "@/components/Section"
import { FancyButton } from "@/components/FancyButton"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, CheckCircle2 } from "lucide-react"
import { fadeUp, staggerChildren } from "@/lib/motion"

export default function CVEditingPage() {
  return (
    <>
      <Section className="pt-20 lg:pt-28">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mx-auto max-w-4xl">
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
              <Card className="surface-soft h-full">
                <CardContent className="space-y-4 p-6 text-neutral-200">
                  <div>
                    <h3 className="text-white font-semibold">{title}</h3>
                    <p>{body}</p>
                  </div>
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
      </Section>
    </>
  )
}
