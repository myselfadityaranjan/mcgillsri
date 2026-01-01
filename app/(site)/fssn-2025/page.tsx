"use client"

import type React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ExternalLink, Calendar, Users, Clock, Sparkles, GraduationCap, BadgeCheck } from "lucide-react"

import { Section } from "@/components/Section"
import { FancyButton } from "@/components/FancyButton"
import { fadeUp, staggerChildren } from "@/lib/motion"

const registrationUrl =
  "https://linktr.ee/srimcgill?utm_source=ig&utm_medium=social&utm_content=link_in_bio"

const professors = [
  "Dr. Tina Montreuil",
  "Dr. Mallar Chakravarty",
  "Dr. Yuanchao Ma",
  "Dr. James Crippen",
  "Dr. Jun Ding",
  "Dr. Mark Andrews",
  "Dr. Corina Nagy (Khoury)",
  "Dr. Corina Nagy (Kruck)",
]

export default function FSSN2025Page() {
  return (
    <div className="relative">
      <Section className="pt-20 pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-br from-accent/10 to-transparent">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 text-accent text-sm font-medium mb-6">
            <Calendar className="h-4 w-4" />
            Networking Event • 2025
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 text-balance">
            Faculty Student Speed Networking (FSSN)
          </h1>

          <p className="text-xl md:text-2xl text-neutral-200 leading-relaxed mb-8 text-pretty">
            Connect directly with professors and secure research opportunities through structured 5-minute interviews.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <FancyButton asChild size="lg" variant="primary">
              <Link href={registrationUrl} target="_blank" rel="noopener noreferrer">
                View Event Form
                <ExternalLink className="h-5 w-5" />
              </Link>
            </FancyButton>
          </div>
        </motion.div>
      </Section>

      <Section className="bg-primary-900/30">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren(0.1, 0.05)}
          className="grid gap-8 md:grid-cols-3"
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

      <Section kicker="Gallery" title="Pictures from FSSN 2025" centered>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren(0.12, 0.06)}
          className="mx-auto max-w-6xl space-y-8"
        >
          <motion.div variants={fadeUp} className="grid gap-6 lg:grid-cols-12">
            <FssnPhoto
              className="lg:col-span-7"
              src="/FSSN_2025-1.jpg"
              alt="FSSN 2025 networking floor"
              accent="from-accent/30"
            />
            <FssnPhoto
              className="lg:col-span-5"
              src="/FSSN_2025-2.jpg"
              alt="FSSN 2025 participants group photo"
              accent="from-primary-600/35"
            />
          </motion.div>

          <motion.div variants={fadeUp} className="text-center text-sm text-neutral-300">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-primary-900/30 px-4 py-2 glass">
              <Sparkles className="h-4 w-4 text-accent" />
              Pictures from FSSN 2025
            </span>
          </motion.div>

          <motion.section variants={fadeUp} className="mx-auto max-w-4xl">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-primary-900/25 p-8 glass">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary-700/10" />
              <div className="relative space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
                  <BadgeCheck className="h-4 w-4 text-accent" />
                  With gratitude to our faculty
                </div>
                <h3 className="text-2xl md:text-3xl font-semibold text-white">
                  Thank you to the professors who joined FSSN 2025
                </h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {professors.map((name) => (
                    <div
                      key={name}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-neutral-100/90"
                    >
                      {name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
        </motion.div>
      </Section>

      <Section>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-4xl mx-auto">
          <FssnGlowCard />
        </motion.div>
      </Section>

      <Section className="bg-primary-900/30 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">Ready to Connect with Professors?</h2>
          <p className="text-lg text-neutral-200 mb-8 max-w-2xl mx-auto">
            Don&apos;t miss this opportunity to advance your research career and make meaningful connections with faculty
            members.
          </p>
          <FancyButton asChild size="lg" variant="primary">
            <Link href={registrationUrl} target="_blank" rel="noopener noreferrer">
              Open Registration Form
              <ExternalLink className="h-5 w-5" />
            </Link>
          </FancyButton>
        </motion.div>
      </Section>
    </div>
  )
}

function FssnPhoto({
  src,
  alt,
  className,
  accent,
}: {
  src: string
  alt: string
  className?: string
  accent: string
}) {
  return (
    <div
      className={[
        "group relative overflow-hidden rounded-3xl border border-white/10 bg-primary-900/20 glass",
        "shadow-[0_18px_60px_-40px_rgba(0,0,0,0.7)]",
        "transition-all duration-500 ease-out hover:-translate-y-1 hover:border-white/20",
        "hover:shadow-[0_0_0_1px_rgba(59,167,255,0.28),0_30px_90px_-50px_rgba(59,167,255,0.6)]",
        className ?? "",
      ].join(" ")}
    >
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 900px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          priority={false}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className={`absolute -inset-16 bg-gradient-to-br ${accent} via-transparent to-transparent blur-2xl`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
        <div className="absolute inset-0 ring-1 ring-white/10" />
      </div>
    </div>
  )
}

function FssnGlowCard() {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-primary-900/25 p-8 glass transition-all duration-500 ease-out hover:-translate-y-1 hover:border-white/20">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -inset-20 bg-gradient-to-br from-accent/25 via-purple-500/10 to-transparent blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>

      <div className="relative space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
            <Sparkles className="h-4 w-4 text-accent" />
            Exceeding Expectations
          </div>
          <h3 className="text-3xl md:text-4xl font-semibold text-white">
            Fast connections. Real opportunities.
          </h3>
          <p className="max-w-2xl text-neutral-200 leading-relaxed">
            A high-signal event designed to get you face time with professors, sharpen your pitch, and leave with next
            steps.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <InfoTile
            icon={Clock}
            title="1 on 1 interview"
            body="Attendees will conduct 5-minute interviews with professors of their choice. If interested, professors may ask you to join their lab during the interview or arrange for another interview!"
          />
          <InfoTile
            icon={GraduationCap}
            title="Undergraduates wanted"
            body="All of the professors at the event are interested in undergraduate students like you! This is a great opportunity to secure a research position for the summer or gain valuable interview experience."
          />
          <InfoTile
            icon={Users}
            title="What to bring"
            body={
              <ul className="mt-2 space-y-2 text-sm text-neutral-200">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>CV/Resume (as many copies as you need)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>Entrance fee ($4 for members and $7 for non-members) * free for virtual events during the pandemic.</span>
                </li>
              </ul>
            }
          />
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors duration-500 group-hover:bg-white/[0.07]">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
              <ExternalLink className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white">More information</h4>
              <p className="text-sm text-neutral-200">
                Event details and the list of professors attending will be posted as a Facebook event closer to the
                date. All proceeds go towards hosting more events and the SRI award.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoTile({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof Clock
  title: string
  body: React.ReactNode
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-500 ease-out group-hover:bg-white/[0.07]">
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
        <Icon className="h-5 w-5 text-accent" />
      </div>
      <h4 className="text-lg font-semibold text-white">{title}</h4>
      <div className="mt-2 text-sm text-neutral-200 leading-relaxed">{body}</div>
    </div>
  )
}
