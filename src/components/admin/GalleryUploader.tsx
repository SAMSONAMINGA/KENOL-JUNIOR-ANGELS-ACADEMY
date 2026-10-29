import ImageInput from "@/components/admin/ImageInput";
import { uploadGalleryImage } from "@/app/admin/gallery/actions";

const field = "w-full rounded-sm px-3 py-2.5 text-base";
const fieldStyle = { border: "1px solid #d9c9b4", background: "#fff" } as const;

export default function GalleryUploader() {
  return (
    <form action={uploadGalleryImage} className="grid gap-5 rounded-sm bg-white p-5 sm:p-6" style={{ border: "1px solid #e2d5c4" }}>
      <div>
        <h2 className="text-xl font-bold" style={{ color: "#6e0000" }}>Add a gallery photo</h2>
        <p className="mt-1 text-sm" style={{ color: "#4a3636" }}>
          The website crops and styles the photo automatically. You can add one photo at a time.
        </p>
      </div>
      <ImageInput required />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="album" className="mb-1.5 block text-sm font-semibold">Album (optional)</label>
          <input id="album" name="album" maxLength={60} placeholder="e.g. Sports day" className={field} style={fieldStyle} />
        </div>
        <div>
          <label htmlFor="caption" className="mb-1.5 block text-sm font-semibold">Caption (optional)</label>
          <input id="caption" name="caption" maxLength={160} placeholder="A short description of this moment" className={field} style={fieldStyle} />
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm font-semibold">
        <input type="checkbox" name="published" defaultChecked className="size-4 accent-[#6e0000]" />
        Show this photo on the public gallery
      </label>
      <button className="w-fit rounded-full px-7 py-3 font-semibold text-white" style={{ background: "#6e0000" }}>
        Upload photo
      </button>
    </form>
  );
}