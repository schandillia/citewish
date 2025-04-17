// src/db/prisma.ts
import { PrismaClient } from "@prisma/client"

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient
}

// Only initialize Prisma in non-edge environments
function getPrismaClient() {
  if (process.env.NEXT_RUNTIME === "edge") {
    // Return a mock or limited client for Edge
    throw new Error("Prisma Client cannot be used in Edge Runtime")
  }

  // Only initialize in non-edge environments
  if (process.env.NODE_ENV === "production") {
    return new PrismaClient()
  } else {
    if (!global.cachedPrisma) {
      global.cachedPrisma = new PrismaClient()
    }
    return global.cachedPrisma
  }
}

export const db = getPrismaClient()
