// lib/team.ts
export type TeamMember = {
  name: string
  role: string
  program?: string
  image: string // path under /public
  linkedin?: string
}

const placeholder = "/placeholder-user.jpg"

export const EXECUTIVE_25_26: TeamMember[] = [
  { name: "Avery Chen", role: "President", program: "B.Sc. Neuroscience", image: placeholder, linkedin: "#" },
  { name: "Maya Patel", role: "VP Internal", program: "B.Sc. Physiology", image: placeholder, linkedin: "#" },
  { name: "Leo Martinez", role: "VP External", program: "B.Sc. Biology", image: placeholder, linkedin: "#" },
  { name: "Sofia Nguyen", role: "VP Events", program: "B.Sc. Psychology", image: placeholder, linkedin: "#" },
  { name: "Daniel Kim", role: "VP Finance", program: "B.Com. Finance", image: placeholder, linkedin: "#" },
  { name: "Emma Brown", role: "VP Marketing", program: "B.A. Communications", image: placeholder, linkedin: "#" },
  { name: "Noah Smith", role: "Sponsorships Lead", program: "B.Com. Accounting", image: placeholder, linkedin: "#" },
  { name: "Olivia Rossi", role: "Operations Lead", program: "B.Sc. Computer Science", image: placeholder, linkedin: "#" },
  { name: "Hugo Dupont", role: "Design Lead", program: "B.A. Art & Design", image: placeholder, linkedin: "#" },
  { name: "Chloe Li", role: "Resources Lead", program: "B.Sc. Microbiology", image: placeholder, linkedin: "#" },
  { name: "Ethan Johnson", role: "Mentorship Lead", program: "B.Sc. Anatomy", image: placeholder, linkedin: "#" },
  { name: "Grace Park", role: "Outreach Lead", program: "B.Sc. Immunology", image: placeholder, linkedin: "#" },
  { name: "Lucas Pereira", role: "Web Lead", program: "B.Sc. CS & Bio", image: placeholder, linkedin: "#" },
  { name: "You?", role: "Open Position", program: "Apply soon", image: placeholder, linkedin: "#" },
]

export const HALL_OF_FAME: TeamMember[] = [
  { name: "A. Alumni", role: "Founder (2020–21)", program: "B.Sc. Biochemistry", image: placeholder },
  { name: "B. Alumni", role: "President (2021–22)", program: "B.Sc. Neuroscience", image: placeholder },
  { name: "C. Alumni", role: "VP Events (2021–22)", program: "B.Sc. Psychology", image: placeholder },
  { name: "D. Alumni", role: "VP External (2022–23)", program: "B.Sc. Biology", image: placeholder },
  { name: "E. Alumni", role: "VP Internal (2022–23)", program: "B.Sc. Physiology", image: placeholder },
  { name: "F. Alumni", role: "VP Finance (2023–24)", program: "B.Com. Finance", image: placeholder },
  { name: "G. Alumni", role: "Design Lead (2023–24)", program: "B.A. Design", image: placeholder },
  { name: "H. Alumni", role: "Sponsorships (2023–24)", program: "B.Com. Marketing", image: placeholder },
  { name: "I. Alumni", role: "Resources Lead (2024–25)", program: "B.Sc. Microbiology", image: placeholder },
  { name: "J. Alumni", role: "Mentorship (2024–25)", program: "B.Sc. Anatomy", image: placeholder },
  { name: "K. Alumni", role: "Operations (2024–25)", program: "B.Sc. CS", image: placeholder },
  { name: "L. Alumni", role: "Web Lead (2024–25)", program: "B.Sc. CS & Bio", image: placeholder },
  { name: "M. Alumni", role: "Advisor (2025–26)", program: "—", image: placeholder },
  { name: "N. Alumni", role: "Advisor (2025–26)", program: "—", image: placeholder },
]
