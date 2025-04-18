import { ReactNode } from "react"
import { Navbar } from "@/components/nav/navbar"
import Footer from "@/components/footer"
import meta from "@/lib/data/meta.json"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: meta.DASHBOARD.TITLE,
  description: meta.DASHBOARD.DESCRIPTION,
}

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  )
}

export default Layout
