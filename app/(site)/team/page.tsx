/** app/(site)/team/page.tsx */
"use client"

import { motion } from "framer-motion"
import { Sparkles, UserRound } from "lucide-react"
import { Section } from "@/components/Section"

type ExecMember = {
  name: string
  role: string
  program: string
  from: string
  interest: string
}

const EXEC_TEAM: ExecMember[] = [
  { name: "Kohan Ketch", role: "Co-President", program: "U3 Neuroscience (B.Sc.)", from: "Woodstock, New Brunswick, Canada", interest: "Visual attention and sepsis" },
  { name: "Joyce Gerges", role: "Co-President", program: "U4 Psychology (BA)", from: "Gatineau, Canada", interest: "Developmental psychopathology" },
  { name: "Arshita Malik", role: "Co-VP Events", program: "U2 Economics (BA)", from: "Montréal, Canada", interest: "Neuroeconomics, specifically loss aversion and risk" },
  { name: "Evelyn Yu", role: "Co-VP Events", program: "U1 Anatomy & Cell Biology (B.Sc.)", from: "Ottawa, Canada", interest: "Metabolic engineering and synthetic biology" },
  { name: "Brigitta Chan", role: "VP Internal", program: "U1 Microbiology & Immunology (B.Sc.)", from: "Toronto, Canada", interest: "Infectious pathogens (viruses, bacteria, prions)" },
  { name: "Skyla Dorcas", role: "VP External", program: "U3 Bio-Organic Chemistry (B.Sc.)", from: "Moncton, New Brunswick, Canada", interest: "Organic chemistry, especially total synthesis and medicinal chemistry" },
  { name: "Jeffrey Sun", role: "VP Research", program: "U2 Microbiology & Immunology (B.Sc.)", from: "Ottawa, Canada", interest: "The role of the microbiome in allergy development" },
  { name: "Ben Marks de Chabris", role: "VP Finance", program: "U2 Finance (BCom)", from: "Toronto, Canada", interest: "Healthtech research" },
  { name: "Sofia Castellana", role: "Science Coordinator", program: "U2 Microbiology & Immunology (B.Sc.)", from: "Montréal, Canada", interest: "Preventative medicine and immunological responses to disease" },
  { name: "Cole Gandhi", role: "Science Coordinator", program: "U2 Anatomy & Cell Biology (B.Sc.)", from: "Toronto, Canada", interest: "Mental health and learning" },
  { name: "Ellie Griffiths-Barnhart", role: "Arts Coordinator", program: "U3 Psychology & English Literature (BA)", from: "Vancouver, Canada", interest: "Neurodegenerative disease progression from a neurochemical perspective" },
  { name: "Izabela Junqueira", role: "Engineering Coordinator", program: "U3 Bioengineering (B.Eng.)", from: "Brasília, Brazil", interest: "Genetic engineering and bioinformatics for cancer research and drug development" },
  { name: "Vicky Lam", role: "U0 Representative", program: "U0 Biological, Biomedical & Life Sciences (B.Sc.)", from: "Richmond Hill, Canada", interest: "Neural mechanisms of long-term memory encoding" },
  { name: "Silvia Giordano", role: "U1 Representative", program: "U1 Linguistics & Psychology (BA)", from: "Philadelphia, USA", interest: "Child language acquisition" },
  { name: "Aditya Ranjan", role: "VP IT", program: "U0 Biological, Biomedical & Life Sciences (B.Sc.)", from: "Toronto, Canada", interest: "Neurodegeneration and neurosurgical interventions" },
]

const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }

export default function TeamLandingPage() {
  return (
    <>
      <Section className="pt-20 lg:pt-28 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
          <div className="absolute top-8 right-8 h-80 w-80 rounded-full bg-emerald-300/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
        </div>

        <motion.div variants={fade} initial="hidden" animate="show" className="relative text-center max-w-3xl mx-auto">
          <p className="text-accent font-medium text-sm uppercase tracking-wider mb-4">Our People</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6">Meet the Team</h1>
          <p className="text-neutral-200 text-lg">
            The Student Research Initiative is powered by dedicated students and mentors. Explore the executive team leading programs, research, and community.
          </p>

          <div className="mt-10 inline-flex items-center gap-3 rounded-3xl border border-white/12 bg-primary-900/40 px-5 py-3 backdrop-blur shadow-[0_24px_60px_-40px_rgba(59,167,255,0.65)]">
            <Sparkles className="h-5 w-5 text-accent" />
            <span className="text-white font-semibold text-lg">Executive Team 25–26</span>
          </div>
        </motion.div>
      </Section>

      <Section className="pt-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ show: { transition: { staggerChildren: 0.06 } } }}
            className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
          >
            {EXEC_TEAM.map((member) => (
              <motion.div key={member.name} variants={fade}>
                <ExecCard member={member} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>
    </>
  )
}

function ExecCard({ member }: { member: ExecMember }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-primary-900/25 p-6 glass shadow-[0_24px_60px_-42px_rgba(0,0,0,0.7)] transition-transform duration-400 ease-out hover:-translate-y-1 hover:border-white/20">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -inset-16 bg-gradient-to-br from-accent/20 via-emerald-300/15 to-transparent blur-2xl" />
      </div>

      <div className="relative flex items-start gap-4">
        <div className="relative h-14 w-14 shrink-0 rounded-2xl border border-white/10 bg-white/5 grid place-items-center text-accent">
          <UserRound className="h-7 w-7" />
        </div>
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm uppercase tracking-wide text-white/70">{member.role}</p>
          </div>
          <h3 className="text-xl font-semibold text-white leading-tight">{member.name}</h3>
          <p className="text-sm text-white/75">{member.program}</p>
          <p className="text-xs text-white/60">From: {member.from}</p>
        </div>
      </div>

      <div className="relative mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-white/60">Research interest</p>
        <p className="mt-2 text-sm text-white/85">{member.interest}</p>
      </div>
    </div>
  )
}
