"use client"

import { useMemo, useRef, useState } from "react"
import { motion, useMotionValueEvent, useScroll } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import { Target, Users, GraduationCap } from "lucide-react"

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
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end 0.15"],
  })

  const [activeStep, setActiveStep] = useState(0)

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next =
      value < 0.18 ? 0 :
      value < 0.52 ? 1 :
      value < 0.86 ? 2 :
      3
    setActiveStep(next)
  })

  const layout = useMemo(() => {
    return steps.map((step, index) => ({
      step,
      align: index % 2 === 0 ? "left" : "right",
    }))
  }, [])

  return (
    <div ref={sectionRef} className="relative mx-auto max-w-6xl">
      <div className="relative h-[170vh]">
        <div className="sticky top-24 flex h-[calc(100vh-6rem)] items-center">
          {/* Desktop timeline */}
          <div className="relative hidden w-full md:block">
            <div className="relative mx-auto h-[72vh] min-h-[560px] w-full">
              <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/10" />
              <motion.div
                className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 origin-top bg-gradient-to-b from-accent via-emerald-300 to-transparent shadow-[0_0_18px_rgba(59,167,255,0.35)]"
                style={{ scaleY: scrollYProgress }}
              />

              <div className="grid h-full grid-rows-3 gap-10">
                {layout.map(({ step, align }) => (
                  <TimelineRow key={step.title} step={step} align={align} isActive={activeStep >= step.number} />
                ))}
              </div>
            </div>
          </div>

          {/* Mobile timeline */}
          <div className="relative w-full md:hidden">
            <div className="relative mx-auto w-full max-w-xl space-y-6">
              <div className="pointer-events-none absolute left-6 top-0 h-full w-px bg-white/10" />
              <motion.div
                className="pointer-events-none absolute left-6 top-0 h-full w-px origin-top bg-gradient-to-b from-accent via-emerald-300 to-transparent shadow-[0_0_18px_rgba(59,167,255,0.35)]"
                style={{ scaleY: scrollYProgress }}
              />
              {steps.map((step) => (
                <MobileRow key={step.title} step={step} isActive={activeStep >= step.number} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TimelineRow({
  step,
  align,
  isActive,
}: {
  step: TimelineStep
  align: "left" | "right"
  isActive: boolean
}) {
  const Icon = step.icon
  const card = (
    <motion.article
      initial={false}
      animate={
        isActive
          ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
          : { opacity: 0, y: 18, scale: 0.985, filter: "blur(6px)" }
      }
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={[
        "group relative w-full max-w-xl rounded-3xl border border-white/10 bg-primary-900/20 p-7 glass",
        "shadow-[0_18px_60px_-42px_rgba(0,0,0,0.75)]",
        "pointer-events-auto",
      ].join(" ")}
      aria-hidden={!isActive}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="flex items-start gap-4">
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
    </motion.article>
  )

  return (
    <div className="relative grid grid-cols-[1fr,220px,1fr] items-center">
      <motion.div
        className={[
          "pointer-events-none absolute top-1/2 h-px w-[calc(50%-180px)] -translate-y-1/2",
          align === "left" ? "right-1/2 origin-right" : "left-1/2 origin-left",
          "bg-gradient-to-r from-accent/75 via-emerald-300/35 to-transparent shadow-[0_0_18px_rgba(59,167,255,0.25)]",
        ].join(" ")}
        animate={isActive ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className={align === "left" ? "pr-10" : ""}>{align === "left" ? card : null}</div>

      <div className="relative">
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={isActive ? { y: -6, scale: 1.08 } : { y: 0, scale: 1 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative">
            <div
              className={[
                "absolute -inset-3 rounded-full blur-xl transition-opacity duration-500",
                isActive ? "opacity-100 bg-[radial-gradient(circle,rgba(59,167,255,0.55),transparent_60%)]" : "opacity-0",
              ].join(" ")}
            />
            <div
              className={[
                "relative h-12 w-12 rounded-full border border-white/15 bg-primary-900/35 backdrop-blur",
                "grid place-items-center text-sm font-semibold",
                isActive ? "text-white shadow-[0_0_0_1px_rgba(59,167,255,0.25)]" : "text-white/70",
              ].join(" ")}
            >
              {step.number}
            </div>
          </div>
        </motion.div>
      </div>

      <div className={align === "right" ? "pl-10" : ""}>{align === "right" ? card : null}</div>
    </div>
  )
}

function MobileRow({ step, isActive }: { step: TimelineStep; isActive: boolean }) {
  const Icon = step.icon
  return (
    <motion.div
      initial={false}
      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-14"
      aria-hidden={!isActive}
    >
      <motion.div
        className="absolute left-6 top-6 -translate-x-1/2"
        animate={isActive ? { y: -4, scale: 1.06 } : { y: 0, scale: 1 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative">
          <div
            className={[
              "absolute -inset-3 rounded-full blur-xl transition-opacity duration-500",
              isActive ? "opacity-100 bg-[radial-gradient(circle,rgba(59,167,255,0.55),transparent_60%)]" : "opacity-0",
            ].join(" ")}
          />
          <div className="relative grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-primary-900/35 backdrop-blur text-sm font-semibold text-white">
            {step.number}
          </div>
        </div>
      </motion.div>

      <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-primary-900/20 p-6 glass">
        <div className="flex items-start gap-4">
          <div className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
            <Icon className="h-6 w-6 text-accent" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white">{step.title}</h3>
            <p className="text-sm leading-relaxed text-neutral-200">{step.description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
