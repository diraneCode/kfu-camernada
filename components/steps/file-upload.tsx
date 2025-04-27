"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { cn } from "@/lib/utils"
import { UploadCloud, X } from "lucide-react"
import Image from "next/image"

interface FileUploadProps {
  onChange: (file: File | null) => void
  value: File | null
  className?: string
}

export function FileUpload({ onChange, value, className }: FileUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]

      if (file) {
        onChange(file)
        const objectUrl = URL.createObjectURL(file)
        setPreview(objectUrl)
      }
    },
    [onChange],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    maxFiles: 1,
  })

  const removeFile = () => {
    onChange(null)
    if (preview) {
      URL.revokeObjectURL(preview)
      setPreview(null)
    }
  }

  return (
    <div className={cn("w-full", className)}>
      {!preview ? (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-colors",
            isDragActive ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-red-500 hover:bg-red-50",
          )}
        >
          <input {...getInputProps()} />
          <UploadCloud className="h-12 w-12 text-gray-400 mb-4" />
          <p className="text-sm text-gray-600 text-center">
            {isDragActive
              ? "Déposez l'image ici..."
              : "Glissez-déposez une image ici, ou cliquez pour sélectionner un fichier"}
          </p>
          <p className="text-xs text-gray-400 mt-2">PNG, JPG, GIF jusqu'à 5MB</p>
        </div>
      ) : (
        <div className="relative w-full h-64 rounded-lg overflow-hidden">
          <Image src={preview || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
          <button
            type="button"
            onClick={removeFile}
            className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  )
}
