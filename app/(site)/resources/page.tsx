// app/(site)/resources/page.tsx
"use client"

import Link from "next/link"
import { Section } from "@/components/Section"
import ResourcesNav from "@/components/ResourcesNav"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Building2, Award, Handshake, Youtube, BookOpen } from "lucide-react"

const items = [
  {
    href: "/resources/opportunities-at-ircm",
    title: "Opportunities at IRCM",
    desc: "Programs, labs, and student involvement at the Institut de recherches cliniques de Montréal.",
    icon: Building2,
  },
  {
    href: "/resources/sri-studentship-award",
    title: "SRI Studentship Award",
    desc: "$1000 summer studentship to reduce financial burden and enable research experience.",
    icon: Award,
  },
  {
    href: "/resources/mentor-program",
    title: "SRI Mentor Program",
    desc: "One-semester, 1:1 mentorship with senior/graduate students across disciplines.",
    icon: Handshake,
  },
  {
    href: "/resources/youtube-series",
    title: "YouTube Series",
    desc: "Emailing, funding, courses, international research — watch practical sessions.",
    icon: Youtube,
  },
  {
    href: "/resources/student-handbook",
    title: "Student Handbook",
    desc: "Concise, pragmatic guide (EN/FR) for getting into research at McGill.",
    icon: BookOpen,
  },
]

export default function ResourcesPage() {
  return (
    <>
      <Section className="pt-20 lg:pt-28">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-accent font-medium text-sm uppercase tracking-wider mb-4">Resources</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6">Get Started & Level Up</h1>
          <p className="text-neutral-200 text-lg">
            Funding, mentorship, guides, and opportunities — curated for McGill undergraduates getting into research.
          </p>
        </div>
        <ResourcesNav />
      </Section>

      <Section className="pt-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(({ href, title, desc, icon: Icon }) => (
            <Link key={href} href={href} className="group">
              <Card className="bg-primary-700/40 border-white/10 rounded-2xl h-full transition-transform group-hover:-translate-y-0.5">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Icon className="h-5 w-5 text-accent" />
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-neutral-200">{desc}</CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
    </>
  )
}
