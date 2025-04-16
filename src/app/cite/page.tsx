import type { Metadata } from "next"

import meta from "@/lib/meta.json"
import { Heading } from "@/components/heading"

export const metadata: Metadata = {
  title: meta.CITE.TITLE,
  description: meta.CITE.DESCRIPTION,
}

const Page = () => (
  <>
    <Heading>Generate Citation</Heading>
  </>
)

export default Page
