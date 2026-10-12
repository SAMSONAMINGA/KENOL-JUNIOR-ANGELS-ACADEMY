import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fraunces, Manrope } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { db } from "@/lib/db";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const body = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

export const dynamic = "force-dynamic";

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await db.newsPost.findFirst({ where: { slug, published: true } });
  if (!post) notFound();

  const date = post.eventDate ?? post.publishedAt;

  return (
    <>
      <Header />
      <main className={`${display.variable} ${body.variable}`} style={{ background: "#fbf5ec", color: "#2a0d0d", fontFamily: "var(--font-body)" }}>
        <article className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-16">
          <Link href="/news-events" className="font-semibold underline underline-offset-4" style={{ color: "#6e0000" }}>
            ← Back to News &amp; Events
          </Link>
          <header className="mx-auto mt-8 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-widest" style={{ color: "#a05a2c" }}>
              {post.kind === "EVENT" ? "School event" : "School news"}
              {date && ` · ${date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Nairobi" })}`}
            </p>
            <h1 className="mt-3 text-4xl italic leading-tight sm:text-5xl" style={{ fontFamily: "var(--font-display)", color: "#6e0000" }}>
              {post.title}
            </h1>
            <p className="mt-5 text-xl leading-8" style={{ color: "#4a3636" }}>{post.summary}</p>
          </header>
          {post.imageUrl && (
            <div className="relative mx-auto mt-8 aspect-[16/9] max-h-[36rem] overflow-hidden sm:mt-10">
              <Image src={post.imageUrl} alt="" fill unoptimized sizes="(max-width: 1024px) 100vw, 1024px" className="object-cover" />
            </div>
          )}
          <div className="mx-auto mt-8 max-w-3xl space-y-5 text-lg leading-8 sm:mt-10">
            {post.body.split(/\n{2,}/).map((paragraph, index) => (
              <p key={index} className="whitespace-pre-line" style={{ color: "#4a3636" }}>{paragraph}</p>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}