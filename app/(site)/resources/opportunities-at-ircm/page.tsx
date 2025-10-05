// app/(site)/resources/opportunities-at-ircm/page.tsx
"use client"

import Link from "next/link"
import { Section } from "@/components/Section"
import { FancyButton } from "@/components/FancyButton"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, ExternalLink } from "lucide-react"

export default function OpportunitiesIRCMPage() {
  return (
    <>
      <Section className="pt-20 lg:pt-28">
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-[1fr_320px]">
          <div>
            <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">Institutes & Labs</p>
            <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4">Opportunities at IRCM</h1>
            <p className="text-neutral-200 text-lg">
              The IRCM hosts researchers from different departments from both the University of Montreal and
              McGill University. Academic life at the IRCM includes conferences, research days, and various
              student associations. Opportunities to become involved are available at both the undergraduate and
              graduate levels.
            </p>

            <p className="text-neutral-300 mt-6">
              For more information, please refer to the file on the right for a more in-depth description of the
              opportunities available and visit the IRCM website below.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <FancyButton asChild>
                <Link href="#" target="_blank" rel="noopener noreferrer">
                  IRCM Announcements <ExternalLink className="h-4 w-4 ml-1" />
                </Link>
              </FancyButton>
              <FancyButton asChild variant="secondary">
                <Link href="#" target="_blank" rel="noopener noreferrer">
                  IRCM Website <ExternalLink className="h-4 w-4 ml-1" />
                </Link>
              </FancyButton>
            </div>
          </div>

          {/* Sticky side file card */}
          <div className="md:sticky md:top-24">
            <Card className="bg-primary-700/40 border-white/10 rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <FileText className="h-6 w-6 text-accent shrink-0 mt-1" />
                  <div>
                    <h3 className="text-white font-semibold">IRCM Opportunities Overview</h3>
                    <p className="text-neutral-300 text-sm">
                      Download the detailed overview of programs, labs, and student involvement at IRCM.
                    </p>
                    <div className="mt-4">
                      <FancyButton asChild>
                        <Link href="#" target="_blank" rel="noopener noreferrer">View / Download</Link>
                      </FancyButton>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>
    </>
  )
}
