// src/prisma.ts
import { Pool } from "@neondatabase/serverless"
import { PrismaNeon } from "@prisma/adapter-neon"
import { PrismaClient } from "@prisma/client"

// Add debugging output
console.log("PRISMA INIT - Environment check")
console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL)
console.log("NODE_ENV:", process.env.NODE_ENV)

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient | undefined
}

let prisma: PrismaClient

// Check if DATABASE_URL exists, if not, try to fallback to a local connection
const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  console.error(
    "⚠️ DATABASE_URL is not set! Attempting to use default local connection."
  )
  throw new Error(
    "DATABASE_URL environment variable is not set. Please check your .env.local file."
  )
}

try {
  if (process.env.NODE_ENV === "production") {
    console.log("Creating production Prisma client")
    // In production, create a new connection each time
    const pool = new Pool({ connectionString })
    const adapter = new PrismaNeon(pool as any)
    prisma = new PrismaClient({ adapter })
    console.log("Production Prisma client created successfully")
  } else {
    console.log("Creating development Prisma client")
    // In development, reuse connections to improve performance
    if (!global.cachedPrisma) {
      const pool = new Pool({ connectionString })
      const adapter = new PrismaNeon(pool as any)
      global.cachedPrisma = new PrismaClient({ adapter })
      console.log("Development Prisma client cached successfully")
    } else {
      console.log("Using cached Prisma client")
    }
    prisma = global.cachedPrisma
  }
} catch (error) {
  console.error("Failed to initialize Prisma client:", error)
  throw error
}

export const db = prisma
