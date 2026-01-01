import { NAV_GROUPS, NAV_ITEMS } from "@/lib/constants"

type Crumb = {
  href: string
  label: string
}

const BASE_TITLES = new Map<string, string>()

NAV_ITEMS.forEach((item) => {
  BASE_TITLES.set(item.href, item.title)
})

Object.entries(NAV_GROUPS).forEach(([groupTitle, links]) => {
  const parent = NAV_ITEMS.find((item) => item.title === groupTitle)
  if (parent) {
    links.forEach((link) => {
      BASE_TITLES.set(link.href, link.title)
    })
  }
})

const TITLE_OVERRIDES: Record<string, string> = {
  "/": "Home",
  "/events/cv-editing-drop-in": "CV Editing Drop-in",
  "/events/how-to-get-a-research-position": "How to Get a Research Position",
  "/events/mock-interviews": "Mock Interviews",
  "/team/executive-25-26": "Executive Team 25–26",
}

const ALWAYS_CAPS = new Set(["sri", "ircm", "cv", "db"])

function prettifySegment(segment: string): string {
  return segment
    .split("-")
    .map((word) => {
      if (!word) return word
      if (ALWAYS_CAPS.has(word.toLowerCase())) {
        return word.toUpperCase()
      }
      if (/^\d+$/.test(word)) {
        return word
      }
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(" ")
}

export function getBreadcrumbs(pathname: string | null | undefined): Crumb[] {
  if (!pathname) return []

  const [cleanPath] = pathname.split("?", 1)
  const segments = cleanPath.split("/").filter(Boolean)

  const crumbs: Crumb[] = []
  const seen = new Set<string>()

  const pushCrumb = (href: string, label: string) => {
    if (seen.has(href)) return
    seen.add(href)
    crumbs.push({ href, label })
  }

  const rootLabel = TITLE_OVERRIDES["/"] ?? BASE_TITLES.get("/") ?? "Home"
  pushCrumb("/", rootLabel)

  let currentPath = ""

  segments.forEach((segment) => {
    currentPath += `/${segment}`
    const exactTitle = TITLE_OVERRIDES[currentPath] ?? BASE_TITLES.get(currentPath)
    const label = exactTitle ?? prettifySegment(segment)
    pushCrumb(currentPath, label)
  })

  return crumbs
}
