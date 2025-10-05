"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { getBreadcrumbs } from "@/lib/breadcrumbs"

export function BreadcrumbTrail() {
  const pathname = usePathname()
  const crumbs = getBreadcrumbs(pathname)

  if (!crumbs.length) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
      className="sticky top-[4.75rem] z-40 px-4 pt-4 lg:px-10"
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-primary-900/65 px-4 py-2 shadow-[0_20px_45px_-28px_rgba(59,167,255,0.5)] backdrop-blur">
        <Breadcrumb>
          <BreadcrumbList className="flex-wrap text-xs text-neutral-200/90 sm:text-sm">
            {crumbs.map((crumb, index) => {
              const isLast = index === crumbs.length - 1
              if (isLast) {
                return (
                  <BreadcrumbItem key={crumb.href}>
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  </BreadcrumbItem>
                )
              }

              return (
                <BreadcrumbItem key={crumb.href}>
                  <BreadcrumbLink asChild>
                    <Link href={crumb.href}>{crumb.label}</Link>
                  </BreadcrumbLink>
                  <BreadcrumbSeparator />
                </BreadcrumbItem>
              )
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </motion.div>
  )
}
