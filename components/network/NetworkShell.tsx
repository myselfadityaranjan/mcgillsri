import type { ReactNode } from "react"
import { motion } from "framer-motion"

import { NetworkTopbar } from "@/components/network/NetworkTopbar"

interface NetworkShellProps {
  title?: ReactNode
  description?: ReactNode
  hero?: ReactNode
  actions?: ReactNode
  children: ReactNode
}

export function NetworkShell({ title, description, hero, actions, children }: NetworkShellProps) {
  return (
    <div className="min-h-screen text-white">
      <NetworkTopbar />
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-10">
        {(title || description || actions) && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            className="network-card flex flex-col gap-6 rounded-3xl p-8"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-2">
                {title && <h2 className="text-3xl font-semibold sm:text-4xl">{title}</h2>}
                {description && <p className="max-w-2xl text-base text-white/70">{description}</p>}
              </div>
              {actions && <div className="flex items-center gap-3">{actions}</div>}
            </div>
            {hero && <div>{hero}</div>}
          </motion.section>
        )}
        {children}
      </main>
    </div>
  )
}
