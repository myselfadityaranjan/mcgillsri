"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sidebar } from "./Sidebar"
import { SITE_CONFIG } from "@/lib/constants"

export function Topbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-white/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left: Logo + Brand */}
        <div className="flex items-center gap-3">
          {/* Mobile menu trigger */}
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="focus-ring">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-80">
              <Sidebar mobile onNavigate={() => setSidebarOpen(false)} />
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-3 focus-ring rounded-lg p-1">
            <Image src="/sri-logo.svg" alt="SRI Logo" width={32} height={32} className="w-8 h-8" />
            <span className="font-semibold text-lg text-white">{SITE_CONFIG.shortName}</span>
          </Link>
        </div>

        {/* Right: CTAs */}
        <div className="flex items-center gap-3">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="hidden sm:inline-flex border-white/20 text-neutral-200 hover:bg-white/10 focus-ring bg-transparent"
          >
            <Link href="/volunteer-database">Volunteer DB</Link>
          </Button>
          <Button asChild size="sm" className="bg-accent hover:bg-accent/90 text-white focus-ring">
            <Link href="/membership">Become a Member</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
