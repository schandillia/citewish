import { PrismaAdapter } from "@auth/prisma-adapter"
import Google from "next-auth/providers/google"
import NextAuth from "next-auth"
import { prisma } from "@/lib/prisma-edge"

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [Google],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt", // Makes sure JWT is not used
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
