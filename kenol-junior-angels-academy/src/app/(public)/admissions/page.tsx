import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function AdmissionsPage() {
  return (
    <>
      <Header />

      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#6e0000] via-[#8b0000] to-[#4d0000] text-white py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Admissions
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Join Kenol Junior Angels Academy.  
              Admissions are open for PP1 to Grade 8.
            </p>
          </div>
        </section>

        {/* Levels */}
        <section className="py-16 bg-[#f8f4f0]">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-[#6e0000] text-center mb-10">
              Choose a Level
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Pre-Primary",
                  grades: "PP1 & PP2",
                  desc: "Play-based learning, early literacy and numeracy in a warm, nurturing environment.",
                },
                {
                  title: "Lower Primary",
                  grades: "Grade 1–3",
                  desc: "Strong foundation in reading, writing and mathematics through practical lessons.",
                },
                {
                  title: "Upper Primary",
                  grades: "Grade 4–6",
                  desc: "Deeper subject understanding, critical thinking and practical life skills.",
                },
                {
                  title: "Junior Secondary",
                  grades: "Grade 7–8",
                  desc: "Preparation for senior school, leadership and independent study habits.",
                },
              ].map((level) => (
                <div
                  key={level.title}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition"
                >
                  <p className="text-sm font-semibold text-[#6e0000] mb-1">
                    {level.grades}
                  </p>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {level.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5">
                    {level.desc}
                  </p>
                  <Link
                    href="/admissions/apply"
                    className="inline-block text-sm font-semibold text-[#6e0000] hover:underline"
                  >
                    Apply for this level →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Important note */}
        <section className="py-12 bg-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-lg font-semibold text-[#6e0000] mb-3">
              Submitting an application does not mean automatic admission.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Final admission depends on document verification and availability of space.
              The school will contact you after you apply.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 bg-[#000050] text-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to start the application?
            </h2>
            <p className="text-white/85 mb-8">
              It only takes a few minutes. You will receive a confirmation you can print.
            </p>
            <Link
              href="/admissions/apply"
              className="inline-block px-8 py-3.5 bg-[#6e0000] text-white font-bold rounded-full hover:bg-[#8b0000] transition"
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