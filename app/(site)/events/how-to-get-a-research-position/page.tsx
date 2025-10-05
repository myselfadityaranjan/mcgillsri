// app/(site)/events/how-to-get-a-research-position/page.tsx
"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Section } from "@/components/Section"
import { FancyButton } from "@/components/FancyButton"
import { Card, CardContent } from "@/components/ui/card"
import { PlayCircle, ExternalLink } from "lucide-react"
import { fadeUp, staggerChildren } from "@/lib/motion"

const videos = Array.from({ length: 8 }).map((_, i) => ({
  title: `HTGRP Presentation ${i + 1}`,
  href: "#", // TODO: replace with video URL
  thumb: "/placeholder.jpg",
  meta: "00:00",
}))

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
          className="mx-auto grid max-w-5xl gap-10"
        >
          <motion.div variants={staggerChildren(0.12, 0.1)} className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Q&A Seminar",
                body:
                  "“How to Get a Research Position” is an annual SRI seminar where students share concrete strategies: emailing professors, securing external funding and scholarships, researching abroad, and understanding McGill research-for-credit courses.",
              },
              {
                title: "For Students, By Students",
                body:
                  "Presenters are current/past McGill students active in paid or volunteer research across disciplines. You’ll get curated tips, example emails, and decision frameworks that actually work.",
              },
              {
                title: "Committed to Quality",
                body:
                  "After the talks, join an informal networking session to ask anything, validate your approach, and get tailored advice. Satisfaction guaranteed.",
              },
            ].map(({ title, body }) => (
              <motion.div key={title} variants={fadeUp}>
                <Card className="surface-soft h-full">
                  <CardContent className="space-y-4 p-6 text-neutral-200">
                    <h3 className="text-white font-semibold">{title}</h3>
                    <p>{body}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp}>
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">Past Presentations</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {videos.map((video, index) => (
                <a
                  key={`${video.title}-${index}`}
                  href={video.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block overflow-hidden rounded-2xl surface-soft transition-all duration-300 ease-out hover:-translate-y-1"
                >
                  <div className="relative aspect-video">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={video.thumb} alt={video.title} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 grid place-items-center bg-black/25 transition-all duration-300 ease-out group-hover:bg-black/35">
                      <PlayCircle className="h-10 w-10 text-white/90" />
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-white font-medium">{video.title}</p>
                    <p className="text-neutral-400 text-sm">{video.meta}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </Section>
    </>
  )
}
