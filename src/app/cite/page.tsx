"use client"

import { useState } from "react"
import { Heading } from "@/components/heading"
import { Card } from "@/components/ui/card"
import { CitationForm } from "./components/citation-form"
import { CitationResult } from "./components/citation-result"
import { Citation, DocumentType } from "./types"

const Page = () => {
  // Main state for citation data
  const [citation, setCitation] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [documentType, setDocumentType] = useState<DocumentType>("book")

  // Handle generate citation
  const handleGenerateCitation = (citationData: Citation) => {
    setIsGenerating(true)

    // Simulate API call (replace with actual citation generation)
    setTimeout(() => {
      const formattedCitation = formatCitation(citationData)
      setCitation(formattedCitation)
      setIsGenerating(false)
    }, 800)
  }

  // Format citation based on style and type
  const formatCitation = (data: Citation): string => {
    // Implementation would go here - this is just a placeholder
    // Would use different formatters based on style and document type
    switch (data.style) {
      case "MLA":
        return `${data.author.lastName}, ${data.author.firstName}. "${data.title}". ${data.publisher}, ${data.year}.`
      // Add other style formatters
      default:
        return "Citation would appear here"
    }
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 space-y-8">
      <Heading as="h1">Citation Generator</Heading>

      <Card className="overflow-hidden bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-md">
        <div className="grid lg:grid-cols-5 gap-0">
          {/* Form section */}
          <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-zinc-200 dark:border-zinc-800">
            <CitationForm
              onGenerate={handleGenerateCitation}
              isGenerating={isGenerating}
              documentType={documentType}
              setDocumentType={setDocumentType}
            />
          </div>

          {/* Result section */}
          <div className="lg:col-span-2 bg-zinc-50 dark:bg-zinc-900">
            <CitationResult citation={citation} />
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Page
