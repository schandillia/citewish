import React from "react"
import Link from "next/link"
import { Wrapper } from "@/components/wrapper"
import { buttonVariants } from "@/components/ui/button"
import brand from "@/lib/data/brand.json"
import ThemeToggle from "@/components/theme/theme-toggle"

// Get the current year dynamically
const d = new Date()

interface LinkItem {
  id: string // Unique identifier for the link (used for URL routing)
  text: string // Text to be displayed for the link
}

// Links for footer
const links: LinkItem[] = [
  { id: "privacy", text: "Privacy" },
  { id: "terms", text: "Terms" },
  { id: "sitemap", text: "Site Map" },
  { id: "contact", text: "Contact" },
]

export default function Footer() {
  return (
    <footer
      className="w-full border-t border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-brand-900/75 text-sm text-soft dark:text-white/70"
      role="contentinfo"
    >
      <Wrapper>
        <div className="flex flex-col sm:flex-row py-6 sm:py-4 items-center justify-between">
          {/* Copyright Section */}
          <div className="mb-4 sm:mb-0">
            <span className="text-gray-600 dark:text-gray-300">
              &copy; {d.getFullYear()} {brand.COMPANY}
            </span>
          </div>

          {/* Footer Links Section */}
          <div className="flex items-center">
            <nav className="flex flex-wrap justify-center sm:justify-end gap-1 sm:gap-0">
              {links.map((link, index) => (
                <React.Fragment key={link.id}>
                  <Link
                    href={`/${link.id}`}
                    className={buttonVariants({
                      variant: "link",
                      size: "sm",
                      className: "dark:text-brand-50 px-3",
                    })}
                    aria-label={`Go to ${link.text} page`}
                  >
                    {link.text}
                  </Link>

                  {/* Divider */}
                  {index !== links.length - 1 && (
                    <div
                      className="hidden sm:block border-l border-gray-300 dark:border-gray-500 h-5"
                      aria-hidden="true"
                    />
                  )}
                </React.Fragment>
              ))}
            </nav>

            <div className="ml-2 mt-0">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </Wrapper>
    </footer>
  )
}
