import { Citation, DocumentType, CitationStyle } from "../types"

// Format citation based on citation style and document type
export function formatCitation(citation: Citation): string {
  const { style, documentType } = citation

  switch (style) {
    case "MLA":
      return formatMLA(citation)
    case "APA":
      return formatAPA(citation)
    case "Chicago":
      return formatChicago(citation)
    case "Harvard":
      return formatHarvard(citation)
    default:
      return "Citation style not supported."
  }
}

// MLA Citation Format
function formatMLA(citation: Citation): string {
  // Common formatting
  let result = ""

  // Author formatting
  if (citation.author) {
    const { firstName, lastName, title } = citation.author
    if (lastName) {
      result += lastName
      if (firstName) {
        result += ", " + firstName
      }
      result += ". "
    }
  }

  // Handle different document types
  switch (citation.documentType) {
    case "book":
      result += formatMLABook(citation)
      break
    case "bookSection":
      result += formatMLABookSection(citation)
      break
    case "journalArticle":
      result += formatMLAJournal(citation)
      break
    case "newspaperArticle":
      result += formatMLANewspaper(citation)
      break
    case "website":
      result += formatMLAWebsite(citation)
      break
    case "thesis":
      result += formatMLAThesis(citation)
      break
    case "conference":
      result += formatMLAConference(citation)
      break
  }

  return result
}

// MLA specific formatters
function formatMLABook(citation: any): string {
  let result = ""

  // Title
  result += `"${citation.title}." `

  // Translator if available
  if (citation.translator?.lastName) {
    result += `Translated by ${citation.translator.firstName || ""} ${
      citation.translator.lastName
    }, `
  }

  // Edition if available
  if (citation.edition) {
    result += `${citation.edition} ed., `
  }

  // Publisher information
  if (citation.publisher) {
    result += citation.publisher
    if (citation.year) {
      result += `, ${citation.year}`
    }
    result += ". "
  } else if (citation.year) {
    result += `${citation.year}. `
  }

  return result
}

function formatMLABookSection(citation: any): string {
  let result = ""

  // Title of section
  result += `"${citation.title}." `

  // Book title
  if (citation.bookTitle) {
    result += `${citation.bookTitle}, `
  }

  // Publisher information
  if (citation.publisher) {
    result += citation.publisher
    if (citation.year) {
      result += `, ${citation.year}`
    }
    result += ". "
  } else if (citation.year) {
    result += `${citation.year}. `
  }

  // Pages if available
  if (citation.pages) {
    result += `pp. ${citation.pages}. `
  }

  return result
}

function formatMLAJournal(citation: any): string {
  let result = ""

  // Article title
  result += `"${citation.title}." `

  // Journal title
  if (citation.journalTitle) {
    result += `${citation.journalTitle}, `
  }

  // Volume and issue
  if (citation.volume) {
    result += `vol. ${citation.volume}`
    if (citation.issue) {
      result += `, no. ${citation.issue}`
    }
    result += ", "
  } else if (citation.issue) {
    result += `no. ${citation.issue}, `
  }

  // Year
  if (citation.year) {
    result += `${citation.year}, `
  }

  // Pages
  if (citation.pages) {
    result += `pp. ${citation.pages}. `
  }

  // DOI
  if (citation.doi) {
    result += `DOI: ${citation.doi}`
  }

  return result
}

function formatMLANewspaper(citation: any): string {
  let result = ""

  // Article title
  result += `"${citation.title}." `

  // Newspaper title
  if (citation.newspaperTitle) {
    result += `${citation.newspaperTitle}, `
  }

  // Date
  if (citation.year) {
    result += `${citation.year}, `
  }

  // Section
  if (citation.section) {
    result += `${citation.section}, `
  }

  // Pages
  if (citation.pages) {
    result += `p. ${citation.pages}. `
  }

  return result
}

function formatMLAWebsite(citation: any): string {
  let result = ""

  // Title
  result += `"${citation.title}." `

  // Website title
  if (citation.websiteTitle) {
    result += `${citation.websiteTitle}, `
  }

  // Publisher
  if (citation.publisher) {
    result += `${citation.publisher}, `
  }

  // Date
  if (citation.year) {
    result += `${citation.year}, `
  }

  // URL
  if (citation.url) {
    result += `${citation.url}. `
  }

  // Accessed date
  if (citation.accessed) {
    result += `Accessed ${formatDate(citation.accessed)}. `
  }

  return result
}

function formatMLAThesis(citation: any): string {
  let result = ""

  // Title
  result += `"${citation.title}." `

  // Thesis type
  if (citation.thesisType) {
    result += `${citation.thesisType}, `
  }

  // University
  if (citation.university) {
    result += `${citation.university}, `
  }

  // Year
  if (citation.year) {
    result += `${citation.year}. `
  }

  return result
}

function formatMLAConference(citation: any): string {
  let result = ""

  // Title
  result += `"${citation.title}." `

  // Conference name
  if (citation.conferenceName) {
    result += `${citation.conferenceName}, `
  }

  // Location
  if (citation.conferenceLocation) {
    result += `${citation.conferenceLocation}, `
  }

  // Date
  if (citation.year) {
    result += `${citation.year}. `
  }

  return result
}

// APA Citation Format
function formatAPA(citation: Citation): string {
  // Basic implementation, would need to expand based on document type
  let result = ""

  // Author formatting
  if (citation.author) {
    const { firstName, lastName } = citation.author
    if (lastName) {
      result += lastName
      if (firstName) {
        result += `, ${firstName.charAt(0)}.`
      }
      result += " "
    }
  }

  // Year
  if (citation.year) {
    result += `(${citation.year}). `
  }

  // Title (italicized for books, regular for articles)
  if (citation.documentType === "book" || citation.documentType === "thesis") {
    result += `${citation.title}. `
  } else {
    result += `${citation.title}. `
  }

  // Additional details based on document type
  // (This would need to be expanded for a full implementation)

  return result
}

// Chicago Citation Format
function formatChicago(citation: Citation): string {
  // Basic implementation, would need to expand based on document type
  let result = ""

  // Author formatting
  if (citation.author) {
    const { firstName, lastName } = citation.author
    if (lastName) {
      result += `${lastName}, ${firstName}. `
    }
  }

  // Title (italicized for books, quotes for articles)
  if (citation.documentType === "book" || citation.documentType === "thesis") {
    result += `${citation.title}. `
  } else {
    result += `"${citation.title}." `
  }

  // Publisher and place
  if (citation.place || citation.publisher) {
    if (citation.place) {
      result += `${citation.place}: `
    }
    if (citation.publisher) {
      result += `${citation.publisher}, `
    }
  }

  // Year
  if (citation.year) {
    result += `${citation.year}. `
  }

  return result
}

// Harvard Citation Format
function formatHarvard(citation: Citation): string {
  // Basic implementation, would need to expand based on document type
  let result = ""

  // Author formatting
  if (citation.author) {
    const { firstName, lastName } = citation.author
    if (lastName) {
      result += lastName
      if (firstName) {
        result += `, ${firstName.charAt(0)}.`
      }
      result += " "
    }
  }

  // Year
  if (citation.year) {
    result += `(${citation.year}) `
  }

  // Title
  result += `'${citation.title}', `

  // Additional details based on document type
  // (This would need to be expanded for a full implementation)

  return result
}

// Helper function to format dates
function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  } catch {
    return dateString
  }
}
