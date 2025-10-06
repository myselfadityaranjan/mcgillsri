"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import type { Job } from "@prisma/client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Loader2, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { jobSchema, type JobInput } from "@/lib/schemas/network"
import { toast } from "@/hooks/use-toast"

interface JobEditorProps {
  job?: Job
  onSaved?: (job: Job) => void
  onDelete?: (job: Job) => void
}

export function JobEditor({ job, onSaved, onDelete }: JobEditorProps) {
  const [loading, setLoading] = useState(false)
  const form = useForm<JobInput>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: job?.title ?? "",
      lab: job?.lab ?? "",
      department: job?.department ?? "",
      description: job?.description ?? "",
      tags: job?.tags ?? [],
      location: job?.location ?? "",
      commitment: job?.commitment ?? "",
      paid: job?.paid ?? false,
      applicationUrl: job?.applicationUrl ?? "",
      contactEmail: job?.contactEmail ?? "",
    },
  })

  const [tagInput, setTagInput] = useState("")

  const addTag = () => {
    if (!tagInput.trim()) return
    const value = tagInput.trim()
    const tags = form.getValues("tags") ?? []
    if (!tags.includes(value)) {
      form.setValue("tags", [...tags, value])
    }
    setTagInput("")
  }

  const removeTag = (value: string) => {
    form.setValue(
      "tags",
      (form.getValues("tags") ?? []).filter((tag) => tag !== value),
    )
  }

  const submit = form.handleSubmit(async (values) => {
    setLoading(true)
    try {
      const method = job ? "PATCH" : "POST"
      const url = job ? `/api/network/jobs/${job.id}` : "/api/network/jobs"
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      const json = await response.json()
      if (!response.ok) {
        throw new Error(json.error?.message ?? "Failed to save job")
      }
      onSaved?.(json.data)
      toast({ title: "Job saved", description: "Your posting is live" })
    } catch (error) {
      toast({ title: "Unable to save", description: (error as Error).message })
    } finally {
      setLoading(false)
    }
  })

  const handleDelete = async () => {
    if (!job) return
    setLoading(true)
    try {
      const response = await fetch(`/api/network/jobs/${job.id}`, { method: "DELETE" })
      const json = await response.json()
      if (!response.ok) throw new Error(json.error?.message ?? "Failed to delete")
      onDelete?.(job)
      toast({ title: "Job removed", description: "The posting is no longer visible." })
    } catch (error) {
      toast({ title: "Unable to delete", description: (error as Error).message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <Field label="Title" required>
        <Input placeholder="Research Assistant - Neuroscience" {...form.register("title")} className="bg-white/10 text-white" />
      </Field>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Lab / Group">
          <Input placeholder="Dawson Lab" {...form.register("lab")} className="bg-white/10 text-white" />
        </Field>
        <Field label="Department">
          <Input placeholder="Biochemistry" {...form.register("department")} className="bg-white/10 text-white" />
        </Field>
      </div>

      <Field label="Description" required>
        <Textarea
          rows={6}
          placeholder="Describe the project, expected contributions, and desired skills."
          className="resize-none bg-white/10 text-white"
          {...form.register("description")}
        />
      </Field>

      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Location">
          <Input placeholder="On-site / Hybrid / Remote" {...form.register("location")} className="bg-white/10 text-white" />
        </Field>
        <Field label="Commitment">
          <Input placeholder="10-15 hrs/week" {...form.register("commitment")} className="bg-white/10 text-white" />
        </Field>
        <Field label="Application URL">
          <Input placeholder="https://" {...form.register("applicationUrl")} className="bg-white/10 text-white" />
        </Field>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Contact email">
          <Input placeholder="professor@mcgill.ca" {...form.register("contactEmail")} className="bg-white/10 text-white" />
        </Field>
        <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
          <Checkbox checked={form.watch("paid")} onCheckedChange={(checked) => form.setValue("paid", Boolean(checked))} />
          Paid opportunity
        </label>
      </div>

      <Field label="Tags">
        <div className="flex flex-wrap gap-2">
          {(form.watch("tags") ?? []).map((tag) => (
            <button
              type="button"
              key={tag}
              onClick={() => removeTag(tag)}
              className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white hover:bg-white/15"
            >
              {tag} ×
            </button>
          ))}
        </div>
        <div className="mt-2 flex items-center gap-2">
          <Input
            value={tagInput}
            onChange={(event) => setTagInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault()
                addTag()
              }
            }}
            placeholder="Add tag and press Enter"
            className="bg-white/10 text-white"
          />
          <Button type="button" variant="outline" className="border-white/30 bg-white/10 text-white" onClick={addTag}>
            Add
          </Button>
        </div>
      </Field>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
        <div className="flex gap-3">
          <Button type="submit" disabled={loading} className="bg-[var(--net-accent)] text-white hover:bg-white/20">
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />} Save
          </Button>
          {job && (
            <Button type="button" variant="ghost" className="text-white/70 hover:text-white" onClick={handleDelete} disabled={loading}>
              Delete
            </Button>
          )}
        </div>
      </div>
    </form>
  )
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-xs uppercase tracking-wide text-white/60">
        {label}
        {required ? <span className="ml-1 text-red-300">*</span> : null}
      </Label>
      {children}
    </div>
  )
}
