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
        "hidden md:flex flex-col border-r border-white/10 bg-primary-900/35 backdrop-blur",
        "h-screen sticky top-0 p-3 transition-[width] duration-500 ease-out",
        collapsed ? "w-20" : "w-72"
      )}
      aria-label="Primary"
    >
      <div className="flex items-center justify-between px-2 py-1">
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

      <nav className="mt-2 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon ? iconMap[item.icon as keyof typeof iconMap] : undefined
          const active = isActive(item.href)
          const isGroup = (NAV_GROUPS && NAV_GROUPS[item.title]?.length) ? true : false
          const children = isGroup ? NAV_GROUPS[item.title] : []

          return (
            <div key={item.href}>
              <div className="flex items-center">
                <Link
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-all duration-300 ease-out w-full",
                    active
                      ? "bg-primary-700/55 text-white shadow-[0_15px_38px_-24px_rgba(59,167,255,0.4)]"
                      : "text-neutral-200/90 hover:-translate-y-0.5 hover:bg-primary-700/35 hover:text-white"
                  )}
                >
                  {Icon && (
                    <Icon className="h-5 w-5 text-accent transition-transform duration-300 ease-out group-hover:scale-110 shrink-0" />
                  )}
                  {!collapsed && <span className="truncate transition-colors duration-300 ease-out">{item.title}</span>}
                </Link>

                {/* group toggle chevron (only if group and not collapsed) */}
                {isGroup && !collapsed && (
                  <button
                    onClick={() => toggleGroup(item.title)}
                    aria-label={groupState[item.title] ? "Collapse group" : "Expand group"}
                    className={cn(
                      "ml-1 p-1 rounded-md text-neutral-300 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:text-white hover:bg-white/10 focus-ring"
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
                <div className="mt-1 pl-9 space-y-1">
                  {children!.map((c) => {
                    const childActive = pathname === c.href
                    return (
                      <Link
                        key={c.href}
                        href={c.href}
                        className={cn(
                          "block rounded-lg px-3 py-1.5 text-sm border transition-all duration-300 ease-out",
                          childActive
                            ? "bg-primary-700/40 border-white/18 text-white shadow-[0_12px_32px_-24px_rgba(59,167,255,0.4)]"
                            : "bg-primary-700/20 border-white/10 text-neutral-200/90 hover:-translate-y-0.5 hover:bg-primary-700/30 hover:text-white"
                        )}
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
