import { Redis } from "@upstash/redis"

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null

type MemoryEntry = {
  tokens: number
  expiresAt: number
}

const memoryStore = new Map<string, MemoryEntry>()

export async function rateLimit(identifier: string, limit = 30, windowMs = 60_000) {
  const now = Date.now()

  if (!redis) {
    const entry = memoryStore.get(identifier)
    if (!entry || entry.expiresAt <= now) {
      memoryStore.set(identifier, { tokens: 1, expiresAt: now + windowMs })
      return { ok: true, remaining: limit - 1, reset: now + windowMs }
    }

    if (entry.tokens >= limit) {
      return { ok: false, remaining: 0, reset: entry.expiresAt }
    }

    entry.tokens += 1
    return { ok: true, remaining: Math.max(0, limit - entry.tokens), reset: entry.expiresAt }
  }

  const key = `rl:${identifier}`
  const count = await redis.incr(key)

  if (count === 1) {
    await redis.pexpire(key, windowMs)
    return { ok: true, remaining: limit - 1, reset: now + windowMs }
  }

  if (count > limit) {
    const ttl = await redis.pttl(key)
    return { ok: false, remaining: 0, reset: now + (ttl > 0 ? ttl : windowMs) }
  }

  const ttl = await redis.pttl(key)
  return {
    ok: true,
    remaining: Math.max(0, limit - count),
    reset: now + (ttl > 0 ? ttl : windowMs),
  }
}

export function getRateLimitIdentifier(ip?: string | null, userId?: string) {
  if (userId) return `user:${userId}`
  if (ip) return `ip:${ip}`
  return "anonymous"
}
