"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function ApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);

    // For now we just show the success message.
    // Later we will connect this to the real database + email.
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 800);
  }

  if (submitted) {
    return (
      <>
        <Header />
        <main className="min-h-[70vh] bg-[#f8f4f0] py-16">
          <div className="max-w-xl mx-auto px-4 text-center">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-green-100 flex items-center justify-center text-3xl">
                ✓
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#6e0000] mb-3">
                Application Received
              </h1>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Thank you. We have received your application.
                The school will contact you soon using the phone number you provided.
              </p>
              <p className="text-sm text-gray-500 mb-8">
                Please bring the child’s birth certificate, 2 passport photos,
                and parent ID when you visit the school.
              </p>
              <Link
                href="/admissions"
                className="inline-block px-6 py-3 bg-[#6e0000] text-white font-semibold rounded-full hover:bg-[#8b0000] transition"
              >
                Back to Admissions
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="bg-[#f8f4f0] py-12 md:py-16">
        <div className="max-w-2xl mx-auto px-4">
          <Link
            href="/admissions"
            className="text-sm font-semibold text-[#6e0000] hover:underline mb-6 inline-block"
          >
            ← Back to Admissions
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-[#6e0000] mb-2">
            Admission Application
          </h1>
          <p className="text-gray-600 mb-8">
            Fields marked * are required. It takes about 5 minutes.
          </p>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 space-y-8">
            {/* Child details */}
            <fieldset className="space-y-5">
              <legend className="text-xl font-bold text-gray-900 mb-2">
                About the child
              </legend>

              <div>
                <label className="block text-sm font-semibold text-[#6e0000] mb-1.5">
                  Child’s full name *
                </label>
                <input
                  name="childName"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#6e0000]/30"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-[#6e0000] mb-1.5">
                    Date of birth *
                  </label>
                  <input
                    name="dateOfBirth"
                    type="date"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#6e0000]/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#6e0000] mb-1.5">
                    Gender *
                  </label>
                  <select
                    name="gender"
                    required
                    defaultValue=""
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#6e0000]/30"
                  >
                    <option value="" disabled>
                      Choose
                    </option>
                    <option>Girl</option>
                    <option>Boy</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#6e0000] mb-1.5">
                  Level applying for *
                </label>
                <select
                  name="level"
                  required
                  defaultValue=""
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#6e0000]/30"
                >
                  <option value="" disabled>
                    Choose a level
                  </option>
                  <option value="PP1">PP1</option>
                  <option value="PP2">PP2</option>
                  <option value="GRADE1">Grade 1</option>
                  <option value="GRADE2">Grade 2</option>
                  <option value="GRADE3">Grade 3</option>
                  <option value="GRADE4">Grade 4</option>
                  <option value="GRADE5">Grade 5</option>
                  <option value="GRADE6">Grade 6</option>
                  <option value="GRADE7">Grade 7</option>
                  <option value="GRADE8">Grade 8</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#6e0000] mb-1.5">
                  Previous school (if any)
                </label>
                <input
                  name="previousSchool"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#6e0000]/30"
                />
              </div>
            </fieldset>

            {/* Parent details */}
            <fieldset className="space-y-5">
              <legend className="text-xl font-bold text-gray-900 mb-2">
                Parent or guardian
              </legend>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-[#6e0000] mb-1.5">
                    Full name *
                  </label>
                  <input
                    name="parentName"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#6e0000]/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#6e0000] mb-1.5">
                    Relationship to child *
                  </label>
                  <input
                    name="relationship"
                    placeholder="e.g. Mother, Father, Guardian"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#6e0000]/30"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-[#6e0000] mb-1.5">
                    Main phone number *
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#6e0000]/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#6e0000] mb-1.5">
                    Alternative phone
                  </label>
                  <input
                    name="altPhone"
                    type="tel"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#6e0000]/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#6e0000] mb-1.5">
                  Location / Area *
                </label>
                <input
                  name="area"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#6e0000]/30"
                />
              </div>
            </fieldset>

            <div>
              <p className="text-sm text-gray-500 mb-5">
                Submitting this form does not mean automatic admission.
                The school will contact you after reviewing your application.
              </p>
              <button
                type="submit"
                disabled={sending}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#6e0000] text-white font-bold rounded-full hover:bg-[#8b0000] transition disabled:opacity-60"
              >
                {sending ? "Sending…" : "Submit Application"}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}