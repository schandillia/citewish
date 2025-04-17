// src/auth.config.ts
import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"

export const authConfig = {
  // You can define pages for custom login, error pages etc. here if needed
  // pages: {
  //   signIn: '/login',
  // },
  providers: [
    // Add providers here. They are generally Edge-compatible.
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  session: {
    // Define the session strategy
    strategy: "database",
  },
  callbacks: {
    // Add callbacks that DON'T rely directly on the adapter/database here
    // For example, customizing JWT payload if using strategy: "jwt"
    // Or basic authorization checks based on profile/account info
    authorized({ auth, request: { nextUrl } }) {
      // Example: Basic check if user is logged in - safe for middleware
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard")

      if (isOnDashboard) {
        if (isLoggedIn) return true // Allow access if logged in
        return false // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        // Optional: Redirect logged-in users from login page to dashboard
        // if (nextUrl.pathname === '/login') {
        //  return Response.redirect(new URL('/dashboard', nextUrl));
        // }
      }
      // Allow access to all other pages by default
      return true
    },
    // Note: The session callback often NEEDS the user ID from the DB,
    // so it might be better placed in auth.ts if using strategy: "database".
    // If placed here, it receives limited info when called from middleware.
  },
  // Providers need to be listed here too, or only in auth.ts if you prefer.
  // Listing them here allows middleware to potentially use provider info if needed.
  // However, the adapter logic itself cannot run in middleware.
} satisfies NextAuthConfig // Use "satisfies" for type checking
