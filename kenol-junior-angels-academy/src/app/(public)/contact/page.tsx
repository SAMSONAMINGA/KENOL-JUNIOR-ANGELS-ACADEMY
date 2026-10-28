"use client";

import { useState } from "react";
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
 * DESIGN PLAN
 * Color   maroon #6e0000 (band, primary), maroon-deep #4d0000 (gradient end),
 *         cream #fbf5ec (page), tan #f4ead9 (alternate band), gold #e8b23d
 *         (one accent rule + focus state), ink #2a0d0d (headings on cream),
 *         warm-grey #4a3636 (body text on cream).
 * Type    Fraunces italic for the two or three moments that carry warmth
 *         (the intro line, the phone number); Manrope for everything read
 *         in bulk (labels, body, form). One family pairing, used site-wide.
 * Layout  Not a card grid. The ways to reach the school are set as a single
 *         list of rows with rules between them, like an address book page,
 *         each row's value sized by how it's used (the phone number is the
 *         one large, dial-it-now moment). The form sits beside that list.
 *         A map band closes the page, framed rather than dropped in raw.
 * Principle  One bold move: the phone number set large in Fraunces italic,
 *            because "call us" is the single most useful action on a
 *            contact page. Everything else stays quiet around it.
 */

const REACH = [
  {
    label: "Call",
    value: "0723 248 400",
    href: "tel:0723248400",
  },
  {
    label: "Email",
    value: "kjuniorangels1@gmail.com",
    href: "mailto:kjuniorangels1@gmail.com",
    small: true,
  },
  {
    label: "Write",
    value: "P.O. Box 340 – 01020, Kenol",
  },
  {
    label: "Visit",
    value: "Kenol Town, near Kenol Catholic Church",
  },
  {
    label: "Office hours",
    value: "Monday – Friday, 8:00am – 4:30pm",
  },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Wire this up to your form handler / email service of choice.
    setSent(true);
  }

  return (
    <>
      <Header />
      <main
        className={`${display.variable} ${body.variable}`}
        style={{ fontFamily: "var(--font-body)" }}
      >
        {/* ========== INTRO BAND ========== */}
        <section
          className="px-6 py-20 text-white sm:px-10 md:py-28 lg:px-16"
          style={{ background: "linear-gradient(135deg, #6e0000, #4d0000)" }}
        >
          <div className="mx-auto max-w-3xl">
            <span className="mb-6 block h-1 w-16 rounded-full" style={{ background: "#e8b23d" }} />
            <h1
              className="text-4xl italic leading-[1.1] sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              We&rsquo;d love to hear from you
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/85 sm:text-xl">
              Questions about admissions, fees or a visit to the school —
              reach us any way that suits you.
            </p>
          </div>
        </section>

        {/* ========== REACH US + FORM ========== */}
        <section className="px-6 py-16 sm:px-10 md:py-24 lg:px-16" style={{ background: "#fbf5ec" }}>
          <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            {/* Reach us: a list of rows, not cards */}
            <div>
              <h2 className="mb-8 text-2xl font-bold" style={{ color: "#2a0d0d" }}>
                Reach us directly
              </h2>
              <div style={{ borderTop: "1px solid #e2d5c4" }}>
                {REACH.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-[7rem_1fr] items-baseline gap-6 py-6 sm:grid-cols-[8rem_1fr]"
                    style={{ borderBottom: "1px solid #e2d5c4" }}
                  >
                    <p className="text-sm font-semibold" style={{ color: "#6e0000" }}>
                      {row.label}
                    </p>
                    {row.href ? (
                      <a
                        href={row.href}
                        className={`italic underline decoration-2 decoration-transparent transition hover:decoration-[#e8b23d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${
                          row.small
                            ? "break-all text-xl leading-snug sm:text-2xl"
                            : "text-4xl leading-none"
                        }`}
                        style={{ fontFamily: "var(--font-display)", color: "#2a0d0d" }}
                      >
                        {row.value}
                      </a>
                    ) : (
                      <p className="text-lg leading-8" style={{ color: "#4a3636" }}>
                        {row.value}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <p className="mt-8 max-w-sm text-base leading-7" style={{ color: "#4a3636" }}>
                For admissions specifically, it&rsquo;s often quickest to call
                the office directly — a member of staff can talk you through
                places and fees the same day.
              </p>
            </div>

            {/* Form */}
            <div>
              <h2 className="mb-8 text-2xl font-bold" style={{ color: "#2a0d0d" }}>
                Send a message
              </h2>

              {sent ? (
                <div
                  className="rounded-sm px-6 py-8"
                  style={{ background: "#f4ead9", border: "1px solid #e2d5c4" }}
                  role="status"
                >
                  <p
                    className="text-2xl italic"
                    style={{ fontFamily: "var(--font-display)", color: "#2a0d0d" }}
                  >
                    Message sent.
                  </p>
                  <p className="mt-2 text-base leading-7" style={{ color: "#4a3636" }}>
                    Thank you — we&rsquo;ll get back to you soon. If it&rsquo;s
                    urgent, call 0723 248 400.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Field label="Your name" name="name" required />
                  <Field label="Phone or email" name="contact" required />
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-semibold"
                      style={{ color: "#6e0000" }}
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="w-full resize-none rounded-sm px-4 py-3 text-lg outline-none transition"
                      style={{
                        background: "#fff",
                        border: "1px solid #d9c9b4",
                        color: "#2a0d0d",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#e8b23d")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#d9c9b4")}
                    />
                  </div>
                  <button
                    type="submit"
                    className="rounded-full px-8 py-3.5 text-lg font-bold text-white transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
                    style={{ background: "#6e0000" }}
                  >
                    Send message
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ========== MAP ========== */}
        <section className="px-6 pb-20 sm:px-10 lg:px-16" style={{ background: "#fbf5ec" }}>
          <div className="mx-auto max-w-6xl">
            <div
              className="relative h-80 overflow-hidden sm:h-96"
              style={{ border: "10px solid #6e0000" }}
            >
              {/*
                Swap the src below for your real Google Maps embed link
                (Google Maps → Share → Embed a map → copy the src URL).
              */}
              <iframe
                title="Kenol Junior Angels Academy location"
                src="https://www.google.com/maps?q=Kenol+Town+Kenya&output=embed"
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="mt-4 text-base" style={{ color: "#4a3636" }}>
              Kenol Town, near Kenol Catholic Church &middot; P.O. Box 340 –
              01020, Kenol
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Field({
  label,
  name,
  required,
}: {
  label: string;
  name: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-semibold" style={{ color: "#6e0000" }}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        required={required}
        className="w-full rounded-sm px-4 py-3 text-lg outline-none transition"
        style={{ background: "#fff", border: "1px solid #d9c9b4", color: "#2a0d0d" }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "#e8b23d")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "#d9c9b4")}
      />
    </div>
  );
}