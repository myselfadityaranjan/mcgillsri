"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"

export type ResourceWheelItem = {
  href: string
  title: string
  description: string
  icon: LucideIcon
  accentClass: string
}

export function ResourceWheel({ items, className }: { items: ResourceWheelItem[]; className?: string }) {
  const [active, setActive] = useState(0)
  const safeActive = Math.min(Math.max(active, 0), items.length - 1)

  const orbit = useMemo(() => {
    const count = items.length
    const step = 360 / count
    return items.map((item, index) => {
      const angle = index * step
      const offset = index - safeActive
      return { item, index, angle, offset }
    })
  }, [items, safeActive])

  const rotation = useMemo(() => {
    const count = items.length
    if (count === 0) return 0
    return -(safeActive * (360 / count))
  }, [items.length, safeActive])

  const activeItem = items[safeActive]

  return (
    <div className={cn("mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[520px,1fr]", className)}>
      <div className="relative mx-auto w-full max-w-[520px]">
        <div className="relative aspect-square">
          <div className="absolute inset-0 rounded-full border border-white/10 bg-primary-900/25 glass" />
          <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(59,167,255,0.18),transparent_62%)]" />
          <div className="pointer-events-none absolute inset-0 rounded-full bg-[conic-gradient(from_90deg,rgba(59,167,255,0.25),rgba(52,211,153,0.18),rgba(59,167,255,0.08),transparent_70%)] opacity-70 blur-[0.5px]" />

          <motion.div
            animate={{ rotate: rotation }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {orbit.map(({ item, index, angle }) => {
              const isActive = index === safeActive
              const Icon = item.icon
              return (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => setActive(index)}
                  className={cn(
                    "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                    "focus-ring rounded-3xl",
                  )}
                  style={{
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translate(0, -205px) rotate(${-angle}deg)`,
                  }}
                  aria-label={item.title}
                >
                  <motion.div
                    initial={false}
                    animate={isActive ? { scale: 1.07, y: -2 } : { scale: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className={cn(
                      "group relative w-[200px] overflow-hidden rounded-3xl border bg-primary-900/30 p-4 text-left backdrop-blur",
                      isActive
                        ? "border-white/20 shadow-[0_0_0_1px_rgba(59,167,255,0.25),0_28px_70px_-45px_rgba(59,167,255,0.7)]"
                        : "border-white/10 hover:border-white/15 hover:shadow-[0_20px_55px_-44px_rgba(59,167,255,0.45)]",
                    )}
                  >
                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <div className={cn("absolute -inset-14 bg-gradient-to-br blur-2xl", item.accentClass)} />
                    </div>
                    <div className="relative flex items-start gap-3">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                        <Icon className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{item.title}</p>
                        <p className="mt-1 line-clamp-2 text-xs text-white/70">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                </button>
              )
            })}
          </motion.div>

          <div className="absolute left-1/2 top-1/2 grid h-36 w-36 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-primary-900/35 text-center backdrop-blur">
            <div className="space-y-1 px-3">
              <p className="text-xs uppercase tracking-[0.2em] text-white/60">Explore</p>
              <p className="text-lg font-semibold text-white">Resources</p>
              <p className="text-xs text-white/60">Tap a node</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-white/70">
          <button
            type="button"
            onClick={() => setActive((prev) => (prev - 1 + items.length) % items.length)}
            className="rounded-full border border-white/10 bg-primary-900/30 px-4 py-2 hover:bg-primary-900/40 focus-ring"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={() => setActive((prev) => (prev + 1) % items.length)}
            className="rounded-full border border-white/10 bg-primary-900/30 px-4 py-2 hover:bg-primary-900/40 focus-ring"
          >
            Next
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-primary-900/25 p-8 glass">
          <div className="pointer-events-none absolute inset-0 opacity-80">
            <div className={cn("absolute -inset-20 bg-gradient-to-br blur-3xl", activeItem?.accentClass ?? "from-accent/20")} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>
          <div className="relative space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Selected</p>
            <h2 className="text-3xl font-semibold text-white">{activeItem?.title}</h2>
            <p className="text-base leading-relaxed text-white/75">{activeItem?.description}</p>
            {activeItem && (
              <div className="pt-2">
                <Link
                  href={activeItem.href}
                  className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white hover:bg-white/10 focus-ring"
                >
                  Open page
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:hidden">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-2xl border border-white/10 bg-primary-900/25 p-4 text-white/80 hover:bg-primary-900/35 focus-ring"
            >
              <p className="font-semibold text-white">{item.title}</p>
              <p className="mt-1 text-sm text-white/70">{item.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

