import type React from "react"
import { Topbar } from "@/components/Topbar"
import { Sidebar } from "@/components/Sidebar"
import { Footer } from "@/components/Footer"
import { ChatWidget } from "@/components/ChatWidget"
import { Toaster } from "@/components/ui/toaster"

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-base to-primary-700">
      <Topbar />
      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block">
          <div className="fixed top-16 left-0 h-[calc(100vh-4rem)]">
            <Sidebar />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-72 min-h-[calc(100vh-4rem)]">{children}</main>
      </div>
      <Footer />

      <ChatWidget />
      <Toaster />
    </div>
  )
}
