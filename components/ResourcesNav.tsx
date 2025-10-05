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
        "mt-6 rounded-2xl surface-soft p-2",
        "overflow-x-auto no-scrollbar transition-all duration-500 ease-out",
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
                "px-4 py-2 rounded-full text-sm border transition-all duration-300 ease-out",
                "whitespace-nowrap",
                active
                  ? "bg-accent/30 text-white border-accent/40 shadow-[0_16px_36px_-24px_rgba(59,167,255,0.5)]"
                  : "bg-primary-700/30 text-neutral-200/90 hover:-translate-y-0.5 hover:bg-primary-700/40 hover:text-white border-white/12"
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
