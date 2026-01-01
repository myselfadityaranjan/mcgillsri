"use client"

import { useState } from "react"
import { signIn, signOut, useSession } from "next-auth/react"
import { motion } from "framer-motion"
import { Loader2, LogIn, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"

const roleColor: Record<string, string> = {
  STUDENT: "bg-emerald-500/20 text-emerald-200 border border-emerald-400/40",
  PROFESSOR: "bg-sky-500/20 text-sky-200 border border-sky-400/40",
  ADMIN: "bg-amber-500/20 text-amber-100 border border-amber-400/40",
}

export function NetworkTopbar() {
  const { data: session, status } = useSession()
  const [email, setEmail] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast({ title: "Enter your email", description: "Magic links are sent to your inbox." })
      return
    }
    setSubmitting(true)
    try {
      const result = await signIn("email", {
        email,
        redirect: false,
        callbackUrl: "/network",
      })
      if (result?.error) {
        toast({
          title: "Unable to sign in",
          description: result.error,
        })
      } else {
        toast({
          title: "Check your inbox",
          description: "Magic sign-in link sent",
        })
        setEmail("")
      }
    } finally {
      setSubmitting(false)
    }
  }

  const handleSignOut = async () => {
    setSubmitting(true)
    await signOut({ callbackUrl: "/network" })
    setSubmitting(false)
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-xl"
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">SRI McGill</span>
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold text-white sm:text-2xl">Research Network</h1>
            {session?.user.role && (
              <Badge className={`rounded-full px-3 py-1 text-xs font-medium ${roleColor[session.user.role] ?? ""}`}>
                {session.user.role}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {status === "authenticated" ? (
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              disabled={submitting}
              className="border-white/30 bg-white/10 text-white hover:bg-white/20"
            >
              {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogOut className="mr-2 h-4 w-4" />}
              Sign out
            </Button>
          ) : (
            <form onSubmit={handleSignIn} className="flex items-center gap-2">
              <Input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="your.name@mail.mcgill.ca"
                className="w-56 border-white/20 bg-white/10 text-sm text-white placeholder:text-white/50"
                type="email"
                required
              />
              <Button
                type="submit"
                size="sm"
                disabled={submitting}
                className="bg-[var(--net-accent)] text-white hover:bg-white/20 hover:text-white"
              >
                {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogIn className="mr-2 h-4 w-4" />}
                Send link
              </Button>
            </form>
          )}
        </div>
      </div>
    </motion.header>
  )
}
