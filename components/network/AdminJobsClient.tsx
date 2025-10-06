"use client"

import { useEffect, useMemo, useState } from "react"
import useSWR from "swr"

import { JobEditor } from "@/components/network/JobEditor"
import { JobCard, type JobWithAuthor } from "@/components/network/JobCard"
import { AnimatedList } from "@/components/network/AnimatedList"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

interface AdminJobsClientProps {
  initialJobs: JobWithAuthor[]
  pageSize: number
  role: string
}

const fetcher = async (url: string) => {
  const response = await fetch(url, { cache: "no-store" })
  const json = await response.json()
  if (!response.ok) throw new Error(json.error?.message ?? "Unable to fetch jobs")
  return json.data as { jobs: JobWithAuthor[]; pagination: { page: number; pages: number; total: number } }
}

export function AdminJobsClient({ initialJobs, pageSize, role }: AdminJobsClientProps) {
  const [page, setPage] = useState(1)
  const queryKey = useMemo(() => `/api/network/jobs?page=${page}&limit=${pageSize}`, [page, pageSize])
  const { data, mutate, isValidating } = useSWR(queryKey, fetcher, {
    fallbackData: {
      jobs: initialJobs,
      pagination: {
        page: 1,
        pages: Math.ceil(initialJobs.length / pageSize) || 1,
        total: initialJobs.length,
      },
    },
  })

  const [editingJob, setEditingJob] = useState<JobWithAuthor | null>(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    if (!showForm) setEditingJob(null)
  }, [showForm])

  const refetch = () => mutate()

  const handleSaved = () => {
    setShowForm(false)
    setEditingJob(null)
    refetch()
  }

  const handleDelete = () => {
    setShowForm(false)
    setEditingJob(null)
    refetch()
  }

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-white">
              {editingJob ? "Edit posting" : "Create a new opportunity"}
            </h3>
            <p className="text-sm text-white/70">
              {role === "ADMIN"
                ? "Admins can manage all postings across the network."
                : "Professors can publish positions under their labs."}
            </p>
          </div>
          <Button
            variant="ghost"
            className="text-white/80 hover:text-white"
            onClick={() => {
              setShowForm((prev) => !prev)
              setEditingJob(null)
            }}
          >
            {showForm ? "Close" : "New posting"}
          </Button>
        </div>
        {showForm && (
          <div className="mt-6">
            <JobEditor job={editingJob ?? undefined} onSaved={handleSaved} onDelete={handleDelete} />
          </div>
        )}
      </div>

      <AnimatedList
        className="grid grid-cols-1 gap-5"
        items={data?.jobs ?? []}
        getKey={(job) => job.id}
        renderItem={(job) => (
          <JobCard
            job={job}
            footer={
              <div className="flex items-center justify-end gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/30 bg-white/10 text-white"
                  onClick={() => {
                    setEditingJob(job)
                    setShowForm(true)
                  }}
                >
                  Edit
                </Button>
              </div>
            }
          />
        )}
      />

      <div className="flex items-center justify-between border-t border-white/10 pt-4 text-sm text-white/70">
        <span>
          Page {data?.pagination.page ?? 1} of {data?.pagination.pages ?? 1}
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            disabled={page <= 1 || isValidating}
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            className="text-white/80 hover:text-white"
          >
            Prev
          </Button>
          <Button
            variant="ghost"
            disabled={(data?.pagination.page ?? 1) >= (data?.pagination.pages ?? 1) || isValidating}
            onClick={() => setPage((prev) => prev + 1)}
            className="text-white/80 hover:text-white"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
