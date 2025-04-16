import { Dispatch, SetStateAction } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Citation,
  DocumentType,
  BookCitation,
  BookSectionCitation,
  JournalArticleCitation,
  NewspaperArticleCitation,
  WebsiteCitation,
  ThesisCitation,
  ConferenceCitation,
} from "../types"

interface DocumentTypeFieldsProps {
  documentType: DocumentType
  formData: Partial<Citation>
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  setFormData: Dispatch<SetStateAction<Partial<Citation>>>
}

export function DocumentTypeFields({
  documentType,
  formData,
  handleChange,
  setFormData,
}: DocumentTypeFieldsProps) {
  // Helper function for select changes
  const handleSelectChange = (value: string, field: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Book specific fields
  if (documentType === "book") {
    const bookData = formData as Partial<BookCitation>
    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="edition" className="text-sm font-medium">
              Edition
            </Label>
            <Input
              id="edition"
              value={bookData.edition || ""}
              onChange={handleChange}
              placeholder="e.g., 2nd"
              className="border-zinc-300 dark:border-zinc-700"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="isbn" className="text-sm font-medium">
              ISBN
            </Label>
            <Input
              id="isbn"
              value={bookData.isbn || ""}
              onChange={handleChange}
              placeholder="ISBN number"
              className="border-zinc-300 dark:border-zinc-700"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="series" className="text-sm font-medium">
              Series
            </Label>
            <Input
              id="series"
              value={bookData.series || ""}
              onChange={handleChange}
              placeholder="Series name"
              className="border-zinc-300 dark:border-zinc-700"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="seriesNumber" className="text-sm font-medium">
              Series Number
            </Label>
            <Input
              id="seriesNumber"
              value={bookData.seriesNumber || ""}
              onChange={handleChange}
              placeholder="Series number"
              className="border-zinc-300 dark:border-zinc-700"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="volume" className="text-sm font-medium">
              Volume
            </Label>
            <Input
              id="volume"
              value={bookData.volume || ""}
              onChange={handleChange}
              placeholder="Volume number"
              className="border-zinc-300 dark:border-zinc-700"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="totalVolumes" className="text-sm font-medium">
              Total Volumes
            </Label>
            <Input
              id="totalVolumes"
              value={bookData.totalVolumes || ""}
              onChange={handleChange}
              placeholder="Total volumes"
              className="border-zinc-300 dark:border-zinc-700"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="language" className="text-sm font-medium">
              Language
            </Label>
            <Input
              id="language"
              value={bookData.language || ""}
              onChange={handleChange}
              placeholder="Language"
              className="border-zinc-300 dark:border-zinc-700"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pages" className="text-sm font-medium">
              Pages
            </Label>
            <Input
              id="pages"
              value={bookData.pages || ""}
              onChange={handleChange}
              placeholder="Page range"
              className="border-zinc-300 dark:border-zinc-700"
            />
          </div>
        </div>
      </>
    )
  }

  // Book Section specific fields
  if (documentType === "bookSection") {
    const bookSectionData = formData as Partial<BookSectionCitation>
    return (
      <>
        <div className="space-y-2">
          <Label htmlFor="bookTitle" className="text-sm font-medium">
            Book Title<span className="text-red-500">*</span>
          </Label>
          <Input
            id="bookTitle"
            value={bookSectionData.bookTitle || ""}
            onChange={handleChange}
            placeholder="Title of the book"
            className="border-zinc-300 dark:border-zinc-700"
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="edition" className="text-sm font-medium">
              Edition
            </Label>
            <Input
              id="edition"
              value={bookSectionData.edition || ""}
              onChange={handleChange}
              placeholder="e.g., 2nd"
              className="border-zinc-300 dark:border-zinc-700"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pages" className="text-sm font-medium">
              Pages
            </Label>
            <Input
              id="pages"
              value={bookSectionData.pages || ""}
              onChange={handleChange}
              placeholder="Page range"
              className="border-zinc-300 dark:border-zinc-700"
            />
          </div>
        </div>
      </>
    )
  }

  // Journal Article specific fields
  if (documentType === "journalArticle") {
    const journalData = formData as Partial<JournalArticleCitation>
    return (
      <>
        <div className="space-y-2">
          <Label htmlFor="journalTitle" className="text-sm font-medium">
            Journal Title<span className="text-red-500">*</span>
          </Label>
          <Input
            id="journalTitle"
            value={journalData.journalTitle || ""}
            onChange={handleChange}
            placeholder="Title of the journal"
            className="border-zinc-300 dark:border-zinc-700"
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="volume" className="text-sm font-medium">
              Volume
            </Label>
            <Input
              id="volume"
              value={journalData.volume || ""}
              onChange={handleChange}
              placeholder="Volume number"
              className="border-zinc-300 dark:border-zinc-700"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="issue" className="text-sm font-medium">
              Issue
            </Label>
            <Input
              id="issue"
              value={journalData.issue || ""}
              onChange={handleChange}
              placeholder="Issue number"
              className="border-zinc-300 dark:border-zinc-700"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pages" className="text-sm font-medium">
              Pages
            </Label>
            <Input
              id="pages"
              value={journalData.pages || ""}
              onChange={handleChange}
              placeholder="Page range"
              className="border-zinc-300 dark:border-zinc-700"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="doi" className="text-sm font-medium">
            DOI
          </Label>
          <Input
            id="doi"
            value={journalData.doi || ""}
            onChange={handleChange}
            placeholder="Digital Object Identifier"
            className="border-zinc-300 dark:border-zinc-700"
          />
        </div>
      </>
    )
  }

  // Newspaper Article specific fields
  if (documentType === "newspaperArticle") {
    const newspaperData = formData as Partial<NewspaperArticleCitation>
    return (
      <>
        <div className="space-y-2">
          <Label htmlFor="newspaperTitle" className="text-sm font-medium">
            Newspaper Title<span className="text-red-500">*</span>
          </Label>
          <Input
            id="newspaperTitle"
            value={newspaperData.newspaperTitle || ""}
            onChange={handleChange}
            placeholder="Title of the newspaper"
            className="border-zinc-300 dark:border-zinc-700"
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="section" className="text-sm font-medium">
              Section
            </Label>
            <Input
              id="section"
              value={newspaperData.section || ""}
              onChange={handleChange}
              placeholder="e.g., Business, Opinion"
              className="border-zinc-300 dark:border-zinc-700"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pages" className="text-sm font-medium">
              Pages
            </Label>
            <Input
              id="pages"
              value={newspaperData.pages || ""}
              onChange={handleChange}
              placeholder="Page range"
              className="border-zinc-300 dark:border-zinc-700"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="edition" className="text-sm font-medium">
            Edition
          </Label>
          <Input
            id="edition"
            value={newspaperData.edition || ""}
            onChange={handleChange}
            placeholder="e.g., Morning Edition"
            className="border-zinc-300 dark:border-zinc-700"
          />
        </div>
      </>
    )
  }

  // Website specific fields
  if (documentType === "website") {
    const websiteData = formData as Partial<WebsiteCitation>
    return (
      <>
        <div className="space-y-2">
          <Label htmlFor="websiteTitle" className="text-sm font-medium">
            Website Title
          </Label>
          <Input
            id="websiteTitle"
            value={websiteData.websiteTitle || ""}
            onChange={handleChange}
            placeholder="Name of the website"
            className="border-zinc-300 dark:border-zinc-700"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="accessed" className="text-sm font-medium">
            Date Accessed<span className="text-red-500">*</span>
          </Label>
          <Input
            id="accessed"
            value={websiteData.accessed || ""}
            onChange={handleChange}
            type="date"
            className="border-zinc-300 dark:border-zinc-700"
            required
          />
        </div>
      </>
    )
  }

  // Thesis specific fields
  if (documentType === "thesis") {
    const thesisData = formData as Partial<ThesisCitation>
    return (
      <>
        <div className="space-y-2">
          <Label htmlFor="university" className="text-sm font-medium">
            University<span className="text-red-500">*</span>
          </Label>
          <Input
            id="university"
            value={thesisData.university || ""}
            onChange={handleChange}
            placeholder="University name"
            className="border-zinc-300 dark:border-zinc-700"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="thesisType" className="text-sm font-medium">
            Thesis Type<span className="text-red-500">*</span>
          </Label>
          <Select
            defaultValue="phd-dissertation"
            value={thesisData.thesisType || undefined}
            onValueChange={(value) => handleSelectChange(value, "thesisType")}
          >
            <SelectTrigger className="border-zinc-300 dark:border-zinc-700">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="phd-dissertation">PhD Dissertation</SelectItem>
              <SelectItem value="masters-thesis">Master's Thesis</SelectItem>
              <SelectItem value="bachelors-thesis">
                Bachelor's Thesis
              </SelectItem>
              <SelectItem value="doctoral-thesis">Doctoral Thesis</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </>
    )
  }

  // Conference Paper specific fields
  if (documentType === "conference") {
    const conferenceData = formData as Partial<ConferenceCitation>
    return (
      <>
        <div className="space-y-2">
          <Label htmlFor="conferenceName" className="text-sm font-medium">
            Conference Name<span className="text-red-500">*</span>
          </Label>
          <Input
            id="conferenceName"
            value={conferenceData.conferenceName || ""}
            onChange={handleChange}
            placeholder="Name of the conference"
            className="border-zinc-300 dark:border-zinc-700"
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="conferenceLocation" className="text-sm font-medium">
              Conference Location<span className="text-red-500">*</span>
            </Label>
            <Input
              id="conferenceLocation"
              value={conferenceData.conferenceLocation || ""}
              onChange={handleChange}
              placeholder="Location of the conference"
              className="border-zinc-300 dark:border-zinc-700"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pages" className="text-sm font-medium">
              Pages
            </Label>
            <Input
              id="pages"
              value={conferenceData.pages || ""}
              onChange={handleChange}
              placeholder="Page range"
              className="border-zinc-300 dark:border-zinc-700"
            />
          </div>
        </div>
      </>
    )
  }

  // Default empty return if no document type matches
  return null
}
