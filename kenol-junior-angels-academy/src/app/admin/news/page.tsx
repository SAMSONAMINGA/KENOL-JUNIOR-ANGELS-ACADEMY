import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";
import { requireStaff } from "@/lib/auth";
import AdminNav from "@/components/admin/AdminNav";
import NewsPostForm from "@/components/admin/NewsPostForm";
import { deleteNewsPost } from "./actions";

export const dynamic = "force-dynamic";

export default async function NewsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; saved?: string }>;
}) {
  await requireStaff();
  const [sp, posts] = await Promise.all([
    searchParams,
    db.newsPost.findMany({ orderBy: { updatedAt: "desc" } }),
  ]);

  return (
    <main className="min-h-screen px-4 py-8 sm:px-8" style={{ background: "#fbf5ec", color: "#2a0d0d" }}>
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-2 text-3xl font-bold" style={{ color: "#6e0000" }}>News &amp; Events</h1>
        <p className="mb-6" style={{ color: "#4a3636" }}>Create and publish website updates without editing code.</p>
        <AdminNav active="news" />
        {sp.error && <p role="alert" className="mb-5 rounded-sm bg-[#fbe9d0] px-4 py-3 font-semibold text-[#7a2e00]">{sp.error}</p>}
        {sp.saved && <p role="status" className="mb-5 rounded-sm bg-[#e3f1e3] px-4 py-3 font-semibold text-[#1f5a1f]">{sp.saved === "deleted" ? "Post deleted." : "Post saved."}</p>}
        <NewsPostForm />

        <section className="mt-8">
          <h2 className="mb-4 text-xl font-bold">Your posts ({posts.length})</h2>
          {posts.length === 0 ? (
            <p className="rounded-sm bg-white p-6" style={{ border: "1px solid #e2d5c4" }}>No posts yet. Create your first update above.</p>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <article key={post.id} className="flex flex-wrap items-center gap-4 rounded-sm bg-white p-4 sm:p-5" style={{ border: "1px solid #e2d5c4" }}>
                  {post.imageUrl && <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-sm"><Image src={post.imageUrl} alt="" fill unoptimized sizes="112px" className="object-cover" /></div>}
                  <div className="min-w-48 flex-1">
                    <p className="text-xs font-bold uppercase tracking-wide" style={{ color: "#a05a2c" }}>{post.kind === "EVENT" ? "Event" : "News"} · {post.published ? "Published" : "Draft"}</p>
                    <h3 className="mt-1 text-lg font-bold">{post.title}</h3>
                    <p className="mt-1 line-clamp-2 text-sm" style={{ color: "#4a3636" }}>{post.summary}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link href={`/admin/news/${post.id}`} className="rounded-full border-2 px-4 py-2 text-sm font-semibold" style={{ borderColor: "#6e0000", color: "#6e0000" }}>Edit</Link>
                    <form action={deleteNewsPost.bind(null, post.id)}>
                      <button className="rounded-full px-4 py-2 text-sm font-semibold text-white" style={{ background: "#7a2222" }}>Delete</button>
                    </form>
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