"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Section } from "@/components/Section"
import { FancyButton } from "@/components/FancyButton"
import ResourcesNav from "@/components/ResourcesNav"
import { Card, CardContent } from "@/components/ui/card"
import { PlayCircle } from "lucide-react"
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
      <Section className="pt-20 lg:pt-28">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mx-auto max-w-5xl">
          <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">Video Series</p>
          <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4">
            SRI YouTube Series: How to Get a Research Position
          </h1>
          <ResourcesNav />
          <p className="text-neutral-200 mt-4">
            SRI invites a group of brilliant researchers to share practical tips and opportunities for getting
            involved in research.
          </p>

          <div className="mt-6">
            <FancyButton asChild>
              <Link href="https://www.youtube.com/channel/UC_OlFtnhSxlNW0dVTHObHig" target="_blank" rel="noopener noreferrer">
                Youtube Channel
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
          variants={staggerChildren(0.08, 0.08)}
          className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 md:grid-cols-3"
        >
          {topics.map((topic) => (
            <motion.div key={topic} variants={fadeUp}>
              <Card className="surface-soft overflow-hidden">
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
