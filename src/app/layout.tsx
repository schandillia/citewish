import type { Metadata } from "next"
import { bodyFont, headingFont } from "@/lib/fonts"
import meta from "@/lib/data/meta.json"
import "./globals.css"
import { cn } from "@/lib/utils"
import { Toaster } from "sonner"
import { ThemeProvider } from "next-themes"
import { auth } from "@/auth"
import { db } from "@/lib/prisma-edge"
import { AuthProvider } from "@/components/auth/auth-provider"

export const metadata: Metadata = {
  title: meta.HOME.TITLE,
  description: meta.HOME.DESCRIPTION,
  icons: [{ rel: "icon", url: "/favicon.svg" }],
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  let user = null
  if (session?.user?.id) {
    console.log("SESSION.USER.ID: ", session.user.id)
    try {
      user = await db.user.findUnique({
        where: { id: session.user.id },
      })
    } catch (error) {
      console.error("Error fetching user:", error)
    }
  } else {
    console.log("No user session or ID found.")
  }

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(bodyFont.variable, headingFont.variable)}
    >
      <body className="min-h-[calc(100vh-1px)] flex flex-col font-sans text-brand-950 antialiased">
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main className="relative flex-1 flex flex-col">{children}</main>
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
