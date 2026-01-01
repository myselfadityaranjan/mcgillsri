"use client"

import type React from "react"

import { forwardRef } from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const fancyButtonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] focus-ring disabled:pointer-events-none disabled:opacity-60 after:content-['⟡'] after:ml-1.5 after:text-[0.95em] after:text-accent after:opacity-80 after:drop-shadow-[0_0_12px_rgba(59,167,255,0.35)] after:transition-transform after:duration-300 hover:after:translate-x-0.5",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-accent to-accent/80 text-white shadow-[0_15px_35px_-18px_rgba(59,167,255,0.65)] hover:-translate-y-0.5 hover:shadow-[0_20px_45px_-20px_rgba(59,167,255,0.75)] active:translate-y-0 backdrop-blur",
        secondary:
          "border border-white/20 text-white bg-primary-700/70 hover:bg-primary-700/80 hover:-translate-y-0.5 active:translate-y-0 shadow-[0_12px_28px_-20px_rgba(8,19,39,0.9)] backdrop-blur",
        ghost: "text-white/80 hover:text-white hover:bg-white/10 hover:-translate-y-0.5 active:translate-y-0",
      },
      size: {
        sm: "h-9 px-4 py-2",
        md: "h-11 px-6 py-2.5",
        lg: "h-12 px-8 py-3 text-base",
        icon: "h-10 w-10 after:content-none after:ml-0",
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
