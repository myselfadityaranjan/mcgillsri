import { type NextRequest, NextResponse } from "next/server"
import { contactSchema } from "@/lib/validations"
import { rateLimit } from "@/lib/utils"

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.ip || request.headers.get("x-forwarded-for") || "unknown"

    // Apply rate limiting (5 requests per minute)
    if (!rateLimit(ip, 5, 60000)) {
      return NextResponse.json({ message: "Too many requests. Please try again later." }, { status: 429 })
    }

    const body = await request.json()

    // Validate the request body
    const validationResult = contactSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json({ message: "Invalid form data", errors: validationResult.error.errors }, { status: 400 })
    }

    const { name, email, message, website, page, timestamp } = validationResult.data

    // Check honeypot field
    if (website) {
      console.log("Bot detected via honeypot field")
      return NextResponse.json({ message: "Invalid request" }, { status: 400 })
    }

    // Prepare the contact data
    const contactData = {
      name: name || "Anonymous",
      email: email || "Not provided",
      message,
      page: page || "Unknown",
      timestamp: timestamp || new Date().toISOString(),
      ip,
    }

    // Log the contact submission (fallback when no integrations are configured)
    console.log("📧 New contact submission:", contactData)

    // Optional: Send email via Resend (if configured)
    if (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL) {
      try {
        // Note: In a real implementation, you would import and use Resend here
        console.log("Would send email via Resend to:", process.env.CONTACT_TO_EMAIL)
      } catch (error) {
        console.error("Failed to send email via Resend:", error)
      }
    }

    // Optional: Send to Slack webhook (if configured)
    if (process.env.SLACK_WEBHOOK_URL) {
      try {
        const slackPayload = {
          text: `New contact form submission from SRI website`,
          blocks: [
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: `*New Contact Form Submission*\n\n*Name:* ${contactData.name}\n*Email:* ${contactData.email}\n*Page:* ${contactData.page}\n*Time:* ${new Date(contactData.timestamp).toLocaleString()}\n\n*Message:*\n${contactData.message}`,
              },
            },
          ],
        }

        await fetch(process.env.SLACK_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(slackPayload),
        })
      } catch (error) {
        console.error("Failed to send to Slack:", error)
      }
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Contact API error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
