"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Database, Lock, Users, Search, Filter, ArrowRight, Sparkles, Shield } from "lucide-react"
import { Section } from "@/components/Section"
import { FancyButton } from "@/components/FancyButton"
import { EmptyState } from "@/components/EmptyState"
import { MarkdownProse } from "@/components/MarkdownProse"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CONTENT } from "@/lib/constants"
import { fadeUp, staggerChildren } from "@/lib/motion"

export default function VolunteerDatabasePage() {
  const [showMembersOnlyModal, setShowMembersOnlyModal] = useState(false)

  return (
    <div className="relative">
      {/* Hero Section */}
      <Section className="pt-20 pb-16 lg:pt-32 lg:pb-24 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute -top-24 left-12 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
          <div className="absolute top-16 right-12 h-80 w-80 rounded-full bg-emerald-300/12 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
        </div>
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="relative text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 text-accent text-sm font-medium mb-6">
            <Database className="h-4 w-4" />
            Members Only
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 text-balance">
            SRI Volunteer Database
          </h1>

          <p className="text-xl md:text-2xl text-neutral-200 leading-relaxed text-pretty">
            Access curated research volunteer opportunities exclusively available to SRI members.
          </p>
        </motion.div>
      </Section>

      {/* Main Content */}
      <Section className="relative overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-4xl mx-auto"
        >
          <div className="p-8 rounded-3xl glass border border-white/10 mb-12 relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/12 via-transparent to-emerald-300/12" />
            <MarkdownProse content={CONTENT.VOLUNTEER_DATABASE} />
          </div>
        </motion.div>
      </Section>

      {/* CTA Buttons */}
      <Section className="bg-primary-900/30 relative overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren()}
          className="max-w-2xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div variants={fadeUp}>
              <FancyButton asChild size="lg" variant="primary" className="w-full h-auto p-6">
                <Link href="/membership" className="flex flex-col items-center gap-3">
                  <Users className="h-8 w-8" />
                  <div className="text-center">
                    <div className="font-semibold text-lg">Become a Member</div>
                    <div className="text-sm opacity-90">Join SRI to access opportunities</div>
                  </div>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </FancyButton>
            </motion.div>

            <motion.div variants={fadeUp}>
              <Dialog open={showMembersOnlyModal} onOpenChange={setShowMembersOnlyModal}>
                <DialogTrigger asChild>
                  <FancyButton size="lg" variant="secondary" className="w-full h-auto p-6">
                    <div className="flex flex-col items-center gap-3">
                      <Lock className="h-8 w-8" />
                      <div className="text-center">
                        <div className="font-semibold text-lg">Access the Volunteer Database</div>
                        <div className="text-sm opacity-90">View available positions</div>
                      </div>
                      <Database className="h-5 w-5" />
                    </div>
                  </FancyButton>
                </DialogTrigger>
                <DialogContent className="glass border border-white/10 text-white">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                      <Lock className="h-5 w-5 text-accent" />
                      Members Only Access
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p className="text-neutral-200 leading-relaxed">
                      The SRI Volunteer Database is exclusively available to our members. Join SRI to access curated
                      research opportunities and connect with labs actively seeking undergraduate volunteers.
                    </p>
                    <div className="flex gap-3">
                      <FancyButton asChild variant="primary" className="flex-1">
                        <Link href="/membership">
                          Become a Member
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </FancyButton>
                      <FancyButton variant="ghost" onClick={() => setShowMembersOnlyModal(false)}>
                        Close
                      </FancyButton>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          </div>
        </motion.div>
      </Section>

      {/* Preview Section */}
      <Section className="relative overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-8 text-center">
            What You'll Find in Our Database
          </h2>

          <div className="space-y-6">
            {/* Mock Database Interface */}
            <div className="p-6 rounded-3xl glass border border-white/10 opacity-60 pointer-events-none relative overflow-hidden">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/12 via-transparent to-emerald-300/12" />
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Research Opportunities</h3>
                <div className="flex gap-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 border border-white/20">
                    <Search className="h-4 w-4" />
                    <span className="text-sm">Search positions</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 border border-white/20">
                    <Filter className="h-4 w-4" />
                    <span className="text-sm">Filter by field</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { title: "Neuroscience Lab Assistant", dept: "Psychology", type: "Volunteer", duration: "Fall 2024" },
                  { title: "Data Analysis Support", dept: "Computer Science", type: "Volunteer", duration: "Ongoing" },
                  { title: "Environmental Research", dept: "Biology", type: "Volunteer", duration: "Summer 2024" },
                ].map((position, index) => (
                  <div key={index} className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-white mb-1">{position.title}</h4>
                        <p className="text-neutral-300 text-sm">
                          {position.dept} • {position.type} • {position.duration}
                        </p>
                      </div>
                      <div className="px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-medium">
                        Available
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-primary-900/25 p-6 glass text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-accent">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-semibold text-white">Unlock Full Access</h3>
              <p className="mt-2 text-neutral-200">
                Members see detailed position descriptions, application steps, and direct contact information.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                <FancyButton asChild variant="primary">
                  <Link href="/membership">
                    Join SRI Today
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </FancyButton>
                <FancyButton asChild variant="secondary" onClick={() => setShowMembersOnlyModal(true)}>
                  <Link href="#">
                    See membership benefits
                    <Sparkles className="h-4 w-4" />
                  </Link>
                </FancyButton>
              </div>
            </div>
          </div>
        </motion.div>
      </Section>
    </div>
  )
}
