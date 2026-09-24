import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import Image from "next/image";

type Level = {
  id: string;
  grades: string;
  ages: string;
  name: string;
  desc: string;
  areas: string[];
  note?: string;
};

// Learning areas follow the national CBC framework. Check each list against
// what the school actually teaches and edit before publishing.
const levels: Level[] = [
  {
    id: "pre-primary",
    grades: "PP1 & PP2",
    ages: "Ages 4–5",
    name: "Pre-Primary",
    desc: "Children learn through play, songs, stories and hands-on activity. We build early reading and counting, social skills and confidence in a warm, nurturing classroom.",
    areas: [
      "Language activities",
      "Mathematical activities",
      "Environmental activities",
      "Psychomotor & creative activities",
      "Religious education",
    ],
  },
  {
    id: "lower-primary",
    grades: "Grade 1–3",
    ages: "Ages 6–8",
    name: "Lower Primary",
    desc: "A strong foundation in reading, writing and mathematics, taught through practical, activity-based lessons so every child can follow and enjoy learning.",
    areas: [
      "English",
      "Kiswahili",
      "Mathematics",
      "Environmental activities",
      "Hygiene & nutrition",
      "Religious education",
      "Movement & creative activities",
    ],
  },
  {
    id: "upper-primary",
    grades: "Grade 4–6",
    ages: "Ages 9–11",
    name: "Upper Primary",
    desc: "Learners deepen their understanding of each subject, practise critical thinking and begin practical life skills such as farming, science projects and teamwork.",
    areas: [
      "English",
      "Kiswahili",
      "Mathematics",
      "Science & technology",
      "Agriculture & nutrition",
      "Social studies",
      "Religious education",
      "Creative arts",
      "Physical & health education",
    ],
    note: "At the end of Grade 6, learners sit the national KPSEA assessment.",
  },
  {
    id: "junior-school",
    grades: "Grade 7–8",
    ages: "Ages 12–13",
    name: "Junior School",
    desc: "Preparation for senior school: broader subjects, career awareness, leadership and the independent study habits learners will need next.",
    areas: [
      "English",
      "Kiswahili",
      "Mathematics",
      "Integrated science",
      "Social studies",
      "Pre-technical studies",
      "Agriculture",
      "Business studies",
      "Health education",
      "Life skills",
      "Religious education",
      "Sports & physical education",
    ],
  },
];

const focus = [
  {
    title: "Literacy & Numeracy",
    desc: "Strong reading, writing and mathematics are the base for everything else a child will learn.",
  },
  {
    title: "CBC Competencies",
    desc: "Learners build communication, critical thinking, creativity, collaboration and digital skills.",
  },
  {
    title: "Personalized Attention",
    desc: "Small class sizes and caring teachers mean every child is known, supported and challenged.",
  },
  {
    title: "Character Formation",
    desc: "We build discipline, respect, responsibility and integrity, in class and on the compound.",
  },
  {
    title: "Continuous Assessment",
    desc: "Regular checks on progress let us spot who needs extra help early and support them.",
  },
  {
    title: "Co-Curricular Growth",
    desc: "Music, sports, clubs and talent development sit alongside classroom learning.",
  },
];

const competencies = [
  ["Communication & collaboration", "Sharing ideas clearly and working well with others."],
  ["Critical thinking & problem solving", "Asking questions, weighing evidence and finding solutions."],
  ["Creativity & imagination", "Trying new ideas and making things."],
  ["Citizenship", "Understanding our responsibilities to family, school and country."],
  ["Digital literacy", "Using technology safely and for a purpose."],
  ["Learning to learn", "Setting goals, reflecting and learning independently."],
  ["Self-efficacy", "Building confidence and belief in what they can do."],
];

