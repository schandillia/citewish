import { ReactNode } from "react"
import { Navbar } from "@/components/navbar"
import Footer from "@/components/footer"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import meta from "@/lib/meta.json"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: meta.CITE.TITLE,
  description: meta.CITE.DESCRIPTION,
}
const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <MaxWidthWrapper className="my-8 flex-1">{children}</MaxWidthWrapper>
      <Footer />
    </div>
  )
}

export default Layout
