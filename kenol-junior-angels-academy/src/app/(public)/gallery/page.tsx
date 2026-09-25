"use client";

import { useCallback, useEffect, useState } from "react";
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
 * layout:
 *  "full"  = full-width panel with text over the photo (best for wide, high-res photos)
 *  "left"  = framed photo on the left, text on the right
 *  "right" = framed photo on the right, text on the left
 *  "circle" = round photo with a gold ring on a maroon band (a highlight moment)
 *  "video"  = framed portrait video clip with a poster frame, text beside it
 * ratio: shape of the frame for split layouts, e.g. "4 / 5" (portrait) or "1 / 1" (square)
 * pos:   which part of the photo stays in view when cropped, e.g. "center 25%" keeps faces
 * small: caps the frame width, so low-resolution photos are not blown up
 */
type Photo = {
  src: string;
  alt: string;
  title: string;
  caption: string;
  layout: "full" | "left" | "right" | "circle" | "video";
  ratio?: string;
  pos?: string;
  small?: boolean;
  /** only for layout "video": the actual clip; src/alt above are used for the poster frame */
  video?: string;
};

const PHOTOS: Photo[] = [
  {
    src: "/images/gallery/all-together.jpg",
    alt: "The whole school gathered outdoors, arms raised and cheering",
    title: "All together",
    caption: "Everyone out in the yard, hands up and cheering.",
    layout: "full",
    pos: "center 30%",
  },
  {
    src: "/images/gallery/main-group.jpg",
    alt: "Smiling pupils in maroon school jumpers waving at the camera",
    title: "The science corner",
    caption: "Grade 8 by the digestive-system chart, all smiles.",
    layout: "left",
    ratio: "4 / 5",
    pos: "center 25%",
  },
  {
    src: "/images/gallery/angels.jpg",
    alt: "Young pupils in a classroom smiling with hands raised",
    title: "Little angels",
    caption: "A bright morning, hands up and ready to answer.",
    layout: "full",
    pos: "center 35%",
  },
  {
    src: "/images/gallery/school-family.jpg",
    alt: "Pupils in school uniform and their teacher posing together outside for a group photo",
    title: "Our school family",
    caption: "Pupils and their teacher, gathered for a class photo.",
    layout: "circle",
  },
  {
    src: "/images/gallery/playground-slide-poster.jpg",
    alt: "A pupil sliding down a colourful slide at a park",
    title: "Slide time",
    caption: "One brave run down the big slide on an outing to the park.",
    layout: "video",
    video: "/videos/playground-slide.mp4",
    ratio: "9 / 16",
    small: true,
  },
  {
    src: "/images/gallery/mini-train-ride-poster.jpg",
    alt: "Pupils riding a small train at a park",
    title: "All aboard",
    caption: "A ride on the mini train, part of the same day out.",
    layout: "video",
    video: "/videos/mini-train-ride.mp4",
    ratio: "9 / 16",
    small: true,
  },
  {
    src: "/images/gallery/lineup.jpg",
    alt: "Pupils queuing at an outdoor water point",
    title: "The wash-up line",
    caption: "Lining up at the water point before class begins.",
    layout: "right",
    ratio: "1 / 1",
    pos: "center 30%",
    small: true,
  },
  {
    src: "/images/gallery/writing.jpg",
    alt: "Pupils bent over their exercise books, writing",
    title: "Heads down",
    caption: "Deep in concentration during writing practice.",
    layout: "left",
    ratio: "1 / 1",
    pos: "center",
    small: true,
  },
  {
    src: "/images/gallery/playground.jpg",
    alt: "Children running and sliding on a school playground",
    title: "Break time",
    caption: "Racing for the yellow slide the moment the bell goes.",
    layout: "full",
    pos: "center 60%",
  },
  {
    src: "/images/gallery/pedals-in-motion.jpg",
    alt: "Bicycles lined up at the school gate",
    title: "Pedals in motion",
    caption: "The cycling programme, lined up and ready to ride.",
    layout: "full",
    pos: "center 55%",
  },
];

// Dark fade used on the hero and on every full-width panel
const FADE =
  "linear-gradient(to top, rgba(20,6,6,0.85) 0%, rgba(20,6,6,0.35) 45%, rgba(20,6,6,0.05) 75%)";

const pad = (n: number) => String(n).padStart(2, "0");

