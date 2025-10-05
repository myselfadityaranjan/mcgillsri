// app/(site)/resources/page.tsx
"use client"

import Link from "next/link"
import { useState } from "react"
import { Section } from "@/components/Section"
import ResourcesNav from "@/components/ResourcesNav"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Building2, Award, Handshake, Youtube, BookOpen } from "lucide-react"
import { FancyButton } from "@/components/FancyButton"

type TabKey = "getting-started" | "guides" | "funding" | "faqs"

const subpages = [
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
  const [tab, setTab] = useState<TabKey>("getting-started")

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
        {/* Pills sub-nav to the five new subpages */}
        <ResourcesNav />
      </Section>

      {/* Grid linking to the 5 subpages */}
      <Section className="pt-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subpages.map(({ href, title, desc, icon: Icon }) => (
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

      {/* Legacy-style section you liked before: tabs + cards */}
      <Section className="pt-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-primary-900/40 p-2">
            <TabPill active={tab==="getting-started"} onClick={() => setTab("getting-started")}>Getting Started</TabPill>
            <TabPill active={tab==="guides"} onClick={() => setTab("guides")}>Guides & Templates</TabPill>
            <TabPill active={tab==="funding"} onClick={() => setTab("funding")}>Funding & Awards</TabPill>
            <TabPill active={tab==="faqs"} onClick={() => setTab("faqs")}>FAQs</TabPill>
          </div>

          {/* Panels */}
          {tab === "getting-started" && (
            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <InfoCard title="How to begin" body="Understand timelines, set goals, and map your first steps into research.">
                <FancyButton asChild><Link href="/events/how-to-get-a-research-position">Attend the HTGRP seminar</Link></FancyButton>
              </InfoCard>
              <InfoCard title="Find labs" body="Scan department pages, professor directories, and lab sites for alignment." />
              <InfoCard title="Cold-email basics" body="Short, specific subject lines; 3–5 lines max; attach CV; propose next step." />
            </div>
          )}

          {tab === "guides" && (
            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <InfoCard title="CV Template" body="Clean, 1–2 pages, highlight technical/analytical skills and outcomes.">
                <FancyButton asChild variant="secondary"><Link href="#">Download template</Link></FancyButton>
              </InfoCard>
              <InfoCard title="Email Templates" body="Professor outreach, follow-ups, and thank-you notes that get replies.">
                <FancyButton asChild variant="secondary"><Link href="#">Open templates</Link></FancyButton>
              </InfoCard>
              <InfoCard title="Poster & Abstract" body="Structure, visuals, and clarity tips for conferences and research days." />
            </div>
          )}

          {tab === "funding" && (
            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <InfoCard title="SRI Award ($1000)" body="Summer studentship to reduce financial burden and enable research.">
                <FancyButton asChild><Link href="/resources/sri-studentship-award">Apply / details</Link></FancyButton>
              </InfoCard>
              <InfoCard title="McGill awards" body="Departmental funds and scholarships relevant to undergraduate research." />
              <InfoCard title="External funds" body="NSERC/FRQ/charities — eligibility, timelines, and how to pitch." />
            </div>
          )}

          {tab === "faqs" && (
            <div className="mt-6 grid sm:grid-cols-2 gap-6">
              <InfoCard title="Do I need prior experience?" body="No. Motivation + fit + willingness to learn often matter more than grades." />
              <InfoCard title="When should I reach out?" body="4–8 weeks before you want to start. Earlier for summer roles with funding." />
              <InfoCard title="Paid vs volunteer?" body="Volunteering is a fast entry point. Use it to build to paid roles later." />
              <InfoCard title="What if I get no replies?" body="Refine your email, contact more labs (10–20+), follow up once after 5–7 days." />
            </div>
          )}
        </div>
      </Section>
    </>
  )
}

function TabPill({
  active,
  onClick,
  children,
}: {
  active?: boolean
  onClick?: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "px-4 py-2 rounded-full text-sm border transition-all duration-300 ease-out whitespace-nowrap",
        active
          ? "bg-accent/30 text-white border-accent/40 shadow-[0_16px_36px_-24px_rgba(59,167,255,0.5)]"
          : "bg-primary-700/30 text-neutral-200/90 hover:-translate-y-0.5 hover:bg-primary-700/40 hover:text-white border-white/12",
      ].join(" ")}
    >
      {children}
    </button>
  )
}

function InfoCard({
  title,
  body,
  children,
}: {
  title: string
  body: string
  children?: React.ReactNode
}) {
  return (
    <Card className="surface-soft rounded-2xl h-full transition-all duration-[420ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:-translate-y-1 hover:shadow-[0_28px_68px_-34px_rgba(59,167,255,0.45)]">
      <CardHeader>
        <CardTitle className="text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-neutral-200 space-y-4">
        <p>{body}</p>
        {children}
      </CardContent>
    </Card>
  )
}
