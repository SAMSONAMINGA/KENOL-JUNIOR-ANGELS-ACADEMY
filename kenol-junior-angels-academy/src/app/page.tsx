import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        {/* ========== HERO SECTION ========== */}
        {/* ========== HERO SECTION ========== */}
        <section className="relative overflow-hidden text-white">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/hero/students.jpg')",
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(110,0,0,0.62),_rgba(20,0,0,0.82))]" />

          {/* CHANGED: wider container (max-w-[1600px]) and smaller side padding so the badge can sit at the far left */}
          <div className="relative z-10 mx-auto max-w-[1600px] px-4 py-20 md:px-8 md:py-28 lg:px-10">
            {/* CHANGED: gap-12 gives the badge and text some breathing room */}
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-start lg:gap-12">
              {/* CHANGED: removed lg:-ml-16 and shrank the badge slightly so the text column gets more room */}
              <div className="w-36 flex-shrink-0 sm:w-44 md:w-52 lg:w-[24rem] xl:w-[26rem]">
                <Image
                  src="/badge.svg"
                  alt="Kenol Junior Angels Academy badge"
                  width={500}
                  height={500}
                  className="h-auto w-full drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)]"
                  priority
                />
              </div>

              {/* CHANGED: was max-w-2xl lg:max-w-[46rem], which forced "ANGELS" onto line 2. Now it takes all remaining width. */}
              <div className="min-w-0 flex-1">
                <span className="mt-6 block max-w-xl text-lg uppercase tracking-[0.08em] text-white/90 md:text-xl">
                  GIVE YOUR CHILD THE BEST START IN LIFE
                </span>

                <div
                  className="mb-2 mt-5 text-3xl font-semibold italic leading-none tracking-[-0.04em] text-white/95 md:text-5xl lg:text-[4.3rem]"
                  style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                >
                  Welcome to
                </div>

                {/* CHANGED: fixed "JUINOR" typo, split into two lines, scaled font with clamp() so it never overflows */}
                <h1 className="text-[clamp(2rem,4.6vw,5.1rem)] font-bold leading-[0.95] tracking-[-0.04em]">
                  <span className="block lg:whitespace-nowrap">KENOL JUNIOR ANGELS</span>
                  <span className="block">ACADEMY</span>
                </h1>

                <p className="mt-6 max-w-xl text-lg text-white/90 md:text-xl">
                  A nurturing, CBC-aligned learning environment where every learner
                  is supported to excel.<br /> Strive To Excel, Sky is The Limit.
                </p>
                <div className="mt-8 flex flex-wrap gap-4 pt-2">
                  <Link
                    href="/admissions"
                    className="rounded-full bg-white px-8 py-3.5 font-bold text-[#6e0000] shadow-lg transition hover:bg-gray-100"
                  >
                    Enroll Now
                  </Link>
                  <Link
                    href="/about"
                    className="rounded-full border-2 border-white px-8 py-3.5 font-semibold text-white transition hover:bg-white/10"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========== WHY CHOOSE US ========== */}
        <section className="py-16 md:py-20 bg-[#f5f0ea]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#6e0000] leading-[1.1] tracking-tight mb-4">
                Why Choose Kenol Junior Angels
                <span className="block">Academy?</span>
              </h2>
              <p className="text-xl text-gray-700 italic">
                We provide a safe, supportive and high-quality learning environment for every child.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  title: "CBC-Compliant Teaching",
                  desc: "Fully aligned with the Competency-Based Curriculum for PP1 to Grade 8.",
                  image:
                    "/images/hero/photo_9_cbc.jpg",
                },
                {
                  title: "Strong Literacy & Numeracy",
                  desc: "Solid foundation in reading, writing and mathematics from the early years.",
                  image:
                    "/images/hero/photo_3_writing.png",
                },
                {
                  title: "Experienced, Caring Teachers",
                  desc: "Dedicated teachers who know every child by name and nurture their growth.",
                  image:
                    "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80",
                },
                {
                  title: "Safe & Supportive Environment",
                  desc: "A secure campus where learners feel valued, protected and encouraged.",
                  image:
                    "/images/hero/photo_2_lineup.png",
                },
                {
                  title: "Affordable School Fees",
                  desc: "Quality education that remains accessible to families in Kenol and beyond.",
                  image:
                    "/images/hero/photo_4_playground.png",
                },
                {
                  title: "Co-Curricular Activities",
                  desc: "Music, sports, clubs and talent development beyond the classroom.",
                  image:
                    "/images/hero/photo_5_cycling.jpg"
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white/80 rounded-[22px] p-3 shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-[#e7e0da] hover:shadow-[0_10px_25px_rgba(110,0,0,0.09)] transition overflow-hidden"
                >
                  <div className="relative h-52 w-full overflow-hidden rounded-[18px] mb-4 border border-[#e7e0da] bg-[#f3efe9]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <h3 className="text-2xl md:text-[2rem] font-black text-[#1d1d1d] leading-tight mb-3">
                    {item.title}
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== LEVELS OFFERED ========== */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#6e0000] mb-4">
                Levels We Offer
              </h2>
              <p className="text-gray-600">
                From Pre-Primary to Junior Secondary – a complete journey of growth.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { level: "PP1 & PP2", name: "Pre-Primary", ages: "Ages 4–5" },
                { level: "Grade 1–3", name: "Lower Primary", ages: "Ages 6–8" },
                { level: "Grade 4–6", name: "Upper Primary", ages: "Ages 9–11" },
                { level: "Grade 7–8", name: "Junior Secondary", ages: "Ages 12–13" },
              ].map((item) => (
                <div
                  key={item.level}
                  className="rounded-2xl bg-gradient-to-br from-[#6e0000] to-[#4d0000] text-white p-6 hover:scale-[1.02] transition"
                >
                  <p className="text-sm font-medium text-white/70 mb-1">{item.ages}</p>
                  <h3 className="text-xl font-bold mb-1">{item.name}</h3>
                  <p className="text-2xl font-bold opacity-90">{item.level}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/academics"
                className="inline-flex items-center gap-2 text-[#6e0000] font-semibold hover:underline"
              >
                View full academic programme →
              </Link>
            </div>
          </div>
        </section>

        {/* ========== CTA BANNER ========== */}
        <section className="py-16 bg-[#000050] text-white">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Give Your Child the Best Start?
            </h2>
            <p className="text-lg text-white/80">
              Admissions are open for PP1, PP2 and Grades 1–8.
              Visit us in Kenol Town or call us today.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Link
                href="/admissions"
                className="px-8 py-3.5 bg-[#6e0000] text-white font-bold rounded-full hover:bg-[#8b0000] transition"
              >
                Register Now
              </Link>
              <a
                href="tel:0723248400"
                className="px-8 py-3.5 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition"
              >
                Call 0723 248 400
              </a>
            </div>
          </div>
        </section>

        {/* ========== CONTACT STRIP ========== */}
        <section className="py-10 bg-[#f8f4f0]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div>
                <h3 className="text-xl font-bold text-[#6e0000]">Visit Us</h3>
                <p className="text-gray-600">Kenol Town, near Kenol Catholic Church</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#6e0000]">Call Us</h3>
                <a href="tel:0723248400" className="text-gray-600 hover:text-[#6e0000]">
                  0723 248 400
                </a>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#6e0000]">Write to Us</h3>
                <p className="text-gray-600">P.O. Box 340 – 01020, Kenol</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
