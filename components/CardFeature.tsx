import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface CardFeatureProps {
  icon: LucideIcon
  title: string
  description: string
  className?: string
}

export function CardFeature({ icon: Icon, title, description, className }: CardFeatureProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl surface-soft p-6 transition-all duration-[420ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:-translate-y-1",
        "before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-300 before:bg-gradient-to-br before:from-accent/20 before:to-transparent",
        "group-hover:before:opacity-100",
        className,
      )}
    >
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-xl bg-accent/10 border border-accent/20 transition-all duration-300 ease-out group-hover:bg-accent/20 group-hover:-translate-y-0.5 group-hover:shadow-[0_12px_24px_-18px_rgba(59,167,255,0.45)]">
          <Icon className="h-6 w-6 text-accent transition-transform duration-300 ease-out group-hover:scale-105" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white mb-2 transition-colors duration-300 ease-out group-hover:text-accent">
            {title}
          </h3>
          <p className="text-neutral-300 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  )
}
