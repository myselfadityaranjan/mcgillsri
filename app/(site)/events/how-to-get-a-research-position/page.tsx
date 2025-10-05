// app/(site)/events/how-to-get-a-research-position/page.tsx
"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Section } from "@/components/Section"
import { FancyButton } from "@/components/FancyButton"
import { Card, CardContent } from "@/components/ui/card"
import { PlayCircle, ExternalLink } from "lucide-react"

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
        <div className="max-w-4xl mx-auto">
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
        </div>
      </Section>

      <Section className="pt-6">
        <div className="max-w-5xl mx-auto grid gap-10">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-primary-700/40 border-white/10 rounded-2xl">
              <CardContent className="p-6 text-neutral-200">
                <h3 className="text-white font-semibold mb-2">Q&A Seminar</h3>
                <p>
                  “How to Get a Research Position” is an annual SRI seminar where students share
                  concrete strategies: emailing professors, securing external funding and scholarships,
                  researching abroad, and understanding McGill research-for-credit courses.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-primary-700/40 border-white/10 rounded-2xl">
              <CardContent className="p-6 text-neutral-200">
                <h3 className="text-white font-semibold mb-2">For Students, By Students</h3>
                <p>
                  Presenters are current/past McGill students active in paid or volunteer research across
                  disciplines. You’ll get curated tips, example emails, and decision frameworks that actually work.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-primary-700/40 border-white/10 rounded-2xl">
              <CardContent className="p-6 text-neutral-200">
                <h3 className="text-white font-semibold mb-2">Committed to Quality</h3>
                <p>
                  After the talks, join an informal networking session to ask anything, validate your approach,
                  and get tailored advice. Satisfaction guaranteed.
                </p>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">Past Presentations</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {videos.map((v, i) => (
                <a
                  key={i}
                  href={v.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-2xl overflow-hidden border border-white/10 bg-primary-700/40"
                >
                  <div className="relative aspect-video">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={v.thumb} alt={v.title} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 grid place-items-center bg-black/20 group-hover:bg-black/30 transition-colors">
                      <PlayCircle className="h-10 w-10 text-white/90" />
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-white font-medium">{v.title}</p>
                    <p className="text-neutral-400 text-sm">{v.meta}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
