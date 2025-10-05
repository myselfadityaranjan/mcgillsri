"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Section } from "@/components/Section"
import { FancyButton } from "@/components/FancyButton"
import ResourcesNav from "@/components/ResourcesNav"
import { Card, CardContent } from "@/components/ui/card"
import { fadeUp, staggerChildren } from "@/lib/motion"

export default function StudentHandbookPage() {
  return (
    <>
      <Section className="pt-20 lg:pt-28">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mx-auto max-w-4xl">
          <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">Guides</p>
          <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4">SRI Student Handbook</h1>
          <ResourcesNav />
          <p className="text-neutral-200 text-lg mt-4">
            A concise handbook for getting started in research—policies, best practices, and practical steps.
          </p>
        </motion.div>
      </Section>

      <Section className="pt-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren(0.12, 0.1)}
          className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2"
        >
          {[
            {
              title: "Handbook (EN)",
              body: "English edition in PDF/online format.",
              variant: "primary" as const,
              cta: "Open EN",
            },
            {
              title: "Handbook (FR)",
              body: "Version française en PDF/format en ligne.",
              variant: "secondary" as const,
              cta: "Ouvrir FR",
            },
          ].map(({ title, body, variant, cta }) => (
            <motion.div key={title} variants={fadeUp}>
              <Card className="surface-soft">
                <CardContent className="space-y-4 p-6">
                  <h3 className="text-white font-semibold">{title}</h3>
                  <p className="text-neutral-200">{body}</p>
                  <div>
                    <FancyButton asChild variant={variant}>
                      <Link href="#" target="_blank" rel="noopener noreferrer">
                        {cta}
                      </Link>
                    </FancyButton>
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
