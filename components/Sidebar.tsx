"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Mouse as House, UsersRound, BookOpen, Database, UserPlus, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { NAV_ITEMS } from "@/lib/constants"

const iconMap = {
  House,
  UsersRound,
  BookOpen,
  Database,
  UserPlus,
}

interface SidebarProps {
  mobile?: boolean
  onNavigate?: () => void
}

export function Sidebar({ mobile = false, onNavigate }: SidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  // Load collapsed state from localStorage on mount
  useEffect(() => {
    if (!mobile) {
      const saved = localStorage.getItem("sidebar-collapsed")
      if (saved) {
        setCollapsed(JSON.parse(saved))
      }
    }
  }, [mobile])

  // Save collapsed state to localStorage
  const toggleCollapsed = () => {
    if (!mobile) {
      const newState = !collapsed
      setCollapsed(newState)
      localStorage.setItem("sidebar-collapsed", JSON.stringify(newState))
    }
  }

  const handleNavClick = () => {
    if (onNavigate) {
      onNavigate()
    }
  }

  return (
    <nav
      className={cn(
        "h-full flex flex-col transition-all duration-300 ease-in-out",
        mobile
          ? "w-full bg-primary-900 border-r border-white/10"
          : collapsed
            ? "w-20 glass border-r border-white/10"
            : "w-72 glass border-r border-white/10",
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        {!mobile && (
          <Button variant="ghost" size="icon" onClick={toggleCollapsed} className="ml-auto flex focus-ring">
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            <span className="sr-only">{collapsed ? "Expand sidebar" : "Collapse sidebar"}</span>
          </Button>
        )}
        {mobile && <h2 className="text-lg font-semibold text-white">Navigation</h2>}
      </div>

      {/* Navigation Items */}
      <div className="flex-1 p-4 space-y-2">
        {NAV_ITEMS.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap]
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 focus-ring group",
                "hover:bg-white/10 hover:scale-[1.02]",
                isActive && "bg-accent/20 border-l-2 border-accent shadow-lg shadow-accent/20",
                collapsed && !mobile && "justify-center px-2",
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 transition-colors",
                  isActive ? "text-accent" : "text-neutral-300 group-hover:text-white",
                )}
              />
              {(!collapsed || mobile) && (
                <span
                  className={cn(
                    "font-medium transition-colors text-sm",
                    isActive ? "text-white" : "text-neutral-300 group-hover:text-white",
                  )}
                >
                  {item.title}
                </span>
              )}
              {isActive && (!collapsed || mobile) && (
                <div className="ml-auto w-2 h-2 bg-accent rounded-full animate-pulse" />
              )}
            </Link>
          )
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <div className={cn("text-xs text-neutral-400 text-center", collapsed && !mobile && "hidden")}>
          <p>Student Research Initiative</p>
          <p>McGill University</p>
        </div>
      </div>
    </nav>
  )
}
