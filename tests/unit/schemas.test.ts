import { describe, expect, it } from "vitest"

import { jobSchema, profileSchema } from "@/lib/schemas/network"

describe("profile schema", () => {
  it("accepts valid payload", () => {
    const result = profileSchema.parse({
      program: "BSc Neuroscience",
      yearOfStudy: 3,
      gpa: 3.7,
      interests: ["neuroscience"],
      skills: ["MATLAB"],
      availability: "Summer 2025",
      bio: "Research assistant",
      links: ["https://example.com"],
    })
    expect(result.program).toBe("BSc Neuroscience")
  })

  it("rejects excessive skills", () => {
    expect(() =>
      profileSchema.parse({
        skills: new Array(40).fill("skill"),
      }),
    ).toThrow()
  })
})

describe("job schema", () => {
  it("validates required fields", () => {
    const result = jobSchema.parse({
      title: "Research Assistant",
      description: "Assist with data collection",
      tags: ["Python"],
      paid: true,
    })
    expect(result.paid).toBe(true)
  })

  it("fails when url invalid", () => {
    expect(() =>
      jobSchema.parse({
        title: "Assistant",
        description: "Test",
        applicationUrl: "invalid",
      }),
    ).toThrow()
  })
})
