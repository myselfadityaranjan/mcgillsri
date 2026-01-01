import { afterAll, afterEach, beforeAll, vi } from "vitest"

beforeAll(() => {
  process.env.NEXTAUTH_URL = process.env.NEXTAUTH_URL ?? "http://localhost:3000"
})

afterEach(() => {
  vi.clearAllMocks()
})

afterAll(() => {
  vi.resetAllMocks()
})
