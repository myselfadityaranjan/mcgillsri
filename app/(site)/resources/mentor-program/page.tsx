"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Handshake, Orbit, Sparkles, Users } from "lucide-react"
import { Section } from "@/components/Section"
import { FancyButton } from "@/components/FancyButton"
import ResourcesNav from "@/components/ResourcesNav"
import { Card, CardContent } from "@/components/ui/card"
import { fadeUp, staggerChildren } from "@/lib/motion"

const mentorLinks = {
  mentor:
    "https://docs.google.com/forms/d/e/1FAIpQLSeSoevw_xXWRTv31zlrRrVwXSiSEqJBwzfY5gwE-AY5H5B5_A/viewform?c=0&w=1",
  mentee:
    "https://docs.google.com/forms/d/e/1FAIpQLSelr9nB7wQdXJnN4OJQxC8wo20spjvCSaC8be4limWwGYDk1Q/viewform?c=0&w=1",
}

export default function MentorProgramPage() {
  return (
    <>
      <Section className="pt-20 lg:pt-28 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-emerald-300/12 blur-3xl" />
          <div className="absolute top-16 right-10 h-72 w-72 rounded-full bg-sky-400/12 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        </div>

        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="relative mx-auto max-w-6xl">
          <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">Mentorship</p>
          <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4">SRI Mentor Program</h1>
          <ResourcesNav className="mt-4" />
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr,420px] lg:items-center">
            <div className="space-y-4">
              <p className="text-neutral-200 text-lg">
                The mentor program connects McGill undergrads with senior students or graduate mentors to understand what
                research is really like and how to break in.
              </p>
              <div className="flex flex-wrap gap-3">
                <FancyButton asChild>
                  <Link href={mentorLinks.mentor} target="_blank" rel="noopener noreferrer">
                    Become a Mentor
                  </Link>
                </FancyButton>
                <FancyButton asChild variant="secondary">
                  <Link href={mentorLinks.mentee} target="_blank" rel="noopener noreferrer">
                    Become a Mentee
                  </Link>
                </FancyButton>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-primary-900/25 p-8 glass">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-300/10 via-transparent to-sky-400/12" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
                  <Orbit className="h-4 w-4 text-accent" />
                  Matchmaking signal
                </div>

                <div className="relative mx-auto mt-8 aspect-square max-w-[320px]">
                  <motion.div
                    className="absolute inset-0 rounded-full border border-white/10 bg-white/5"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute inset-10 rounded-full border border-white/10 bg-white/5"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-primary-900/35 text-center backdrop-blur">
                    <div>
                      <Handshake className="mx-auto h-6 w-6 text-accent" />
                      <p className="mt-1 text-xs font-semibold text-white">1:1</p>
                      <p className="text-[11px] text-white/60">Mentorship</p>
                    </div>
                  </div>

                  {[
                    { top: "12%", left: "55%", label: "Mentor" },
                    { top: "62%", left: "82%", label: "Mentee" },
                    { top: "80%", left: "26%", label: "Mentor" },
                    { top: "34%", left: "16%", label: "Mentee" },
                  ].map((dot) => (
                    <motion.div
                      key={`${dot.top}-${dot.left}-${dot.label}`}
                      className="absolute"
                      style={{ top: dot.top, left: dot.left }}
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 2.6, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="relative">
                        <div className="absolute -inset-3 rounded-full bg-[radial-gradient(circle,rgba(59,167,255,0.45),transparent_60%)] blur-lg opacity-70" />
                        <div className="relative rounded-full border border-white/15 bg-primary-900/45 px-3 py-1 text-[11px] text-white/80 backdrop-blur">
                          {dot.label}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-start gap-3">
                      <Users className="mt-0.5 h-5 w-5 text-accent" />
                      <div>
                        <p className="font-semibold text-white">Support network</p>
                        <p className="text-sm text-white/70">Get clarity, context, and strategy.</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-start gap-3">
                      <Sparkles className="mt-0.5 h-5 w-5 text-accent" />
                      <div>
                        <p className="font-semibold text-white">Momentum</p>
                        <p className="text-sm text-white/70">Turn interest into action.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Section>

      <Section className="pt-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren()}
          className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3"
        >
          {[
            {
              title: "All about learning",
              body:
                "The mentor program is intended to connect McGill undergards with seniors or graduate students at McGill to get a better understanding of what research is about.",
            },
            {
              title: "1 on 1 mentorship",
              body:
                "Students will be matched for one semester with a successful and experienced mentor who can provide advice on finding a research position, share experiences, and discuss careers in research.",
            },
            {
              title: "Commitment matters",
              body:
                "Interactions are flexible—email or casual meetings—but depend on commitment from both sides. The program is not a research placement; it’s a learning opportunity.",
            },
          ].map(({ title, body }) => (
            <motion.div key={title} variants={fadeUp}>
              <Card className="surface-soft h-full">
                <CardContent className="space-y-4 p-6">
                  <h3 className="text-white font-semibold">{title}</h3>
                  <p className="text-neutral-200">{body}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

      </Section>
    </>
  )
}
