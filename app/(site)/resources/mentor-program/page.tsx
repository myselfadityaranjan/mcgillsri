"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Section } from "@/components/Section"
import { FancyButton } from "@/components/FancyButton"
import ResourcesNav from "@/components/ResourcesNav"
import { Card, CardContent } from "@/components/ui/card"
import { fadeUp, staggerChildren } from "@/lib/motion"

export default function MentorProgramPage() {
  return (
    <>
      <Section className="pt-20 lg:pt-28">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mx-auto max-w-5xl">
          <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">Mentorship</p>
          <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4">SRI Mentor Program</h1>
          <ResourcesNav />
          <p className="text-neutral-200 text-lg mt-4">
            The mentor program connects McGill undergrads with senior students or graduate mentors to understand what
            research is really like and how to break in.
          </p>
        </motion.div>
      </Section>

      <Section className="pt-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren()}
          className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3"
        >
          {[
            {
              title: "All about learning",
              body:
                "The mentor program is intended to connect McGill undergards with seniors or graduate students at McGill to get a better understanding of what research is about.",
            },
            {
              title: "1 on 1 mentorship",
              body:
                "Students will be matched for one semester with a successful and experienced mentor who can provide advice on finding a research position, share experiences, and discuss careers in research.",
            },
            {
              title: "Commitment matters",
              body:
                "Interactions are flexible—email or casual meetings—but depend on commitment from both sides. The program is not a research placement; it’s a learning opportunity.",
            },
          ].map(({ title, body }) => (
            <motion.div key={title} variants={fadeUp}>
              <Card className="surface-soft h-full">
                <CardContent className="space-y-4 p-6">
                  <h3 className="text-white font-semibold">{title}</h3>
                  <p className="text-neutral-200">{body}</p>
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
          className="mx-auto mt-8 flex max-w-5xl flex-wrap gap-3"
        >
          <FancyButton asChild>
            <Link href="#" target="_blank" rel="noopener noreferrer">
              Become a Mentor
            </Link>
          </FancyButton>
          <FancyButton asChild variant="secondary">
            <Link href="#" target="_blank" rel="noopener noreferrer">
              Become a Mentee
            </Link>
          </FancyButton>
        </motion.div>
      </Section>
    </>
  )
}
