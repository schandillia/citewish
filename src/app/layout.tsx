import type { Metadata } from "next"
import { bodyFont, headingFont } from "@/lib/fonts"
import meta from "@/lib/meta.json"
import { ThemeProvider } from "@/components/theme/theme-provider"
import "./globals.css"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: meta.HOME.TITLE,
  description: meta.HOME.DESCRIPTION,
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(bodyFont.variable, headingFont.variable)}
    >
      <body className="min-h-[calc(100vh-1px)] flex flex-col font-sans text-brand-950 antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="relative flex-1 flex flex-col">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
