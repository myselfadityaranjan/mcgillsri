interface MarkdownProseProps {
  content: string
  className?: string
}

export function MarkdownProse({ content, className = "" }: MarkdownProseProps) {
  // Simple markdown-like formatting for the verbatim content
  const formatContent = (text: string) => {
    return text
      .split("\n\n")
      .map((paragraph, index) => {
        const trimmed = paragraph.trim()
        if (!trimmed) return null

        // Handle bullet points
        if (trimmed.includes("•") || trimmed.includes("*")) {
          const lines = trimmed.split("\n").filter((line) => line.trim())
          return (
            <ul key={index} className="list-disc list-inside space-y-2 text-neutral-200 leading-relaxed">
              {lines.map((line, lineIndex) => (
                <li key={lineIndex} className="ml-4">
                  {line.replace(/^[•*]\s*/, "")}
                </li>
              ))}
            </ul>
          )
        }

        // Handle headings (lines that are short and followed by content)
        const lines = trimmed.split("\n")
        if (lines.length > 1 && lines[0].length < 50 && !lines[0].includes(":")) {
          return (
            <div key={index} className="space-y-3">
              <h3 className="text-2xl font-semibold text-white">{lines[0]}</h3>
              <p className="text-neutral-200 leading-relaxed">{lines.slice(1).join(" ")}</p>
            </div>
          )
        }

        // Regular paragraph
        return (
          <p key={index} className="text-neutral-200 leading-relaxed">
            {trimmed}
          </p>
        )
      })
      .filter(Boolean)
  }

  return <div className={`prose prose-invert max-w-none space-y-6 ${className}`}>{formatContent(content)}</div>
}
