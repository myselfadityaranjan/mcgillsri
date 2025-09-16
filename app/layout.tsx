import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Student Research Initiative - McGill University",
  description:
    "For Students, By Students. Creating research opportunities and connecting undergraduate students with labs at McGill University.",
  keywords: ["research", "McGill", "undergraduate", "students", "opportunities", "networking", "FSSN"],
  authors: [{ name: "Student Research Initiative" }],
  creator: "Student Research Initiative",
  publisher: "McGill University",
  robots: "index, follow",
  openGraph: {
    title: "Student Research Initiative - McGill University",
    description:
      "For Students, By Students. Creating research opportunities and connecting undergraduate students with labs.",
    type: "website",
    url: "https://sri-mcgill.vercel.app",
    siteName: "Student Research Initiative",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Student Research Initiative - McGill University",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Student Research Initiative - McGill University",
    description:
      "For Students, By Students. Creating research opportunities and connecting undergraduate students with labs.",
    images: ["/og.jpg"],
    creator: "@SRI_McGill",
  },
  alternates: {
    canonical: "https://sri-mcgill.vercel.app",
  },
  verification: {
    // Add verification codes when available
    // google: 'verification-code',
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <head>
        <link rel="icon" href="/sri-logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/sri-logo.svg" />
        <meta name="theme-color" content="#0B1F3B" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="font-sans text-neutral-100 overflow-x-hidden">{children}</body>
    </html>
  )
}
