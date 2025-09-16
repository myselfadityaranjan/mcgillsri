"use client"

import type React from "react"

import { forwardRef } from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const fancyButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-white hover:bg-accent/90 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-accent/20",
        secondary:
          "border border-white/30 text-white bg-primary-700/80 hover:bg-primary-700 hover:scale-[1.02] active:scale-[0.98] backdrop-blur-sm",
        ghost: "text-white hover:bg-white/20 hover:text-white",
      },
      size: {
        sm: "h-9 px-4 py-2",
        md: "h-11 px-6 py-2.5",
        lg: "h-12 px-8 py-3 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
)

export interface FancyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof fancyButtonVariants> {
  asChild?: boolean
}

const FancyButton = forwardRef<HTMLButtonElement, FancyButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(fancyButtonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
FancyButton.displayName = "FancyButton"

export { FancyButton, fancyButtonVariants }
