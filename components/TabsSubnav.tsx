"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Tab {
  id: string
  label: string
  content: React.ReactNode
}

interface TabsSubnavProps {
  tabs: Tab[]
  defaultTab?: string
  className?: string
}

export function TabsSubnav({ tabs, defaultTab, className }: TabsSubnavProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content

  return (
    <div className={cn("w-full", className)}>
      {/* Tab Navigation */}
      <div className="mb-8 border-b border-white/10">
        <nav className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative rounded-t-lg px-2 py-4 text-sm font-medium whitespace-nowrap transition-all duration-300 ease-out focus-ring",
                activeTab === tab.id
                  ? "text-accent"
                  : "text-neutral-300 hover:-translate-y-0.5 hover:text-white",
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent via-accent/70 to-accent"
                  initial={false}
                  transition={{ type: "spring", stiffness: 320, damping: 32 }}
                />
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <motion.div key={activeTab} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        {activeTabContent}
      </motion.div>
    </div>
  )
}