export default function GalleryPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i - 1 + PHOTOS.length) % PHOTOS.length)),
    []
  );
  const showNext = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i + 1) % PHOTOS.length)),
    []
  );

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeIndex, close, showPrev, showNext]);

  const active = activeIndex !== null ? PHOTOS[activeIndex] : null;

  return (
    <>
      <Header />
      <main
        className={`${display.variable} ${body.variable}`}
        style={{ fontFamily: "var(--font-body)" }}
      >
        {/* Hero */}
        <section className="relative w-full overflow-hidden" style={{ height: "min(70vh, 560px)" }}>
          <Image
            src={PHOTOS[0].src}
            alt={PHOTOS[0].alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: PHOTOS[0].pos }}
          />
          <div className="absolute inset-0" style={{ background: FADE }} />
          <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-10 sm:px-10 sm:pb-14 lg:px-16">
            <p
              className="mb-2 text-sm font-semibold tracking-wide sm:text-base"
              style={{ color: "#e8b23d" }}
            >
              From the school yard
            </p>
            <h1
              className="max-w-2xl text-4xl italic leading-[1.05] text-white sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Moments from a year at our school
            </h1>
            <p className="mt-4 max-w-md text-sm text-white/80 sm:text-base">
              Ten scenes from the classroom, the playground and the gate
              &mdash; tap any photo to look closer.
            </p>
          </div>
        </section>

        {/* Photos, each in the layout that suits it */}
        <div className="flex flex-col" style={{ background: "#fbf5ec" }}>
          {PHOTOS.slice(1).map((photo, i) => {
            const realIndex = i + 1;
            const counter = `${pad(realIndex + 1)} / ${pad(PHOTOS.length)}`;

            /* ---------- Full-width panel ---------- */
            if (photo.layout === "full") {
              return (
                <button
                  key={photo.src}
                  onClick={() => setActiveIndex(realIndex)}
                  aria-label={`View photo: ${photo.title}`}
                  className="group relative mt-2 block w-full overflow-hidden text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-white"
                  style={{ height: "min(70vh, 560px)" }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    style={{ objectPosition: photo.pos }}
                  />
                  <div className="absolute inset-0" style={{ background: FADE }} />
                  <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-10 sm:px-10 sm:pb-14 lg:px-16">
                    <p
                      className="mb-2 text-sm font-semibold tracking-wide sm:text-base"
                      style={{ color: "#e8b23d" }}
                    >
                      {counter}
                    </p>
                    {/* <p>, not <h2>: headings aren't allowed inside a <button> */}
                    <p
                      className="max-w-2xl text-4xl italic leading-[1.05] text-white sm:text-5xl lg:text-6xl"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {photo.title}
                    </p>
                    <p className="mt-4 max-w-md text-sm text-white/80 sm:text-base">
                      {photo.caption}
                    </p>
                  </div>
                </button>
              );
            }

            /* ---------- Circle highlight on a maroon band ---------- */
            if (photo.layout === "circle") {
              return (
                <section
                  key={photo.src}
                  className="mt-2 px-6 py-14 sm:px-10 md:py-20 lg:px-16"
                  style={{ background: "#6e0000" }}
                >
                  <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-16">
                    <div className="mx-auto w-full max-w-md px-3">
                      <button
                        onClick={() => setActiveIndex(realIndex)}
                        aria-label={`View photo: ${photo.title}`}
                        className="relative block aspect-square w-full overflow-hidden rounded-full focus:outline-none focus-visible:ring-4 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#6e0000]"
                        style={{ boxShadow: "0 0 0 8px #e8b23d, 0 0 0 18px rgba(255,255,255,0.14)" }}
                      >
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          sizes="(max-width: 768px) 80vw, 40vw"
                          className="object-cover"
                        />
                      </button>
                    </div>

                    <div>
                      <p className="mb-3 text-sm font-semibold tracking-wide" style={{ color: "#e8b23d" }}>
                        {counter}
                      </p>
                      <h2
                        className="text-4xl italic leading-[1.05] text-white sm:text-5xl"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {photo.title}
                      </h2>
                      <p className="mt-5 max-w-md text-lg leading-8 text-white/85">{photo.caption}</p>
                      <button
                        onClick={() => setActiveIndex(realIndex)}
                        className="mt-6 text-base font-semibold text-white underline decoration-2 underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#6e0000]"
                      >
                        View larger
                      </button>
                    </div>
                  </div>
                </section>
              );
            }

            /* ---------- Video clip: framed portrait video + text ---------- */
            if (photo.layout === "video" && photo.video) {
              const videoOnRight = realIndex % 2 === 0;
              return (
                <section
                  key={photo.src}
                  className="px-6 py-14 sm:px-10 md:py-20 lg:px-16"
                  style={{ background: realIndex % 2 ? "#f4ead9" : "#fbf5ec" }}
                >
                  <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-16">
                    <div
                      className={`mx-auto w-full max-w-[16rem] ${videoOnRight ? "md:order-2" : ""}`}
                    >
                      <div
                        className="relative w-full overflow-hidden"
                        style={{ aspectRatio: photo.ratio ?? "9 / 16", boxShadow: "14px 14px 0 #e8b23d" }}
                      >
                        <video
                          src={photo.video}
                          poster={photo.src}
                          controls
                          playsInline
                          preload="metadata"
                          className="absolute inset-0 h-full w-full object-cover"
                        >
                          <track kind="captions" />
                        </video>
                      </div>
                    </div>

                    <div className={videoOnRight ? "md:order-1" : ""}>
                      <p className="mb-3 text-sm font-semibold tracking-wide" style={{ color: "#6e0000" }}>
                        {counter}
                      </p>
                      <h2
                        className="text-4xl italic leading-[1.05] sm:text-5xl"
                        style={{ fontFamily: "var(--font-display)", color: "#2a0d0d" }}
                      >
                        {photo.title}
                      </h2>
                      <p className="mt-5 max-w-md text-lg leading-8" style={{ color: "#4a3636" }}>
                        {photo.caption}
                      </p>
                    </div>
                  </div>
                </section>
              );
            }

            /* ---------- Split layout: framed photo + text ---------- */
            const photoOnRight = photo.layout === "right";
            return (
              <section
                key={photo.src}
                className="px-6 py-14 sm:px-10 md:py-20 lg:px-16"
                style={{ background: realIndex % 2 ? "#f4ead9" : "#fbf5ec" }}
              >
                <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-16">
                  <div
                    className={`w-full ${photo.small ? "mx-auto max-w-md" : ""} ${
                      photoOnRight ? "md:order-2" : ""
                    }`}
                  >
                    <button
                      onClick={() => setActiveIndex(realIndex)}
                      aria-label={`View photo: ${photo.title}`}
                      className="relative block w-full overflow-hidden focus:outline-none focus-visible:ring-4 focus-visible:ring-[#6e0000] focus-visible:ring-offset-4"
                      style={{
                        aspectRatio: photo.ratio ?? "4 / 5",
                        boxShadow: "14px 14px 0 #e8b23d",
                      }}
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 45vw"
                        className="object-cover"
                        style={{ objectPosition: photo.pos }}
                      />
                    </button>
                  </div>

                  <div className={photoOnRight ? "md:order-1" : ""}>
                    <p className="mb-3 text-sm font-semibold tracking-wide" style={{ color: "#6e0000" }}>
                      {counter}
                    </p>
                    <h2
                      className="text-4xl italic leading-[1.05] sm:text-5xl"
                      style={{ fontFamily: "var(--font-display)", color: "#2a0d0d" }}
                    >
                      {photo.title}
                    </h2>
                    <p className="mt-5 max-w-md text-lg leading-8" style={{ color: "#4a3636" }}>
                      {photo.caption}
                    </p>
                    <button
                      onClick={() => setActiveIndex(realIndex)}
                      className="mt-6 text-base font-semibold underline decoration-2 underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6e0000] focus-visible:ring-offset-4"
                      style={{ color: "#6e0000" }}
                    >
                      View larger
                    </button>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* Lightbox: shows the whole photo, uncropped */}
        {active && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            style={{ background: "rgba(15,5,5,0.92)" }}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
            onClick={close}
          >
            <button
              onClick={close}
              className="absolute right-4 top-4 z-10 rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white sm:right-6 sm:top-6"
              aria-label="Close"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white sm:left-6"
              aria-label="Previous photo"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white sm:right-6"
              aria-label="Next photo"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div
              className="flex max-h-full max-w-4xl flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative max-h-[75vh] w-full" style={{ aspectRatio: "4 / 3" }}>
                <Image
                  src={active.src}
                  alt={active.alt}
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
              </div>
              <div className="mt-4 max-w-xl text-center">
                <p className="text-xl italic text-white" style={{ fontFamily: "var(--font-display)" }}>
                  {active.title}
                </p>
                <p className="mt-1 text-sm text-white/70">{active.caption}</p>
                <p className="mt-3 text-xs tracking-wide text-white/40">
                  {activeIndex! + 1} of {PHOTOS.length}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}