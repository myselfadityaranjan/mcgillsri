import type { Metadata } from "next"
import type { ReactNode } from "react"

import { NetworkThemeProvider } from "@/components/network/ThemeProvider"

export const metadata: Metadata = {
  title: "SRI McGill Research Network",
  description:
    "Connect with students and professors across McGill for research collaborations, opportunities, and mentorship.",
}

export default function NetworkLayout({ children }: { children: ReactNode }) {
  return <NetworkThemeProvider>{children}</NetworkThemeProvider>
}
