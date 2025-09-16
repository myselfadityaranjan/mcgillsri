"use client"

import { motion } from "framer-motion"
import { BookOpen, FileText, DollarSign, HelpCircle, Download, ExternalLink, Award } from "lucide-react"
import { Section } from "@/components/Section"
import { TabsSubnav } from "@/components/TabsSubnav"
import { CardFeature } from "@/components/CardFeature"
import { EmptyState } from "@/components/EmptyState"
import { FancyButton } from "@/components/FancyButton"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function ResourcesPage() {
  const tabs = [
    {
      id: "getting-started",
      label: "Getting Started",
      content: (
        <div className="grid md:grid-cols-2 gap-6">
          <CardFeature
            icon={BookOpen}
            title="Research Basics"
            description="Learn the fundamentals of undergraduate research, from finding opportunities to making the most of your experience."
          />
          <CardFeature
            icon={FileText}
            title="Application Tips"
            description="Master the art of writing compelling research applications and cold emails to professors."
          />
          <CardFeature
            icon={Award}
            title="Building Your Profile"
            description="Develop the skills and experience that make you an attractive candidate for research positions."
          />
          <CardFeature
            icon={HelpCircle}
            title="Common Questions"
            description="Get answers to frequently asked questions about undergraduate research at McGill."
          />
        </div>
      ),
    },
    {
      id: "guides-templates",
      label: "Guides & Templates",
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl glass border border-white/10 hover:border-accent/30 transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-accent/10 border border-accent/20">
                  <FileText className="h-6 w-6 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-accent transition-colors">
                    CV Template
                  </h3>
                  <p className="text-neutral-300 mb-4">
                    Professional CV template optimized for undergraduate research applications.
                  </p>
                  <FancyButton variant="secondary" size="sm">
                    <Download className="h-4 w-4" />
                    Download Template
                  </FancyButton>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl glass border border-white/10 hover:border-accent/30 transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-accent/10 border border-accent/20">
                  <FileText className="h-6 w-6 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-accent transition-colors">
                    Cold Email Guide
                  </h3>
                  <p className="text-neutral-300 mb-4">
                    Step-by-step guide to writing effective emails to professors and researchers.
                  </p>
                  <FancyButton variant="secondary" size="sm">
                    <ExternalLink className="h-4 w-4" />
                    View Guide
                  </FancyButton>
                </div>
              </div>
            </div>
          </div>

          <EmptyState
            icon={FileText}
            title="More Resources Coming Soon"
            description="We're working on additional guides, templates, and resources to help you succeed in your research journey."
          />
        </div>
      ),
    },
    {
      id: "funding-awards",
      label: "Funding & Awards",
      content: (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl glass border border-white/10">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-accent/10 border border-accent/20">
                <Award className="h-6 w-6 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-white mb-2">SRI Award</h3>
                <p className="text-neutral-300 mb-4 leading-relaxed">
                  Our flagship award program supporting outstanding undergraduate research projects. Funded through our
                  events and fundraising activities to directly benefit student researchers.
                </p>
                <FancyButton variant="secondary" size="sm">
                  Learn More
                  <ExternalLink className="h-4 w-4" />
                </FancyButton>
              </div>
            </div>
          </div>

          <EmptyState
            icon={DollarSign}
            title="Additional Funding Opportunities"
            description="We're compiling a comprehensive list of research funding opportunities available to McGill undergraduate students."
          />
        </div>
      ),
    },
    {
      id: "faqs",
      label: "FAQs",
      content: (
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="item-1" className="border border-white/10 rounded-xl px-6 data-[state=open]:bg-white/5">
            <AccordionTrigger className="text-white hover:text-accent">
              How do I find research opportunities at McGill?
            </AccordionTrigger>
            <AccordionContent className="text-neutral-300 leading-relaxed">
              Start by exploring our volunteer database, attending our networking events, and reaching out directly to
              professors whose research interests align with yours. We also recommend checking department websites and
              speaking with your professors during office hours.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border border-white/10 rounded-xl px-6 data-[state=open]:bg-white/5">
            <AccordionTrigger className="text-white hover:text-accent">
              What should I include in my research application?
            </AccordionTrigger>
            <AccordionContent className="text-neutral-300 leading-relaxed">
              A strong application typically includes a well-crafted CV, a personalized cover letter explaining your
              interest in the specific research, relevant coursework or experience, and clear availability. Use our CV
              template and cold email guide for best results.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border border-white/10 rounded-xl px-6 data-[state=open]:bg-white/5">
            <AccordionTrigger className="text-white hover:text-accent">
              Do I need prior research experience to get started?
            </AccordionTrigger>
            <AccordionContent className="text-neutral-300 leading-relaxed">
              Not at all! Many professors are happy to train motivated undergraduate students. Focus on demonstrating
              your enthusiasm, relevant coursework, and willingness to learn. Volunteer positions are an excellent way
              to gain initial experience.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border border-white/10 rounded-xl px-6 data-[state=open]:bg-white/5">
            <AccordionTrigger className="text-white hover:text-accent">
              How can SRI membership help me?
            </AccordionTrigger>
            <AccordionContent className="text-neutral-300 leading-relaxed">
              SRI members get access to our exclusive volunteer database, discounted event tickets, priority
              registration for networking events, and ongoing support from our community of student researchers. Plus,
              you'll be supporting our mission to create more opportunities for everyone.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ),
    },
  ]

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
            <BookOpen className="h-4 w-4" />
            Knowledge Hub
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 text-balance">Resources</h1>

          <p className="text-xl md:text-2xl text-neutral-200 leading-relaxed text-pretty">
            Everything you need to succeed in undergraduate research at McGill University.
          </p>
        </motion.div>
      </Section>

      {/* Main Content */}
      <Section>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariants}>
          <TabsSubnav tabs={tabs} defaultTab="getting-started" />
        </motion.div>
      </Section>
    </div>
  )
}
