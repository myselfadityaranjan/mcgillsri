"use client"

import { MotionConfig } from "framer-motion"
import { type ReactNode } from "react"

import "@/app/(network)/network/globals-network.css"

const transition = { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const }

export function NetworkThemeProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig transition={transition} reducedMotion="user">
      <div className="network-gradient min-h-screen text-white">
        {children}
      </div>
    </MotionConfig>
  )
}
