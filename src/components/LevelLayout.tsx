import Image from "next/image";
import Link from "next/link";
import { Fraunces, Manrope } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { levelLabel, type LevelCode } from "@/lib/levels";

const display = Fraunces({ subsets: ["latin"], weight: ["500", "600"], style: ["normal", "italic"], variable: "--font-display" });
const body = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-body" });

export type LevelContent = {
  title: string;
  headline: string; // creative hero title
  learnHeading: string; // creative heading for the subjects section
  learnIntro: string; // one line introducing the subjects
  grades: string;
  ages: string;
  tagline: string;
  intro: string;
  subjects: { play: string; name: string; detail: string }[];
  skills: string[];
  activities: string[];
  // Grades in this level; each becomes an Apply button
  applyCodes: LevelCode[];
  current: "pre-primary" | "lower-primary" | "upper-primary" | "junior-secondary";
};

// Hero photo for each level (files must exist in /public/images/hero)
const HERO: Record<LevelContent["current"], string> = {
  "pre-primary": "/images/hero/photo_4_playground.png",
  "lower-primary": "/images/hero/photo_3_writing.png",
  "upper-primary": "/images/hero/photo_9_cbc.jpg",
  "junior-secondary": "/images/hero/students.jpg",
};

const ALL_LEVELS = [
  { slug: "pre-primary", label: "Pre-Primary (PP1 & PP2)" },
  { slug: "lower-primary", label: "Lower Primary (Grade 1–3)" },
  { slug: "upper-primary", label: "Upper Primary (Grade 4–6)" },
  { slug: "junior-secondary", label: "Junior Secondary (Grade 7–8)" },
];

const focus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8b23d] focus-visible:ring-offset-2";
const displayFont = { fontFamily: "var(--font-display)" } as const;

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <span className="mb-3 block h-1 w-14 rounded-full bg-[#e8b23d]" />
      <h2 className="text-3xl font-semibold leading-tight text-[#6e0000] md:text-4xl" style={displayFont}>
        {children}
      </h2>
    </div>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5 shrink-0 text-[#6e0000]">
      <path fill="currentColor" d="M10 1.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Zm4.1 6.6-4.8 5a.9.9 0 0 1-1.3 0L5.9 11a.9.9 0 1 1 1.3-1.3l1.4 1.4 4.2-4.3a.9.9 0 1 1 1.3 1.3Z" />
    </svg>
  );
}

export default function LevelLayout({ level }: { level: LevelContent }) {
  return (
    <>
      <Header />
      <main className={`${display.variable} ${body.variable}`} style={{ fontFamily: "var(--font-body)" }}>
        {/* Hero */}
        <section className="relative isolate overflow-hidden text-white">
          <Image src={HERO[level.current]} alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#2a0d0d]/90 via-[#6e0000]/85 to-[#4d0000]/75" />
          <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
            <Link href="/admissions" className={`text-sm font-semibold text-white/85 hover:text-white hover:underline ${focus}`}>
              &larr; Admissions
            </Link>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full bg-[#e8b23d] px-4 py-1.5 text-sm font-bold text-[#2a0d0d]">{level.title}</span>
              <span className="rounded-full border border-white/50 px-4 py-1.5 text-sm font-semibold">{level.grades}</span>
              <span className="rounded-full border border-white/50 px-4 py-1.5 text-sm font-semibold">{level.ages}</span>
            </div>
            <h1 className="mt-5 text-4xl font-semibold italic leading-[1.1] md:text-6xl" style={displayFont}>
              {level.headline}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/90 md:text-xl">{level.tagline}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#apply"
                className={`rounded-full bg-white px-8 py-3.5 font-bold text-[#6e0000] transition hover:bg-[#fbe9d0] ${focus}`}
              >
                Apply for this level
              </a>
              <a
                href="tel:0723248400"
                className={`rounded-full border-2 border-white px-8 py-3.5 font-semibold transition hover:bg-white/10 ${focus}`}
              >
                Call 0723 248 400
              </a>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="bg-[#fbf5ec] px-6 py-14 md:py-16">
          <p className="mx-auto max-w-3xl text-2xl leading-10 text-[#2a0d0d] md:text-[1.75rem]" style={displayFont}>
            {level.intro}
          </p>
        </section>

        {/* What is learnt */}
        <section className="bg-white px-6 py-16 md:py-20">
          <div className="mx-auto max-w-5xl">
            <SectionHeading>{level.learnHeading}</SectionHeading>
            <p className="-mt-4 mb-8 max-w-2xl text-lg leading-8 text-[#4a3636]">{level.learnIntro}</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {level.subjects.map((s) => (
                <div key={s.name} className="rounded-xl border border-l-4 border-[#eadfce] border-l-[#e8b23d] bg-[#fdfaf5] p-5">
                  <h3 className="text-xl font-semibold italic text-[#6e0000]" style={displayFont}>{s.play}</h3>
                  <p className="mt-1 text-sm font-bold text-[#2a0d0d]">{s.name}</p>
                  <p className="mt-2 text-[0.95rem] leading-6 text-[#4a3636]">{s.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills and activities */}
        <section className="bg-[#fbf5ec] px-6 py-16 md:py-20">
          <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
            <div>
              <SectionHeading>Wings we build</SectionHeading>
              <ul className="space-y-3">
                {level.skills.map((s) => (
                  <li key={s} className="flex items-center gap-3 rounded-xl bg-white px-4 py-3.5 font-semibold text-[#2a0d0d] shadow-sm">
                    <Check /> {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeading>Beyond the classroom walls</SectionHeading>
              <ul className="flex flex-wrap gap-3">
                {level.activities.map((a) => (
                  <li key={a} className="rounded-full border border-[#6e0000]/25 bg-white px-5 py-2.5 font-semibold text-[#6e0000]">
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Apply */}
        <section id="apply" className="scroll-mt-20 bg-gradient-to-br from-[#6e0000] via-[#8b0000] to-[#4d0000] px-6 py-16 text-white md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-semibold italic md:text-5xl" style={displayFont}>Ready for take-off?</h2>
            <p className="mt-4 text-lg text-white/90">
              Apply online or call us on{" "}
              <a href="tel:0723248400" className={`font-bold underline ${focus}`}>0723 248 400</a>.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              {level.applyCodes.map((code) => (
                <Link
                  key={code}
                  href={`/admissions/apply?level=${code}`}
                  className={`min-w-[12rem] rounded-full bg-white px-8 py-4 text-lg font-bold text-[#6e0000] shadow-lg transition hover:bg-[#fbe9d0] ${focus}`}
                >
                  Apply for {levelLabel(code)}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Other levels */}
        <nav aria-label="Other levels" className="bg-white px-6 py-14">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-5 text-xl font-bold text-[#2a0d0d]">The rest of the sky</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {ALL_LEVELS.filter((l) => l.slug !== level.current).map((l) => (
                <Link
                  key={l.slug}
                  href={`/levels/${l.slug}`}
                  className={`rounded-xl border border-[#eadfce] bg-[#fdfaf5] px-5 py-4 font-semibold text-[#6e0000] transition hover:border-[#6e0000] hover:bg-white ${focus}`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </main>
      <Footer />
    </>
  );
}