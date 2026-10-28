"use server";

import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireStaff } from "@/lib/auth";
import { slugify } from "@/lib/slug";
import { isImageFile, uploadImage } from "@/lib/uploads";

function fail(message: string): never {
  redirect(`/admin/news?error=${encodeURIComponent(message)}`);
}

async function uniqueSlug(title: string, currentId?: string) {
  const base = slugify(title);
  if (!base) fail("Please enter a title containing letters or numbers.");
  let candidate = base;
  let suffix = 2;
  while (true) {
    const existing = await db.newsPost.findUnique({ where: { slug: candidate }, select: { id: true } });
    if (!existing || existing.id === currentId) return candidate;
    candidate = `${base}-${suffix++}`;
  }
}

function readDate(value: FormDataEntryValue | null): Date | null {
  const raw = String(value ?? "").trim();
  if (!raw) return null;
  const date = new Date(`${raw}T12:00:00+03:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

export async function saveNewsPost(form: FormData) {
  await requireStaff();
  const id = String(form.get("id") ?? "").trim();
  const title = String(form.get("title") ?? "").trim().slice(0, 120);
  const summary = String(form.get("summary") ?? "").trim().slice(0, 300);
  const body = String(form.get("body") ?? "").trim().slice(0, 12000);
  const kind = String(form.get("kind") ?? "");
  const eventDateRaw = String(form.get("eventDate") ?? "").trim();
  const eventDate = readDate(form.get("eventDate"));

  if (!title || !summary || !body) fail("Title, summary and story are required.");
  if (kind !== "NEWS" && kind !== "EVENT") fail("Choose news or event.");
  if (eventDateRaw && !eventDate) fail("Please enter a valid event date.");

  const existing = id ? await db.newsPost.findUnique({ where: { id } }) : null;
  if (id && !existing) fail("That post could not be found.");
  const image = form.get("image");
  if (image !== null && String(image) !== "" && !isImageFile(image)) {
    fail("Choose a JPG, PNG, WebP or GIF photo smaller than 3 MB.");
  }

  const imageUrl = isImageFile(image) ? await uploadImage(image) : existing?.imageUrl ?? null;
  const published = form.get("published") === "on";
  const data = {
    kind: kind as "NEWS" | "EVENT",
    title,
    slug: await uniqueSlug(title, id || undefined),
    summary,
    body,
    imageUrl,
    eventDate: kind === "EVENT" ? eventDate : null,
    published,
    publishedAt: published ? existing?.publishedAt ?? new Date() : null,
  };
  const post = existing
    ? await db.newsPost.update({ where: { id }, data })
    : await db.newsPost.create({ data });

  if (
    existing?.imageUrl &&
    existing.imageUrl !== imageUrl &&
    existing.imageUrl.includes(".blob.vercel-storage.com/")
  ) {
    await del(existing.imageUrl);
  }

  revalidatePath("/news-events");
  revalidatePath(`/news-events/${post.slug}`);
  revalidatePath("/admin/news");
  if (existing) revalidatePath(`/news-events/${existing.slug}`);
  redirect(`/admin/news/${post.id}?saved=1`);
}

export async function deleteNewsPost(id: string) {
  await requireStaff();
  const post = await db.newsPost.findUniqueOrThrow({ where: { id } });
  if (post.imageUrl?.includes(".blob.vercel-storage.com/")) await del(post.imageUrl);
  await db.newsPost.delete({ where: { id } });
  revalidatePath("/news-events");
  revalidatePath(`/news-events/${post.slug}`);
  revalidatePath("/admin/news");
  redirect("/admin/news?saved=deleted");
}