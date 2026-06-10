'use client'

import { useRef, useState } from 'react'
import { requestVideoUploadUrl } from '../../services/productService'

type VideoRef = { url: string; key: string }

type UploadState = {
  id: string
  filename: string
  progress: number
  error?: string
}

type Props = {
  productId?: string
  videos: VideoRef[]
  onChange: (videos: VideoRef[]) => void
  max?: number
}

const ALLOWED_MIMES: Record<string, 'video/mp4' | 'video/quicktime' | 'video/webm'> = {
  'video/mp4': 'video/mp4',
  'video/quicktime': 'video/quicktime',
  'video/webm': 'video/webm',
}

const MAX_BYTES = 50 * 1024 * 1024

function uuid(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export function VideoUploader({ productId, videos, onChange, max = 3 }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [uploads, setUploads] = useState<UploadState[]>([])

  const activeCount = videos.length + uploads.filter((u) => !u.error).length
  const canAddMore = activeCount < max

  function patchUpload(id: string, patch: Partial<UploadState>) {
    setUploads((current) => current.map((u) => (u.id === id ? { ...u, ...patch } : u)))
  }

  async function startUpload(file: File) {
    if (!canAddMore) return

    if (file.size > MAX_BYTES) {
      setUploads((u) => [
        ...u,
        { id: uuid(), filename: file.name, progress: 0, error: 'File exceeds 50 MB' },
      ])
      return
    }

    const contentType = ALLOWED_MIMES[file.type]
    if (!contentType) {
      setUploads((u) => [
        ...u,
        {
          id: uuid(),
          filename: file.name,
          progress: 0,
          error: 'Only MP4, MOV, WebM allowed',
        },
      ])
      return
    }

    const id = uuid()
    setUploads((u) => [...u, { id, filename: file.name, progress: 0 }])

    try {
      const { uploadUrl, key, publicUrl } = await requestVideoUploadUrl({
        filename: file.name,
        contentType,
        sizeBytes: file.size,
        productId,
      })

      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('PUT', uploadUrl)
        xhr.setRequestHeader('Content-Type', contentType)
        xhr.upload.onprogress = (ev) => {
          if (ev.lengthComputable) {
            patchUpload(id, { progress: Math.round((ev.loaded / ev.total) * 100) })
          }
        }
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) resolve()
          else reject(new Error(`S3 returned ${xhr.status}`))
        }
        xhr.onerror = () => reject(new Error('Network error during upload'))
        xhr.send(file)
      })

      onChange([...videos, { url: publicUrl, key }])
      setUploads((u) => u.filter((x) => x.id !== id))
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Upload failed'
      patchUpload(id, { error: message })
    }
  }

  function handlePick(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files
    if (!files) return
    for (const file of Array.from(files)) {
      startUpload(file)
    }
    event.target.value = ''
  }

  function handleRemove(key: string) {
    onChange(videos.filter((v) => v.key !== key))
  }

  function handleDismissError(id: string) {
    setUploads((u) => u.filter((x) => x.id !== id))
  }

  return (
    <div className="space-y-3">
      <div className="text-sm font-semibold text-[#3f1933]">
        Videos (up to {max}, max 50 MB each — MP4, MOV, WebM)
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        {videos.map((video) => (
          <div
            key={video.key}
            className="flex flex-col gap-2 rounded-2xl border border-[#e7bfd7] p-3"
          >
            <video
              src={video.url}
              controls
              preload="metadata"
              className="h-32 w-full rounded-xl bg-black object-cover"
            />
            <button
              type="button"
              onClick={() => handleRemove(video.key)}
              className="self-end text-sm font-semibold text-[#a53b79]"
            >
              Remove
            </button>
          </div>
        ))}

        {uploads.map((upload) => (
          <div
            key={upload.id}
            className="flex flex-col justify-between gap-2 rounded-2xl border border-[#e7bfd7] p-3"
          >
            <div className="truncate text-sm font-semibold text-[#3f1933]">
              {upload.filename}
            </div>
            {upload.error ? (
              <>
                <div className="text-xs text-red-600">{upload.error}</div>
                <button
                  type="button"
                  onClick={() => handleDismissError(upload.id)}
                  className="self-end text-sm font-semibold text-[#a53b79]"
                >
                  Dismiss
                </button>
              </>
            ) : (
              <>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#f0d8e8]">
                  <div
                    className="h-full bg-[#a53b79] transition-[width]"
                    style={{ width: `${upload.progress}%` }}
                  />
                </div>
                <div className="text-xs text-[#3f1933]">Uploading… {upload.progress}%</div>
              </>
            )}
          </div>
        ))}

        {canAddMore && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex h-40 items-center justify-center rounded-2xl border-2 border-dashed border-[#e7bfd7] text-sm font-semibold text-[#a53b79] hover:bg-[#fbeef5]"
          >
            + Add video
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="video/mp4,video/quicktime,video/webm"
        multiple
        onChange={handlePick}
        className="hidden"
      />
    </div>
  )
}
