"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Visibility } from "@prisma/client"
import Image from "next/image"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Loader2, UploadCloud } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { profileSchema, type ProfileInput } from "@/lib/schemas/network"
import { toast } from "@/hooks/use-toast"

interface ProfileEditorProps {
  defaultValues?: ProfileInput & {
    interests?: string[]
    skills?: string[]
  }
}

export function ProfileEditor({ defaultValues }: ProfileEditorProps) {
  const form = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      program: defaultValues?.program ?? "",
      yearOfStudy: defaultValues?.yearOfStudy ?? undefined,
      gpa: defaultValues?.gpa ?? undefined,
      interests: defaultValues?.interests ?? [],
      skills: defaultValues?.skills ?? [],
      availability: defaultValues?.availability ?? "",
      bio: defaultValues?.bio ?? "",
      links: defaultValues?.links ?? [],
      avatarUrl: defaultValues?.avatarUrl,
      cvUrl: defaultValues?.cvUrl,
      visibility: defaultValues?.visibility ?? Visibility.AUTHENTICATED,
    },
  })

  const [interestInput, setInterestInput] = useState("")
  const [skillInput, setSkillInput] = useState("")
  const [linkInput, setLinkInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const [uploadingCv, setUploadingCv] = useState(false)

  const addToken = (name: "interests" | "skills", value: string) => {
    if (!value.trim()) return
    const list = form.getValues(name) ?? []
    if (!list.includes(value)) {
      form.setValue(name, [...list, value])
    }
  }

  const removeToken = (name: "interests" | "skills", value: string) => {
    form.setValue(
      name,
      (form.getValues(name) ?? []).filter((item) => item !== value),
    )
  }

  const addLink = (value: string) => {
    if (!value.trim()) return
    const list = form.getValues("links") ?? []
    if (!list.includes(value)) {
      form.setValue("links", [...list, value])
    }
  }

  const removeLink = (value: string) => {
    form.setValue(
      "links",
      (form.getValues("links") ?? []).filter((item) => item !== value),
    )
  }

  const uploadFile = async (file: File, kind: "avatar" | "cv") => {
    const controller = kind === "avatar" ? setUploadingAvatar : setUploadingCv
    controller(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      const response = await fetch(`/api/network/upload?kind=${kind}`, {
        method: "POST",
        body: formData,
      })
      const json = await response.json()
      if (!response.ok) throw new Error(json.error?.message ?? "Upload failed")
      if (kind === "avatar") {
        form.setValue("avatarUrl", json.data.url)
      } else {
        form.setValue("cvUrl", json.data.url)
      }
      toast({ title: "Uploaded", description: `${kind.toUpperCase()} ready` })
    } catch (error) {
      toast({ title: "Upload failed", description: (error as Error).message })
    } finally {
      controller(false)
    }
  }

  const submit = form.handleSubmit(async (values) => {
    const payload: ProfileInput = {
      ...values,
      yearOfStudy: Number.isFinite(values.yearOfStudy as number) ? values.yearOfStudy : undefined,
      gpa: Number.isFinite(values.gpa as number) ? values.gpa : undefined,
      program: values.program || undefined,
      availability: values.availability || undefined,
      bio: values.bio || undefined,
    }

    setLoading(true)
    try {
      const response = await fetch("/api/network/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const json = await response.json()
      if (!response.ok) throw new Error(json.error?.message ?? "Unable to save profile")
      toast({ title: "Profile updated", description: "Your research profile is live." })
    } catch (error) {
      toast({ title: "Could not save", description: (error as Error).message })
    } finally {
      setLoading(false)
    }
  })

  return (
    <form onSubmit={submit} className="space-y-6">
      <section className="grid gap-6 lg:grid-cols-[280px,1fr]">
        <div className="network-card flex flex-col gap-4 rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white">Identity</h3>
          <p className="text-sm text-white/70">
            Upload a square avatar and include a PDF CV to help professors understand your background.
          </p>
          <div className="flex flex-col items-center gap-4">
            {form.watch("avatarUrl") ? (
              <div className="relative h-32 w-32 overflow-hidden rounded-full border border-white/10">
                <Image src={form.watch("avatarUrl")!} alt="Avatar" fill className="object-cover" />
              </div>
            ) : (
              <div className="flex h-32 w-32 items-center justify-center rounded-full border border-dashed border-white/20 text-white/50">
                No avatar
              </div>
            )}
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/80 hover:bg-white/20">
              <UploadCloud className="h-4 w-4" />
              {uploadingAvatar ? "Uploading…" : "Upload Avatar"}
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0]
                  if (file) uploadFile(file, "avatar")
                }}
                disabled={uploadingAvatar}
              />
            </label>
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/80 hover:bg-white/20">
              <UploadCloud className="h-4 w-4" />
              {uploadingCv ? "Uploading CV…" : form.watch("cvUrl") ? "Replace CV" : "Upload CV"}
              <input
                type="file"
                accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0]
                  if (file) uploadFile(file, "cv")
                }}
                disabled={uploadingCv}
              />
            </label>
            {form.watch("cvUrl") && (
              <a
                href={form.watch("cvUrl")!}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-white/70 underline"
              >
                View current CV
              </a>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <Field label="Program">
            <Input
              placeholder="BSc Neuroscience"
              className="bg-white/10 text-white"
              {...form.register("program")}
            />
          </Field>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Year of study">
              <Input
                type="number"
                min={1}
                max={8}
                className="bg-white/10 text-white"
                {...form.register("yearOfStudy", { valueAsNumber: true })}
              />
            </Field>
            <Field label="GPA">
              <Input
                type="number"
                step="0.01"
                min={0}
                max={4}
                className="bg-white/10 text-white"
                {...form.register("gpa", { valueAsNumber: true })}
              />
            </Field>
          </div>

          <Field label="Availability">
            <Input
              placeholder="Summer 2025 • Part-time"
              className="bg-white/10 text-white"
              {...form.register("availability")}
            />
          </Field>

          <Field label="Interests">
            <TokenInput
              tokens={form.watch("interests") ?? []}
              inputValue={interestInput}
              onInputChange={setInterestInput}
              onAdd={() => {
                addToken("interests", interestInput.trim())
                setInterestInput("")
              }}
              onRemove={(value) => removeToken("interests", value)}
              placeholder="Add interest and press Enter"
            />
          </Field>

          <Field label="Skills">
            <TokenInput
              tokens={form.watch("skills") ?? []}
              inputValue={skillInput}
              onInputChange={setSkillInput}
              onAdd={() => {
                addToken("skills", skillInput.trim())
                setSkillInput("")
              }}
              onRemove={(value) => removeToken("skills", value)}
              placeholder="Add skill and press Enter"
            />
          </Field>

          <Field label="Links">
            <TokenInput
              tokens={form.watch("links") ?? []}
              inputValue={linkInput}
              onInputChange={setLinkInput}
              onAdd={() => {
                addLink(linkInput.trim())
                setLinkInput("")
              }}
              onRemove={removeLink}
              placeholder="https://portfolio.mcgill.ca"
            />
          </Field>

          <Field label="Bio">
            <Textarea
              rows={6}
              placeholder="Describe your research goals, experience, and aspirations."
              className="resize-none bg-white/10 text-white"
              {...form.register("bio")}
            />
          </Field>

          <Field label="Visibility">
            <Select
              value={form.watch("visibility") ?? Visibility.AUTHENTICATED}
              onValueChange={(value: Visibility) => form.setValue("visibility", value)}
            >
              <SelectTrigger className="bg-white/10 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[var(--net-bg)] text-white">
                <SelectItem value={Visibility.PUBLIC}>Public (all network members)</SelectItem>
                <SelectItem value={Visibility.AUTHENTICATED}>Authenticated students & faculty</SelectItem>
                <SelectItem value={Visibility.PROFESSORS_ONLY}>Faculty + Admin only</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>
      </section>

      <div className="flex justify-end border-t border-white/10 pt-4">
        <Button type="submit" disabled={loading} className="bg-[var(--net-accent)] text-white hover:bg-white/20">
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Save profile
        </Button>
      </div>
    </form>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-xs uppercase tracking-wide text-white/60">{label}</Label>
      {children}
    </div>
  )
}

interface TokenInputProps {
  tokens: string[]
  inputValue: string
  onInputChange: (value: string) => void
  onAdd: () => void
  onRemove: (value: string) => void
  placeholder?: string
}

function TokenInput({ tokens, inputValue, onInputChange, onAdd, onRemove, placeholder }: TokenInputProps) {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {tokens.map((token) => (
          <Badge
            key={token}
            className="rounded-full border border-white/15 bg-white/10 text-xs text-white hover:bg-white/20"
          >
            <button type="button" onClick={() => onRemove(token)}>
              {token} ×
            </button>
          </Badge>
        ))}
      </div>
      <Input
        value={inputValue}
        onChange={(event) => onInputChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault()
            onAdd()
          }
        }}
        placeholder={placeholder}
        className="bg-white/10 text-white"
      />
    </div>
  )
}
