"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import { GraduationCap, Target, Users } from "lucide-react"

type TimelineStep = {
  number: 1 | 2 | 3
  title: string
  description: string
  icon: LucideIcon
}

const steps: TimelineStep[] = [
  {
    number: 1,
    title: "Create Opportunities",
    description:
      "We work tirelessly to establish new research positions and funding opportunities for undergraduate students across all disciplines.",
    icon: Target,
  },
  {
    number: 2,
    title: "Connect Students & Labs",
    description:
      "Our networking events and database bridge the gap between motivated students and research labs seeking talented undergraduates.",
    icon: Users,
  },
  {
    number: 3,
    title: "Teach Research Skills",
    description:
      "We provide resources, workshops, and guidance to help students develop the skills needed to excel in research environments.",
    icon: GraduationCap,
  },
]

export function ImpactTimeline() {
  return (
    <div className="relative mx-auto max-w-6xl">
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-accent/60 via-white/15 to-transparent shadow-[0_0_22px_rgba(59,167,255,0.35)]" />
      <div className="flex flex-col gap-16 md:gap-24">
        {steps.map((step, index) => {
          const align = index % 2 === 0 ? "left" : "right"
          return <TimelineRow key={step.title} step={step} align={align} />
        })}
      </div>
    </div>
  )
}

function TimelineRow({ step, align }: { step: TimelineStep; align: "left" | "right" }) {
  const Icon = step.icon
  const card = (
    <div className="group relative max-w-xl rounded-3xl border border-white/10 bg-primary-900/25 p-7 glass shadow-[0_18px_60px_-42px_rgba(0,0,0,0.75)] transition-transform duration-400 ease-out hover:-translate-y-1 hover:border-white/20">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -inset-16 bg-gradient-to-br from-accent/20 via-emerald-300/10 to-transparent blur-2xl" />
      </div>
      <div className="relative flex items-start gap-4">
        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent/20 via-emerald-300/10 to-transparent blur-2xl opacity-70" />
          <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
            <Icon className="h-6 w-6 text-accent" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs font-semibold text-white/80">
              {step.number}
            </span>
            <h3 className="text-xl font-semibold text-white">{step.title}</h3>
          </div>
          <p className="text-sm leading-relaxed text-neutral-200">{step.description}</p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="relative flex items-center justify-center">
      {align === "left" && (
        <div className="flex flex-1 justify-end pr-6">
          <Connector />
          {card}
        </div>
      )}

      <div className="relative flex h-full flex-col items-center px-4">
        <div className="relative z-10 grid place-items-center rounded-full border border-white/15 bg-primary-900/35 p-3 shadow-[0_0_0_1px_rgba(59,167,255,0.25)]">
          <span className="text-sm font-semibold text-white/80">{step.number}</span>
        </div>
      </div>

      {align === "right" && (
        <div className="flex flex-1 justify-start pl-6">
          <Connector />
          {card}
        </div>
      )}
    </div>
  )
}

function Connector() {
  return <div className="mr-4 h-px w-16 self-center rounded-full bg-gradient-to-r from-accent/70 via-white/30 to-transparent shadow-[0_0_12px_rgba(59,167,255,0.4)]" />
}
