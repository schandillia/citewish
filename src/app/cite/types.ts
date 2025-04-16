export type DocumentType =
  | "book"
  | "bookSection"
  | "journalArticle"
  | "newspaperArticle"
  | "website"
  | "thesis"
  | "conference"

export type CitationStyle = "MLA" | "APA" | "Chicago" | "Harvard"

export type Author = {
  title?: string
  firstName: string
  lastName: string
}

// Base citation type with common fields
export interface BaseCitation {
  style: CitationStyle
  documentType: DocumentType
  author: Author
  translator?: Author
  title: string
  year: string
  publisher?: string
  place?: string
  url?: string
  accessed?: string
  notes?: string
}

// Specific citation types with their unique fields
export interface BookCitation extends BaseCitation {
  documentType: "book"
  edition?: string
  series?: string
  seriesNumber?: string
  volume?: string
  totalVolumes?: string
  isbn?: string
  pages?: string
  language?: string
}

export interface BookSectionCitation extends BaseCitation {
  documentType: "bookSection"
  bookTitle: string
  edition?: string
  pages?: string
  isbn?: string
}

export interface JournalArticleCitation extends BaseCitation {
  documentType: "journalArticle"
  journalTitle: string
  volume?: string
  issue?: string
  pages?: string
  doi?: string
}

export interface NewspaperArticleCitation extends BaseCitation {
  documentType: "newspaperArticle"
  newspaperTitle: string
  section?: string
  pages?: string
  edition?: string
  issn?: string
}

export interface WebsiteCitation extends BaseCitation {
  documentType: "website"
  websiteTitle?: string
  accessed: string
}

export interface ThesisCitation extends BaseCitation {
  documentType: "thesis"
  university: string
  thesisType: string
}

export interface ConferenceCitation extends BaseCitation {
  documentType: "conference"
  conferenceName: string
  conferenceLocation: string
  pages?: string
}

export type Citation =
  | BookCitation
  | BookSectionCitation
  | JournalArticleCitation
  | NewspaperArticleCitation
  | WebsiteCitation
  | ThesisCitation
  | ConferenceCitation
