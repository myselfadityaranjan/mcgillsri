"use client"

import type { ReactNode } from "react"
import { useCallback } from "react"
import { Filter, RotateCcw } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SearchFilterBarProps {
  query: string
  onQueryChange: (value: string) => void
  filters?: ReactNode
  actions?: ReactNode
  placeholder?: string
  onReset?: () => void
  className?: string
}

export function SearchFilterBar({
  query,
  onQueryChange,
  filters,
  actions,
  placeholder = "Search...",
  onReset,
  className,
}: SearchFilterBarProps) {
  const reset = useCallback(() => {
    onQueryChange("")
    onReset?.()
  }, [onQueryChange, onReset])

  return (
    <div
      className={cn(
        "network-card flex flex-col gap-4 rounded-3xl border border-white/10 p-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <div className="flex w-full flex-1 items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
          <Filter className="h-4 w-4 text-white/70" />
        </span>
        <Input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder={placeholder}
          className="h-12 flex-1 border-white/20 bg-white/10 text-white placeholder:text-white/50"
        />
        {onReset && (
          <Button
            type="button"
            variant="ghost"
            className="h-10 text-white/70 hover:text-white"
            onClick={reset}
          >
            <RotateCcw className="mr-2 h-4 w-4" /> Reset
          </Button>
        )}
      </div>
      {(filters || actions) && (
        <div className="flex w-full flex-wrap gap-2 sm:w-auto sm:justify-end">
          {filters}
          {actions}
        </div>
      )}
    </div>
  )
}
