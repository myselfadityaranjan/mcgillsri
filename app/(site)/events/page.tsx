// app/(site)/events/page.tsx
"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Section } from "@/components/Section"
import { FancyButton } from "@/components/FancyButton"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Calendar, FileText, MessageSquare } from "lucide-react"

const fade = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0 },
}

export default function EventsLandingPage() {
  return (
    <>
      <Section className="pt-20 lg:pt-28">
        <motion.div
          variants={fade}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.3 }}
          className="text-center max-w-3xl mx-auto"
        >
          <p className="text-accent font-medium text-sm uppercase tracking-wider mb-4">Programming</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6">Events</h1>
          <p className="text-neutral-200 text-lg">
            SRI hosts pragmatic, student-run programming designed to get you into research: seminars,
            CV drop-ins, mock interviews, and more.
          </p>
        </motion.div>
      </Section>

      <Section className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="bg-primary-700/40 border-white/10 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calendar className="h-5 w-5 text-accent" />
                How to Get a Research Position
              </CardTitle>
            </CardHeader>
            <CardContent className="text-neutral-200">
              Annual seminar covering prof outreach, funding, research courses, and study-abroad tips.
              <div className="mt-4">
                <FancyButton asChild><Link href="/events/how-to-get-a-research-position">View details</Link></FancyButton>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary-700/40 border-white/10 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-5 w-5 text-accent" />
                CV Editing Drop-in
              </CardTitle>
            </CardHeader>
            <CardContent className="text-neutral-200">
              Exec-run, free, pragmatic reviews for CVs, emails, statements, and apps.
              <div className="mt-4">
                <FancyButton asChild><Link href="/events/cv-editing-drop-in">View details</Link></FancyButton>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary-700/40 border-white/10 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-accent" />
                SRI Mock Interviews
              </CardTitle>
            </CardHeader>
            <CardContent className="text-neutral-200">
              10–15 min Zoom practice across six categories. Perfect FSSN prep.
              <div className="mt-4">
                <FancyButton asChild><Link href="/events/mock-interviews">View details</Link></FancyButton>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  )
}
