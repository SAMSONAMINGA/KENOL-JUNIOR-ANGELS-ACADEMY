import ImageInput from "@/components/admin/ImageInput";
import { saveNewsPost } from "@/app/admin/news/actions";

type PostValues = {
  id?: string;
  kind?: string;
  title?: string;
  summary?: string;
  body?: string;
  imageUrl?: string | null;
  eventDate?: Date | null;
  published?: boolean;
};

const inputClass = "w-full rounded-sm px-3 py-2.5 text-base";
const inputStyle = { border: "1px solid #d9c9b4", background: "#fff" } as const;

function dateInputValue(date?: Date | null) {
  if (!date) return "";
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Nairobi",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const part = (type: string) => parts.find((item) => item.type === type)?.value ?? "";
  return `${part("year")}-${part("month")}-${part("day")}`;
}

export default function NewsPostForm({ post }: { post?: PostValues }) {
  return (
    <form action={saveNewsPost} className="grid gap-5 rounded-sm bg-white p-5 sm:p-6" style={{ border: "1px solid #e2d5c4" }}>
      {post?.id && <input type="hidden" name="id" value={post.id} />}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="kind" className="mb-1.5 block text-sm font-semibold">Content type</label>
          <select id="kind" name="kind" defaultValue={post?.kind ?? "NEWS"} className={inputClass} style={inputStyle}>
            <option value="NEWS">News</option>
            <option value="EVENT">Event</option>
          </select>
        </div>
        <div>
          <label htmlFor="eventDate" className="mb-1.5 block text-sm font-semibold">Event date (optional)</label>
          <input id="eventDate" name="eventDate" type="date" defaultValue={dateInputValue(post?.eventDate)} className={inputClass} style={inputStyle} />
        </div>
      </div>
      <div>
        <label htmlFor="title" className="mb-1.5 block text-sm font-semibold">Title</label>
        <input id="title" name="title" required maxLength={120} defaultValue={post?.title ?? ""} placeholder="A clear, welcoming headline" className={inputClass} style={inputStyle} />
      </div>
      <div>
        <label htmlFor="summary" className="mb-1.5 block text-sm font-semibold">Short summary</label>
        <textarea id="summary" name="summary" required maxLength={300} rows={2} defaultValue={post?.summary ?? ""} placeholder="A short preview shown on the News & Events page" className={inputClass} style={inputStyle} />
      </div>
      <div>
        <label htmlFor="body" className="mb-1.5 block text-sm font-semibold">Full story</label>
        <textarea id="body" name="body" required maxLength={12000} rows={9} defaultValue={post?.body ?? ""} placeholder="Write the full story. Separate paragraphs with a blank line." className={inputClass} style={inputStyle} />
      </div>
      <ImageInput label="Cover photo (optional)" currentImage={post?.imageUrl} />
      <label className="flex items-center gap-2 text-sm font-semibold">
        <input type="checkbox" name="published" defaultChecked={post?.published ?? false} className="size-4 accent-[#6e0000]" />
        Publish this post on the public website
      </label>
      <button className="w-fit rounded-full px-7 py-3 font-semibold text-white" style={{ background: "#6e0000" }}>
        {post ? "Save changes" : "Create post"}
      </button>
    </form>
  );
}
