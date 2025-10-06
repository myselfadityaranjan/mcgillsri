"use client"

import { useMemo, useState } from "react"
import useSWR from "swr"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SearchFilterBar } from "@/components/network/SearchFilterBar"
import { ProfileCard, type ProfileWithUser } from "@/components/network/ProfileCard"
import { AnimatedList } from "@/components/network/AnimatedList"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface DirectoryClientProps {
  initialProfiles: ProfileWithUser[]
  initialTotal: number
  pageSize: number
  role: string
}

type Filters = {
  q: string
  program: string
  availability: string
  interests: string[]
  skills: string[]
  page: number
}

const fetcher = async (url: string) => {
  const response = await fetch(url, { cache: "no-store" })
  const json = await response.json()
  if (!response.ok) {
    throw new Error(json.error?.message ?? "Unable to load directory")
  }
  return json.data as { profiles: ProfileWithUser[]; pagination: { total: number; page: number; pages: number } }
}

export function DirectoryClient({ initialProfiles, initialTotal, pageSize, role }: DirectoryClientProps) {
  const [filters, setFilters] = useState<Filters>({
    q: "",
    program: "",
    availability: "",
    interests: [],
    skills: [],
    page: 1,
  })

  const queryKey = useMemo(() => {
    const params = new URLSearchParams()
    if (filters.q) params.set("q", filters.q)
    if (filters.program) params.set("program", filters.program)
    if (filters.availability) params.set("availability", filters.availability)
    filters.interests.forEach((interest) => params.append("interests[]", interest))
    filters.skills.forEach((skill) => params.append("skills[]", skill))
    params.set("limit", String(pageSize))
    params.set("page", String(filters.page))
    return `/api/network/profiles?${params.toString()}`
  }, [filters, pageSize])

  const { data, error, isValidating } = useSWR(queryKey, fetcher, {
    keepPreviousData: true,
    fallbackData: {
      profiles: initialProfiles,
      pagination: {
        total: initialTotal,
        page: 1,
        pages: Math.ceil(initialTotal / pageSize),
      },
    },
  })

  const resetFilters = () =>
    setFilters({ q: "", program: "", availability: "", interests: [], skills: [], page: 1 })

  const addFilterToken = (key: "interests" | "skills", value: string) => {
    if (!value.trim()) return
    setFilters((prev) => {
      if (prev[key].includes(value)) return prev
      return { ...prev, [key]: [...prev[key], value], page: 1 }
    })
  }

  const removeFilterToken = (key: "interests" | "skills", value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].filter((item) => item !== value),
      page: 1,
    }))
  }

  const pagination = data?.pagination

  return (
    <div className="space-y-6">
      <SearchFilterBar
        query={filters.q}
        onQueryChange={(value) => setFilters((prev) => ({ ...prev, q: value, page: 1 }))}
        onReset={resetFilters}
        placeholder="Search students, skills, labs..."
        filters={
          <div className="flex flex-wrap gap-2">
            <Input
              value={filters.program}
              onChange={(event) => setFilters((prev) => ({ ...prev, program: event.target.value, page: 1 }))}
              placeholder="Program"
              className="h-10 w-40 border-white/20 bg-white/10 text-sm text-white"
            />
            <Input
              value={filters.availability}
              onChange={(event) => setFilters((prev) => ({ ...prev, availability: event.target.value, page: 1 }))}
              placeholder="Availability"
              className="h-10 w-40 border-white/20 bg-white/10 text-sm text-white"
            />
          </div>
        }
      />

      <div className="flex flex-wrap gap-2 text-xs uppercase tracking-wide text-white/60">
        <TokenEditor
          label="Interests"
          values={filters.interests}
          onAdd={(value) => addFilterToken("interests", value)}
          onRemove={(value) => removeFilterToken("interests", value)}
        />
        <TokenEditor
          label="Skills"
          values={filters.skills}
          onAdd={(value) => addFilterToken("skills", value)}
          onRemove={(value) => removeFilterToken("skills", value)}
        />
      </div>

      {error && <p className="rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200">{error.message}</p>}

      <AnimatedList
        className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
        items={data?.profiles ?? []}
        getKey={(item) => item.id}
        renderItem={(profile) => <ProfileCard profile={profile} />}
      />

      <div className="flex items-center justify-between border-t border-white/10 pt-4 text-sm text-white/70">
        <span>
          Showing {(data?.profiles.length ?? 0) + pageSize * (filters.page - 1)} of {pagination?.total ?? initialTotal}
        </span>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            disabled={filters.page <= 1 || isValidating}
            onClick={() => setFilters((prev) => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
            className="text-white/80 hover:text-white"
          >
            Prev
          </Button>
          <Badge className="border border-white/15 bg-white/10 text-white">
            {pagination?.page ?? 1}/{pagination?.pages ?? Math.ceil(initialTotal / pageSize) || 1}
          </Badge>
          <Button
            type="button"
            variant="ghost"
            disabled={(pagination?.page ?? 1) >= (pagination?.pages ?? 1) || isValidating}
            onClick={() => setFilters((prev) => ({ ...prev, page: prev.page + 1 }))}
            className="text-white/80 hover:text-white"
          >
            Next <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function TokenEditor({
  label,
  values,
  onAdd,
  onRemove,
}: {
  label: string
  values: string[]
  onAdd: (value: string) => void
  onRemove: (value: string) => void
}) {
  const [input, setInput] = useState("")
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-3 text-white/70">
      <span>{label}</span>
      <div className="flex flex-wrap gap-2">
        {values.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => onRemove(value)}
            className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white hover:bg-white/20"
          >
            {value} ×
          </button>
        ))}
      </div>
      <Input
        value={input}
        onChange={(event) => setInput(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault()
            onAdd(input.trim())
            setInput("")
          }
        }}
        placeholder={`Add ${label.toLowerCase()}…`}
        className="h-9 bg-white/10 text-xs text-white placeholder:text-white/50"
      />
    </div>
  )
}
