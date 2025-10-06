"use client"

import type { Key, ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion"

interface AnimatedListProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => ReactNode
  getKey?: (item: T, index: number) => Key
  className?: string
}

export function AnimatedList<T>({ items, renderItem, getKey, className }: AnimatedListProps<T>) {
  return (
    <div className={className}>
      <AnimatePresence mode="popLayout">
        {items.map((item, index) => {
          const key = getKey ? getKey(item, index) : index
          return (
            <motion.div
              key={key}
              layout
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 18 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              {renderItem(item, index)}
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
