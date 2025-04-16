// citation-form.tsx

"use client"

import { useState, useEffect } from "react"
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
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { toast } from "sonner"
import { Citation, DocumentType, CitationStyle } from "../types"
import { DocumentTypeFields } from "./document-type-fields"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CitationFormProps {
  onGenerate: (data: Citation) => void
  isGenerating: boolean
  documentType: DocumentType
  setDocumentType: (type: DocumentType) => void
}

// Define a type for nested person objects
interface Person {
  title: string
  firstName: string
  lastName: string
}

export function CitationForm({
  onGenerate,
  isGenerating,
  documentType,
  setDocumentType,
}: CitationFormProps) {
  // Default initial state for any citation type
  const [formData, setFormData] = useState<Partial<Citation>>({
    style: "MLA",
    documentType: "book",
    author: {
      title: "",
      firstName: "",
      lastName: "",
    } as Person, // Explicitly type as Person
    translator: {
      title: "",
      firstName: "",
      lastName: "",
    } as Person, // Explicitly type as Person
    title: "",
    year: "",
    publisher: "",
    place: "",
    url: "",
    notes: "",
  })

  // Update form when document type changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      documentType,
    }))
  }, [documentType])

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target

    // Handle nested properties
    if (id.includes(".")) {
      const [parentKey, childKey] = id.split(".")
      setFormData((prev) => ({
        ...prev,
        [parentKey]: {
          ...((prev[parentKey as keyof typeof prev] as Record<
            string,
            unknown
          >) || {}),
          [childKey]: value,
        },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }))
    }
  }

  // Handle select changes
  const handleSelectChange = (value: string, field: string) => {
    if (field === "documentType") {
      setDocumentType(value as DocumentType)
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    if (!formData.author?.lastName || !formData.title) {
      toast.error("Missing information", {
        description: "Please fill in at least the author and title fields.",
      })
      return
    }

    // Call the onGenerate prop with the form data
    onGenerate(formData as Citation)
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      {/* Document Type Selector */}
      <div className="space-y-2">
        <Label htmlFor="documentType" className="text-sm font-medium">
          Document Type
        </Label>
        <Select
          value={documentType}
          onValueChange={(value) => handleSelectChange(value, "documentType")}
        >
          <SelectTrigger className="border-zinc-300 dark:border-zinc-700 focus:ring-brand-500">
            <SelectValue placeholder="Select document type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="book">Book</SelectItem>
            <SelectItem value="bookSection">Book Section</SelectItem>
            <SelectItem value="journalArticle">Journal Article</SelectItem>
            <SelectItem value="newspaperArticle">Newspaper Article</SelectItem>
            <SelectItem value="website">Website</SelectItem>
            <SelectItem value="thesis">Thesis</SelectItem>
            <SelectItem value="conference">Conference Paper</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Common Form Fields */}
      <Tabs defaultValue="author" className="w-full">
        <TabsList className="mb-4 w-full flex justify-start">
          <TabsTrigger value="author">Author & Title</TabsTrigger>
          <TabsTrigger value="publication">Publication</TabsTrigger>
          <TabsTrigger value="additional">Additional</TabsTrigger>
        </TabsList>

        <TabsContent value="author" className="space-y-6">
          {/* Author Fields */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Author</Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <Label htmlFor="author.title" className="sr-only">
                  Title
                </Label>
                <Select
                  value={formData.author?.title || ""}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      author: {
                        ...((prev.author as Person) || {
                          firstName: "",
                          lastName: "",
                        }),
                        title: value === "none" ? "" : value,
                      },
                    }))
                  }
                >
                  <SelectTrigger className="border-zinc-300 dark:border-zinc-700">
                    <SelectValue placeholder="Title" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="Dr.">Dr.</SelectItem>
                    <SelectItem value="Prof.">Prof.</SelectItem>
                    <SelectItem value="Mr.">Mr.</SelectItem>
                    <SelectItem value="Mrs.">Mrs.</SelectItem>
                    <SelectItem value="Ms.">Ms.</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="author.firstName" className="sr-only">
                  First Name
                </Label>
                <Input
                  id="author.firstName"
                  value={formData.author?.firstName || ""}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="border-zinc-300 dark:border-zinc-700"
                />
              </div>
              <div>
                <Label htmlFor="author.lastName" className="sr-only">
                  Last Name
                </Label>
                <Input
                  id="author.lastName"
                  value={formData.author?.lastName || ""}
                  onChange={handleChange}
                  placeholder="Last Name*"
                  className="border-zinc-300 dark:border-zinc-700"
                  required
                />
              </div>
            </div>
          </div>

          {/* Translator Fields */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Translator (optional)</Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <Label htmlFor="translator.title" className="sr-only">
                  Title
                </Label>
                <Select
                  value={formData.translator?.title || ""}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      translator: {
                        ...((prev.translator as Person) || {
                          firstName: "",
                          lastName: "",
                        }),
                        title: value === "none" ? "" : value,
                      },
                    }))
                  }
                >
                  <SelectTrigger className="border-zinc-300 dark:border-zinc-700">
                    <SelectValue placeholder="Title" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="Dr.">Dr.</SelectItem>
                    <SelectItem value="Prof.">Prof.</SelectItem>
                    <SelectItem value="Mr.">Mr.</SelectItem>
                    <SelectItem value="Mrs.">Mrs.</SelectItem>
                    <SelectItem value="Ms.">Ms.</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="translator.firstName" className="sr-only">
                  First Name
                </Label>
                <Input
                  id="translator.firstName"
                  value={formData.translator?.firstName || ""}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="border-zinc-300 dark:border-zinc-700"
                />
              </div>
              <div>
                <Label htmlFor="translator.lastName" className="sr-only">
                  Last Name
                </Label>
                <Input
                  id="translator.lastName"
                  value={formData.translator?.lastName || ""}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="border-zinc-300 dark:border-zinc-700"
                />
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Title<span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              value={formData.title || ""}
              onChange={handleChange}
              placeholder="Title of the work"
              className="border-zinc-300 dark:border-zinc-700"
              required
            />
          </div>
        </TabsContent>

        <TabsContent value="publication" className="space-y-6">
          {/* Document Type Specific Fields */}
          <DocumentTypeFields
            documentType={documentType}
            formData={formData}
            handleChange={handleChange}
            setFormData={setFormData}
          />

          {/* Publisher */}
          <div className="space-y-2">
            <Label htmlFor="publisher" className="text-sm font-medium">
              Publisher
            </Label>
            <Input
              id="publisher"
              value={formData.publisher || ""}
              onChange={handleChange}
              placeholder="Publisher name"
              className="border-zinc-300 dark:border-zinc-700"
            />
          </div>

          {/* Year & Place */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year" className="text-sm font-medium">
                Year
              </Label>
              <Input
                id="year"
                value={formData.year || ""}
                onChange={handleChange}
                placeholder="Publication year"
                type="number"
                className="border-zinc-300 dark:border-zinc-700"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="place" className="text-sm font-medium">
                Place
              </Label>
              <Input
                id="place"
                value={formData.place || ""}
                onChange={handleChange}
                placeholder="Publication place"
                className="border-zinc-300 dark:border-zinc-700"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="additional" className="space-y-6">
          {/* URL */}
          <div className="space-y-2">
            <Label htmlFor="url" className="text-sm font-medium">
              URL
            </Label>
            <Input
              id="url"
              value={formData.url || ""}
              onChange={handleChange}
              placeholder="https://example.com"
              type="url"
              className="border-zinc-300 dark:border-zinc-700"
            />
          </div>

          {/* Accessed Date */}
          <div className="space-y-2">
            <Label htmlFor="accessed" className="text-sm font-medium">
              Accessed
            </Label>
            <Input
              id="accessed"
              value={formData.accessed || ""}
              onChange={handleChange}
              type="date"
              className="border-zinc-300 dark:border-zinc-700"
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-medium">
              Notes
            </Label>
            <Textarea
              id="notes"
              value={formData.notes || ""}
              onChange={handleChange}
              placeholder="Additional notes..."
              rows={3}
              className="border-zinc-300 dark:border-zinc-700 resize-none"
            />
          </div>
        </TabsContent>
      </Tabs>

      {/* Citation Style Select */}
      <div className="space-y-2">
        <Label htmlFor="style" className="text-sm font-medium">
          Citation Style
        </Label>
        <Select
          value={formData.style}
          onValueChange={(value) => handleSelectChange(value, "style")}
        >
          <SelectTrigger className="border-zinc-300 dark:border-zinc-700">
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
        type="submit"
        variant="brand"
        size="lg"
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
    </form>
  )
}
