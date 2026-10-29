"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function ImageInput({
  name = "image",
  label = "Photo",
  currentImage,
  required = false,
}: {
  name?: string;
  label?: string;
  currentImage?: string | null;
  required?: boolean;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      return;
    }
    const url = URL.createObjectURL(file);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold">{label}</label>
      <input
        id={name}
        name={name}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        required={required}
        onChange={(event) => setFile(event.currentTarget.files?.[0] ?? null)}
        className="block w-full rounded-sm border bg-white px-3 py-2 text-sm"
        style={{ borderColor: "#d9c9b4" }}
      />
      <p className="mt-1 text-xs" style={{ color: "#65534b" }}>
        JPG, PNG, WebP or GIF; maximum 3 MB.
      </p>
      {(preview || currentImage) && (
        <div className="relative mt-3 h-40 w-full max-w-xs overflow-hidden rounded-sm bg-[#f4ead9]">
          <Image
            src={preview ?? currentImage!}
            alt={preview ? "Selected image preview" : "Current image"}
            fill
            unoptimized={Boolean(preview)}
            className="object-cover"
            sizes="320px"
          />
        </div>
      )}
    </div>
  );
}