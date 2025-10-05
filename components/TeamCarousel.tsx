// components/TeamCarousel.tsx
"use client"

import { useRef, useEffect } from "react"
import { TeamCard } from "./TeamCard"
import type { TeamMember } from "@/lib/team"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function TeamCarousel({
  members,
  className,
}: {
  members: TeamMember[]
  className?: string
}) {
  const ref = useRef<HTMLDivElement | null>(null)

  // Make vertical scroll wheel scroll horizontally
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        el.scrollLeft += e.deltaY
        e.preventDefault()
      }
    }
    el.addEventListener("wheel", onWheel, { passive: false })
    return () => el.removeEventListener("wheel", onWheel as any)
  }, [])

  const scrollBy = (px: number) => {
    ref.current?.scrollBy({ left: px, behavior: "smooth" })
  }

  return (
    <div className={cn("relative overflow-hidden surface-soft p-6", className)}>
      {/* edge gradients */}
      <div className="pointer-events-none absolute inset-y-6 left-0 w-12 bg-gradient-to-r from-primary-900/80 to-transparent" />
      <div className="pointer-events-none absolute inset-y-6 right-0 w-12 bg-gradient-to-l from-primary-900/80 to-transparent" />

      <div
        ref={ref}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-1 py-2 scrollbar-thin"
        style={{ scrollBehavior: "smooth" }}
      >
        {members.map((m, i) => (
          <TeamCard key={`${m.name}-${i}`} member={m} />
        ))}
      </div>

      {/* controls */}
      <div className="absolute left-2 top-1/2 -translate-y-1/2">
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full border-white/15 bg-primary-900/60 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-primary-900/80 hover:shadow-[0_16px_32px_-20px_rgba(59,167,255,0.45)]"
          onClick={() => scrollBy(-360)}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </div>
      <div className="absolute right-2 top-1/2 -translate-y-1/2">
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full border-white/15 bg-primary-900/60 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-primary-900/80 hover:shadow-[0_16px_32px_-20px_rgba(59,167,255,0.45)]"
          onClick={() => scrollBy(360)}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
