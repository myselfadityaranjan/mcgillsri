// app/(site)/resources/page.tsx
"use client"

import Link from "next/link"
import { useMemo } from "react"
import { Section } from "@/components/Section"
import ResourcesNav from "@/components/ResourcesNav"
import { Building2, Award, Handshake, Youtube, BookOpen, Sparkles, Orbit } from "lucide-react"
import { FancyButton } from "@/components/FancyButton"
import { ResourceWheel } from "@/components/ResourceWheel"

const subpages = [
  {
    href: "/resources/opportunities-at-ircm",
    title: "Opportunities at IRCM",
    desc: "Programs, labs, and student involvement at the Institut de recherches cliniques de Montréal.",
    icon: Building2,
    accentClass: "from-sky-400/25 via-emerald-300/10 to-transparent",
  },
  {
    href: "/resources/sri-studentship-award",
    title: "SRI Studentship Award",
    desc: "$1000 summer studentship to reduce financial burden and enable research experience.",
    icon: Award,
    accentClass: "from-amber-300/25 via-pink-400/10 to-transparent",
  },
  {
    href: "/resources/mentor-program",
    title: "SRI Mentor Program",
    desc: "One-semester, 1:1 mentorship with senior/graduate students across disciplines.",
    icon: Handshake,
    accentClass: "from-emerald-300/25 via-sky-400/10 to-transparent",
  },
  {
    href: "/resources/youtube-series",
    title: "YouTube Series",
    desc: "Emailing, funding, courses, international research — watch practical sessions.",
    icon: Youtube,
    accentClass: "from-fuchsia-400/25 via-sky-400/10 to-transparent",
  },
  {
    href: "/resources/student-handbook",
    title: "Student Handbook",
    desc: "Concise, pragmatic guide (EN/FR) for getting into research at McGill.",
    icon: BookOpen,
    accentClass: "from-indigo-400/25 via-emerald-300/10 to-transparent",
  },
]

export default function ResourcesPage() {
  const wheelItems = useMemo(
    () =>
      subpages.map((page) => ({
        href: page.href,
        title: page.title,
        description: page.desc,
        icon: page.icon,
        accentClass: page.accentClass,
      })),
    [],
  )

  return (
    <>
      <Section className="pt-20 lg:pt-28 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute bottom-0 right-10 h-96 w-96 rounded-full bg-emerald-300/10 blur-3xl" />
        </div>

        <div className="relative text-center max-w-3xl mx-auto">
          <p className="text-accent font-medium text-sm uppercase tracking-wider mb-4">Resources</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6">
            Get Started & Level Up
          </h1>
          <p className="text-neutral-200 text-lg">
            Funding, mentorship, guides, and opportunities — curated for McGill undergraduates getting into research.
          </p>
        </div>

        <ResourcesNav className="relative" />
      </Section>

      <Section className="pt-6">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-primary-900/25 px-4 py-2 text-sm text-white/80 glass">
              <Orbit className="h-4 w-4 text-accent" />
              Spin the wheel. Pick your next move.
            </div>
          </div>
          <ResourceWheel items={wheelItems} />
        </div>
      </Section>

      <Section className="pt-8">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
          <div className="surface-soft rounded-3xl p-7">
            <div className="flex items-start gap-3">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                <Sparkles className="h-5 w-5 text-accent" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-white">High-signal resources</h3>
                <p className="text-sm text-neutral-200 leading-relaxed">
                  No fluff—just the pathways students actually use to land labs, funding, and mentorship.
                </p>
              </div>
            </div>
          </div>
          <div className="surface-soft rounded-3xl p-7">
            <div className="flex items-start gap-3">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                <Award className="h-5 w-5 text-accent" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-white">Built for momentum</h3>
                <p className="text-sm text-neutral-200 leading-relaxed">
                  Use one resource today, then chain into the next. The goal is progress, not perfection.
                </p>
              </div>
            </div>
          </div>
          <div className="surface-soft rounded-3xl p-7">
            <div className="flex items-start gap-3">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                <BookOpen className="h-5 w-5 text-accent" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-white">Prefer a list?</h3>
                <p className="text-sm text-neutral-200 leading-relaxed">
                  Jump straight to any page:
                  {" "}
                  <span className="text-white/80">
                    {subpages.map((p, idx) => (
                      <span key={p.href}>
                        <Link href={p.href} className="underline hover:text-white">{p.title}</Link>
                        {idx < subpages.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </span>
                </p>
                <div className="pt-1">
                  <FancyButton asChild variant="secondary">
                    <Link href="/events/how-to-get-a-research-position">Start with HTGRP</Link>
                  </FancyButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
