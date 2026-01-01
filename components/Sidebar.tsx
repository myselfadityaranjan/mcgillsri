// components/Sidebar.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import { NAV_ITEMS } from "@/lib/constants"
import { NAV_GROUPS } from "@/lib/constants"
import {
  House,
  UsersRound,
  BookOpen,
  Database,
  UserPlus,
  CalendarClock,
  ChevronDown,
} from "lucide-react"

const iconMap = {
  House,
  UsersRound,
  BookOpen,
  Database,
  UserPlus,
  CalendarClock,
} as const

function useLocalStorageBoolean(key: string, initial = false) {
  const [value, setValue] = useState<boolean>(initial)
  useEffect(() => {
    const raw = typeof window !== "undefined" ? localStorage.getItem(key) : null
    if (raw === "true" || raw === "false") setValue(raw === "true")
  }, [key])
  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem(key, String(value))
  }, [key, value])
  return [value, setValue] as const
}

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useLocalStorageBoolean("sidebar:collapsed", false)

  // per-group collapsed states (only for items that are groups)
  const groupKeys = useMemo(() => Object.keys(NAV_GROUPS ?? {}), [])
  const [groupState, setGroupState] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const next: Record<string, boolean> = {}
    groupKeys.forEach((g) => {
      const k = `sidebar:group:${g}`
      const raw = typeof window !== "undefined" ? localStorage.getItem(k) : null
      next[g] = raw === "true" ? true : false // default expanded = false? tweak below
    })
    setGroupState(next)
  }, [groupKeys])

  const toggleGroup = (title: string) => {
    setGroupState((prev) => {
      const v = !prev[title]
      if (typeof window !== "undefined") {
        localStorage.setItem(`sidebar:group:${title}`, String(v))
      }
      return { ...prev, [title]: v }
    })
  }

  // helper: active check
  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname?.startsWith(href))

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col border-r border-white/10 bg-primary-900/40 backdrop-blur",
        "h-screen sticky top-0 p-4 transition-[width] duration-500 ease-out",
        "shadow-[0_28px_80px_-60px_rgba(59,167,255,0.55)]",
        collapsed ? "w-20" : "w-72"
      )}
      aria-label="Primary"
    >
      <div className="relative mb-2 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-emerald-300/10 blur-xl opacity-60" />
        <div className="relative flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/sri-logo.svg" alt="SRI Logo" className="h-7 w-7" />
          {!collapsed && <span className="text-white font-medium">SRI</span>}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-lg px-2 py-1 text-neutral-300 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:text-white hover:bg-white/10 focus-ring"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? "»" : "«"}
        </button>
        </div>
      </div>

      <nav className="mt-3 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon ? iconMap[item.icon as keyof typeof iconMap] : undefined
          const active = isActive(item.href)
          const isGroup = (NAV_GROUPS && NAV_GROUPS[item.title]?.length) ? true : false
          const children = isGroup ? NAV_GROUPS[item.title] : []

          return (
            <div key={item.href}>
              <div className="relative flex items-center">
                <Link
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-all duration-300 ease-out w-full",
                    "backdrop-blur border border-transparent",
                    active
                      ? "bg-primary-700/55 text-white shadow-[0_18px_44px_-28px_rgba(59,167,255,0.5)] border-white/15"
                      : "text-neutral-200/90 hover:-translate-y-1 hover:bg-primary-700/35 hover:text-white hover:border-white/10"
                  )}
                >
                  {Icon && (
                    <Icon className="h-5 w-5 text-accent transition-transform duration-300 ease-out group-hover:scale-125 shrink-0" />
                  )}
                  {!collapsed && (
                    <span className="truncate transition-colors duration-300 ease-out text-sm font-medium">
                      {item.title}
                    </span>
                  )}
                </Link>

                {/* group toggle chevron (only if group and not collapsed) */}
                {isGroup && !collapsed && (
                  <button
                    onClick={() => toggleGroup(item.title)}
                    aria-label={groupState[item.title] ? "Collapse group" : "Expand group"}
                    className={cn(
                      "ml-1 p-1.5 rounded-lg border border-white/10 bg-primary-900/25 text-neutral-200/90 backdrop-blur",
                      "transition-all duration-300 ease-out hover:-translate-y-0.5 hover:text-white hover:border-white/20 hover:bg-primary-900/35",
                      "shadow-[0_10px_26px_-20px_rgba(59,167,255,0.35)] hover:shadow-[0_18px_42px_-28px_rgba(59,167,255,0.6)]",
                      "focus-ring"
                    )}
                  >
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        groupState[item.title] ? "rotate-180" : "rotate-0"
                      )}
                    />
                  </button>
                )}
              </div>

              {/* children */}
              {isGroup && !collapsed && groupState[item.title] && (
                <div className="relative mt-2 pl-9 space-y-1">
                  <div className="pointer-events-none absolute left-6 top-1 bottom-1 w-px bg-gradient-to-b from-accent/40 via-white/10 to-transparent" />
                  {children!.map((c, idx) => {
                    const childActive = pathname === c.href
                    return (
                      <Link
                        key={c.href}
                        href={c.href}
                        className={cn(
                          "group relative block rounded-xl px-3 py-2 text-sm border backdrop-blur",
                          "transition-all duration-300 ease-out",
                          "before:absolute before:left-[-22px] before:top-1/2 before:-translate-y-1/2 before:h-2.5 before:w-2.5 before:rounded-full before:border before:border-white/15 before:bg-primary-900/50 before:shadow-[0_0_0_1px_rgba(255,255,255,0.06)]",
                          childActive
                            ? "bg-primary-700/45 border-white/20 text-white shadow-[0_0_0_1px_rgba(59,167,255,0.25),0_14px_34px_-26px_rgba(59,167,255,0.55)] before:bg-accent/40 before:border-accent/40 before:shadow-[0_0_16px_rgba(59,167,255,0.55)]"
                            : "bg-primary-700/20 border-white/10 text-neutral-200/90 hover:-translate-y-1 hover:bg-primary-700/30 hover:text-white hover:border-white/18 hover:shadow-[0_14px_34px_-28px_rgba(59,167,255,0.45)] group-hover:before:border-white/20 group-hover:before:bg-accent/20 group-hover:before:shadow-[0_0_14px_rgba(59,167,255,0.4)]"
                        )}
                        style={{ transform: `translateY(${idx * 0}px)` }}
                      >
                        {c.title}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar
