import type React from "react"
import { cn } from "@/lib/utils"

interface SectionProps {
  children: React.ReactNode
  className?: string
  kicker?: string
  title?: string
  subtitle?: string
  centered?: boolean
}

export function Section({ children, className, kicker, title, subtitle, centered = false }: SectionProps) {
  return (
    <section className={cn("py-16 lg:py-24", className)}>
      <div className="container mx-auto px-4">
        {(kicker || title || subtitle) && (
          <div className={cn("mb-12 lg:mb-16", centered && "text-center")}>
            {kicker && <p className="text-accent font-medium text-sm uppercase tracking-wider mb-4">{kicker}</p>}
            {title && <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 text-balance">{title}</h2>}
            {subtitle && (
              <p className="text-lg md:text-xl text-neutral-200 leading-relaxed max-w-3xl text-pretty">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
