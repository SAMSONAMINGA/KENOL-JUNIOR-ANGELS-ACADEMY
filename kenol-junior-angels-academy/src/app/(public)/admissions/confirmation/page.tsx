import { notFound } from "next/navigation";
import { Fraunces, Manrope } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PrintButton from "./PrintButton";
import { db } from "@/lib/db";
import { DOCUMENTS_TO_BRING, levelLabel } from "@/lib/levels";

const display = Fraunces({ subsets: ["latin"], weight: ["500", "600"], style: ["normal", "italic"], variable: "--font-display" });
const body = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-body" });

export const dynamic = "force-dynamic";
export const metadata = {
  robots: { index: false, follow: false },
  referrer: "no-referrer" as const,
};

function Row({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="grid grid-cols-[10rem_1fr] gap-4 border-b py-3" style={{ borderColor: "#e2d5c4" }}>
      <dt className="text-sm font-semibold" style={{ color: "#6e0000" }}>{label}</dt>
      <dd className="text-lg" style={{ color: "#2a0d0d" }}>{value}</dd>
    </div>
  );
}

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string; t?: string }>;
}) {
  const { ref, t } = await searchParams;
  if (!ref || !t) notFound();

  const app = await db.application.findFirst({ where: { reference: ref, accessToken: t } });
  if (!app) notFound();

  const dob = app.dateOfBirth.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
  const submitted = app.createdAt.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  const otherGuardian =
    app.otherParentName || app.otherRelationship || app.otherPhone
      ? [app.otherParentName, app.otherRelationship ? `(${app.otherRelationship})` : null, app.otherPhone]
          .filter(Boolean)
          .join(" ")
      : null;

  return (
    <>
      <style>{`@media print { header, footer, nav, .no-print { display: none !important; } }`}</style>

      <Header />
      <main className={`${display.variable} ${body.variable}`} style={{ fontFamily: "var(--font-body)" }}>
        <section className="px-6 py-14 sm:px-10 md:py-20 lg:px-16" style={{ background: "#fbf5ec" }}>
          <div className="mx-auto max-w-2xl">
            <span className="no-print mb-5 block h-1 w-16 rounded-full" style={{ background: "#e8b23d" }} />
            <h1 className="text-4xl italic leading-[1.1] sm:text-5xl" style={{ fontFamily: "var(--font-display)", color: "#2a0d0d" }}>
              Application Received Successfully
            </h1>

            <div className="mt-8 rounded-sm px-6 py-5" style={{ background: "#6e0000", color: "#fff" }}>
              <p className="text-sm font-semibold uppercase tracking-wide text-white/80">Your reference number</p>
              <p className="mt-1 text-4xl italic" style={{ fontFamily: "var(--font-display)" }}>{app.reference}</p>
            </div>

            <p className="mt-6 text-lg leading-8" style={{ color: "#4a3636" }}>
              Please print this page and bring it with you when you visit the
              school for document verification.
            </p>

            <h2 className="mb-2 mt-10 text-2xl font-bold" style={{ color: "#2a0d0d" }}>Your details</h2>
            <dl>
              <Row label="Submitted" value={submitted} />
              <Row label="Child" value={app.childName} />
              <Row label="Date of birth" value={dob} />
              <Row label="Gender" value={app.gender} />
              <Row label="Level applied for" value={levelLabel(app.level)} />
              <Row label="Previous school" value={app.previousSchool} />
              <Row label="Parent / guardian" value={`${app.parentName} (${app.relationship})`} />
              <Row label="Phone" value={app.altPhone ? `${app.phone} / ${app.altPhone}` : app.phone} />
              <Row label="Area" value={app.area} />
              <Row label="Other parent/guardian" value={otherGuardian} />
            </dl>

            <h2 className="mb-3 mt-10 text-2xl font-bold" style={{ color: "#2a0d0d" }}>Documents to bring</h2>
            <ul className="space-y-2">
              {DOCUMENTS_TO_BRING.map((d) => (
                <li key={d} className="text-lg" style={{ color: "#4a3636" }}>&#9744; {d}</li>
              ))}
            </ul>

            <h2 className="mb-3 mt-10 text-2xl font-bold" style={{ color: "#2a0d0d" }}>School contact</h2>
            <p className="text-lg leading-8" style={{ color: "#4a3636" }}>
              Kenol Junior Angels Academy<br />
              Kenol Town, near Kenol Catholic Church<br />
              P.O. Box 340 – 01020, Kenol<br />
              Tel: 0723 248 400<br />
              kjuniorangels1@gmail.com
            </p>

            <p className="mt-8 text-base leading-7" style={{ color: "#8a7a6d" }}>
              Submitting the form does not mean automatic admission. Final
              admission depends on document verification and space availability.
            </p>

            <div className="mt-8">
              <PrintButton />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}