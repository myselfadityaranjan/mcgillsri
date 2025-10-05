"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { UserPlus, Clock, Star, ArrowLeft, CheckCircle } from "lucide-react"
import { Section } from "@/components/Section"
import { FancyButton } from "@/components/FancyButton"
import NewsletterSignup from "@/components/NewsletterSignup"

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const benefits = [
  "Access to exclusive volunteer database",
  "Discounted event tickets ($4 vs $7 for FSSN)",
  "Priority registration for networking events",
  "Direct support from SRI community",
  "Eligibility for SRI awards and funding",
  "Access to member-only resources and workshops",
]

export default function MembershipPage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <Section className="pt-20 pb-16 lg:pt-32 lg:pb-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 text-accent text-sm font-medium mb-6">
            <Clock className="h-4 w-4" />
            Coming Soon
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 text-balance">
            Become a Member
          </h1>

          <p className="text-xl md:text-2xl text-neutral-200 leading-relaxed mb-8 text-pretty">
            Join the Student Research Initiative and unlock exclusive opportunities to advance your research career.
          </p>

          {/* Disabled Join Button */}
          <FancyButton size="lg" variant="secondary" disabled className="opacity-60 cursor-not-allowed">
            <UserPlus className="h-5 w-5" />
            Join Now (Coming Soon)
          </FancyButton>
        </motion.div>
      </Section>

      {/* Benefits Preview */}
      <Section className="bg-primary-900/30">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariants}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">Membership Benefits</h2>
            <p className="text-lg text-neutral-200">
              Everything you need to succeed in undergraduate research at McGill.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 p-4 rounded-xl glass border border-white/10"
              >
                <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-neutral-200">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* Coming Soon Details */}
      <Section>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariants}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="p-8 rounded-2xl glass border border-white/10">
            <div className="p-4 rounded-2xl bg-accent/10 border border-accent/20 w-fit mx-auto mb-6">
              <Star className="h-8 w-8 text-accent" />
            </div>

            <h3 className="text-2xl font-semibold text-white mb-4">Membership Program Launching Soon</h3>

            <p className="text-neutral-200 leading-relaxed mb-6">
              We're putting the finishing touches on our membership program to ensure we can provide the best possible
              experience for our members. Stay tuned for the official launch and be among the first to join our growing
              community of student researchers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <FancyButton asChild variant="primary">
                <Link href="/">
                  <ArrowLeft className="h-5 w-5" />
                  Back to Home
                </Link>
              </FancyButton>
              <FancyButton asChild variant="secondary">
                <Link href="/volunteer-database">Learn About Our Database</Link>
              </FancyButton>
            </div>
          </div>
        </motion.div>
      </Section>
    </div>
  )
  <NewsletterSignup />
}