import { PrismaClient } from "@prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"
import { neon, neonConfig } from "@neondatabase/serverless"

// Create a SQL connection
const connectionString = process.env.DATABASE_URL!
const sql = neon(connectionString)

// Create adapter
const adapter = new PrismaNeon({ connectionString })

// Create Prisma client
export const prisma = new PrismaClient({ adapter })
