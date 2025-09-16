// Test script for the contact API endpoint
// Run with: node scripts/test-contact-api.js

const API_URL = "http://localhost:3000/api/contact"

async function testContactAPI() {
  console.log("🧪 Testing Contact API...\n")

  // Test 1: Valid submission
  console.log("Test 1: Valid submission")
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
        message: "This is a test message with more than 10 characters.",
        page: "/test",
        timestamp: new Date().toISOString(),
      }),
    })

    const data = await response.json()
    console.log("Status:", response.status)
    console.log("Response:", data)
    console.log("✅ Valid submission test passed\n")
  } catch (error) {
    console.log("❌ Valid submission test failed:", error.message, "\n")
  }

  // Test 2: Invalid email
  console.log("Test 2: Invalid email")
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "invalid-email",
        message: "This is a test message with more than 10 characters.",
      }),
    })

    const data = await response.json()
    console.log("Status:", response.status)
    console.log("Response:", data)
    console.log(response.status === 400 ? "✅ Invalid email test passed" : "❌ Invalid email test failed")
    console.log("")
  } catch (error) {
    console.log("❌ Invalid email test failed:", error.message, "\n")
  }

  // Test 3: Message too short
  console.log("Test 3: Message too short")
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Short",
      }),
    })

    const data = await response.json()
    console.log("Status:", response.status)
    console.log("Response:", data)
    console.log(response.status === 400 ? "✅ Short message test passed" : "❌ Short message test failed")
    console.log("")
  } catch (error) {
    console.log("❌ Short message test failed:", error.message, "\n")
  }

  // Test 4: Honeypot detection
  console.log("Test 4: Honeypot detection")
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "This is a test message with more than 10 characters.",
        website: "https://spam.com", // This should trigger honeypot
      }),
    })

    const data = await response.json()
    console.log("Status:", response.status)
    console.log("Response:", data)
    console.log(response.status === 400 ? "✅ Honeypot test passed" : "❌ Honeypot test failed")
    console.log("")
  } catch (error) {
    console.log("❌ Honeypot test failed:", error.message, "\n")
  }

  console.log("🏁 Contact API testing complete!")
}

// Run tests if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testContactAPI()
}

export { testContactAPI }
