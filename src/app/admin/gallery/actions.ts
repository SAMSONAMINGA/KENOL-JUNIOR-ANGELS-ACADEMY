"use server";

import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireStaff } from "@/lib/auth";
import { isImageFile, uploadImage } from "@/lib/uploads";

function fail(message: string): never {
  redirect(`/admin/gallery?error=${encodeURIComponent(message)}`);
}

export async function uploadGalleryImage(form: FormData) {
  await requireStaff();
  const file = form.get("image");
  if (!isImageFile(file)) fail("Choose a JPG, PNG, WebP or GIF photo smaller than 3 MB.");

  const url = await uploadImage(file);
  await db.galleryImage.create({
    data: {
      url,
      caption: String(form.get("caption") ?? "").trim().slice(0, 160) || null,
      album: String(form.get("album") ?? "").trim().slice(0, 60) || null,
      published: form.get("published") === "on",
    },
  });
  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
  redirect("/admin/gallery?saved=1");
}

export async function setGalleryPublished(id: string, published: boolean) {
  await requireStaff();
  await db.galleryImage.update({ where: { id }, data: { published } });
  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
  redirect("/admin/gallery?saved=1");
}

export async function deleteGalleryImage(id: string) {
  await requireStaff();
  const image = await db.galleryImage.findUniqueOrThrow({ where: { id } });
  if (image.url.includes(".blob.vercel-storage.com/")) await del(image.url);
  await db.galleryImage.delete({ where: { id } });
  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
  redirect("/admin/gallery?saved=1");
}