"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Target, Users, GraduationCap, Calendar, ArrowRight } from "lucide-react"
import { Section } from "@/components/Section"
import { CardFeature } from "@/components/CardFeature"
import { FancyButton } from "@/components/FancyButton"
import { EmptyState } from "@/components/EmptyState"
import { CONTENT } from "@/lib/constants"

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <Section className="pt-20 pb-16 lg:pt-32 lg:pb-24 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl" />
        </div>

        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div variants={fadeUpVariants} className="mb-6">
                <p className="text-accent font-medium text-sm uppercase tracking-wider mb-4">McGill University</p>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-white mb-6 text-balance leading-tight">
                  Student Research Initiative
                </h1>
                <p className="text-xl md:text-2xl text-neutral-200 leading-relaxed text-pretty">
                  Connecting undergraduate students with research opportunities and empowering the next generation of
                  researchers.
                </p>
              </motion.div>

              <motion.div variants={fadeUpVariants} className="flex flex-col sm:flex-row gap-4">
                <FancyButton asChild size="lg" variant="primary">
                  <Link href="/membership">
                    Become a Member
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </FancyButton>
                <FancyButton asChild size="lg" variant="secondary">
                  <Link href="/volunteer-database">Explore Volunteer Database</Link>
                </FancyButton>
              </motion.div>
            </div>

            <motion.div variants={fadeUpVariants} className="relative">
              <div className="relative p-8 rounded-3xl glass border border-white/10">
                <Image
                  src="/logo.svg"
                  alt="SRI Logo"
                  width={200}
                  height={200}
                  className="w-full h-auto max-w-sm mx-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent rounded-3xl" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Section>

      {/* What We Do Section */}
      <Section kicker="Our Mission" title="What We Do" className="bg-primary-900/30">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            className="text-center mb-8"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-pink-300 bg-clip-text hover:from-pink-300 hover:via-purple-300 hover:to-pink-200 transition-all duration-300 cursor-default neon-glow">
              {CONTENT.TAGLINE}
            </h3>
          </motion.div>

          <div className="p-8 rounded-2xl glass border border-white/10">
            <p className="text-lg md:text-xl text-neutral-200 leading-relaxed text-pretty">{CONTENT.WHAT_WE_DO}</p>
          </div>
        </motion.div>
      </Section>

      {/* Pillars Section */}
      <Section kicker="Our Approach" title="How We Make a Difference" centered>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8"
        >
          <motion.div variants={fadeUpVariants}>
            <CardFeature
              icon={Target}
              title="Create Opportunities"
              description="We work tirelessly to establish new research positions and funding opportunities for undergraduate students across all disciplines."
            />
          </motion.div>
          <motion.div variants={fadeUpVariants}>
            <CardFeature
              icon={Users}
              title="Connect Students & Labs"
              description="Our networking events and database bridge the gap between motivated students and research labs seeking talented undergraduates."
            />
          </motion.div>
          <motion.div variants={fadeUpVariants}>
            <CardFeature
              icon={GraduationCap}
              title="Teach Research Skills"
              description="We provide resources, workshops, and guidance to help students develop the skills needed to excel in research environments."
            />
          </motion.div>
        </motion.div>
      </Section>

      {/* Upcoming Events Section */}
      <Section kicker="What's Next" title="Upcoming Events" className="bg-primary-900/30" centered>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariants}>
          <EmptyState
            icon={Calendar}
            title="Events Coming Soon"
            description="We're planning exciting networking opportunities and workshops. Stay tuned for announcements about our next Faculty Student Speed Networking event and research skills workshops."
          >
            <FancyButton asChild variant="secondary">
              <Link href="/fssn-2023">Learn About FSSN 2023</Link>
            </FancyButton>
          </EmptyState>
        </motion.div>
      </Section>
    </div>
  )
}
