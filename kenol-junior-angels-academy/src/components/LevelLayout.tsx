import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { levelLabel, type LevelCode } from "@/lib/levels";

export type LevelContent = {
  title: string;
  grades: string;
  ages: string;
  tagline: string;
  intro: string;
  subjects: { name: string; detail: string }[];
  skills: string[];
  activities: string[];
  // Grades in this level; each becomes an Apply button
  applyCodes: LevelCode[];
  current: "pre-primary" | "lower-primary" | "upper-primary" | "junior-secondary";
};

const ALL_LEVELS = [
  { slug: "pre-primary", label: "Pre-Primary (PP1 & PP2)" },
  { slug: "lower-primary", label: "Lower Primary (Grade 1–3)" },
  { slug: "upper-primary", label: "Upper Primary (Grade 4–6)" },
  { slug: "junior-secondary", label: "Junior Secondary (Grade 7–8)" },
];

export default function LevelLayout({ level }: { level: LevelContent }) {
  return (
    <>
      <Header />
      <main>
        <section className="bg-[#6e0000] px-6 py-16 text-white">
          <div className="mx-auto max-w-5xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-white/70">
              {level.ages} &middot; {level.grades}
            </p>
            <h1 className="mt-2 text-4xl font-bold md:text-5xl">{level.title}</h1>
            <p className="mt-4 max-w-2xl text-lg text-white/90">{level.tagline}</p>
            <a
              href="#apply"
              className="mt-8 inline-block rounded-full bg-white px-8 py-3 font-bold text-[#6e0000] transition hover:bg-[#fbe9d0]"
            >
              Apply for this level
            </a>
          </div>
        </section>

        <div className="mx-auto max-w-5xl space-y-14 px-6 py-14">
          <p className="max-w-3xl text-lg leading-8 text-gray-700">{level.intro}</p>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-[#6e0000]">What your child will learn</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {level.subjects.map((s) => (
                <div key={s.name} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <h3 className="font-bold text-gray-900">{s.name}</h3>
                  <p className="mt-1 text-sm leading-6 text-gray-600">{s.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-2xl font-bold text-[#6e0000]">Skills we build</h2>
              <ul className="space-y-2 text-gray-700">
                {level.skills.map((s) => (
                  <li key={s} className="flex gap-2"><span className="text-[#6e0000]">&bull;</span> {s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-2xl font-bold text-[#6e0000]">Beyond the classroom</h2>
              <ul className="space-y-2 text-gray-700">
                {level.activities.map((a) => (
                  <li key={a} className="flex gap-2"><span className="text-[#6e0000]">&bull;</span> {a}</li>
                ))}
              </ul>
            </div>
          </section>

          <section id="apply" className="scroll-mt-24 rounded-2xl bg-[#fbe9d0] p-8 text-center">
            <h2 className="text-2xl font-bold text-[#6e0000]">Ready to join us?</h2>
            <p className="mt-2 text-gray-700">
              Apply online or call us on{" "}
              <a href="tel:0723248400" className="font-semibold underline">0723 248 400</a>.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {level.applyCodes.map((code) => (
                <Link
                  key={code}
                  href={`/admissions/apply?level=${code}`}
                  className="rounded-full bg-[#6e0000] px-8 py-3 font-bold text-white transition hover:bg-[#8b0000]"
                >
                  Apply for {levelLabel(code)}
                </Link>
              ))}
            </div>
          </section>

          <nav aria-label="Other levels" className="border-t border-gray-200 pt-8">
            <h2 className="mb-4 text-lg font-bold text-gray-900">Other levels</h2>
            <div className="flex flex-wrap gap-3">
              {ALL_LEVELS.filter((l) => l.slug !== level.current).map((l) => (
                <Link
                  key={l.slug}
                  href={`/levels/${l.slug}`}
                  className="rounded-full border border-[#6e0000]/30 px-5 py-2 text-sm font-semibold text-[#6e0000] hover:bg-[#6e0000] hover:text-white"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </main>
      <Footer />
    </>
  );
}