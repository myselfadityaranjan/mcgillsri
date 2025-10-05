"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Section } from "@/components/Section"
import { FancyButton } from "@/components/FancyButton"
import ResourcesNav from "@/components/ResourcesNav"
import { Card, CardContent } from "@/components/ui/card"
import { fadeUp, staggerChildren } from "@/lib/motion"

export default function SRIStudentshipAwardPage() {
  return (
    <>
      <Section className="pt-20 lg:pt-28">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mx-auto max-w-5xl"
        >
          <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">Funding</p>
          <h1 className="text-4xl md:text-5xl font-semibold text-white mb-2">SRI Studentship Award</h1>
          <ResourcesNav />
          <p className="text-neutral-300 text-lg mt-4">($1000)</p>
          <p className="text-neutral-200 mt-4">
            One of the main goals of the Student Research Initiative is to help students become involved in research.
            Each year, we sponsor a student researcher under the SRI Award over the summer, allowing the student to
            gain research experience while decreasing the financial burden on the supervisor.
          </p>
        </motion.div>
      </Section>

      <Section className="pt-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren()}
          className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2"
        >
          <motion.div variants={fadeUp}>
            <Card className="surface-soft">
              <CardContent className="space-y-4 p-6">
                <h3 className="text-white font-semibold">Eligibility</h3>
                <p className="text-neutral-200">
                  To be eligible for the award, you must be an undergraduate student currently registered at McGill
                  University. After you find a research position, either in academia or in industry, your supervisor
                  must sign your application. We have no restrictions in terms of program or year of study, meaning the
                  $1000 SRI Award is open to engineering or arts research in addition to science.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Card className="surface-soft">
              <CardContent className="space-y-4 p-6">
                <h3 className="text-white font-semibold">Selection Criteria</h3>
                <p className="text-neutral-200">
                  Our selection criteria are not based on grades or research experience. Instead, we will look at your
                  passion for research as indicated in your personal statement. The application and contents of the
                  personal statement will be released soon.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeUp} className="md:col-span-2">
            <Card className="surface-soft">
              <CardContent className="space-y-4 p-6">
                <h3 className="text-white font-semibold">Application</h3>
                <p className="text-neutral-200">
                  The application for the 2024 SRI Award is now open. Please check the application form for more
                  details.
                </p>
                <div className="mt-1 flex flex-wrap gap-3">
                  <FancyButton asChild>
                    <Link href="#" target="_blank" rel="noopener noreferrer">
                      Application
                    </Link>
                  </FancyButton>
                  <FancyButton asChild variant="secondary">
                    <Link href="#" target="_blank" rel="noopener noreferrer">
                      Past Winners
                    </Link>
                  </FancyButton>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </Section>
    </>
  )
}
