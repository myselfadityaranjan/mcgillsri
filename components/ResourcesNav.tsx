// components/ResourcesNav.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const LINKS = [
  { href: "/resources/opportunities-at-ircm", label: "Opportunities at IRCM" },
  { href: "/resources/sri-studentship-award", label: "SRI Studentship Award" },
  { href: "/resources/mentor-program", label: "SRI Mentor Program" },
  { href: "/resources/youtube-series", label: "YouTube Series" },
  { href: "/resources/student-handbook", label: "Student Handbook" },
]

export default function ResourcesNav({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "mt-6 rounded-2xl border border-white/10 bg-primary-900/40 p-2",
        "overflow-x-auto no-scrollbar",
        className
      )}
    >
      <div className="flex gap-2 min-w-max">
        {LINKS.map((link) => {
          const active = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 rounded-full text-sm transition-colors border",
                "whitespace-nowrap",
                active
                  ? "bg-primary-700/60 text-white border-white/15"
                  : "bg-primary-700/30 text-neutral-200 hover:bg-primary-700/40 border-white/10"
              )}
            >
              {link.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