export default function AcademicsPage() {
  return (
    <>
      <Header />

      <main className="text-gray-800">
        {/* ========== HERO ========== */}
        <section className="relative overflow-hidden text-white">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/hero/students.jpg')" }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(110,0,0,0.78),_rgba(20,0,0,0.88))]" />

          <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 md:py-28">
            <h1 className="text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
              Where Learning Thrives
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-white md:text-2xl md:leading-9">
              A strong foundation in literacy, numeracy and character.
            </p>

            <nav aria-label="Jump to a level" className="mt-10 flex flex-wrap gap-3">
              {levels.map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  className="rounded-full border-2 border-white/70 px-5 py-2.5 text-base font-semibold text-white transition hover:bg-white hover:text-[#6e0000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {l.name}
                </a>
              ))}
            </nav>
          </div>
        </section>

        {/* ========== CURRICULUM ========== */}
        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="mb-6 text-3xl font-bold text-[#6e0000] md:text-4xl">
                  Our Curriculum
                </h2>
                <div className="max-w-prose space-y-6 text-lg leading-8 text-gray-800">
                  <p>
                    At Kenol Junior Angels Academy we fully implement the{" "}
                    <strong>Competency-Based Curriculum (CBC)</strong>. Lessons
                    develop knowledge, skills and values that prepare every
                    learner for life beyond the classroom.
                  </p>
                  <p>
                    We place special emphasis on a solid foundation in{" "}
                    <strong>literacy and numeracy</strong>, while nurturing
                    creativity, critical thinking, communication and good
                    character.
                  </p>
                  <p>
                    Every child receives personal attention in a safe and
                    supportive environment, guided by experienced and caring
                    teachers.
                  </p>
                </div>
              </div>

              <div className="rounded-3xl bg-[#f5f0ea] p-8 md:p-10">
                <h3 className="mb-6 text-2xl font-bold text-[#6e0000]">
                  What makes our academics strong
                </h3>
                <ul className="space-y-4">
                  {[
                    "Fully CBC-compliant teaching",
                    "Strong focus on reading, writing & mathematics",
                    "Personalized learner attention",
                    "Continuous assessment & progress tracking",
                    "Character formation & life skills",
                    "Qualified and caring teachers",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-lg leading-7">
                      <span aria-hidden="true" className="mt-0.5 font-bold text-[#6e0000]">
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ========== LEVELS ========== */}
        <section className="bg-[#f5f0ea] py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-10 max-w-2xl">
              <h2 className="mb-4 text-3xl font-bold text-[#6e0000] md:text-4xl">
                Levels We Offer
              </h2>
              <p className="text-lg leading-8 text-gray-800">
                A complete learning journey from early childhood to junior
                school. Find your child&apos;s level below.
              </p>
            </div>

            {levels.map((l) => (
              <article
                key={l.id}
                id={l.id}
                className="grid scroll-mt-24 gap-6 border-t border-[#d9cfc6] py-10 md:grid-cols-[15rem_1fr] md:gap-12"
              >
                <div>
                  <p className="text-lg font-bold text-[#6e0000]">{l.grades}</p>
                  <h3 className="mt-1 text-3xl font-bold text-gray-900">{l.name}</h3>
                  <p className="mt-1 text-base text-gray-700">{l.ages}</p>
                </div>

                <div>
                  <p className="max-w-prose text-lg leading-8 text-gray-800">{l.desc}</p>

                  <p className="mt-6 text-base font-semibold text-gray-900">
                    Learning areas
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {l.areas.map((a) => (
                      <li
                        key={a}
                        className="rounded-full border border-[#d9cfc6] bg-white px-4 py-1.5 text-base text-gray-800"
                      >
                        {a}
                      </li>
                    ))}
                  </ul>

                  {l.note && (
                    <p className="mt-6 max-w-prose border-l-4 border-[#6e0000] pl-4 text-base leading-7 text-gray-800">
                      {l.note}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ========== ACADEMIC FOCUS ========== */}
        {/* ========== ACADEMIC FOCUS ========== */}
        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            {/* CHANGED: gap-10 lg:gap-16 -> gap-12 lg:gap-0 so the text card can overlap the photo */}
            <div className="grid items-center gap-12 lg:grid-cols-[2fr_3fr] lg:gap-25">
              {/* Photo column: unchanged */}
              <div className="relative h-72 overflow-hidden rounded-3xl lg:h-96">
                <Image
                  src="/images/hero/photo_1_main_group.png"
                  alt="Pupils of Kenol Junior Angels Academy in school uniform"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>

              {/* CHANGED: text column is now an overlapping white card */}
              <div className="relative z-10 rounded-3xl bg-white p-8 shadow-[0_20px_50px_rgba(110,0,0,0.15)] lg:-ml-24 lg:p-14">
                <span className="mb-5 block h-1 w-16 rounded-full bg-[#6e0000]" />
                <h2 className="mb-5 text-4xl font-bold leading-[1.1] tracking-tight text-[#6e0000] md:text-5xl">
                  Our Academic Focus
                </h2>
                <p className="max-w-xl text-xl leading-9 text-gray-800">
                  We develop the whole child: academically, socially and
                  emotionally. Good results matter, and so does a child who
                  enjoys coming to school.
                </p>
                <a
                  href="#pre-primary"
                  className="mt-6 inline-block text-lg font-semibold text-[#6e0000] underline decoration-2 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6e0000]"
                >
                  Explore each level
                </a>
              </div>
            </div>

            {/* CHANGED: cards with a staggered middle column */}
            <div className="mt-16 grid gap-6 pb-10 sm:grid-cols-2 lg:grid-cols-3">
              {focus.map((item, i) => (
                <div
                  key={item.title}
                  className={`rounded-2xl border border-[#e7e0da] border-t-4 border-t-[#6e0000] bg-[#f5f0ea] p-7 ${
                    i % 3 === 1 ? "lg:translate-y-10" : ""
                  }`}
                >
                  <h3 className="mb-3 text-2xl font-bold leading-snug text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-lg leading-8 text-gray-800">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== CBC CORE COMPETENCIES ========== */}
        {/* ========== CBC CORE COMPETENCIES ========== */}
        <section
          className="py-16 text-white md:py-24"
          style={{
            // faint exercise-book lines over the maroon gradient
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent 0, transparent 47px, rgba(255,255,255,0.07) 47px, rgba(255,255,255,0.07) 48px), linear-gradient(135deg, #6e0000, #4d0000)",
          }}
        >
          <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-[2fr_3fr] lg:gap-20">
            {/* Left: big numeral, heading, pull-quote intro */}
            <div className="self-start lg:sticky lg:top-28">
              <p
                aria-hidden="true"
                className="font-serif text-[9rem] font-bold leading-[0.8] text-white/20 md:text-[11rem]"
              >
                7
              </p>
              <h2 className="mb-6 mt-2 text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl">
                Skills every learner builds
              </h2>
              <p className="max-w-md border-l-2 border-white/50 pl-5 font-serif text-2xl italic leading-10 text-white">
                Core competencies from the CBC, woven through every
                subject from PP1 to Grade 8.
              </p>
            </div>

            {/* Right: serif italic terms, clean sans descriptions */}
            <dl className="divide-y divide-white/25 border-y border-white/25">
              {competencies.map(([term, desc]) => (
                <div
                  key={term}
                  className="grid gap-2 py-7 md:grid-cols-[1fr_1fr] md:items-baseline md:gap-10"
                >
                  <dt className="font-serif text-3xl font-bold italic leading-tight">
                    {term}
                  </dt>
                  <dd className="text-lg leading-8 tracking-wide text-white/90">
                    {desc}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ========== CTA ========== */}
        <section className="bg-[#000050] py-16 text-white md:py-20">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              Give Your Child a Strong Academic Foundation
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg leading-8 text-white">
              Admissions are open for PP1, PP2 and Grades 1–8. Join a school
              that cares about every learner&apos;s success.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/admissions"
                className="rounded-full bg-[#6e0000] px-8 py-3.5 text-lg font-bold text-white transition hover:bg-[#8b0000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Enroll Now
              </Link>
              <Link
                href="/contact"
                className="rounded-full border-2 border-white px-8 py-3.5 text-lg font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}