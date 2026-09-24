import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const values = [
  {
    title: "CBC-compliant teaching",
    description:
      "Lessons are planned directly against the national Competency-Based Curriculum, so what happens in our classrooms lines up with what the Ministry of Education expects at every grade.",
    photo: "/images/hero/photo_1_main_group.png",
  },
  {
    title: "Strong literacy & numeracy foundation",
    description:
      "We treat reading and number sense as the base every other subject stands on, with steady, deliberate practice from Pre-Primary onward.",
    photo: "/images/hero/photo_2_lineup.png",
  },
  {
    title: "Experienced, caring teachers",
    description:
      "Class sizes stay small enough that teachers notice when a child is thriving — or struggling — and adjust before it becomes a bigger problem.",
    photo: "/images/hero/photo_3_writing.png",
  },
  {
    title: "Safe, supportive learning environment",
    description:
      "A secured, walled compound and a daily rhythm children can rely on — so the focus stays on growing, not worrying.",
    photo: "/images/hero/photo_4_playground.png",
  },
];

const beyondClassroom = [
  {
    title: "Swimming lessons",
    description:
      "Pre-school swimming sessions build water confidence, basic swimming skills, and safety awareness in a fun, supervised setting.",
    image: "/images/hero/photo_7_swimming.jpg",
  },
  {
    title: "Pedals in Motion",
    description:
      "Our cycling events get learners moving, building coordination and giving them a shared adventure outside the classroom.",
    image: "/images/hero/photo_5_cycling.jpg",
  },
  {
    title: "Sports & dance",
    description:
      "Regular sports and dance sessions keep learners active and give every child, not just the naturally athletic ones, a way to shine.",
    image: "/images/hero/photo_8_activirties.jpg",
  },
  {
    title: "Faith & community",
    description:
      "The school marks the term with services of thanksgiving alongside the local church community, rooting school life in the wider Kenol community.",
    image: "/images/hero/photo_6_ faith.jpg",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />

      <main className="bg-[#1d120d] text-[#f7efe8]">
        <section className="relative overflow-hidden border-b border-[#b39370]/30">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-35"
            style={{ backgroundImage: "url('/images/hero/students.jpg')" }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(19,10,7,0.25),_rgba(19,10,7,0.82))]" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 md:py-20">
            <p className="text-sm uppercase tracking-[0.18em] text-[#edc98d]">Kenol, Murang&apos;a County • Kenya</p>

            <h1 className="mt-5 max-w-4xl text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] text-[#f3e8db]">
              Where every child&apos;s sky is the limit.
            </h1>

            <p className="mt-8 max-w-4xl text-xl md:text-2xl text-[#f3e8db]/90 leading-relaxed">
              Junior Angels Academy is a CBC-aligned school in Kenol, Murang&apos;a — a place built on the belief that every child is a flower in the garden of life, each one special, each one to be loved.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 text-lg text-[#f7efe8]">
              <span className="rounded-full border border-[#f7efe8]/30 bg-white/5 px-5 py-2.5 backdrop-blur-sm">
                PP1 – Grade 8
              </span>
              <span className="rounded-full border border-[#f7efe8]/30 bg-white/5 px-5 py-2.5 backdrop-blur-sm">
                CBC-aligned curriculum
              </span>
              <span className="rounded-full border border-[#f7efe8]/30 bg-white/5 px-5 py-2.5 backdrop-blur-sm">
                Off Catholic Road, Kenol
              </span>
            </div>

            <div className="mt-10 flex flex-wrap gap-5">
              <a
                href="/admissions"
                className="inline-flex items-center justify-center rounded-xl bg-[#7d1d1d] px-8 py-4 text-xl font-bold text-white shadow-lg shadow-[#120907]/30 transition hover:bg-[#8e2222]"
              >
                Enrol your child
              </a>
              <a
                href="#story"
                className="inline-flex items-center justify-center rounded-xl border border-[#d6b77a] px-8 py-4 text-xl font-semibold text-[#f5d99c] transition hover:bg-white/5"
              >
                Our story
              </a>
            </div>
          </div>
        </section>

        <section id="story" className="max-w-7xl mx-auto px-4 py-16 md:py-20">
          <blockquote className="text-2xl md:text-4xl text-[#f7efe8] italic leading-relaxed max-w-4xl mx-auto text-center">
            “A child is a flower that grows in the garden of life.”
          </blockquote>

          <div className="mt-10 max-w-5xl mx-auto">
            <p className="text-[#edc98d] text-xl md:text-2xl font-semibold mb-5">Our story</p>
            <h2 className="text-4xl md:text-5xl font-black text-[#f7efe8] leading-tight">
              A  school with a clear purpose.
            </h2>
            <div className="mt-6 space-y-5 text-lg md:text-xl text-[#f3e8db]/90 leading-relaxed">
              <p>
                Junior Angels Academy sits in Kenol, Murang&apos;a, just off Catholic Road — a close-knit school where teachers know each learner by name. Our team carries out what we see as a noble task: educating the young citizens who will shape this community&apos;s future, one term at a time.
              </p>
              <p>
                We follow Kenya&apos;s Competency-Based Curriculum from Pre-Primary through Grade 8, pairing academic rigour with the kind of warmth and attention a small school can offer that a large one can&apos;t.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-b border-[#b39370]/30 bg-[#2b1d18]">
          <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
            <p className="text-[#edc98d] text-xl md:text-2xl font-semibold">Why families choose us</p>
            <h2 className="mt-3 text-4xl md:text-5xl font-black text-[#f7efe8] leading-tight">
              Built around four commitments.
            </h2>

            <div className="mt-10 space-y-5">
              {values.map((item) => (
                <div
                  key={item.title}
                  className="relative overflow-hidden rounded-[28px] border border-[#b39370]/35 bg-[#2a1d1a]/90 px-5 py-6 md:px-8 md:py-8"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{ backgroundImage: `url('${item.photo}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#2a1d1a] via-[#2a1d1a]/95 to-[#2a1d1a]/80" />

                  <div className="relative z-10 grid items-center gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
                    <div className="flex justify-center lg:justify-start">
                      <div className="relative h-28 w-28 overflow-hidden rounded-full border-[4px] border-[#d7b273] shadow-[0_0_0_5px_rgba(247,239,232,0.04)] md:h-36 md:w-36 lg:h-[220px] lg:w-[220px]">
                        <div
                          className="absolute inset-0 bg-cover bg-center scale-110"
                          style={{ backgroundImage: `url('${item.photo}')` }}
                        />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.08),_rgba(0,0,0,0.32))]" />
                      </div>
                    </div>

                    <div className="text-left">
                      <h3 className="text-3xl md:text-5xl lg:text-[3.2rem] font-black leading-[1.05] text-[#f7efe8] tracking-[-0.03em]">
                        {item.title}
                      </h3>
                      <p className="mt-4 max-w-5xl text-lg md:text-2xl lg:text-[2rem] leading-relaxed text-[#f3e8db]/90">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-16 md:py-20">
          <div className="relative overflow-hidden rounded-[30px] border border-[#b39370]/30 bg-[#6b1d1f] px-6 py-10 md:px-12 md:py-16">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-25"
              style={{ backgroundImage: "url('/images/hero/students.jpg')" }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(255,255,255,0.18),_transparent_38%),linear-gradient(90deg,_rgba(109,18,18,0.86),_rgba(74,9,9,0.78))]" />

            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <p className="text-4xl md:text-5xl font-serif italic leading-[1.2] text-[#f7efe8]">
                “Each one is special. Each one is beautiful. Each one is unique. Each one is to be loved.”
              </p>
              <p className="mt-6 text-lg text-[#f4d9b2]">— the belief every Junior Angels teacher starts the day with</p>
            </div>
          </div>
        </section>

        <section className="border-t border-[#b39370]/30 bg-[#1d120d]">
          <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
            <p className="text-[#edc98d] text-xl md:text-2xl font-semibold">Beyond the classroom</p>
            <h2 className="mt-3 text-4xl md:text-5xl font-black text-[#f7efe8] leading-tight">
              School life at Junior Angels.
            </h2>

            <div className="mt-10 space-y-5">
              {beyondClassroom.map((item) => (
                <div
                  key={item.title}
                  className="relative min-h-[190px] overflow-hidden rounded-[18px] border border-[#b39370]/30 bg-[#2b1d18]"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-right-center opacity-80"
                    style={{ backgroundImage: `url('${item.image}')` }}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(38,25,21,0.98)_0%,rgba(38,25,21,0.94)_28%,rgba(38,25,21,0.7)_50%,rgba(38,25,21,0.18)_78%,rgba(38,25,21,0.05)_100%)]" />

                  <div className="relative z-10 flex min-h-[180px] max-w-[76%] flex-col justify-center px-4 py-5 md:min-h-[190px] md:max-w-[54%] md:px-7 md:py-6">
                    <h3 className="text-xl md:text-2xl font-black text-[#f7efe8] leading-tight tracking-[-0.01em]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm md:text-base text-[#f3e8db]/90 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[#b39370]/30 bg-[#1d120d]">
          <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
            <p className="text-[#edc98d] text-xl md:text-2xl font-semibold">Get in touch</p>
            <h2 className="mt-3 text-4xl md:text-5xl font-black text-[#f7efe8] leading-tight">
              Come and see the school for yourself.
            </h2>

            <div className="mt-10 max-w-3xl space-y-6 text-xl text-[#f3e8db]/90">
              <p>
                The best way to know if Junior Angels is right for your child is to visit. Call, message, or stop by our gate off Catholic Road, Kenol.
              </p>

              <div className="space-y-4 text-xl">
                <p className="flex items-center gap-3">
                  <span className="text-[#7ac7c4] text-2xl">☎</span>
                  <span className="font-bold text-[#f7efe8]">0723 248 400</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-[#7ac7c4] text-2xl">✉</span>
                  <span className="font-bold text-[#f7efe8]">kjuniorangels1@gmail.com</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-[#7ac7c4] text-2xl">📍</span>
                  <span className="font-bold text-[#f7efe8]">Kenol, Murang&apos;a — off Catholic Road</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-[#7ac7c4] text-2xl">@</span>
                  <span className="font-bold text-[#f7efe8]">@kenoljuniorangels on TikTok</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
