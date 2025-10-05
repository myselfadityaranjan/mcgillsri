// components/TeamCard.tsx
"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { TeamMember } from "@/lib/team"
import { Linkedin } from "lucide-react"
import Link from "next/link"

export function TeamCard({ member, className }: { member: TeamMember; className?: string }) {
  return (
    <motion.div
      className="group"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Card
        className={cn(
          "w-64 shrink-0 snap-center overflow-hidden rounded-2xl surface-soft",
          className,
        )}
      >
        <CardContent className="p-5">
          <div className="relative mx-auto h-28 w-28">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="rounded-full object-cover ring-2 ring-accent/40 shadow-[0_18px_35px_-20px_rgba(59,167,255,0.5)]"
              sizes="112px"
            />
          </div>

          <div className="mt-4 text-center">
            <h3 className="text-white font-semibold text-lg transition-colors duration-300 ease-out group-hover:text-accent">
              {member.name}
            </h3>
            <p className="text-accent text-sm font-medium">{member.role}</p>
            {member.program && <p className="text-neutral-300 text-xs mt-1">{member.program}</p>}
          </div>

          {member.linkedin && member.linkedin !== "#" && (
            <div className="mt-4 flex justify-center">
              <Link
                href={member.linkedin}
                target="_blank"
                className="inline-flex items-center gap-1 text-sm text-neutral-200/90 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:text-accent focus-ring"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
