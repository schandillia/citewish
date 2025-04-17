import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import { prisma } from "@/lib/prisma-edge"
import authConfig from "./auth.config"

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  ...authConfig, // Spread the config from auth.config.ts
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt", // Makes sure JWT is used
  },
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth
    },
  },
})
