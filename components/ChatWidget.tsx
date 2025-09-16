"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { contactSchema, type ContactFormData } from "@/lib/validations"
import { cn } from "@/lib/utils"

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const pathname = usePathname()
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const messageValue = watch("message", "")

  // Load draft message from localStorage
  useEffect(() => {
    const draft = localStorage.getItem("chat-draft-message")
    if (draft) {
      setValue("message", draft)
    }
  }, [setValue])

  // Save draft message to localStorage
  useEffect(() => {
    if (messageValue) {
      localStorage.setItem("chat-draft-message", messageValue)
    }
  }, [messageValue])

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          page: pathname,
          timestamp: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to send message")
      }

      toast({
        title: "Message sent!",
        description: "Thanks — we'll be in touch!",
      })

      reset()
      localStorage.removeItem("chat-draft-message")
      setIsOpen(false)
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      handleClose()
    }
  }

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 300, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className={cn(
            "h-14 px-6 rounded-full shadow-lg shadow-accent/20 focus-ring",
            "bg-accent hover:bg-accent/90 text-white font-medium",
            "hover:scale-105 active:scale-95 transition-all duration-200",
          )}
        >
          <MessageCircle className="h-5 w-5 mr-2" />
          Let's chat!
        </Button>
      </motion.div>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={handleClose}
            />

            {/* Chat Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] z-50"
              onKeyDown={handleKeyDown}
            >
              <Card className="glass border border-white/10 shadow-2xl">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white flex items-center gap-2">
                      <MessageCircle className="h-5 w-5 text-accent" />
                      Chat with SRI
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleClose}
                      className="text-neutral-400 hover:text-white focus-ring"
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Close chat</span>
                    </Button>
                  </div>
                </CardHeader>

                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Honeypot field */}
                    <input {...register("website")} type="text" className="sr-only" tabIndex={-1} autoComplete="off" />

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Input
                          {...register("name")}
                          placeholder="Name (optional)"
                          className="bg-white/5 border-white/20 text-white placeholder:text-neutral-400 focus:border-accent"
                        />
                      </div>
                      <div>
                        <Input
                          {...register("email")}
                          type="email"
                          placeholder="Email (optional)"
                          className="bg-white/5 border-white/20 text-white placeholder:text-neutral-400 focus:border-accent"
                        />
                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div>
                      <Textarea
                        {...register("message")}
                        placeholder="How can we help you? (minimum 10 characters)"
                        rows={4}
                        className="bg-white/5 border-white/20 text-white placeholder:text-neutral-400 focus:border-accent resize-none"
                      />
                      {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-accent hover:bg-accent/90 text-white focus-ring"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
