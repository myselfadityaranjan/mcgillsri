"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, CheckCircle, Shield, Sparkles, UserPlus } from "lucide-react"
import { Section } from "@/components/Section"
import { FancyButton } from "@/components/FancyButton"
import NewsletterSignup from "@/components/NewsletterSignup"
import { fadeUp, staggerChildren } from "@/lib/motion"

export default function MembershipPage() {
  return (
    <div className="relative">
      <Section className="pt-20 pb-16 lg:pt-32 lg:pb-24 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
          <div className="absolute top-12 right-12 h-72 w-72 rounded-full bg-emerald-300/12 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        </div>

        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="relative text-center max-w-5xl mx-auto">
          <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">Membership</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 text-balance">Become a Member</h1>
          <p className="text-xl md:text-2xl text-neutral-200 leading-relaxed mb-8 text-pretty">
            Pick the plan that fits—full membership with database access, or a free community account to stay connected.
          </p>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-primary-900/30 p-8 glass shadow-[0_28px_80px_-48px_rgba(59,167,255,0.65)]">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/15 via-transparent to-emerald-300/12" />
              <div className="relative flex items-start justify-between gap-3">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
                    <Shield className="h-4 w-4 text-accent" />
                    Full Membership
                  </div>
                  <h3 className="text-2xl font-semibold text-white">Join Now</h3>
                  <p className="text-neutral-200">$5 (PayPal fee applies)</p>
                  <ul className="mt-4 space-y-2 text-sm text-white/80">
                    {[
                      "Access to the SRI Volunteer Database (new positions added!)",
                      "Reduced fee to in-person events (post-COVID)",
                      "Join the online forum & community",
                      "Connect with other students & researchers",
                      "Pair with an SRI Mentor",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 text-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70">
                  $5
                </div>
              </div>
              <div className="mt-6">
                <FancyButton asChild size="lg">
                  <Link
                    href="https://www.powr.io/checkout_screen?unique_label=0bad2ecb_1614741263"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Join Now
                  </Link>
                </FancyButton>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-primary-900/25 p-8 glass shadow-[0_28px_80px_-48px_rgba(59,167,255,0.55)]">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-accent/10" />
              <div className="relative space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
                  <Sparkles className="h-4 w-4 text-accent" />
                  Community Account
                </div>
                <h3 className="text-2xl font-semibold text-white">Free</h3>
                <p className="text-neutral-200">
                  Stay in the loop, join the forum, and get matched into the community at no cost.
                </p>
                <div className="mt-4">
                  <FancyButton asChild size="lg" variant="secondary">
                    <Link href="/membership/community">Sign Up</Link>
                  </FancyButton>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Section>

      <NewsletterSignup />
    </div>
  )
}
