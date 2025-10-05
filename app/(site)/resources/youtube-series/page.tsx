"use client"

import Link from "next/link"
import { Section } from "@/components/Section"
import { FancyButton } from "@/components/FancyButton"
import ResourcesNav from "@/components/ResourcesNav"
import { Card, CardContent } from "@/components/ui/card"
import { PlayCircle } from "lucide-react"

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
        <div className="max-w-5xl mx-auto">
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
        </div>
      </Section>

      <Section className="pt-6">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {topics.map((t, i) => (
            <Card key={i} className="bg-primary-700/40 border-white/10 rounded-2xl overflow-hidden">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <PlayCircle className="h-6 w-6 text-accent mt-1" />
                  <div>
                    <p className="text-white font-medium">{t}</p>
                    <p className="text-neutral-300 text-sm">Watch on our channel</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </>
  )
}
