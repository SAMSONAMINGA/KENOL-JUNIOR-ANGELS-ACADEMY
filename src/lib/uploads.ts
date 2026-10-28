import { put } from "@vercel/blob";
import { slugify } from "@/lib/slug";

export const MAX_IMAGE_SIZE = 3 * 1024 * 1024;
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"] as const;

export function isImageFile(value: FormDataEntryValue | null): value is File {
  return (
    value instanceof File &&
    value.size > 0 &&
    value.size <= MAX_IMAGE_SIZE &&
    (ALLOWED_IMAGE_TYPES as readonly string[]).includes(value.type)
  );
}

export async function uploadImage(file: File): Promise<string> {
  const safeName = slugify(file.name.replace(/\.[^.]+$/, "")) || "school-photo";
  const extension = file.type === "image/jpeg" ? "jpg" : file.type.split("/")[1];
  const blob = await put(`${safeName}.${extension}`, file, {
    access: "public",
    addRandomSuffix: true,
    contentType: file.type,
  });

  return blob.url;
}