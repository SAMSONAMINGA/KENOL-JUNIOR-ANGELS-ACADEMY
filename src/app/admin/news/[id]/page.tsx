import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { requireStaff } from "@/lib/auth";
import AdminNav from "@/components/admin/AdminNav";
import NewsPostForm from "@/components/admin/NewsPostForm";

export const dynamic = "force-dynamic";

export default async function EditNewsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  await requireStaff();
  const [{ id }, sp] = await Promise.all([params, searchParams]);
  const post = await db.newsPost.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <main className="min-h-screen px-4 py-8 sm:px-8" style={{ background: "#fbf5ec", color: "#2a0d0d" }}>
      <div className="mx-auto max-w-4xl">
        <Link href="/admin/news" className="font-semibold underline" style={{ color: "#6e0000" }}>← Back to News &amp; Events</Link>
        <h1 className="mb-6 mt-4 text-3xl font-bold" style={{ color: "#6e0000" }}>Edit post</h1>
        <AdminNav active="news" />
        {sp.error && <p role="alert" className="mb-5 rounded-sm bg-[#fbe9d0] px-4 py-3 font-semibold text-[#7a2e00]">{sp.error}</p>}
        {sp.saved && <p role="status" className="mb-5 rounded-sm bg-[#e3f1e3] px-4 py-3 font-semibold text-[#1f5a1f]">Post saved.</p>}
        <NewsPostForm post={post} />
        <p className="mt-4 text-sm" style={{ color: "#65534b" }}>Public link: <a className="underline" href={`/news-events/${post.slug}`}>/news-events/{post.slug}</a></p>
      </div>
    </main>
  );
}