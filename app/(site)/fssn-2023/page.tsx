"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ExternalLink, Calendar, Users, Clock } from "lucide-react"
import { Section } from "@/components/Section"
import { FancyButton } from "@/components/FancyButton"
import { MarkdownProse } from "@/components/MarkdownProse"
import { CONTENT } from "@/lib/constants"
import { fadeUp, staggerChildren } from "@/lib/motion"

export default function FSSN2023Page() {
  return (
    <div className="relative">
      {/* Hero Banner */}
      <Section className="pt-20 pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-br from-accent/10 to-transparent">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 text-accent text-sm font-medium mb-6">
            <Calendar className="h-4 w-4" />
            Networking Event
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 text-balance">
            Faculty Student Speed Networking
          </h1>

          <p className="text-xl md:text-2xl text-neutral-200 leading-relaxed mb-8 text-pretty">
            Connect directly with professors and secure research opportunities through structured 5-minute interviews.
          </p>

          <FancyButton asChild size="lg" variant="primary">
            <Link href="#register">
              View Event Form
              <ExternalLink className="h-5 w-5" />
            </Link>
          </FancyButton>
        </motion.div>
      </Section>

      {/* Event Highlights */}
      <Section className="bg-primary-900/30">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren(0.1, 0.05)}
          className="grid gap-8 md:grid-cols-3 mb-12"
        >
          <motion.div variants={fadeUp} className="text-center p-6 rounded-2xl surface-soft">
            <div className="p-3 rounded-xl bg-accent/10 border border-accent/20 w-fit mx-auto mb-4">
              <Clock className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">5-Minute Interviews</h3>
            <p className="text-neutral-300">Quick, focused conversations with professors of your choice</p>
          </motion.div>

          <motion.div variants={fadeUp} className="text-center p-6 rounded-2xl surface-soft">
            <div className="p-3 rounded-xl bg-accent/10 border border-accent/20 w-fit mx-auto mb-4">
              <Users className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Direct Connections</h3>
            <p className="text-neutral-300">Professors actively seeking undergraduate researchers</p>
          </motion.div>

          <motion.div variants={fadeUp} className="text-center p-6 rounded-2xl surface-soft">
            <div className="p-3 rounded-xl bg-accent/10 border border-accent/20 w-fit mx-auto mb-4">
              <Calendar className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Immediate Opportunities</h3>
            <p className="text-neutral-300">Potential lab invitations during or after interviews</p>
          </motion.div>
        </motion.div>
      </Section>

      {/* Main Content */}
      <Section>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-4xl mx-auto"
        >
          <div className="p-8 rounded-2xl surface-soft">
            <MarkdownProse content={CONTENT.FSSN_2023} />
          </div>
        </motion.div>
      </Section>

      {/* Bottom CTA */}
      <Section className="bg-primary-900/30 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">Ready to Connect with Professors?</h2>
          <p className="text-lg text-neutral-200 mb-8 max-w-2xl mx-auto">
            Don't miss this opportunity to advance your research career and make meaningful connections with faculty
            members.
          </p>
          <FancyButton asChild size="lg" variant="primary" id="register">
            <Link href="#register">
              Open Registration Form
              <ExternalLink className="h-5 w-5" />
            </Link>
          </FancyButton>
        </motion.div>
      </Section>
    </div>
  )
}
