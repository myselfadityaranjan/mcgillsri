"use client"

import { useMemo, useState } from "react"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { SearchFilterBar } from "@/components/network/SearchFilterBar"
import { JobCard, type JobWithAuthor } from "@/components/network/JobCard"
import { AnimatedList } from "@/components/network/AnimatedList"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

interface JobsClientProps {
  initialJobs: JobWithAuthor[]
  initialTotal: number
  pageSize: number
  canManage?: boolean
}

type JobFilters = {
  q: string
  department: string
  tags: string[]
  paid?: boolean
  page: number
}

const fetcher = async (url: string) => {
  const response = await fetch(url, { cache: "no-store" })
  const json = await response.json()
  if (!response.ok) throw new Error(json.error?.message ?? "Unable to fetch jobs")
  return json.data as { jobs: JobWithAuthor[]; pagination: { total: number; pages: number; page: number } }
}

export function JobsClient({ initialJobs, initialTotal, pageSize, canManage }: JobsClientProps) {
  const [filters, setFilters] = useState<JobFilters>({ q: "", department: "", tags: [], page: 1 })

  const queryKey = useMemo(() => {
    const params = new URLSearchParams()
    if (filters.q) params.set("q", filters.q)
    if (filters.department) params.set("department", filters.department)
    if (typeof filters.paid === "boolean") params.set("paid", String(filters.paid))
    filters.tags.forEach((tag) => params.append("tags[]", tag))
    params.set("limit", String(pageSize))
    params.set("page", String(filters.page))
    return `/api/network/jobs?${params.toString()}`
  }, [filters, pageSize])

  const { data, isValidating, error, mutate } = useSWR(queryKey, fetcher, {
    keepPreviousData: true,
    fallbackData: {
      jobs: initialJobs,
      pagination: {
        total: initialTotal,
        page: 1,
        pages: Math.ceil(initialTotal / pageSize),
      },
    },
  })

  const reset = () => setFilters({ q: "", department: "", tags: [], paid: undefined, page: 1 })

  const removeTag = (value: string) =>
    setFilters((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== value),
      page: 1,
    }))

  return (
    <div className="space-y-6">
      <SearchFilterBar
        query={filters.q}
        onQueryChange={(value) => setFilters((prev) => ({ ...prev, q: value, page: 1 }))}
        onReset={reset}
        placeholder="Search job titles, labs, skills"
        filters={
          <div className="flex flex-wrap items-center gap-2">
            <Input
              value={filters.department}
              placeholder="Department"
              className="h-10 w-40 border-white/20 bg-white/10 text-sm text-white"
              onChange={(event) => setFilters((prev) => ({ ...prev, department: event.target.value, page: 1 }))}
            />
            <Button
              type="button"
              variant={filters.paid ? "default" : "outline"}
              className="h-10 border-white/25 bg-white/10 text-xs uppercase tracking-wide text-white"
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  paid: prev.paid === undefined ? true : prev.paid ? undefined : true,
                  page: 1,
                }))
              }
            >
              {filters.paid ? "Paid Only" : "All Roles"}
            </Button>
          </div>
        }
      />

      <TagInput
        label="Tags"
        values={filters.tags}
        onAdd={(value) =>
          setFilters((prev) => {
            const trimmed = value.trim()
            if (!trimmed || prev.tags.includes(trimmed)) return prev
            return { ...prev, tags: [...prev.tags, trimmed], page: 1 }
          })
        }
        onRemove={removeTag}
      />

      {error && <p className="rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200">{error.message}</p>}

      <AnimatedList
        className="grid grid-cols-1 gap-5 lg:grid-cols-2"
        items={data?.jobs ?? []}
        getKey={(job) => job.id}
        renderItem={(job) => <JobCard job={job} />}
      />

      <div className="flex items-center justify-between border-t border-white/10 pt-4 text-sm text-white/70">
        <span>
          Showing {(data?.jobs.length ?? 0) + pageSize * (filters.page - 1)} of {data?.pagination.total ?? initialTotal}
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            disabled={filters.page <= 1 || isValidating}
            onClick={() => setFilters((prev) => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
            className="text-white/80 hover:text-white"
          >
            Prev
          </Button>
          <Badge className="border border-white/15 bg-white/10 text-white">
            {data?.pagination.page ?? 1}/{data?.pagination.pages ?? Math.ceil(initialTotal / pageSize) || 1}
          </Badge>
          <Button
            variant="ghost"
            disabled={(data?.pagination.page ?? 1) >= (data?.pagination.pages ?? 1) || isValidating}
            onClick={() => setFilters((prev) => ({ ...prev, page: prev.page + 1 }))}
            className="text-white/80 hover:text-white"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

function TagInput({
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
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-white/60">
        <span>{label}</span>
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
        placeholder="Add tag and press Enter"
        className="mt-2 bg-white/10 text-white"
      />
    </div>
  )
}
