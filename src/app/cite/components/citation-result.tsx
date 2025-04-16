"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ClipboardCopy, BookOpen } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"

interface CitationResultProps {
  citation: string
}

export function CitationResult({ citation }: CitationResultProps) {
  const [isCopied, setIsCopied] = useState(false)

  // Copy citation to clipboard
  const handleCopy = () => {
    if (!citation) return

    navigator.clipboard
      .writeText(citation)
      .then(() => {
        setIsCopied(true)
        toast.success("Copied to clipboard", {
          description: "Citation has been copied to your clipboard.",
        })
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
    <div id="citation-result" className="p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
          Your Citation
        </h3>
        {citation && (
          <Badge
            variant="outline"
            className="bg-brand-50 text-brand-700 border-brand-200 dark:bg-brand-900/20 dark:text-brand-400 dark:border-brand-800"
          >
            Ready to use
          </Badge>
        )}
      </div>

      {/* Citation Display Area */}
      <div className="flex-1 flex flex-col justify-center min-h-[200px]">
        {citation ? (
          <div className="relative animate-in fade-in slide-in-from-bottom-5 duration-500">
            <div className="p-4 rounded-md bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100 shadow-sm break-words">
              {citation}
            </div>

            {/* Copy Button with Tooltip */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={handleCopy}
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2 h-8 w-8 p-0 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-700 border-zinc-200 dark:border-zinc-700"
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
          <div className="text-center py-8 text-muted-foreground">
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p className="text-sm">
              Fill in the required fields and click "Generate Citation" to see
              your formatted citation here.
            </p>
            <p className="text-xs mt-2 max-w-md mx-auto">
              Your citation will be formatted according to the selected style
              and can be copied to your clipboard with a single click.
            </p>
          </div>
        )}
      </div>

      {/* Tips section */}
      {!citation && (
        <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2">
            Citation Tips:
          </p>
          <ul className="text-xs text-zinc-500 dark:text-zinc-400 space-y-1">
            <li>• Enter at least the author's last name and title</li>
            <li>• Include as much publication information as possible</li>
            <li>• Select the appropriate document type for accuracy</li>
            <li>
              • Different citation styles have different formatting requirements
            </li>
          </ul>
        </div>
      )}

      {/* Citation Style Footer - only show when citation exists */}
      {citation && (
        <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Looking for another format? Change the citation style in the form.
          </p>
        </div>
      )}
    </div>
  )
}
