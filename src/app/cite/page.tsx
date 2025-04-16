// src/app/your-route/page.tsx (or wherever this file resides)

"use client" // Required for useState, useEffect, event handlers

import { useState } from "react"
import { Heading } from "@/components/heading" // Assuming this exists
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ClipboardCopy, BookOpen, ArrowRight } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Import the toast function directly from sonner
import { toast } from "sonner"

const Page = () => {
  // Form state
  const [formData, setFormData] = useState({
    author: "",
    title: "",
    publisher: "",
    year: "",
    url: "",
    notes: "",
  })
  const [style, setStyle] = useState("MLA")
  const [citation, setCitation] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  // Generate citation
  const handleGenerate = () => {
    // Validate required fields
    if (!formData.author || !formData.title) {
      // Use sonner's toast.error for validation failure
      toast.error("Missing information", {
        description: "Please fill in at least the author and title fields.",
        // You can add other sonner options here if needed (duration, etc.)
      })
      return
    }

    setIsGenerating(true)

    // Simulate generation delay (replace with actual citation generation logic)
    setTimeout(() => {
      let generatedCitation = ""

      // Basic citation formatting logic (same as before)
      switch (style) {
        case "MLA":
          generatedCitation = `${formData.author}. "${formData.title}". ${
            formData.publisher ? formData.publisher + ", " : ""
          }${formData.year}.${formData.url ? " Web. " + formData.url : ""}`
          break
        case "APA":
          generatedCitation = `${formData.author} (${formData.year}). ${
            formData.title
          }. ${formData.publisher}${
            formData.url ? ". Retrieved from " + formData.url : ""
          }`
          break
        case "Chicago":
          generatedCitation = `${formData.author}. ${formData.title}. ${
            formData.publisher ? formData.publisher + ", " : ""
          }${formData.year}.${formData.url ? " " + formData.url + "." : ""}`
          break
        case "Harvard":
          generatedCitation = `${formData.author} (${formData.year}). ${
            formData.title
          }. ${formData.publisher}${
            formData.url ? ". Available at: " + formData.url : ""
          }`
          break
        default:
          generatedCitation = "Invalid style selected." // Handle default case
      }

      setCitation(generatedCitation)
      setIsGenerating(false)

      // Scroll to result if needed
      document
        .getElementById("citation-result")
        ?.scrollIntoView({ behavior: "smooth" })
    }, 800) // Simulate network delay
  }

  // Copy citation to clipboard
  const handleCopy = () => {
    if (!citation) return // Don't copy if there's nothing to copy

    navigator.clipboard
      .writeText(citation)
      .then(() => {
        setIsCopied(true)
        // Use sonner's toast.success for confirmation
        toast.success("Copied to clipboard", {
          description: "Citation has been copied to your clipboard.",
        })
        // Reset copied state after a delay
        setTimeout(() => setIsCopied(false), 2000)
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err)
        toast.error("Failed to copy", {
          description: "Could not copy citation to clipboard.",
        })
      })
  }

  return (
    <div className="space-y-8">
      <Heading as="h1"> Generate Citation</Heading>

      <Card className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="grid md:grid-cols-5">
            {/* Form side */}
            <div className="p-6 md:col-span-3 space-y-6 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800">
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Author Input */}
                <div className="space-y-2">
                  <Label htmlFor="author" className="text-sm font-medium">
                    Author<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={handleChange}
                    placeholder="e.g., Amit Schandillia"
                    className="border-zinc-300 dark:border-zinc-700 focus-visible:ring-brand-500" // Make sure brand colors are defined
                    required // Added basic HTML5 required attribute
                  />
                </div>
                {/* Title Input */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    Title<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., The Idea of India"
                    className="border-zinc-300 dark:border-zinc-700 focus-visible:ring-brand-500" // Make sure brand colors are defined
                    required // Added basic HTML5 required attribute
                  />
                </div>
                {/* Publisher Input */}
                <div className="space-y-2">
                  <Label htmlFor="publisher" className="text-sm font-medium">
                    Publisher
                  </Label>
                  <Input
                    id="publisher"
                    value={formData.publisher}
                    onChange={handleChange}
                    placeholder="e.g., Penguin Books"
                    className="border-zinc-300 dark:border-zinc-700 focus-visible:ring-brand-500" // Make sure brand colors are defined
                  />
                </div>
                {/* Year Input */}
                <div className="space-y-2">
                  <Label htmlFor="year" className="text-sm font-medium">
                    Year
                  </Label>
                  <Input
                    id="year"
                    value={formData.year}
                    onChange={handleChange}
                    placeholder="e.g., 2021"
                    type="number" // Keep type="number" for basic validation
                    min="1000" // Optional: Add min/max for year
                    max={new Date().getFullYear()} // Optional: Set max to current year
                    className="border-zinc-300 dark:border-zinc-700 focus-visible:ring-brand-500" // Make sure brand colors are defined
                  />
                </div>
              </div>

              {/* URL Input */}
              <div className="space-y-2">
                <Label htmlFor="url" className="text-sm font-medium">
                  URL (optional)
                </Label>
                <Input
                  id="url"
                  value={formData.url}
                  onChange={handleChange}
                  placeholder="e.g., https://example.com"
                  type="url" // Use type="url" for basic validation
                  className="border-zinc-300 dark:border-zinc-700 focus-visible:ring-brand-500" // Make sure brand colors are defined
                />
              </div>

              {/* Notes Textarea */}
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-sm font-medium">
                  Notes (optional)
                </Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Any additional notes..."
                  rows={3}
                  className="border-zinc-300 dark:border-zinc-700 focus-visible:ring-brand-500 resize-none" // Make sure brand colors are defined
                />
              </div>

              {/* Citation Style Select */}
              <div className="space-y-2">
                <Label htmlFor="style" className="text-sm font-medium">
                  Citation Style
                </Label>
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger className="border-zinc-300 dark:border-zinc-700 focus:ring-brand-500">
                    {" "}
                    {/* Make sure brand colors are defined */}
                    <SelectValue placeholder="Select Style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MLA">MLA</SelectItem>
                    <SelectItem value="APA">APA</SelectItem>
                    <SelectItem value="Chicago">Chicago</SelectItem>
                    <SelectItem value="Harvard">Harvard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Generate Button */}
              <Button
                variant="brand"
                size="lg"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full"
              >
                {isGenerating ? (
                  <span className="flex items-center justify-center">
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
                    Generating...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    Generate Citation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                )}
              </Button>
            </div>

            {/* Result side */}
            <div
              id="citation-result"
              className="p-6 md:col-span-2 flex flex-col bg-zinc-50 dark:bg-zinc-900"
            >
              <h3 className="text-lg font-medium mb-3 text-zinc-900 dark:text-zinc-100">
                Your Citation
              </h3>

              {/* Citation Display Area */}
              <div className="flex-1 flex flex-col justify-center min-h-[100px]">
                {" "}
                {/* Added min-height */}
                {citation ? (
                  <div className="relative animate-in fade-in slide-in-from-bottom-5 duration-500">
                    <div className="p-4 rounded-md bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100 shadow-sm break-words">
                      {" "}
                      {/* Added break-words */}
                      {citation}
                    </div>

                    {/* Copy Button with Tooltip */}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            onClick={handleCopy}
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2 h-8 w-8 p-0 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                            aria-label="Copy citation"
                          >
                            <ClipboardCopy className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{isCopied ? "Copied!" : "Copy to clipboard"}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                ) : (
                  // Placeholder when no citation is generated yet
                  <div className="text-center py-8 text-zinc-500 dark:text-zinc-400">
                    <BookOpen className="w-12 h-12 mx-auto mb-3 text-zinc-300 dark:text-zinc-600" />
                    <p className="text-sm">
                      Fill in the required fields and click "Generate Citation"
                      to see your formatted citation here.
                    </p>
                  </div>
                )}
              </div>

              {/* Style Indicator Footer */}
              <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Using{" "}
                  <span className="font-medium text-brand-600 dark:text-brand-400">
                    {" "}
                    {/* Make sure brand colors are defined */}
                    {style}
                  </span>{" "}
                  formatting style.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Page
