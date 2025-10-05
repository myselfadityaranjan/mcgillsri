// app/(site)/events/page.tsx
"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Section } from "@/components/Section"
import { FancyButton } from "@/components/FancyButton"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Calendar, FileText, MessageSquare } from "lucide-react"
import { fadeUp, staggerChildren } from "@/lib/motion"

export default function EventsLandingPage() {
  return (
    <>
      <Section className="pt-20 lg:pt-28">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mx-auto max-w-3xl text-center">
          <p className="text-accent font-medium text-sm uppercase tracking-wider mb-4">Programming</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6">Events</h1>
          <p className="text-neutral-200 text-lg">
            SRI hosts pragmatic, student-run programming designed to get you into research: seminars,
            CV drop-ins, mock interviews, and more.
          </p>
        </motion.div>
      </Section>

      <Section className="pt-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren()}
          className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3"
        >
          <motion.div variants={fadeUp}>
            <Card className="surface-soft h-full">
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
          </motion.div>

          <motion.div variants={fadeUp}>
            <Card className="surface-soft h-full">
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
          </motion.div>

          <motion.div variants={fadeUp}>
            <Card className="surface-soft h-full">
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
          </motion.div>
        </motion.div>
      </Section>
    </>
  )
}
