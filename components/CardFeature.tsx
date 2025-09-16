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
        "group p-6 rounded-2xl glass border border-white/10 hover:border-accent/30 transition-all duration-300 hover:scale-[1.02]",
        className,
      )}
    >
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-xl bg-accent/10 border border-accent/20 group-hover:bg-accent/20 transition-colors">
          <Icon className="h-6 w-6 text-accent" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-accent transition-colors">{title}</h3>
          <p className="text-neutral-300 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  )
}
