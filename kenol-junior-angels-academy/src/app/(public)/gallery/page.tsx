import { db } from "@/lib/db";
import GalleryClient from "./GalleryClient";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const images = await db.galleryImage.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });
  const uploadedPhotos = images.map((image, index) => ({
    src: image.url,
    alt: image.caption || image.album || "School gallery photo",
    title: image.caption || image.album || "A moment at our school",
    caption: image.album ? `${image.album}${image.caption ? ` — ${image.caption}` : ""}` : image.caption || "",
    layout: index % 2 === 0 ? "full" as const : "left" as const,
  }));

  return <GalleryClient uploadedPhotos={uploadedPhotos} />;
}
