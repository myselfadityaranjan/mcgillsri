"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Lock, Sparkles, User } from "lucide-react"

import { Section } from "@/components/Section"
import { FancyButton } from "@/components/FancyButton"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { fadeUp, staggerChildren } from "@/lib/motion"

export default function CommunitySignupPage() {
  return (
    <>
      <Section className="pt-20 lg:pt-28 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
          <div className="absolute top-12 right-12 h-72 w-72 rounded-full bg-emerald-300/12 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        </div>

        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="relative mx-auto max-w-3xl">
          <div className="flex items-center gap-2 text-sm text-white/80">
            <Lock className="h-4 w-4 text-accent" />
            Community Account • Free
          </div>
          <h1 className="mt-2 text-4xl md:text-5xl font-semibold text-white">Join the Community</h1>
          <p className="mt-3 text-neutral-200">
            Create your free account to stay connected, join discussions, and get notified about opportunities.
          </p>
        </motion.div>
      </Section>

      <Section className="pt-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren(0.1, 0.1)}
          className="mx-auto max-w-3xl rounded-3xl border border-white/12 bg-primary-900/30 p-8 glass shadow-[0_28px_80px_-48px_rgba(59,167,255,0.6)]"
        >
          <motion.form variants={fadeUp} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="first">First name</Label>
                <Input id="first" name="first" placeholder="Jane" className="bg-white/10 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last">Last name</Label>
                <Input id="last" name="last" placeholder="Doe" className="bg-white/10 text-white" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="you@mail.mcgill.ca" className="bg-white/10 text-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="••••••••" className="bg-white/10 text-white" />
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-3">
              <Checkbox id="community" defaultChecked />
              <Label htmlFor="community" className="text-sm text-white/80">
                Join the community forum and updates
              </Label>
            </div>
            <div className="flex flex-wrap gap-3">
              <FancyButton type="button" size="lg">
                JOIN
              </FancyButton>
              <FancyButton asChild variant="secondary" size="lg">
                <Link href="/membership">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Link>
              </FancyButton>
            </div>
          </motion.form>
          <motion.div variants={fadeUp} className="mt-6 flex items-center gap-2 text-sm text-white/75">
            <Sparkles className="h-4 w-4 text-accent" />
            No payment needed—community access is free.
          </motion.div>
        </motion.div>
      </Section>
    </>
  )
}
