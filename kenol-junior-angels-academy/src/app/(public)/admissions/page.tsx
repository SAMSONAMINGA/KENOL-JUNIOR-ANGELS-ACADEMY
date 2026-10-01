import Image from "next/image";
import Link from "next/link";
import { Fraunces, Manrope } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const display = Fraunces({ subsets: ["latin"], weight: ["500", "600"], style: ["normal", "italic"], variable: "--font-display" });
const body = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-body" });

const displayFont = { fontFamily: "var(--font-display)" } as const;
const focus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8b23d] focus-visible:ring-offset-2";

const LEVELS = [
  {
    title: "Pre-Primary",
    grades: "PP1 & PP2",
    slug: "pre-primary",
    desc: "Play-based learning, early literacy and numeracy in a warm, nurturing environment.",
  },
  {
    title: "Lower Primary",
    grades: "Grade 1–3",
    slug: "lower-primary",
    desc: "Strong foundation in reading, writing and mathematics through practical lessons.",
  },
  {
    title: "Upper Primary",
    grades: "Grade 4–6",
    slug: "upper-primary",
    desc: "Deeper subject understanding, critical thinking and practical life skills.",
  },
  {
    title: "Junior Secondary",
    grades: "Grade 7–8",
    slug: "junior-secondary",
    desc: "Preparation for senior school, leadership and independent study habits.",
  },
];

export default function AdmissionsPage() {
  return (
    <>
      <Header />

      <main className={`${display.variable} ${body.variable}`} style={{ fontFamily: "var(--font-body)" }}>
        {/* Hero */}
        <section className="relative isolate overflow-hidden text-white">
          <Image src="/images/hero/students.jpg" alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#2a0d0d]/90 via-[#6e0000]/85 to-[#4d0000]/75" />
          <div className="mx-auto max-w-4xl px-6 py-20 text-center md:py-28">
            <span className="mx-auto mb-5 block h-1 w-14 rounded-full bg-[#e8b23d]" />
            <h1 className="text-5xl font-semibold italic leading-[1.05] md:text-7xl" style={displayFont}>
              Admissions
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/90 md:text-xl">
              Join Kenol Junior Angels Academy.{" "}
              Admissions are open for PP1 to Grade 8.
            </p>
          </div>
        </section>

        {/* Levels */}
        <section className="bg-[#fbf5ec] px-6 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <span className="mx-auto mb-3 block h-1 w-14 rounded-full bg-[#e8b23d]" />
              <h2 className="text-3xl font-semibold text-[#6e0000] md:text-4xl" style={displayFont}>
                Choose a Level
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {LEVELS.map((level) => (
                <Link
                  key={level.slug}
                  href={`/levels/${level.slug}`}
                  className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-[#eadfce] bg-white shadow-sm transition hover:border-[#6e0000] hover:shadow-md motion-reduce:transition-none ${focus}`}
                >
                  <div className="bg-gradient-to-br from-[#6e0000] to-[#4d0000] px-6 py-5 text-white">
                    <p className="text-3xl font-semibold italic" style={displayFont}>{level.grades}</p>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="mb-2 text-xl font-bold text-[#2a0d0d]">{level.title}</h3>
                    <p className="mb-6 text-[0.95rem] leading-6 text-[#4a3636]">{level.desc}</p>
                    <span className="mt-auto text-sm font-bold text-[#6e0000] underline-offset-4 group-hover:underline">
                      View this level →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Important note */}
        <section className="bg-white px-6 py-12 md:py-14">
          <div className="mx-auto flex max-w-3xl gap-4 rounded-xl border border-[#eadfce] border-l-4 border-l-[#e8b23d] bg-[#fdfaf5] p-6 md:p-8">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="mt-1 h-6 w-6 shrink-0 text-[#6e0000]">
              <path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-6h2v6Zm0-8h-2V7h2v2Z" />
            </svg>
            <div>
              <p className="text-lg font-bold text-[#6e0000]">
                Submitting an application does not mean automatic admission.
              </p>
              <p className="mt-2 leading-7 text-[#4a3636]">
                Final admission depends on document verification and availability of space.
                The school will contact you after you apply.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#000050] px-6 py-16 text-white md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold italic md:text-4xl" style={displayFont}>
              Ready to start the application?
            </h2>
            <p className="mt-4 text-lg text-white/85">
              It only takes a few minutes. You will receive a confirmation you can print.
            </p>
            <Link
              href="/admissions/apply"
              className={`mt-9 inline-block rounded-full bg-[#e8b23d] px-10 py-4 text-lg font-bold text-[#2a0d0d] shadow-lg transition hover:bg-[#f0c25a] ${focus}`}
            >
              Start Application
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}