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
    <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
      <Card
        className={cn(
          "w-64 shrink-0 snap-center bg-primary-700/40 border-white/10 rounded-2xl overflow-hidden",
          className,
        )}
      >
        <CardContent className="p-5">
          <div className="relative mx-auto h-28 w-28">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="rounded-full object-cover ring-2 ring-accent/40"
              sizes="112px"
            />
          </div>

          <div className="mt-4 text-center">
            <h3 className="text-white font-semibold text-lg">{member.name}</h3>
            <p className="text-accent text-sm font-medium">{member.role}</p>
            {member.program && <p className="text-neutral-300 text-xs mt-1">{member.program}</p>}
          </div>

          {member.linkedin && member.linkedin !== "#" && (
            <div className="mt-4 flex justify-center">
              <Link
                href={member.linkedin}
                target="_blank"
                className="inline-flex items-center gap-1 text-sm text-neutral-200 hover:text-white focus-ring"
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
