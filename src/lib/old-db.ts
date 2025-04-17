import { PrismaClient } from "@prisma/client"

declare global {
  // allow global `prisma` to be replaced in development
  // NOTE: This should only be used in development and not in production

  var prisma: PrismaClient | undefined
}

export const db = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db
}
