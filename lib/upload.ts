import crypto from "node:crypto"
import { promises as fs } from "node:fs"
import path from "node:path"

const uploadRoot = path.join(process.cwd(), "public", "uploads")

export type UploadKind = "avatar" | "cv"

type UploadConfig = {
  maxSize: number
  allowedTypes: string[]
  directory: string
}

const config: Record<UploadKind, UploadConfig> = {
  avatar: {
    maxSize: 2 * 1024 * 1024,
    allowedTypes: ["image/jpeg", "image/png", "image/webp"],
    directory: "avatars",
  },
  cv: {
    maxSize: 10 * 1024 * 1024,
    allowedTypes: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
    directory: "cvs",
  },
}

function sanitizeName(filename: string) {
  return filename.replace(/[^a-zA-Z0-9\.\-_]/g, "")
}

export async function ensureUploadDir(kind: UploadKind) {
  const dir = path.join(uploadRoot, config[kind].directory)
  await fs.mkdir(dir, { recursive: true })
  return dir
}

export async function saveFileLocally(file: File, kind: UploadKind) {
  const meta = config[kind]
  if (file.size > meta.maxSize) {
    throw new Error(`File too large. Max ${(meta.maxSize / (1024 * 1024)).toFixed(1)}MB`)
  }
  if (!meta.allowedTypes.includes(file.type)) {
    throw new Error("Unsupported file type")
  }

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const ext = guessExtension(file.name, file.type)
  const dir = await ensureUploadDir(kind)
  const fileName = `${crypto.randomUUID()}${ext}`
  const filePath = path.join(dir, fileName)
  await fs.writeFile(filePath, buffer)

  const relativeUrl = `/uploads/${config[kind].directory}/${fileName}`
  return {
    url: relativeUrl,
    size: file.size,
    name: sanitizeName(file.name) || `file${ext}`,
    type: file.type,
  }
}

function guessExtension(originalName: string, mime: string) {
  const existing = path.extname(originalName)
  if (existing) return existing
  switch (mime) {
    case "image/jpeg":
      return ".jpg"
    case "image/png":
      return ".png"
    case "image/webp":
      return ".webp"
    case "application/pdf":
      return ".pdf"
    case "application/msword":
      return ".doc"
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return ".docx"
    default:
      return ""
  }
}

export const isUploadthingEnabled = Boolean(
  process.env.UPLOADTHING_APP_ID && process.env.UPLOADTHING_SECRET,
)
