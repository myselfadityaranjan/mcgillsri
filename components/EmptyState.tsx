import type React from "react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  className?: string
  children?: React.ReactNode
}

export function EmptyState({ icon: Icon, title, description, className, children }: EmptyStateProps) {
  return (
    <div className={cn("surface-soft flex flex-col items-center justify-center gap-5 py-12 px-6 text-center", className)}>
      <div className="rounded-2xl border border-accent/20 bg-accent/10 p-4 transition-all duration-300 ease-out">
        <Icon className="h-8 w-8 text-accent" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-neutral-300 max-w-md leading-relaxed mb-6">{description}</p>
      {children}
    </div>
  )
}
