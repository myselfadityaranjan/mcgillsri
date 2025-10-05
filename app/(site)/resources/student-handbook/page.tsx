// app/(site)/resources/student-handbook/page.tsx
"use client"

import Link from "next/link"
import { Section } from "@/components/Section"
import { FancyButton } from "@/components/FancyButton"
import { Card, CardContent } from "@/components/ui/card"

export default function StudentHandbookPage() {
  return (
    <>
      <Section className="pt-20 lg:pt-28">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">Guides</p>
          <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4">SRI Student Handbook</h1>
          <p className="text-neutral-200 text-lg">
            A concise handbook for getting started in research—policies, best practices, and practical steps.
          </p>
        </div>
      </Section>

      <Section className="pt-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          <Card className="bg-primary-700/40 border-white/10 rounded-2xl">
            <CardContent className="p-6">
              <h3 className="text-white font-semibold mb-2">Handbook (EN)</h3>
              <p className="text-neutral-200">English edition in PDF/online format.</p>
              <div className="mt-4">
                <FancyButton asChild>
                  <Link href="#" target="_blank" rel="noopener noreferrer">Open EN</Link>
                </FancyButton>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary-700/40 border-white/10 rounded-2xl">
            <CardContent className="p-6">
              <h3 className="text-white font-semibold mb-2">Handbook (FR)</h3>
              <p className="text-neutral-200">Version française en PDF/format en ligne.</p>
              <div className="mt-4">
                <FancyButton asChild variant="secondary">
                  <Link href="#" target="_blank" rel="noopener noreferrer">Ouvrir FR</Link>
                </FancyButton>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  )
}
