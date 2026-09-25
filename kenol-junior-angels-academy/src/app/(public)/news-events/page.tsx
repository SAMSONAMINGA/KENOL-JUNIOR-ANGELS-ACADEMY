import Image from "next/image";
import { Fraunces, Manrope } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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

/**
 * Add new entries at the top (most recent first). "photo" is optional —
 * leave it out for announcements you don't have a real school photo for;
 * the row still reads fine as text.
 */
type EventItem = {
  day: string;
  month: string;
  year: string;
  title: string;
  desc: string;
  photo?: { src: string; alt: string };
  video?: { src: string; poster: string };
  tag?: string; // short category, e.g. "Sports day", "Enrichment"
  status: "held" | "upcoming" | "ongoing";
};

const EVENTS: EventItem[] = [
  {
    day: "25",
    month: "Sep",
    year: "2026",
    tag: "School outing",
    title: "A day out at the park",
    desc: "Learners spent the day at a local park — big slides, a ride on the mini train, and plenty of running around outdoors.",
    video: {
      src: "/videos/mini-train-ride.mp4",
      poster: "/images/news/school-outing-poster.jpg",
    },
    status: "held",
  },
  {
    day: "—",
    month: "Ongoing",
    year: "",
    tag: "Co-curricular",
    title: "Pedals in motion",
    desc: "Our cycling programme: learners gather at the gate with their bicycles as part of co-curricular activity time.",
    photo: {
      src: "/images/news/pedals-in-motion.jpg",
      alt: "Pupils with their bicycles lined up at the school gate",
    },
    status: "ongoing",
  },
  {
    day: "07",
    month: "Mar",
    year: "2025",
    tag: "Enrichment",
    title: "Pre-school swimming lessons",
    desc: "A fun, guided introduction to the water for our pre-school learners, built to grow confidence, basic swimming skills and water safety.",
    status: "held",
  },
  {
    day: "31",
    month: "Jan",
    year: "2025",
    tag: "Sports day",
    title: "Sack race event",
    desc: "Classes raced it out sack by sack on the school field, with plenty of cheering from the sidelines.",
    photo: {
      src: "/images/news/sack-race-event.jpg",
      alt: "Illustrated poster for the Kenol Junior Angels Academy sack race event, showing children racing in sacks",
    },
    status: "held",
  },
];

const STATUS_LABEL: Record<EventItem["status"], string> = {
  held: "Event held",
  upcoming: "Upcoming",
  ongoing: "Ongoing programme",
};

function StatusBadge({ status }: { status: EventItem["status"] }) {
  const isHeld = status === "held";
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide"
      style={
        isHeld
          ? { background: "#e9f0e4", color: "#3f6b34" }
          : { background: "#fbe9d0", color: "#a05a2c" }
      }
    >
      {isHeld && (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {STATUS_LABEL[status]}
    </span>
  );
}

export default function NewsPage() {
  return (
    <>
      <Header />
      <main className={`${display.variable} ${body.variable}`} style={{ fontFamily: "var(--font-body)" }}>
        {/* ========== HERO ========== */}
        <section className="relative overflow-hidden text-white">
          <div
            className="absolute inset-0 bg-cover"
            style={{
              backgroundImage: "url('/images/news/sack-race-event.jpg')",
              backgroundPosition: "center 25%",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(110,0,0,0.82), rgba(77,0,0,0.9))",
            }}
          />
          <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:px-10 md:py-28 lg:px-16">
            <span className="mb-6 block h-1 w-16 rounded-full" style={{ background: "#e8b23d" }} />
            <h1
              className="text-4xl italic leading-[1.1] sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              News &amp; Events
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/85 sm:text-xl">
              What&rsquo;s been happening around school — sports days, trips
              and the odd splash in the pool.
            </p>
          </div>
        </section>

        {/* ========== EVENTS FEED ========== */}
        <section className="px-6 py-4 sm:px-10 lg:px-16" style={{ background: "#fbf5ec" }}>
          <div className="mx-auto max-w-4xl">
            {EVENTS.map((ev, i) => (
              <article
                key={ev.title}
                className="grid grid-cols-[4.5rem_1fr] gap-6 border-t py-10 sm:grid-cols-[6rem_1fr] sm:gap-10 md:py-12"
                style={{ borderColor: "#e2d5c4" }}
              >
                {/* Date block */}
                <div>
                  <p
                    className="text-4xl italic leading-none sm:text-5xl"
                    style={{ fontFamily: "var(--font-display)", color: "#6e0000" }}
                  >
                    {ev.day}
                  </p>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-wide" style={{ color: "#4a3636" }}>
                    {ev.month}
                  </p>
                  {ev.year && (
                    <p className="text-sm" style={{ color: "#8a7a6d" }}>
                      {ev.year}
                    </p>
                  )}
                </div>

                {/* Story */}
                <div
                  className={
                    ev.photo
                      ? "grid gap-6 sm:grid-cols-[1fr_14rem] sm:items-start"
                      : ev.video
                      ? "grid gap-6 sm:grid-cols-[1fr_11rem] sm:items-start"
                      : ""
                  }
                >
                  <div>
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      {ev.tag && (
                        <p className="text-sm font-semibold" style={{ color: "#a05a2c" }}>
                          {ev.tag}
                        </p>
                      )}
                      <StatusBadge status={ev.status} />
                    </div>
                    <h2 className="text-2xl font-bold leading-snug sm:text-3xl" style={{ color: "#2a0d0d" }}>
                      {ev.title}
                    </h2>
                    <p className="mt-3 max-w-prose text-lg leading-8" style={{ color: "#4a3636" }}>
                      {ev.desc}
                    </p>
                  </div>

                  {ev.photo && (
                    <div className="relative h-40 w-full overflow-hidden sm:h-full sm:min-h-[10rem]">
                      <Image
                        src={ev.photo.src}
                        alt={ev.photo.alt}
                        fill
                        sizes="(min-width: 640px) 14rem, 100vw"
                        className="object-cover"
                      />
                    </div>
                  )}

                  {ev.video && (
                    <div
                      className="relative mx-auto w-full max-w-[11rem] overflow-hidden sm:mx-0"
                      style={{ aspectRatio: "9 / 16" }}
                    >
                      <video
                        src={ev.video.src}
                        poster={ev.video.poster}
                        controls
                        playsInline
                        preload="metadata"
                        className="absolute inset-0 h-full w-full object-cover"
                      >
                        <track kind="captions" />
                      </video>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ========== FOLLOW ALONG ========== */}
        <section className="px-6 py-16 sm:px-10 md:py-20 lg:px-16" style={{ background: "#f4ead9" }}>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl" style={{ color: "#2a0d0d" }}>
              Don&rsquo;t want to miss an update?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-lg leading-8" style={{ color: "#4a3636" }}>
              We post event dates and photos on Facebook as they come up.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="https://web.facebook.com/profile.php?id=61565612886559"
                className="rounded-full px-8 py-3.5 text-lg font-bold text-white transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
                style={{ background: "#6e0000" }}
              >
                Find us on Facebook
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}