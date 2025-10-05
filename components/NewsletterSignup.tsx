// components/NewsletterSignup.tsx
"use client"

import { Section } from "@/components/Section"
import { Card, CardContent } from "@/components/ui/card"
import { Mail } from "lucide-react"
import { FormEvent } from "react"

export default function NewsletterSignup() {
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    // visual-only placeholder (no network calls yet)
    e.preventDefault()
  }

  return (
    <Section className="pt-10 pb-20">
      <div className="max-w-4xl mx-auto">
        <Card className="relative overflow-hidden rounded-3xl border-white/10 bg-primary-900/40">
          {/* subtle corner glow */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
          <CardContent className="relative p-6 md:p-8">
            <div className="flex items-start gap-3">
              <Mail className="h-6 w-6 text-accent mt-1 shrink-0" />
              <div>
                <p className="text-accent font-medium text-sm uppercase tracking-wider">Stay in the loop</p>
                <h2 className="text-white text-2xl md:text-3xl font-semibold mt-1">
                  Sign up for our newsletter
                </h2>
                <p className="text-neutral-300 mt-2">
                  Get event announcements, opportunities, and resources from SRI. (Coming soon — this is a visual
                  placeholder for now.)
                </p>
              </div>
            </div>

            <form onSubmit={onSubmit} className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
              <label className="sr-only" htmlFor="newsletter-email">Email</label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="your.name@mail.mcgill.ca"
                className="h-11 rounded-xl border border-white/10 bg-primary-700/30 px-4 text-neutral-100 placeholder:text-neutral-400
                           outline-none ring-0 focus:border-white/20 focus:outline-none"
                required
              />
              <button
                type="submit"
                disabled
                aria-disabled="true"
                className="h-11 rounded-xl px-5 font-medium
                           bg-accent/90 text-neutral-900 hover:bg-accent
                           disabled:opacity-60 disabled:cursor-not-allowed"
                title="Newsletter signup coming soon"
              >
                Subscribe
              </button>

              {/* Honeypot for future anti-bot (hidden on purpose) */}
              <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
            </form>

            <p className="text-neutral-400 text-xs mt-3">
              We’ll only email you about SRI events and opportunities. Unsubscribe anytime.
            </p>
          </CardContent>
        </Card>
      </div>
    </Section>
  )
}
