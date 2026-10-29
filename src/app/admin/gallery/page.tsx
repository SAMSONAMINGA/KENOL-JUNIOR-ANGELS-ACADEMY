import Image from "next/image";
import { db } from "@/lib/db";
import { requireStaff } from "@/lib/auth";
import AdminNav from "@/components/admin/AdminNav";
import GalleryUploader from "@/components/admin/GalleryUploader";
import { deleteGalleryImage, setGalleryPublished } from "./actions";

export const dynamic = "force-dynamic";

export default async function GalleryAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; saved?: string }>;
}) {
  await requireStaff();
  const [sp, images] = await Promise.all([
    searchParams,
    db.galleryImage.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <main className="min-h-screen px-4 py-8 sm:px-8" style={{ background: "#fbf5ec", color: "#2a0d0d" }}>
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-2 text-3xl font-bold" style={{ color: "#6e0000" }}>Gallery</h1>
        <p className="mb-6" style={{ color: "#4a3636" }}>Upload and manage school photos. Published photos appear on the public gallery.</p>
        <AdminNav active="gallery" />
        {sp.error && <p role="alert" className="mb-5 rounded-sm bg-[#fbe9d0] px-4 py-3 font-semibold text-[#7a2e00]">{sp.error}</p>}
        {sp.saved && <p role="status" className="mb-5 rounded-sm bg-[#e3f1e3] px-4 py-3 font-semibold text-[#1f5a1f]">Gallery updated.</p>}
        <GalleryUploader />
        <section className="mt-8">
          <h2 className="mb-4 text-xl font-bold">Uploaded photos ({images.length})</h2>
          {images.length === 0 ? (
            <p className="rounded-sm bg-white p-6" style={{ border: "1px solid #e2d5c4" }}>No photos uploaded yet.</p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {images.map((image) => (
                <article key={image.id} className="overflow-hidden rounded-sm bg-white" style={{ border: "1px solid #e2d5c4" }}>
                  <div className="relative aspect-[4/3] bg-[#f4ead9]">
                    <Image src={image.url} alt={image.caption || "School gallery photo"} fill unoptimized sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
                  </div>
                  <div className="space-y-3 p-4">
                    <p className="font-semibold">{image.caption || "Untitled photo"}</p>
                    {image.album && <p className="text-sm" style={{ color: "#65534b" }}>{image.album}</p>}
                    <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: image.published ? "#3f6b34" : "#7a2e2e" }}>
                      {image.published ? "Published" : "Hidden"}
                    </p>
                    <div className="flex gap-2">
                      <form action={setGalleryPublished.bind(null, image.id, !image.published)}>
                        <button className="rounded-full border-2 px-3 py-1.5 text-sm font-semibold" style={{ borderColor: "#6e0000", color: "#6e0000" }}>
                          {image.published ? "Hide" : "Publish"}
                        </button>
                      </form>
                      <form action={deleteGalleryImage.bind(null, image.id)}>
                        <button className="rounded-full px-3 py-1.5 text-sm font-semibold text-white" style={{ background: "#7a2222" }}>Delete</button>
                      </form>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}