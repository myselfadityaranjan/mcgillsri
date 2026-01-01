import { PrismaClient, Role, Visibility } from "@prisma/client"

const prisma = new PrismaClient()

const students = [
  {
    name: "Avery Chen",
    email: "avery.chen@mail.mcgill.ca",
    program: "BSc Neuroscience",
    yearOfStudy: 3,
    gpa: 3.8,
    interests: ["Neuroimaging", "Behavioural Science"],
    skills: ["MATLAB", "Data Analysis", "Literature Review"],
    availability: "Summer 2025",
    bio: "Undergraduate researcher exploring the intersection of cognition and imaging.",
    links: ["https://linkedin.com/in/averychen"],
  },
  {
    name: "Samira Malik",
    email: "samira.malik@mail.mcgill.ca",
    program: "BEng Software Engineering",
    yearOfStudy: 2,
    gpa: 3.6,
    interests: ["Machine Learning", "Healthcare"],
    skills: ["Python", "TensorFlow", "React"],
    availability: "Part-time 2024-2025",
    bio: "Interested in applying ML to solve real problems in medicine and public health.",
    links: ["https://github.com/samira"],
  },
  {
    name: "Leo Martinez",
    email: "leo.martinez@mail.mcgill.ca",
    program: "BA Economics",
    yearOfStudy: 4,
    gpa: 3.9,
    interests: ["Development Economics", "Policy"],
    skills: ["Stata", "R", "French"],
    availability: "Winter 2025",
    bio: "Economics honours student focused on policy interventions in emerging economies.",
    links: ["https://martinezleo.com"],
  },
  {
    name: "Noor Rahman",
    email: "noor.rahman@mail.mcgill.ca",
    program: "BSc Biochemistry",
    yearOfStudy: 2,
    gpa: 3.7,
    interests: ["Protein Engineering", "Gene Therapy"],
    skills: ["Wet Lab", "CRISPR", "Protein Purification"],
    availability: "Full-time Summer 2025",
    bio: "Aspiring graduate student seeking protein engineering opportunities.",
    links: [],
  },
]

const faculty = [
  {
    name: "Dr. Sofia Nguyen",
    email: "sofia.nguyen@mcgill.ca",
    lab: "Neurobiology of Memory Lab",
    department: "Biology",
  },
  {
    name: "Dr. Marc Tremblay",
    email: "marc.tremblay@mcgill.ca",
    lab: "Computational Imaging Group",
    department: "Computer Science",
  },
]

const adminEmail = process.env.ADMIN_EMAILS?.split(",").map((item) => item.trim()).filter(Boolean)[0] ?? "network.admin@mcgill.ca"

async function main() {
  console.info("🌱 Seeding SRI Network data")

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: { role: Role.ADMIN, name: "Network Admin" },
    create: {
      email: adminEmail,
      role: Role.ADMIN,
      name: "Network Admin",
    },
  })

  const professorUsers = await Promise.all(
    faculty.map((prof) =>
      prisma.user.upsert({
        where: { email: prof.email },
        update: { name: prof.name, role: Role.PROFESSOR },
        create: {
          email: prof.email,
          name: prof.name,
          role: Role.PROFESSOR,
        },
      }),
    ),
  )

  const studentUsers = await Promise.all(
    students.map((student) =>
      prisma.user.upsert({
        where: { email: student.email },
        update: { name: student.name, role: Role.STUDENT },
        create: {
          email: student.email,
          name: student.name,
          role: Role.STUDENT,
        },
      }),
    ),
  )

  await Promise.all(
    students.map((student, index) =>
      prisma.profile.upsert({
        where: { userId: studentUsers[index].id },
        create: {
          userId: studentUsers[index].id,
          program: student.program,
          yearOfStudy: student.yearOfStudy,
          gpa: student.gpa,
          interests: student.interests,
          skills: student.skills,
          availability: student.availability,
          bio: student.bio,
          links: student.links,
          visibility: index % 2 === 0 ? Visibility.PUBLIC : Visibility.AUTHENTICATED,
        },
        update: {
          program: student.program,
          yearOfStudy: student.yearOfStudy,
          gpa: student.gpa,
          interests: student.interests,
          skills: student.skills,
          availability: student.availability,
          bio: student.bio,
          links: student.links,
          visibility: index % 2 === 0 ? Visibility.PUBLIC : Visibility.AUTHENTICATED,
        },
      }),
    ),
  )

  const jobSeeds = [
    {
      title: "Summer Research Assistant - Memory Consolidation",
      lab: faculty[0].lab,
      department: faculty[0].department,
      description:
        "Work with a cross-disciplinary team to examine the molecular basis of memory consolidation using advanced imaging and behavioural paradigms.",
      tags: ["Confocal", "Rodent Models", "Data Analysis"],
      location: "Downtown Campus",
      commitment: "Full-time Summer",
      paid: true,
      applicationUrl: "https://research.mcgill.ca/apply/memory-ra",
      contactEmail: faculty[0].email,
      postedById: professorUsers[0].id,
    },
    {
      title: "Machine Learning for Medical Imaging",
      lab: faculty[1].lab,
      department: faculty[1].department,
      description:
        "Develop deep learning pipelines for reconstructing high-resolution brain images from low-field MRI scanners.",
      tags: ["Python", "PyTorch", "MRI"],
      location: "Hybrid",
      commitment: "10-12 hrs/week",
      paid: false,
      applicationUrl: "https://research.mcgill.ca/apply/ml-imaging",
      contactEmail: faculty[1].email,
      postedById: professorUsers[1].id,
    },
  ]

  await Promise.all(
    jobSeeds.map((job) =>
      prisma.job.upsert({
        where: { id: job.title.toLowerCase().replace(/[^a-z0-9]/g, "-") },
        update: job,
        create: { ...job, id: job.title.toLowerCase().replace(/[^a-z0-9]/g, "-") },
      }),
    ),
  )

  console.info("✅ Seed complete")
}

main()
  .catch((error) => {
    console.error("❌ Seed failed", error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
