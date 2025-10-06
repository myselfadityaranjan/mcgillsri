import type { HTMLAttributes, ElementType, ReactNode } from "react"

import { cn } from "@/lib/utils"

interface NetworkCardProps extends HTMLAttributes<HTMLDivElement> {
  as?: ElementType
  children: ReactNode
}

export function NetworkCard({ as: Component = "div", className, children, ...props }: NetworkCardProps) {
  return (
    <Component
      className={cn("network-card rounded-3xl p-6", className)}
      {...props}
    >
      {children}
    </Component>
  )
}
